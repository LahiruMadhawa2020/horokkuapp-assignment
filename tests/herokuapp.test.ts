import { BrowserContext, chromium, Page, test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { CheckBoxesPage } from '../src/pages/CheckBoxesPage';
import { DropDownPage } from '../src/pages/DropDownPage';
import { EntryAdPage } from '../src/pages/EntryAdPage';
import { AddOrRemoveElementsPage } from '../src/pages/AddOrRemoveElementsPage';
import { FormAuthenticationPage } from '../src/pages/FormAuthenticationPage';

const logger = require("../src/utils/logger");

test.describe("Heroku App Functional Component Testing @smoke", () => {
  let context: BrowserContext;
  let page: Page;

  let homePage: HomePage;
  let checkboxesPage: CheckBoxesPage;
  let dropDownPage: DropDownPage;
  let entryAdPage: EntryAdPage;
  let addOrRemoveElementsPage: AddOrRemoveElementsPage;
  let formAuthenticationPage: FormAuthenticationPage;

  test.beforeAll(async ({ browser }) => {    
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
    addOrRemoveElementsPage = new AddOrRemoveElementsPage(page);
    formAuthenticationPage = new FormAuthenticationPage(page);
  });

  test.beforeEach(async () => {
    // test.step('Navigate to the home page', async () => {});
    await homePage.navigateToHomePage('/');
    await homePage.assertHomePageTitleIsVisible();    
  });

  test('verify the checkboxes functionality @checkboxes', async () => {   
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

  test('verify dropdown functionality @dropdown', async () => {
    await homePage.waitForDropDownLink();
    await homePage.clickDropDownLink();

    await dropDownPage.waitForDropDownTitle();
    await dropDownPage.assertDroDownTitleIsVisible();
    
    await dropDownPage.waitForDropDown();
    await dropDownPage.assertDropDownIsVisible();  
    
    await dropDownPage.selectDropDownValue();
    await dropDownPage.assertSelectedDropDownValue();      
  });

  test('verify entry Ad functionality @entryad', async () => {
    await homePage.waitForEntryAdLink();
    await homePage.clickEntryAdLink();

    await entryAdPage.waitForEntryAdPopup();
    await entryAdPage.assertEntryAdPopIsVisible();
    await entryAdPage.clickCloseButtonInEntryAdPopup();

    await entryAdPage.waitForEntryAdPageTitle();
    await entryAdPage.assertEntryAdPageTitleIsVisible();
  });

  test('verify add or remove Elements functionality @addorremoveelements', async () => {
    await homePage.waitForAddOrRemoveElementsLink();
    await homePage.clickAddOrRemoveElementsLink();
    
    await addOrRemoveElementsPage.waitForAddOrRemoveElementsTitle();
    await addOrRemoveElementsPage.assertAddOrRemoveElementsTitleIsVisible();
    await addOrRemoveElementsPage.assertInitialButtonVisibility();
    await addOrRemoveElementsPage.clickAddElementsButton();
    await addOrRemoveElementsPage.assertDeleteButtonIsVisible();
    await addOrRemoveElementsPage.clickDeleteButton();
    await addOrRemoveElementsPage.assertDeleteButtonIsNotVisible();
  });

  test('verify form authentication functionality @formauthentication', async () => {
    await homePage.waitForFormAuthenticationLink();
    await homePage.clickFormAuthenticationLink();
    
    await formAuthenticationPage.waitForUsernameInput();
    await formAuthenticationPage.enterUsername('tomsmith');
    await formAuthenticationPage.waitForPasswordInput();
    await formAuthenticationPage.enterPassword('SuperSecretPassword!');
    await formAuthenticationPage.waitForLoginButton();
    await formAuthenticationPage.clickLoginButton();
    await formAuthenticationPage.waitForLoginSuccessMessage();
    await formAuthenticationPage.assertLoginSuccessMessage();
    await formAuthenticationPage.waitForLogoutButton();
    await formAuthenticationPage.clickLogoutButton();
    await formAuthenticationPage.waitForLogoutSuccessMessage();
    await formAuthenticationPage.assertLogoutSuccessMessage();
    await formAuthenticationPage.waitForLoginPageTitle();
    await formAuthenticationPage.assertLoginPageTitleIsVisible();
  });

  test.afterEach(async ({ browser }, testInfo) => {     
   await homePage.navigateToHomePage('/');   
   // Capture the test execution results status after every test
   if (testInfo.status !== testInfo.expectedStatus)
    logger.info(`${testInfo.title} did not run as expected!`);
  });
    
  test.afterAll(async ({ browser }) => {
      await page.close();          
      await context.close();      
  });
});
