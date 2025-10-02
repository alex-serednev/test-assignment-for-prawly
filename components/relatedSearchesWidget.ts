import { Page, Locator, expect } from '@playwright/test';

export class RelatedSearchesWidget {
  private page: Page;
  private widget: Locator;
  private suggestions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.widget = page.getByTestId('sidebar');
    this.suggestions = page.locator('[data-test-id^="related-queries-link-"]');
  }

  async verifyRelevantSuggestions(): Promise<void> {
    await expect(this.widget).toBeVisible();
    
    const count = await this.suggestions.count();
    expect(count).toBeGreaterThan(0);
    
    for (let i = 0; i < count; i++) {
      const text = await this.suggestions.nth(i).textContent();
      expect(text?.toLowerCase()).toContain("semrush ai");
    }
  }
}