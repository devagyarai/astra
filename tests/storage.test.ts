import { describe, it, expect, beforeEach } from 'vitest'
import { storage, createDefaultDecision } from '@/lib/storage'

describe('Storage Service', () => {
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
    
    storage.saveDecision(decision)
    const retrieved = storage.getDecision(decision.id)
    
    expect(retrieved).toEqual(decision)
  })

  it('gets all decisions', () => {
    const d1 = createDefaultDecision()
    const d2 = createDefaultDecision()
    
    storage.saveDecision(d1)
    storage.saveDecision(d2)
    
    const all = storage.getAllDecisions()
    expect(all.length).toBe(2)
    expect(all.map(d => d.id)).toContain(d1.id)
    expect(all.map(d => d.id)).toContain(d2.id)
  })

  it('deletes a decision', () => {
    const d = createDefaultDecision()
    storage.saveDecision(d)
    storage.deleteDecision(d.id)
    
    const retrieved = storage.getDecision(d.id)
    expect(retrieved).toBeNull()
  })

  it('sets and gets active decision id', () => {
    storage.setActiveDecisionId('test-id-123')
    expect(storage.getActiveDecisionId()).toBe('test-id-123')
  })
})
