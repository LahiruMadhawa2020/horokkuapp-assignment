import { expect, Locator, Page } from "@playwright/test";

export class AddOrRemoveElementsPage {
    readonly page: Page;
    readonly titleAddORRemoveElements: Locator;
    readonly btnAddElement: Locator;
    readonly btnDeleteElement: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.titleAddORRemoveElements = page.getByRole('heading', { name: 'Add/Remove Elements' });
        this.btnAddElement = page.getByRole('button', { name: 'Add Element' });    
        this.btnDeleteElement = page.getByRole('button', { name: 'Delete' });    
    }

    async waitForAddOrRemoveElementsTitle() {
        await this.titleAddORRemoveElements.waitFor({ state: "visible" });
    }

    async assertAddOrRemoveElementsTitleIsVisible() {
        await expect(this.titleAddORRemoveElements).toBeVisible();
    }

    async assertInitialButtonVisibility() {
        await expect(this.btnAddElement).toBeVisible();
        await expect(this.btnDeleteElement).not.toBeVisible();
    }

    async clickAddElementsButton() {
        await this.btnAddElement.waitFor({ state: "visible" });
        await this.btnAddElement.click();
    }

    async assertDeleteButtonIsVisible() {
        await this.btnDeleteElement.waitFor({ state: "visible" });
        await expect(this.btnDeleteElement).toBeVisible();
    }

    async clickDeleteButton() {
        await this.btnDeleteElement.click();
    }

    async assertDeleteButtonIsNotVisible() {
        await this.btnDeleteElement.waitFor({ state: "hidden" });
        await expect(this.btnDeleteElement).not.toBeVisible();
        await expect(this.btnAddElement).toBeVisible();
    }
}