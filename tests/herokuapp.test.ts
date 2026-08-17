import { BrowserContext, chromium, Page, test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { CheckBoxesPage } from '../src/pages/CheckBoxesPage';

const logger = require("../src/utils/logger");

test.describe("User Authentication test scenario @assystwebnew", () => {
  let context: BrowserContext;
  let page: Page;

  let homePage: HomePage;
  let checkboxesPage: CheckBoxesPage;

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
  });

  test.beforeEach(async ({ browser }) => {
    test.step('Navigate to the home page', async () => {
      await homePage.navigateToHomePage('https://the-internet.herokuapp.com/');
      await homePage.assertHomePageTitleIsVisible();
    });
  });

  test('verify the checkboxes functionality', async ({ browser }) => {   
    test.step('Navigate to the checkboxes page', async () => {
      await homePage.waitForCheckboxesLink();
      await homePage.clickCheckboxesLink();
    });

    test.step('Verify the first checkboxes functionality', async () => {
      await checkboxesPage.waitForFirstCheckbox();
      await checkboxesPage.checkFirstCheckbox();
      await checkboxesPage.assertFirstCheckboxChecked();
    });

    test.step('Verify the second checkboxes functionality', async () => {
      await checkboxesPage.waitForSecondCheckbox();
      await checkboxesPage.uncheckSecondCheckbox();
      await checkboxesPage.assertSecondCheckboxUnchecked();
    });

    test.step('Navigate back to the home page', async () => {
      await checkboxesPage.assertSecondCheckboxUnchecked();
      await homePage.navigateToHomePage('https://the-internet.herokuapp.com/');
    });
  });
  
  test.afterEach(async ({ browser }, testInfo) => {        
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


