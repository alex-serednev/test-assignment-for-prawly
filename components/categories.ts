import { Page, Locator } from '@playwright/test';

export class Categories {
  private page: Page;
  private newsTab: Locator;
  private videosTab: Locator;
  private allTab: Locator;
  private newsSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allTab = page.getByTestId('search-navigation-web');
    this.newsTab = page.getByTestId('search-navigation-news');
    this.videosTab = page.getByTestId('search-navigation-videos');
    this.newsSection = page.getByTestId('layout-content');
  }

  async openNewsSection(): Promise<void> {
    await this.newsTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openVideosSection(): Promise<void> {
    await this.videosTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openAllSection(): Promise<void> {
    await this.allTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  getNewsSection(): Locator {
    return this.newsSection;
  }

/* IMPORTANT NOTE: since aria attribute is not used on this web site,
this code won't work, but I will leave it here for reference.
I never faced such situation before, so I can't propose a quick fix, I am sorry*/

async isNewsTabActive(): Promise<boolean> {
    return await this.newsTab.getAttribute('aria-selected') === 'true';
  }

  async isAllTabActive(): Promise<boolean> {
    return await this.allTab.getAttribute('aria-selected') === 'true';
  }

  async getAllAvailableTabs(): Promise<string[]> {
    const tabs = this.page.locator('[role="tab"]');
    const count = await tabs.count();
    const tabNames: string[] = [];
    
        for (let i = 0; i < count; i++) {
        const text = await tabs.nth(i).textContent();
        if (text) tabNames.push(text);
        }
    
    return tabNames;
  }
}