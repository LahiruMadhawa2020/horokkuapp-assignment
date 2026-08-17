import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly linkCheckBoxes: Locator;
  readonly titleHomePage: Locator;
  readonly linkDropDown: Locator;
  readonly linkEntryAd: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkCheckBoxes = page.getByRole('link', { name: 'Checkboxes' });
    this.titleHomePage = page.getByRole('heading', { name: 'Welcome to the-internet' });
    this.linkDropDown = page.getByRole('link', { name: 'Dropdown' });
    this.linkEntryAd = page.getByRole('link', { name: 'Entry Ad' });
  }

  async navigateToHomePage(url: string) {
    await this.page.goto(url, { waitUntil: 'load' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async assertHomePageTitleIsVisible() {
    await this.titleHomePage.waitFor({ state: 'visible' });
    await expect.soft(this.titleHomePage).toBeVisible();
  }

  async waitForCheckBoxesLink() {
    await this.linkCheckBoxes.waitFor({ state: 'visible' });
  }

  async clickCheckBoxesLink() {
    await this.linkCheckBoxes.click();
  }

  async waitForDropDownLink() {
    await this.linkDropDown.waitFor({ state: "visible" });
  }

  async clickDropDownLink() {
    await this.linkDropDown.click();
  }

  async waitForEntryAdLink() {
    await this.linkEntryAd.waitFor({ state: "visible" });
  }

  async clickEntryAdLink() {
    await this.linkEntryAd.click();
  }
}