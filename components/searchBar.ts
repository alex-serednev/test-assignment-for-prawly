import { Page, Locator } from '@playwright/test';

export class SearchBar {

    private page: Page;
    private searchInput: Locator;

    constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('combobox', { name: /search the web/i });
    }

    async searchFor(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForTimeout(3000);
    }

    async clearSearch(): Promise<void> {
    await this.searchInput.clear();
    }

    async getSearchValue(): Promise<string> {
    return await this.searchInput.inputValue();
    }

    async isSearchInputVisible(): Promise<boolean> {
    return await this.searchInput.isVisible();
    }
}
