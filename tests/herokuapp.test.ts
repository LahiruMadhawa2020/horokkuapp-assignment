import { BrowserContext, Page, test } from '@playwright/test';
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

  test('tc01 - verify the checkboxes functionality @checkboxes', async ({ browser }, testInfo) => {  
    const tc01_screenshot_homepage_navigation = await page.screenshot();
    await testInfo.attach('tc01_screenshot_homepage_navigation', { body: tc01_screenshot_homepage_navigation, contentType: 'image/png' });
    
    // test.step('Navigate to the checkboxes page', async () => {});
    await homePage.waitForCheckBoxesLink();
    await homePage.clickCheckBoxesLink();

    const tc01_screenshot_checkBoxesPage_Initial = await page.screenshot();
    await testInfo.attach('tc01_screenshot_checkBoxesPage_Initial', { body: tc01_screenshot_checkBoxesPage_Initial, contentType: 'image/png' });
    
    // test.step('Verify the first checkboxes functionality', async () => {});
    await checkboxesPage.waitForFirstCheckbox();
    await checkboxesPage.checkFirstCheckbox();
    await checkboxesPage.assertFirstCheckboxChecked();

    const tc01_screenshot_checkBoxe_checked = await page.screenshot();
    await testInfo.attach('tc01_screenshot_checkBoxe_checked', { body: tc01_screenshot_checkBoxe_checked, contentType: 'image/png' });    
    
    // test.step('Verify the second checkboxes functionality', async () => {});
    await checkboxesPage.waitForSecondCheckbox();
    await checkboxesPage.uncheckSecondCheckbox();
    await checkboxesPage.assertSecondCheckboxUnchecked();

    // test.step('Navigate back to the home page', async () => {});
    await checkboxesPage.assertSecondCheckboxUnchecked();

    const tc01_screenshot_checkBox_unchecked = await page.screenshot();
    await testInfo.attach('tc01_screenshot_checkBox_unchecked', { body: tc01_screenshot_checkBox_unchecked, contentType: 'image/png' });
  });

  test('tc02 - verify dropdown functionality @dropdown', async ({ browser }, testInfo) => {
    const tc02_screenshot_homepage_navigation = await page.screenshot();
    await testInfo.attach('tc02_screenshot_homepage_navigation', { body: tc02_screenshot_homepage_navigation, contentType: 'image/png' });

    await homePage.waitForDropDownLink();
    await homePage.clickDropDownLink();

    await dropDownPage.waitForDropDownTitle();
    await dropDownPage.assertDroDownTitleIsVisible();
    
    await dropDownPage.waitForDropDown();
    await dropDownPage.assertDropDownIsVisible();  

    const tc02_screenshot_dropDownPage_initial = await page.screenshot();
    await testInfo.attach('tc02_screenshot_dropDownPage_initial', { body: tc02_screenshot_dropDownPage_initial, contentType: 'image/png' });
    
    await dropDownPage.selectDropDownValue();
    await dropDownPage.assertSelectedDropDownValue(); 
    
    const tc02_screenshot_dropDown_selected = await page.screenshot();
    await testInfo.attach('tc02_screenshot_dropDown_selected', { body: tc02_screenshot_dropDown_selected, contentType: 'image/png' });
  });

  test('tc03 - verify entry Ad functionality @entryad', async ({ browser }, testInfo) => {
    const tc03_screenshot_homepage_navigation = await page.screenshot();
    await testInfo.attach('tc03_screenshot_homepage_navigation', { body: tc03_screenshot_homepage_navigation, contentType: 'image/png' });

    await homePage.waitForEntryAdLink();
    await homePage.clickEntryAdLink();

    await entryAdPage.waitForEntryAdPopup();
    await entryAdPage.assertEntryAdPopIsVisible();

    const tc03_screenshot_entryAdPage_initial = await page.screenshot();
    await testInfo.attach('tc03_screenshot_entryAdPage_initial', { body: tc03_screenshot_entryAdPage_initial, contentType: 'image/png' });

    await entryAdPage.clickCloseButtonInEntryAdPopup();

    await entryAdPage.waitForEntryAdPageTitle();
    await entryAdPage.assertEntryAdPageTitleIsVisible();

    const tc03_screenshot_entryAdPage_Tite_Last = await page.screenshot();
    await testInfo.attach('tc03_screenshot_entryAdPage_Title_Last', { body: tc03_screenshot_entryAdPage_Tite_Last, contentType: 'image/png' });
  });

  test('tc04 - verify add or remove Elements functionality @addorremoveelements', async ({ browser }, testInfo) => {
    const tc04_screenshot_homepage_navigation = await page.screenshot();
    await testInfo.attach('tc04_screenshot_homepage_navigation', { body: tc04_screenshot_homepage_navigation, contentType: 'image/png' });

    await homePage.waitForAddOrRemoveElementsLink();
    await homePage.clickAddOrRemoveElementsLink();
    
    await addOrRemoveElementsPage.waitForAddOrRemoveElementsTitle();
    await addOrRemoveElementsPage.assertAddOrRemoveElementsTitleIsVisible();
    await addOrRemoveElementsPage.assertInitialButtonVisibility();

    const tc04_screenshot_AddRemovepage_initial = await page.screenshot();
    await testInfo.attach('tc04_screenshot_AddRemovepage_initial', { body: tc04_screenshot_AddRemovepage_initial, contentType: 'image/png' });

    await addOrRemoveElementsPage.clickAddElementsButton();
    await addOrRemoveElementsPage.assertDeleteButtonIsVisible();

    const tc04_screenshot_AddRemovepage_ClickAdd = await page.screenshot();
    await testInfo.attach('tc04_screenshot_AddRemovepage_ClickAdd', { body: tc04_screenshot_AddRemovepage_ClickAdd, contentType: 'image/png' });

    await addOrRemoveElementsPage.clickDeleteButton();
    await addOrRemoveElementsPage.assertDeleteButtonIsNotVisible();

    const tc04_screenshot_AddRemovepage_ClickDelete = await page.screenshot();
    await testInfo.attach('tc04_screenshot_AddRemovepage_ClickDelete', { body: tc04_screenshot_AddRemovepage_ClickDelete, contentType: 'image/png' });
  });

  test('tc05 - verify form authentication functionality @formauthentication', async ({ browser }, testInfo) => {
    const tc05_screenshot_homepage_navigation = await page.screenshot();
    await testInfo.attach('tc05_screenshot_homepage_navigation', { body: tc05_screenshot_homepage_navigation, contentType: 'image/png' });

    await homePage.waitForFormAuthenticationLink();
    await homePage.clickFormAuthenticationLink();

    const tc05_screenshot_FormAuth_initial = await page.screenshot();
    await testInfo.attach('tc05_screenshot_FormAuth_initial', { body: tc05_screenshot_FormAuth_initial, contentType: 'image/png' });
    
    await formAuthenticationPage.waitForUsernameInput();
    await formAuthenticationPage.enterUsername(process.env.FORMAUTHENTICATIONUSERNAME || '');
    await formAuthenticationPage.waitForPasswordInput();
    await formAuthenticationPage.enterPassword(process.env.FORMAUTHENTICATIONPASSWORD || '');
    await formAuthenticationPage.waitForLoginButton();
    await formAuthenticationPage.clickLoginButton();
    await formAuthenticationPage.waitForLoginSuccessMessage();
    await formAuthenticationPage.assertLoginSuccessMessage();

    const tc05_screenshot_FormAuth_login = await page.screenshot();
    await testInfo.attach('tc05_screenshot_FormAuth_login', { body: tc05_screenshot_FormAuth_login, contentType: 'image/png' });

    await formAuthenticationPage.waitForLogoutButton();
    await formAuthenticationPage.clickLogoutButton();
    await formAuthenticationPage.waitForLogoutSuccessMessage();
    await formAuthenticationPage.assertLogoutSuccessMessage();

    const tc05_screenshot_FormAuth_logout = await page.screenshot();
    await testInfo.attach('tc05_screenshot_FormAuth_logout', { body: tc05_screenshot_FormAuth_logout, contentType: 'image/png' });

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
