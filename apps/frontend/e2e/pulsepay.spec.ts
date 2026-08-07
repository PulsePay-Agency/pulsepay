import { test, expect } from '@playwright/test';

test.describe('PulsePay E2E Flows', () => {
  
  test('Passkey Login - Worker Flow', async ({ page }) => {
    await page.goto('/');
    
    // Check elements
    await expect(page.getByText('PulsePay')).toBeVisible();
    
    // Simulate Worker Login
    await page.getByRole('button', { name: 'Sign in as Worker' }).click();
    
    // Should navigate to worker dashboard (since passkey is stubbed with fallback in UI)
    await expect(page).toHaveURL(/\/dashboard\/worker/);
    
    // Real-time balance should appear
    await expect(page.getByText('Worker Portal')).toBeVisible();
    await expect(page.getByText('Claimable Balance')).toBeVisible();
  });

  test('Passkey Login - Employer Flow', async ({ page }) => {
    await page.goto('/');
    
    // Simulate Employer Login
    await page.getByRole('button', { name: 'Sign in as Employer' }).click();
    
    // Should navigate to employer dashboard
    await expect(page).toHaveURL(/\/dashboard\/employer/);
    await expect(page.getByText('Treasury')).toBeVisible();
    await expect(page.getByText('Active Workers Streaming')).toBeVisible();
  });

  test('Worker Cash-out Flow', async ({ page }) => {
    await page.goto('/dashboard/worker');
    
    // Click Cash Out
    await page.getByRole('button', { name: 'Cash Out' }).click();
    await expect(page).toHaveURL(/\/cashout/);
    
    // Initial State
    await expect(page.getByText('Withdraw Funds')).toBeVisible();
    
    // Confirm Cashout (simulates SEP-24)
    await page.getByRole('button', { name: 'Confirm' }).click();
    
    // Processing State
    await expect(page.getByText('Connecting to Anchor...')).toBeVisible();
    
    // Success State (simulated after timeout)
    await expect(page.getByText('Withdrawal Complete')).toBeVisible({ timeout: 5000 });
  });
});
