import {test, expect} from '@playwright/test'
import { HomePage } from '../pages/HomePage';

test.describe('Cookie Banner Tests', () => {
let homePage:HomePage;

test.beforeEach(async({page}) => {

  //Arrange
  homePage = new HomePage(page);

});

test('should properly handle cookie banner acceptance',{tag: ['@cookie']}, async ({ page }) => {
        // Arrange
        await homePage.load();
    
        // Act
        await homePage.cookieBanner.acceptAllCookies();

        // Assert
        await expect(homePage.cookieBanner.banner).not.toBeVisible();
    });

test('should display all cookie banner elements when present', {tag: ['@cookie']},async ({ page }) => {
        // Arrange
        await homePage.load();

        // Act & Assert (verification is the action we're testing)
        await homePage.cookieBanner.verifyBannerElements();
    });

test.afterEach(async ({ page }) => {
    await page.context().close();

});
});

test.describe('Home Page Tests', () => {
let homePage: HomePage;

test.beforeEach(async({page}) => {

  //Arrange
  homePage = new HomePage(page);

});

test('should load home page successfully', {tag: ['@home']},async ({ page }) => {
        // Arrange
        const expectedUrl = 'https://www.hudl.com/';

        // Act
        await homePage.load();

        // Assert
        await expect(page).toHaveURL(expectedUrl);
    });

    test('should display all home page content elements',{tag: ['@home']}, async ({ page }) => {
        // Arrange
        await homePage.load();

        // Act - Handle cookies if present
        await homePage.handleCookieBanner();

        // Assert
        await homePage.verifyHomePageElements();
    });

    test('should have home contect correct', {tag: ['@home']},async({page})=> {

        //Arrange & Act
        await homePage.load();
        await homePage.handleCookieBanner();

        //Assert
        await homePage.verifyHomePageElements();
        await homePage.isVideoPlaying();
        await homePage.verifyLandingTitleContains("Change the WayYou See the");
        await homePage.verifyLandingSubTitleContains("We help athletes, teams, coaches and communities");
    });

test.afterEach(async ({ page }) => {
    await page.context().close();

});
});