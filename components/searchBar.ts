import { Page, Locator } from '@playwright/test';

export class SearchBar {

    private page: Page;
    private searchInput: Locator;
    private searchButton: Locator;

    constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('combobox', { name: /search the web/i });
        this.searchButton = page.getByTestId('searchf-form__submit-icon');
    }

    async searchFor(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
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
