import { Page, Locator, expect } from '@playwright/test';

export class NewsList {
  private page: Page;
  private newsResults: Locator;
  private regionSelector: Locator;
  private regionIndicator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newsResults = page.locator("//main[@data-test-id='layout-content']");
    this.regionSelector = page.getByTestId('filter-button').nth(0);
    this.regionIndicator = page.getByTestId('search-filters-current-region');
  }

  async selectSearchRegion(region: string): Promise<void> {
    await this.regionSelector.click();
    await this.page.getByRole('option', { name: region }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifySearchRegionIndicated(region: string): Promise<void> {
    await expect(this.regionIndicator).toBeVisible();
  }

  async verifyRelevantResultsCount(query: string, minCount: number): Promise<void> {
    await this.page.waitForSelector('[data-testid="news-result"]', { timeout: 10000 });
    
    const results = this.page.locator('[data-testid="news-result"]');
    const count = await results.count();
    
    expect(count).toBeGreaterThanOrEqual(minCount);
    
    for (let i = 0; i < Math.min(count, minCount); i++) {
      const resultText = await results.nth(i).textContent();
      expect(resultText?.toLowerCase()).toContain(query.toLowerCase());
    }
  }

  async getNewsResults(): Promise<string[]> {
    const count = await this.newsResults.count();
    const results: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const text = await this.newsResults.nth(i).textContent();
      if (text) results.push(text);
    }
    
    return results;
  }

  async clickNewsResult(index: number): Promise<void> {
    await this.newsResults.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }

  async isNewsResultsVisible(): Promise<boolean> {
    return await this.newsResults.first().isVisible();
  }
}
