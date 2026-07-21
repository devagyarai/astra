import { describe, it, expect, beforeEach } from 'vitest'
import { DecisionRepository, createDefaultDecision } from '@/lib/repositories/decision-repository'

describe('Workspace Manager & Repository', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('creates a default decision with correct schema', () => {
    const decision = createDefaultDecision()
    expect(decision.id).toBeDefined()
    expect(decision.title).toBe('Untitled Decision')
    expect(decision.goal).toBe('')
    expect(decision.options).toEqual([])
  })

  it('saves and retrieves a decision', () => {
    const decision = createDefaultDecision()
    decision.title = 'Test Decision'
    
    DecisionRepository.save(decision)
    const retrieved = DecisionRepository.getById(decision.id)
    
    expect(retrieved).toEqual(decision)
  })

  it('gets all decisions', () => {
    const d1 = createDefaultDecision()
    const d2 = createDefaultDecision()
    
    DecisionRepository.save(d1)
    DecisionRepository.save(d2)
    
    const all = DecisionRepository.getAll()
    expect(all.length).toBe(2)
    expect(all.map(d => d.id)).toContain(d1.id)
    expect(all.map(d => d.id)).toContain(d2.id)
  })

  it('deletes a decision', () => {
    const d = createDefaultDecision()
    DecisionRepository.save(d)
    DecisionRepository.delete(d.id)
    
    const retrieved = DecisionRepository.getById(d.id)
    expect(retrieved).toBeNull()
  })

  it('sets and gets active decision id (switching decisions)', () => {
    DecisionRepository.setActiveId('test-id-123')
    expect(DecisionRepository.getActiveId()).toBe('test-id-123')
  })

  it('migrates old single-decision workspace to new format', () => {
    const oldFormat = createDefaultDecision()
    oldFormat.title = "Old Legacy Format"
    window.localStorage.setItem('astra_decision_workspace', JSON.stringify(oldFormat))

    // getAll should auto-migrate
    const all = DecisionRepository.getAll()
    expect(all.length).toBe(1)
    expect(all[0].title).toBe("Old Legacy Format")

    // The old key should be cleared
    expect(window.localStorage.getItem('astra_decision_workspace')).toBeNull()

    // It should be saved in the new format
    const newFormat = window.localStorage.getItem('astra_decisions')
    expect(newFormat).toBeDefined()
    expect(JSON.parse(newFormat!)[0].title).toBe("Old Legacy Format")

    // It should be set as active
    expect(DecisionRepository.getActiveId()).toBe(oldFormat.id)
  })

  it('duplicates a decision', () => {
    const original = createDefaultDecision()
    original.title = "Original Title"
    DecisionRepository.save(original)

    const duplicate = DecisionRepository.duplicate(original.id)
    expect(duplicate).not.toBeNull()
    expect(duplicate!.id).not.toBe(original.id)
    expect(duplicate!.title).toBe("Original Title (Copy)")

    const all = DecisionRepository.getAll()
    expect(all.length).toBe(2)
  })
})
