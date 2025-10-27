import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { CoachDashboardPage } from '../pages/CoachDashBoardPage';
import { FanDashboardPage } from '../pages/FanDashBoardPage';

function validateEnvironmentVariables():void{
    const missingVars = [];

    if (!process.env.HUDL_COACH_EMAIL||!process.env.HUDL_COACH_PASSWORD){
        missingVars.push('HUDL_COACH_EMAIL, HUDL_COACH_PASSWORD');
    }

    if (!process.env.HUDL_FAN_EMAIL||!process.env.HUDL_FAN_PASSWORD){
        missingVars.push('HUDL_FAN_EMAIL, HUDL_FAN_PASSWORD');
    }

    if (missingVars.length > 0) {
        throw new Error("Missing Environment Variables: ${missingVars.join(';')}"
        );
    };

}

test.describe('Login Success Tests', () => {

    test.beforeAll(()=>{
        validateEnvironmentVariables();

    });

    async function setupTest(page: Page) {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await homePage.loadAndHandleCookies();
        await loginPage.navigateToLogin();
        return { homePage, loginPage };
    }

    test('Coach should login successfully with valid credentials', {tag: ['@coach', '@login']}, async ({ page }) => {
        // Arrange
        const { loginPage } = await setupTest(page);
        const coachDashboardPage = new CoachDashboardPage(page);
        const testCoachEmail = process.env.HUDL_COACH_EMAIL!;
        const testCoachPassword = process.env.HUDL_COACH_PASSWORD!;

        // Act
        await loginPage.login(testCoachEmail, testCoachPassword);
        await page.waitForLoadState('networkidle');

        // Assert
        const actualTitle = await loginPage.getPageTitle();
        expect(actualTitle).toEqual("Home - Hudl");
        await coachDashboardPage.verifyCoachDashboard();
    });

    test('Fan should login successfully with valid credentials', {tag: ['@fan', '@login']}, async({page}) => {
        // Arrange
        const { loginPage } = await setupTest(page);
        const fanDashboardPage = new FanDashboardPage(page);
        const testFanEmail = process.env.HUDL_FAN_EMAIL!;
        const testFanPassword = process.env.HUDL_FAN_PASSWORD!;

        // Act
        await loginPage.login(testFanEmail, testFanPassword);
        await page.waitForLoadState('networkidle');

        // Assert
        const actualTitle = await loginPage.getPageTitle();
        expect(actualTitle).toEqual("Hudl - Fan");
        await fanDashboardPage.verifyFanDashboard();
    });
    
    test.afterEach(async ({ page }) => {
        await page.context().close();
    });
});