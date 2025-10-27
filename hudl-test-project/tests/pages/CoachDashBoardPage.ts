import { expect, Locator, Page } from "@playwright/test";

export class CoachDashboardPage {
    readonly page: Page;
    
    // Top Navigation Elements
    readonly hudlLogo: Locator;
    readonly homeLink: Locator;
    readonly watchNowLink: Locator;
    readonly uploadLink: Locator;
    readonly calendarLink: Locator;
    readonly notificationsLink: Locator;
    readonly messagesLink: Locator;
    readonly profileAvator: Locator;
    readonly profileName: Locator;

    // Menu Bar Elements
    readonly coachTeamLogo: Locator;
    readonly coachTeamName: Locator;
    readonly libraryMenu: Locator;
    readonly reportsMenu: Locator;
    readonly teamMenu: Locator;
    readonly highlightsMenu: Locator;
    readonly recruitingMenu: Locator;
    
    // Feed Elements
    readonly feedSearchTextBox : Locator;
    readonly feedTabPanel: Locator;
    readonly featuredTabPanel: Locator;
    readonly yourTeamsTabPanel: Locator;
    readonly suggestionsHeading: Locator;
    readonly moreSuggestionsLink: Locator;
    readonly firstFeedCard : Locator;
    

    
    constructor(page: Page) {
        this.page = page;

        // Top Navigation Elements
        this.hudlLogo = page.locator('.hui-globalnav__home-icon.hui-globalnav__home-logo');
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.watchNowLink = page.getByRole('link', { name: 'Watch Now' });
        this.uploadLink = page.getByRole('link', { name: 'upload Upload' });
        this.calendarLink = page.getByRole('link', { name: 'CalendarIcon' });
        this.notificationsLink = page.getByRole('link', { name: 'notifications' });
        this.messagesLink = page.getByRole('link', { name: 'messages' });
        this.profileAvator = page.locator(".hui-globaluseritem__avatar");
        this.profileName = page.locator(".hui-globaluseritem__display-name");

        // Menu Bar Elements
        this.coachTeamLogo = page.locator(".uni-avatar__img").first();
        this.coachTeamName = page.locator(".hui-primaryteamswitcher__display-name").first();
        this.libraryMenu = page.getByRole('link', {name: 'Library'});
        this.reportsMenu = page.getByRole('link', {name: 'Reports'});
        this.teamMenu =  page.getByText('Team', { exact: true });
        this.highlightsMenu = page.getByRole('link', {name: 'Highlights'});
        this.recruitingMenu = page.getByText('Recruiting');

        // Feed Elements
        this.feedSearchTextBox = page.getByRole('textbox', { name: 'Search' });
        this.feedTabPanel = page.locator('xpath=//span[normalize-space()="Feed"]'); 
        this.featuredTabPanel = page.locator('xpath=//span[normalize-space()="Featured"]'); 
        this.yourTeamsTabPanel = page.locator('xpath=//span[normalize-space()="Your Teams"]'); 
        this.suggestionsHeading = page.getByText('Suggestions', { exact: true });
        this.moreSuggestionsLink = page.getByRole('button', {name: 'More Suggestions'});
        this.firstFeedCard = page.locator('.uni-card').first();


    }

    async verifyCoachDashboard() {
        // Verify top navigation elements are visible
        await expect(this.hudlLogo).toBeVisible();
        await expect(this.homeLink).toBeVisible();
        await expect(this.watchNowLink).toBeVisible();
        await expect(this.uploadLink).toBeVisible();
        await expect(this.calendarLink).toBeVisible();
        await expect(this.notificationsLink).toBeVisible();
        await expect(this.messagesLink).toBeVisible();
        await expect(this.profileAvator).toBeVisible();
        await expect(this.profileName).toBeVisible();

        // Verify menu bar elements are visible
        await expect(this.coachTeamLogo).toBeVisible();
        await expect(this.coachTeamName).toBeVisible();
        await expect(this.libraryMenu).toBeVisible();
        await expect(this.reportsMenu).toBeVisible();
        await expect(this.teamMenu).toBeVisible();
        await expect(this.highlightsMenu).toBeVisible();
        await expect(this.recruitingMenu).toBeVisible();

        // Verify Feed Elements
        await expect(this.feedSearchTextBox).toBeVisible();
        await expect(this.feedTabPanel).toBeVisible();
        await expect(this.featuredTabPanel).toBeVisible();
        await expect(this.yourTeamsTabPanel).toBeVisible();
        await expect(this.suggestionsHeading).toBeVisible();
        await expect(this.moreSuggestionsLink).toBeVisible();
        await expect(this.firstFeedCard).toBeVisible();
    
    }

    async navigateToHome() {
        await this.homeLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToWatch() {
        await this.watchNowLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToUpload() {
        await this.uploadLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToCalendar() {
        await this.calendarLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async openNotifications() {
        await this.notificationsLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async openMessages() {
        await this.messagesLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickHudlLogo() {
        await this.hudlLogo.click();
        await this.page.waitForLoadState('networkidle');
    }

     async getUserProfileName(): Promise<string> {
        const name = await this.profileName.textContent();
        if (!name) {
            throw new Error('Profie name element is empty or not found');
        }
        return name.trim();
    }

    async clickFeedPanelTab() {
        await this.feedTabPanel.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickFeaturedPanelTab() {
        await this.featuredTabPanel.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickYourTeamsPanelTab() {
        await this.yourTeamsTabPanel.click();
        await this.page.waitForLoadState('networkidle');
    }
};