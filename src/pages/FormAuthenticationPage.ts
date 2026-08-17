import { expect, Locator, Page } from "@playwright/test";

export class FormAuthenticationPage {
  readonly page: Page;
  readonly txtUsername: Locator;
  readonly txtPassword: Locator;
  readonly btnLogin: Locator;
  readonly titleLoginPage: Locator;
  readonly msgLoginSuccessful: Locator;
  readonly btnLogout: Locator;
  readonly msgLogoutSuccessful: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtUsername = page.getByRole('textbox', { name: 'Username' });
    this.txtPassword = page.getByRole('textbox', { name: 'Password' });
    this.btnLogin = page.getByRole('button', { name: ' Login' });
    this.titleLoginPage = page.getByRole('heading', { name: 'Login Page' });
    this.msgLoginSuccessful = page.getByText('You logged into a secure area');
    this.btnLogout = page.getByRole('link', { name: 'Logout' });
    this.msgLogoutSuccessful = page.getByText('You logged out of the secure');
  }

  async waitForUsernameInput() {
    await this.txtUsername.waitFor({ state: 'visible' });
  }

  async enterUsername(username: string) {
    await this.txtUsername.fill(username);
  }

  async waitForPasswordInput() {
    await this.txtPassword.waitFor({ state: 'visible' });
  }

  async enterPassword(password: string) {
    await this.txtPassword.fill(password);
  }

  async waitForLoginButton() {
    await this.btnLogin.waitFor({ state: 'visible' });
  }

  async clickLoginButton() {
    await this.btnLogin.click();
  }

  async waitForLoginSuccessMessage() {
    await this.msgLoginSuccessful.waitFor({ state: 'visible' });
  }

  async assertLoginSuccessMessage() {
    await expect(this.msgLoginSuccessful).toBeVisible();
  }

  async waitForLogoutButton() {
    await this.btnLogout.waitFor({ state: 'visible' });
  }

  async clickLogoutButton() {
    await this.btnLogout.click();
  }

  async waitForLogoutSuccessMessage() {
    await this.msgLogoutSuccessful.waitFor({ state: 'visible' });
  }

  async assertLogoutSuccessMessage() {
    await expect(this.msgLogoutSuccessful).toBeVisible();
  }

  async waitForLoginPageTitle() {
    await this.titleLoginPage.waitFor({ state: 'visible' });
  }

  async assertLoginPageTitleIsVisible() {
    await expect(this.titleLoginPage).toBeVisible();
  }
}
