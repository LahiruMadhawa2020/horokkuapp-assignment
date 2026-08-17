import { expect, Locator, Page } from "@playwright/test";

export class DropDownPage {
    readonly page:Page;
    readonly titleDropDown: Locator;
    readonly dropDown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleDropDown = this.page.getByRole('heading', { name: 'Dropdown List' });
        this.dropDown = this.page.locator('#dropdown');
    }

    async waitForDropDownTitle() {        
        await this.titleDropDown.waitFor({ state: "visible" });
    }

    async assertDroDownTitleIsVisible() {
        await expect(this.titleDropDown).toBeVisible();
    }
    
    async waitForDropDown() {
        await this.dropDown.waitFor({state: "visible"});
    }

    async assertDropDownIsVisible() {
        await expect(this.dropDown).toBeVisible();
    }

    async selectDropDownValue() {
        await this.dropDown.selectOption('1');
        await expect(this.dropDown).toBeVisible();        
    }

    async assertSelectedDropDownValue() {
        await expect(this.dropDown).toHaveValue('1');
    }
}