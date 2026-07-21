import { describe, it, expect, beforeEach } from 'vitest'
import { getAISettings, saveAISettings } from '@/services/ai/providers'

describe('AI Provider Service', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns default settings when storage is empty', () => {
    const settings = getAISettings()
    expect(settings).toEqual({ provider: 'openai' })
  })

  it('saves and retrieves AI settings', () => {
    const customSettings = {
      provider: 'anthropic' as const,
      anthropicKey: 'sk-ant-123'
    }
    
    saveAISettings(customSettings)
    const retrieved = getAISettings()
    
    expect(retrieved).toEqual(customSettings)
  })

  it('handles invalid JSON gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    window.localStorage.setItem('astra_ai_settings', '{ invalid-json }')
    const settings = getAISettings()
    expect(settings).toEqual({ provider: 'openai' })
    consoleSpy.mockRestore()
  })
})
