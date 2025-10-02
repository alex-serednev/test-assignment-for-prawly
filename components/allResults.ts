import { Page, Locator } from '@playwright/test';

export class AllResults {
  private page: Page;
  private searchResults: Locator;
  private resultTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchResults = page.getByTestId('mainline');
    this.resultTitles = page.getByTestId('result-title');
  }

  async getSearchResults(): Promise<string[]> {
    const count = await this.searchResults.count();
    const results: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const text = await this.searchResults.nth(i).textContent();
      if (text) results.push(text);
    }   
    return results;
  }

  async clickSearchResult(index: number): Promise<void> {
    await this.searchResults.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }

  async getResultTitles(): Promise<string[]> {
    const count = await this.resultTitles.count();
    const titles: string[] = [];
    
    for (let i = 0; i < count; i++) {
       const text = await this.resultTitles.nth(i).textContent();
      if (text) titles.push(text);
    } 
    return titles;
  }

  async isSearchResultsVisible(): Promise<boolean> {
    return await this.searchResults.first().isVisible();
  }

  async getResultsCount(): Promise<number> {
    return await this.searchResults.count();
  }
}