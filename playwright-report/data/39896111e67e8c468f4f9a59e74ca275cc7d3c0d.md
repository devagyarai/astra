# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: core-workflow.spec.ts >> Astra Core Workflow >> Complete decision workflow
- Location: tests\e2e\core-workflow.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder(/Option/i).nth(1)

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - link "ASTRA" [ref=e6] [cursor=pointer]:
            - /url: /
            - generic [ref=e7]: ASTRA
          - navigation [ref=e8]:
            - link "Documentation" [ref=e9] [cursor=pointer]:
              - /url: /documentation
            - link "Features" [ref=e10] [cursor=pointer]:
              - /url: /features
            - link "Pricing" [ref=e11] [cursor=pointer]:
              - /url: /pricing
        - button "Toggle theme" [ref=e13]:
          - img
          - generic [ref=e14]: Toggle theme
    - main [ref=e15]:
      - generic [ref=e17]:
        - generic [ref=e20]:
          - link "ASTRA" [ref=e22] [cursor=pointer]:
            - /url: /dashboard
            - img [ref=e24]
            - generic [ref=e26]: ASTRA
          - generic [ref=e27]:
            - button "New Decision" [ref=e29]:
              - img
              - text: New Decision
            - generic [ref=e30]:
              - generic [ref=e31]: Menu
              - list [ref=e33]:
                - listitem [ref=e34]:
                  - link "Dashboard" [ref=e35] [cursor=pointer]:
                    - /url: /dashboard
                    - img [ref=e36]
                    - generic [ref=e41]: Dashboard
                - listitem [ref=e42]:
                  - link "Decisions" [ref=e43] [cursor=pointer]:
                    - /url: /workspace
                    - img [ref=e44]
                    - generic [ref=e48]: Decisions
                - listitem [ref=e49]:
                  - link "Timeline" [ref=e50] [cursor=pointer]:
                    - /url: /timeline
                    - img [ref=e51]
                    - generic [ref=e54]: Timeline
                - listitem [ref=e55]:
                  - link "Archive" [ref=e56] [cursor=pointer]:
                    - /url: /archive
                    - img [ref=e57]
                    - generic [ref=e60]: Archive
            - list [ref=e63]:
              - listitem [ref=e64]:
                - link "Settings" [ref=e65] [cursor=pointer]:
                  - /url: /settings
                  - img [ref=e66]
                  - generic [ref=e69]: Settings
        - main [ref=e70]:
          - generic [ref=e71]:
            - generic [ref=e72]:
              - textbox "Untitled Decision" [ref=e75]
              - generic [ref=e76]:
                - generic [ref=e78]:
                  - 'button "Step: Goal (Completed)" [ref=e79]':
                    - generic [ref=e82]: Goal
                  - 'button "Step: Context (Completed)" [ref=e83]':
                    - img [ref=e85]
                    - generic [ref=e87]: Context
                  - 'button "Step: Constraints" [ref=e88]':
                    - generic [ref=e90]: Constraints
                  - 'button "Step: Options (Completed)" [ref=e91]':
                    - img [ref=e93]
                    - generic [ref=e95]: Options
                  - 'button "Step: Evidence" [ref=e96]':
                    - generic [ref=e98]: Evidence
                  - 'button "Step: Review (Completed)" [ref=e99]':
                    - img [ref=e101]
                    - generic [ref=e103]: Review
                - generic [ref=e105]: Saved 20s ago
            - generic [ref=e107]:
              - generic [ref=e109]:
                - generic [ref=e111]:
                  - generic [ref=e112]:
                    - generic [ref=e113]:
                      - img [ref=e114]
                      - text: Goal
                    - button "Improve" [ref=e118]:
                      - img
                      - text: Improve
                  - textbox "What is the primary objective of this decision?" [ref=e120]: Select a cloud provider for Astra v1.0
                - generic [ref=e122]:
                  - generic [ref=e124]:
                    - img [ref=e125]
                    - text: Context
                  - textbox "Provide background information..." [ref=e129]: We need high scalability and low latency.
                - generic [ref=e131]:
                  - generic [ref=e133]:
                    - img [ref=e134]
                    - text: Constraints
                  - textbox "Budget, timeline, technical limits..." [ref=e137]
                - generic [ref=e139]:
                  - generic [ref=e140]:
                    - generic [ref=e141]:
                      - img [ref=e142]
                      - text: Options
                    - button "Add Option" [ref=e146]:
                      - img
                      - text: Add Option
                  - generic [ref=e149]:
                    - textbox "Option 1" [active] [ref=e151]: AWS
                    - button [ref=e152]:
                      - img
                - generic [ref=e154]:
                  - generic [ref=e155]:
                    - generic [ref=e156]:
                      - img [ref=e157]
                      - text: Evidence
                    - button "Add Evidence" [ref=e161]:
                      - img
                      - text: Add Evidence
                  - paragraph [ref=e164]: No evidence added yet. (Optional)
                - generic [ref=e166]:
                  - generic [ref=e168]:
                    - img [ref=e169]
                    - text: Notes
                  - textbox "Additional thoughts or meeting notes..." [ref=e172]
              - complementary [ref=e174]:
                - generic [ref=e175]:
                  - generic [ref=e176]:
                    - img [ref=e177]
                    - heading "Astra Copilot" [level=3] [ref=e180]
                  - generic [ref=e181]:
                    - button "Chat" [ref=e182]
                    - button "Actions" [ref=e183]
                    - button "Insights" [ref=e184]
                - generic [ref=e186]:
                  - button "Clear" [ref=e188]:
                    - img
                    - text: Clear
                  - generic [ref=e190]:
                    - img [ref=e192]
                    - heading "Copilot is Ready" [level=4] [ref=e194]
                    - paragraph [ref=e195]: Ask a question or select an action to start improving your decision.
                  - generic [ref=e197]:
                    - textbox "Ask Copilot..." [ref=e198]
                    - generic [ref=e199]:
                      - button [disabled]:
                        - img
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e205] [cursor=pointer]:
    - img [ref=e206]
  - alert [ref=e209]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Astra Core Workflow', () => {
  4  |   test('Complete decision workflow', async ({ page }) => {
  5  |     // 1. Open Application
  6  |     await page.goto('/');
  7  |     await expect(page).toHaveTitle(/Astra/i);
  8  | 
  9  |     // Navigate to dashboard
  10 |     await page.getByRole('link', { name: /Open Workspace/i }).first().click();
  11 |     await expect(page).toHaveURL(/.*\/dashboard/);
  12 | 
  13 |     // 2. Setup AI Provider
  14 |     await page.getByRole('link', { name: 'Settings' }).click();
  15 |     await expect(page).toHaveURL(/.*\/settings/);
  16 |     
  17 |     // Select OpenAI provider (usually default, but let's click if needed)
  18 |     // Here we'll just evaluate setting the localStorage directly for stability in tests
  19 |     await page.evaluate(() => {
  20 |       window.localStorage.setItem('astra_ai_settings', JSON.stringify({
  21 |         provider: 'openai',
  22 |         openaiKey: 'test-key-123'
  23 |       }));
  24 |     });
  25 | 
  26 |     // 3. Create Decision
  27 |     await page.getByRole('link', { name: 'Dashboard' }).click();
  28 |     await page.getByRole('button', { name: 'New Decision', exact: true }).first().click();
  29 |     
  30 |     // We should be routed to /workspace
  31 |     await expect(page).toHaveURL(/.*\/workspace/);
  32 | 
  33 |     // 4. Edit Goal
  34 |     const goalInput = page.getByPlaceholder('What is the primary objective of this decision?');
  35 |     await goalInput.fill('Select a cloud provider for Astra v1.0');
  36 | 
  37 |     // Wait for auto-save debounce (1000ms typically, let's wait 1.5s)
  38 |     // 5. Add Context
  39 |     const contextTextarea = page.getByPlaceholder('Provide background information...');
  40 |     await contextTextarea.fill('We need high scalability and low latency.');
  41 |     await page.waitForTimeout(1500);
  42 | 
  43 |     // 6. Refresh Page and Restore State
  44 |     await page.reload();
  45 |     
  46 |     // Wait for hydration
  47 |     await expect(page.getByPlaceholder('What is the primary objective of this decision?')).toHaveValue('Select a cloud provider for Astra v1.0');
  48 | 
  49 |     // 7. Add Options
  50 |     const addOptionBtn = page.getByRole('button', { name: /Add Option/i });
  51 |     if (await addOptionBtn.isVisible()) {
  52 |       await addOptionBtn.click();
  53 |     }
  54 |     
  55 |     // It's possible the inputs exist by default
  56 |     const optionInputs = page.getByPlaceholder(/Option/i);
  57 |     await optionInputs.nth(0).fill('AWS');
> 58 |     await optionInputs.nth(1).fill('Vercel');
     |                               ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  59 | 
  60 |     // 8. Test Copilot Chat interaction
  61 |     const chatInput = page.getByPlaceholder('Ask Astra...');
  62 |     if (await chatInput.isVisible()) {
  63 |        await chatInput.fill('Which is better for Next.js?');
  64 |        // We won't hit Enter to avoid actually calling the mocked/real API, 
  65 |        // but we verify the UI exists.
  66 |        await expect(chatInput).toHaveValue('Which is better for Next.js?');
  67 |     }
  68 | 
  69 |     // 9. Archive Decision
  70 |     await page.getByRole('link', { name: 'Archive' }).click();
  71 |     await expect(page).toHaveURL(/.*\/archive/);
  72 |     
  73 |     // We should see our decision here since active ones often show up, or we might need to click an Archive button in the UI
  74 |     // In our implementation, we'd look for an archive button on the card.
  75 |     // For now, let's just make sure the page loads
  76 |     await expect(page.getByText('Archive', { exact: true })).toBeVisible();
  77 |   });
  78 | });
  79 | 
```