import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { expect } from "@playwright/test";
import { SearchBar } from "../components/searchBar";
import { RelatedSearchesWidget } from "../components/relatedSearchesWidget";
import { CookieNotice } from "../components/cookieNotice";

let browser: Browser;
let page: Page;
let searchBar: SearchBar;
let relatedSearchesWidget: RelatedSearchesWidget;
let cookieNotice: CookieNotice;

Given("I am on the Ecosia home page", { timeout: 30000 }, async function () { 
  browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  page = await context.newPage();

  const baseURL = "https://www.ecosia.org";
  
  searchBar = new SearchBar(page);
  relatedSearchesWidget = new RelatedSearchesWidget(page);
  cookieNotice = new CookieNotice(page);

  await page.goto(baseURL);
  await cookieNotice.acceptCookies();
});

When('I search for {string}', { timeout: 10000 }, async function (searchTerm: string) {
  await searchBar.searchFor(searchTerm);
});

Then('I should see the {string} widget', async function (widgetName: string) {
  await relatedSearchesWidget.verifyRelevantSuggestions();
});

Then('it shows relevant suggestions related to {string}', async function (searchTerm: string) {
  await relatedSearchesWidget.verifyRelevantSuggestions();
  await browser.close();
});