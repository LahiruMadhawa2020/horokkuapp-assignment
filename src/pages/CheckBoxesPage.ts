import { Locator, Page, expect } from '@playwright/test';

export class CheckBoxesPage {
    readonly page: Page;
    readonly firstCheckbox: Locator;
    readonly secondCheckbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstCheckbox = page.getByRole('checkbox').first();
        this.secondCheckbox = page.getByRole('checkbox').nth(1);
    }

    async waitForFirstCheckbox() {
        await this.firstCheckbox.waitFor({ state: 'visible' });
    }

    async checkFirstCheckbox() {
        await this.firstCheckbox.check();
    }

    async assertFirstCheckboxChecked() {
        await this.firstCheckbox.waitFor({ state: 'visible' });
        await expect(this.firstCheckbox).toBeChecked();
    }

    async waitForSecondCheckbox() {
        await this.secondCheckbox.waitFor({ state: 'visible' });
    }  

    async uncheckSecondCheckbox() {
        await this.secondCheckbox.uncheck();
    }

    async assertSecondCheckboxUnchecked() {
        await this.secondCheckbox.waitFor({ state: 'visible' });
        await expect(this.secondCheckbox).not.toBeChecked();
    }
}
