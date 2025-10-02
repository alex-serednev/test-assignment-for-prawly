import { Page, Locator } from '@playwright/test';

export class CookieNotice {
    private page: Page;
    private acceptButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptButton = page.getByRole('button', { name: /accept all/i });
    }

    async acceptCookies(): Promise<void> {
        try {
            await this.acceptButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.acceptButton.click();
        } catch (error) {
            // there might be no cookie notice
        }
    }
}
