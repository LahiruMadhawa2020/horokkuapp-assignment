import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly checkboxesLink: Locator;
  readonly homePageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkboxesLink = page.getByRole('link', { name: 'Checkboxes' });
    this.homePageTitle = page.getByRole('heading', { name: 'Welcome to the-internet' });
  }

  async navigateToHomePage(url: string) {
    await this.page.goto(url, { waitUntil: 'load' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async assertHomePageTitleIsVisible() {
    await this.homePageTitle.waitFor({ state: 'visible' });
    await expect.soft(this.homePageTitle).toBeVisible();
  }

  async waitForCheckboxesLink() {
    await this.checkboxesLink.waitFor({ state: 'visible' });
  }

  async clickCheckboxesLink() {
    await this.checkboxesLink.click();
  }
}