import { expect, Locator, Page } from "@playwright/test";

export class EntryAdPage {
    readonly page: Page;
    readonly btnClose: Locator;
    readonly titleEntryAdPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnClose = this.page.getByText('Close', { exact: true });
        this.titleEntryAdPage = this.page.getByRole('heading', { name: 'Entry Ad' });
    }

    async waitForEntryAdPopup() {
        await this.btnClose.waitFor({ state: "visible" });
    }

    async assertEntryAdPopIsVisible() {
        await expect(this.btnClose).toBeVisible();
    }

    async clickCloseButtonInEntryAdPopup() {
        await this.btnClose.click();
    }

    async waitForEntryAdPageTitle() {
        await this.titleEntryAdPage.waitFor({ state: "visible" });        
    }

    async assertEntryAdPageTitleIsVisible() {
        await expect(this.titleEntryAdPage).toBeVisible();
    }
}
