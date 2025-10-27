import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { errorMonitor } from 'events';
import { log } from 'console';

const testData ={
    validEmail: process.env.HUDL_FAN_EMAIL!,
    validPassword: process.env.HUDL_FAN_PASSWORD!,
    invalidEmail: "invalid-email@test.com",
    invalidPassword:  "WrongPassword123",
    emptyEmail: "",
    emptyPassword: "",
    malformedEmail: "not-an-email"
};

test.describe('Login Error Scenarios', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        
        if (!process.env.HUDL_FAN_EMAIL || !process.env.HUDL_FAN_PASSWORD){
            throw new Error('HUDL_FAN_EMAIL and HUDL_FAN_PASSWORD environmental variables are required');
        }
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await homePage.load();
        await loginPage.navigateToLogin();
    });

    test('should show error with invalid email', {tag: '@login-error'},  async ({ page }) => {

        // Act
        await loginPage.attemptLogin(testData.invalidEmail, testData.validPassword);

        // Assert
        // Verify error message is displayed
        loginPage.verifyErrorMessage('You’ve tried to log in too');
        
        // Verify we're still on login page or error page
        await loginPage.verifyOnPasswordPage();
    });

    test('should show error with invalid password', {tag: '@password-error'}, async ({ page }) => {
        // Act
        await loginPage.attemptLogin(testData.validEmail, testData.invalidPassword);

        // Assert
        // Verify password error message
        await loginPage.verifyErrorMessage("Your email or password is incorrect. Try again.");
    
        // Verify we're still on password entry page
        await loginPage.verifyOnPasswordPage();
    });

    test('should show error with empty email', {tag: '@login-error'}, async ({ page }) => {

        // Act
        await loginPage.attemptLogin(testData.emptyEmail, testData.validPassword)

        // Assert
        // Verify email required error
        await loginPage.verifyErrorMessage("Enter an email address");
        
        // Verify we're still on email entry page
        await loginPage.verifyOnLoginPage();
    });

    test('should show error with empty password', {tag: '@password-error'},async ({ page }) => {

        // Act
        await loginPage.attemptLogin(testData.validEmail, testData.emptyPassword);

        // Assert
        // Verify password required error
        await loginPage.verifyErrorMessage("Enter your password.");
        
        // Verify we're still on password entry page
        await loginPage.verifyOnPasswordPage();
    });

    test('should show error with empty credentials', {tag: '@login-error'},async ({ page }) => {

        // Act
        await loginPage.attemptLogin(testData.emptyEmail, testData.emptyPassword)

        // Asseet
        // Verify email required error (since password screen won't appear without email)
        await loginPage.verifyErrorMessage("Enter an email address");
        
        // Verify we never reached password screen
        await page.waitForLoadState('networkidle');
        await expect(loginPage.passwordInput).not.toBeVisible();
    });

    test('should show error with malformed email', {tag: '@login-error'}, async ({ page }) => {

        // Act
        await loginPage.attemptLogin(testData.malformedEmail, testData.validPassword);

        // Assert
        // Verify email format error
        loginPage.verifyErrorMessage("Enter a valid email.");
        
        // Verify we're still on email entry page
        await loginPage.verifyOnLoginPage();
    });

    test.afterEach(async ({ page }) => {
        await page.context().close();
    });
});