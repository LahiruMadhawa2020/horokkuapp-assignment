import { BrowserContext, chromium, Page, test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { CheckBoxesPage } from '../src/pages/CheckBoxesPage';
import { DropDownPage } from '../src/pages/DropDownPage';
import { EntryAdPage } from '../src/pages/EntryAdPage';

const logger = require("../src/utils/logger");

test.describe("Heroku App Functional Component Testing @smoke", () => {
  let context: BrowserContext;
  let page: Page;

  let homePage: HomePage;
  let checkboxesPage: CheckBoxesPage;
  let dropDownPage: DropDownPage;
  let entryAdPage: EntryAdPage;

  test.beforeAll(async ({ browser }) => {
    browser = await chromium.launch();
    context = await browser.newContext({
        recordVideo: {
            dir: `./test-results/videos/`,
            size: { width: 1418, height: 789 }
        }
    });
    await context.clearCookies();
    page = await context.newPage();

    homePage = new HomePage(page);
    checkboxesPage = new CheckBoxesPage(page);
    dropDownPage = new DropDownPage(page);
    entryAdPage = new EntryAdPage(page);
  });

  test.beforeEach(async () => {
    // test.step('Navigate to the home page', async () => {});
    await homePage.navigateToHomePage('/');
    await homePage.assertHomePageTitleIsVisible();    
  });

  test('verify the checkboxes functionality', async () => {   
    // test.step('Navigate to the checkboxes page', async () => {});
    await homePage.waitForCheckBoxesLink();
    await homePage.clickCheckBoxesLink();
    
    // test.step('Verify the first checkboxes functionality', async () => {});
    await checkboxesPage.waitForFirstCheckbox();
    await checkboxesPage.checkFirstCheckbox();
    await checkboxesPage.assertFirstCheckboxChecked();
    
    // test.step('Verify the second checkboxes functionality', async () => {});
    await checkboxesPage.waitForSecondCheckbox();
    await checkboxesPage.uncheckSecondCheckbox();
    await checkboxesPage.assertSecondCheckboxUnchecked();

    // test.step('Navigate back to the home page', async () => {});
    await checkboxesPage.assertSecondCheckboxUnchecked();
  });

  test('verify dropdown functionality', async () => {
    await homePage.waitForDropDownLink();
    await homePage.clickDropDownLink();

    await dropDownPage.waitForDropDownTitle();
    await dropDownPage.assertDroDownTitleIsVisible();
    
    await dropDownPage.waitForDropDown();
    await dropDownPage.assertDropDownIsVisible();  
    
    await dropDownPage.selectDropDownValue();
    await dropDownPage.assertSelectedDropDownValue();      
  });

  test('verify entry Ad functionality', async () => {
    await homePage.waitForEntryAdLink();
    await homePage.clickEntryAdLink();

    await entryAdPage.waitForEntryAdPopup();
    await entryAdPage.assertEntryAdPopIsVisible();
    await entryAdPage.clickCloseButtonInEntryAdPopup();
    
    await entryAdPage.waitForEntryAdPageTitle();
    await entryAdPage.assertEntryAdPageTitleIsVisible();
  })

  test.afterEach(async ({ browser }, testInfo) => {     
   await homePage.navigateToHomePage('/');   
   // Capture the test execution results status after every test
   if (testInfo.status !== testInfo.expectedStatus)
    logger.info(`${testInfo.title} did not run as expected!`);
  })
    
  test.afterAll(async ({ browser }) => {
      await page.close();          
      await context.close();
      await browser.close();        
  })
});


