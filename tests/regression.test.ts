import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST, formatDecisionContext } from '@/app/api/ai/chat/route'
import { streamText } from 'ai'
import { GoalReviewSchema } from '@/types/analysis'
import { DecisionRepository, createDefaultDecision } from '@/lib/repositories/decision-repository'
import { renderHook, act } from '@testing-library/react'
import { useDecision } from '@/hooks/useDecision'

// Mock external AI providers and streamText
vi.mock('ai', () => ({
  streamText: vi.fn().mockImplementation(async ({ model, messages, system }) => ({
    toTextStreamResponse: () => new Response(JSON.stringify({ model, messages, system }), {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })
  }))
}))

vi.mock('@ai-sdk/openai', () => ({
  createOpenAI: vi.fn(() => vi.fn((model: string) => `mock-openai-${model}`))
}))

vi.mock('@ai-sdk/anthropic', () => ({
  createAnthropic: vi.fn(() => vi.fn((model: string) => `mock-anthropic-${model}`))
}))

describe('Regression Tests: ASTRA AI Chat & Goal Improvement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // -------------------------------------------------------------
  // Test 1: Chat API receiving and incorporating decisionContext
  // -------------------------------------------------------------
  it('incorporates validated decisionContext into the system prompt for the chat model', async () => {
    const decisionContext = JSON.stringify({
      title: 'Cloud Infrastructure Migration',
      goal: 'Migrate core API to AWS ECS for 99.99% availability',
      context: 'Current single-server VPS is experiencing memory spikes',
      constraints: 'Monthly budget capped at $500; zero downtime deployment required',
      options: ['Option A: AWS ECS Fargate', 'Option B: Self-managed Kubernetes'],
      evidence: ['Fargate reduces devops overhead by 80%'],
      notes: 'Deployment target is Q3'
    })

    const req = new Request('http://localhost:3000/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ai-key': 'sk-mock-valid-key-1234567890'
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'What are my constraints?' }],
        provider: 'openai',
        decisionContext
      })
    })

    const res = await POST(req)
    expect(res.status).toBe(200)

    expect(streamText).toHaveBeenCalledTimes(1)
    const streamArgs = vi.mocked(streamText).mock.calls[0][0]

    // Verify system context includes boundary marker and all key decision fields
    expect(streamArgs.system).toContain('=== CURRENT DECISION CONTEXT (REFERENCE DATA ONLY) ===')
    expect(streamArgs.system).toContain('Title: Cloud Infrastructure Migration')
    expect(streamArgs.system).toContain('Goal:\nMigrate core API to AWS ECS for 99.99% availability')
    expect(streamArgs.system).toContain('Context:\nCurrent single-server VPS is experiencing memory spikes')
    expect(streamArgs.system).toContain('Constraints:\nMonthly budget capped at $500; zero downtime deployment required')
    expect(streamArgs.system).toContain('Option A: AWS ECS Fargate')
    expect(streamArgs.system).toContain('Option B: Self-managed Kubernetes')
    expect(streamArgs.system).toContain('Evidence:\n- Fargate reduces devops overhead by 80%')
    expect(streamArgs.system).toContain('Notes:\nDeployment target is Q3')
    expect(streamArgs.system).toContain('=== END CURRENT DECISION CONTEXT ===')
  })

  // -------------------------------------------------------------
  // Test 2: Chat API working when decisionContext is absent
  // -------------------------------------------------------------
  it('operates normally with default system prompt when decisionContext is omitted', async () => {
    const req = new Request('http://localhost:3000/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ai-key': 'sk-mock-valid-key-1234567890'
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello Astra' }],
        provider: 'openai'
        // decisionContext omitted
      })
    })

    const res = await POST(req)
    expect(res.status).toBe(200)

    expect(streamText).toHaveBeenCalledTimes(1)
    const streamArgs = vi.mocked(streamText).mock.calls[0][0]

    expect(streamArgs.system).toBe('You are Astra, an elite executive decision-making partner.')
    expect(streamArgs.system).not.toContain('=== CURRENT DECISION CONTEXT')
  })

  it('rejects chat requests missing the x-ai-key header', async () => {
    const req = new Request('http://localhost:3000/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // x-ai-key missing
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        provider: 'openai'
      })
    })

    const res = await POST(req)
    expect(res.status).toBe(401)
    const json = await res.json()
    expect(json.error).toContain('Missing API Key')
  })

  // -------------------------------------------------------------
  // Test 3: formatDecisionContext helper resilience & prompt defense
  // -------------------------------------------------------------
  it('truncates excessively large context payloads to avoid context exhaustion', () => {
    const hugeContext = JSON.stringify({
      title: 'Massive Decision',
      goal: 'A'.repeat(20000)
    })

    const formatted = formatDecisionContext(hugeContext)
    expect(formatted.length).toBeLessThan(12000)
    expect(formatted).toContain('[TRUNCATED FOR LENGTH]')
  })

  it('safely handles non-JSON plain text context', () => {
    const plainText = 'Custom unstructured decision context notes.'
    const formatted = formatDecisionContext(plainText)
    expect(formatted).toContain('Custom unstructured decision context notes.')
    expect(formatted).toContain('=== CURRENT DECISION CONTEXT (REFERENCE DATA ONLY) ===')
  })

  // -------------------------------------------------------------
  // Test 4: Goal-improvement response matching the schema
  // -------------------------------------------------------------
  it('successfully validates and parses a valid goal-improvement response via GoalReviewSchema', () => {
    const validAIOutput = {
      score: 88,
      weaknesses: [
        'Missing quantifiable target date',
        'Does not define metric for system responsiveness'
      ],
      improvedVersion: 'Reduce average API p99 latency to under 150ms by end of Q3 through Redis caching.',
      metrics: {
        clarity: 9,
        measurability: 9,
        completeness: 8
      }
    }

    const result = GoalReviewSchema.safeParse(validAIOutput)
    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data.improvedVersion).toBe(validAIOutput.improvedVersion)
      expect(result.data.score).toBe(88)
      expect(result.data.metrics.clarity).toBe(9)
      expect(result.data.weaknesses.length).toBe(2)
    }
  })

  it('rejects an invalid goal review missing the canonical improvedVersion field', () => {
    const invalidAIOutput = {
      score: 50,
      weaknesses: ['Vague'],
      // improvedVersion is omitted!
      metrics: {
        clarity: 5,
        measurability: 5,
        completeness: 5
      }
    }

    const result = GoalReviewSchema.safeParse(invalidAIOutput)
    expect(result.success).toBe(false)
  })

  // -------------------------------------------------------------
  // Test 5 & 6: Accepting improved goal updates active decision & autosave persists it
  // -------------------------------------------------------------
  it('updates the active decision goal and persists via debounced autosave upon accept', async () => {
    vi.useFakeTimers()

    // Seed initial decision
    const initialDecision = createDefaultDecision()
    initialDecision.goal = 'Draft unpolished goal'
    DecisionRepository.save(initialDecision)
    DecisionRepository.setActiveId(initialDecision.id)

    // Render hook
    const { result } = renderHook(() => useDecision())

    expect(result.current.decision?.goal).toBe('Draft unpolished goal')

    // Simulate user accepting an improved goal (as emitted from GoalReview.improvedVersion)
    const acceptedGoal = 'Rewrite goal: Achieve 99.99% uptime with zero-loss failover by Q4.'
    act(() => {
      result.current.updateField('goal', acceptedGoal)
    })

    // State reflects updated goal immediately in memory
    expect(result.current.decision?.goal).toBe(acceptedGoal)

    // Advance timers past the 500ms debounce threshold
    act(() => {
      vi.advanceTimersByTime(550)
    })

    expect(result.current.saveStatus).toBe('saved')

    // Verify persistence in DecisionRepository
    const persisted = DecisionRepository.getById(initialDecision.id)
    expect(persisted).not.toBeNull()
    expect(persisted?.goal).toBe(acceptedGoal)

    vi.useRealTimers()
  })
})
