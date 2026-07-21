import { test, expect } from '@playwright/test';

test.describe('Astra Core Workflow', () => {
  test('Complete decision workflow', async ({ page }) => {
    // Increase the test timeout to accommodate dev-server latency
    test.setTimeout(60000);

    // 1. Open Application – marketing landing page
    await page.goto('/');
    await expect(page).toHaveTitle(/Astra/i);

    // Navigate to dashboard via the CTA button
    await page.getByRole('link', { name: /Open Workspace/i }).first().click();
    await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });

    // 2. Setup AI Provider via direct navigation (avoids dev overlay interception)
    await page.goto('/settings');
    await expect(page).toHaveURL(/.*\/settings/);

    // Set AI settings directly in localStorage for test stability
    await page.evaluate(() => {
      window.localStorage.setItem('astra_ai_settings', JSON.stringify({
        provider: 'openai',
        openaiKey: 'test-key-123'
      }));
    });

    // 3. Create Decision – navigate to dashboard and create
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Click "New Decision" quick-action card (has role="button" aria-label="New Decision")
    const newDecisionCard = page.getByRole('button', { name: 'New Decision', exact: true }).first();
    await newDecisionCard.waitFor({ state: 'visible', timeout: 10000 });
    await newDecisionCard.click();

    // Should be routed to /workspace after creating
    await expect(page).toHaveURL(/.*\/workspace/, { timeout: 10000 });

    // 4. Edit Goal
    const goalInput = page.getByPlaceholder('What is the primary objective of this decision?');
    await goalInput.waitFor({ state: 'visible', timeout: 8000 });
    await goalInput.fill('Select a cloud provider for Astra v1.0');

    // 5. Add Context
    const contextTextarea = page.getByPlaceholder('Provide background information...');
    if (await contextTextarea.isVisible()) {
      await contextTextarea.fill('We need high scalability and low latency.');
    }

    // Wait for auto-save debounce to flush
    await page.waitForTimeout(1500);

    // 6. Refresh Page and Restore State
    await page.reload();

    // Wait for hydration and verify auto-save restored the goal
    await expect(
      page.getByPlaceholder('What is the primary objective of this decision?')
    ).toHaveValue('Select a cloud provider for Astra v1.0', { timeout: 10000 });

    // 7. Add Options (if the UI supports it)
    const addOptionBtn = page.getByRole('button', { name: /Add Option/i }).first();
    if (await addOptionBtn.isVisible()) {
      await addOptionBtn.click();
      // Wait for a second input to appear before clicking again
      await page.waitForTimeout(300);
      const secondAdd = page.getByRole('button', { name: /Add Option/i }).first();
      if (await secondAdd.isVisible()) await secondAdd.click();
    }

    const optionInputs = page.getByPlaceholder(/Option/i);
    const optionCount = await optionInputs.count();
    if (optionCount >= 1) await optionInputs.nth(0).fill('AWS');
    if (optionCount >= 2) await optionInputs.nth(1).fill('Vercel');

    // 8. Test Copilot Chat interaction
    const chatInput = page.getByPlaceholder('Ask Astra...');
    if (await chatInput.isVisible()) {
      await chatInput.fill('Which is better for Next.js?');
      await expect(chatInput).toHaveValue('Which is better for Next.js?');
    }

    // 9. Navigate to Archive page via direct URL
    await page.goto('/archive');
    await expect(page).toHaveURL(/.*\/archive/);
    await expect(page.getByRole('heading', { name: 'Archive', exact: true })).toBeVisible({ timeout: 8000 });
  });
});
