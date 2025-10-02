import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { expect } from "@playwright/test";
import { SearchBar } from "../components/searchBar";
import { NewsList } from "../components/newsList";
import { Categories } from "../components/categories";
import { CookieNotice } from "../components/cookieNotice";

let browser: Browser;
let page: Page;
let searchBar: SearchBar;
let newsList: NewsList;
let categories: Categories;
let cookieNotice: CookieNotice;


Given("I am on the Ecosia home page", { timeout: 30000 }, async function () {
  browser = await chromium.launch({ 
    headless: false
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  page = await context.newPage();

  const baseURL = "https://www.ecosia.org";
  
  searchBar = new SearchBar(page);
  newsList = new NewsList(page);
  categories = new Categories(page);
  cookieNotice = new CookieNotice(page);

  await page.goto(baseURL);
  await cookieNotice.acceptCookies();
});

When('I search for {string}', async function (searchTerm: string) {
  await searchBar.searchFor(searchTerm);
});

When('I open the {string} section', async function (sectionName: string) {
  await categories.openNewsSection();
});

When('{string} as search region', async function (region: string) {
  await newsList.selectSearchRegion(region);
});

 Then('the {string} section is opened', async function (sectionName: string) {
  await expect(categories.getNewsSection()).toBeVisible();
});

Then("the search region is indicated", async function () {
  await newsList.verifySearchRegionIndicated("Germany");
});

Then('at least {int} relevant results containing words {string} are displayed', async function (minCount: number, searchTerm: string) {
  await newsList.verifyRelevantResultsCount(searchTerm, minCount);
  await browser.close();
});