import { expect, Locator, Page } from "@playwright/test";

export class FanDashboardPage {
    readonly page: Page;
    readonly logo: Locator;
    readonly watchNowLink: Locator;
    readonly userDisplayName: Locator;
    readonly userAvatar: Locator;
    readonly headlineImage: Locator;
    readonly searchBar: Locator;
    readonly spotlightText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('.fanWebnav_navBtnLogo__qzRRN');
        this.watchNowLink = page.locator('.fanWebnav_watchNowLink__EiIrQ');
        this.userDisplayName = page.locator('.fanWebnav_displayName__gvbGS');
        this.userAvatar = page.locator('.fanWebnav_globalUserItemAvatar__28QTM');
        this.headlineImage = page.getByTestId("headline-image");
        this.searchBar = page.getByTestId("search-bar");
        this.spotlightText = page.getByTestId("spotlight-text");
    }

    async verifyFanDashboard() {
        await expect(this.logo).toBeVisible();
        await expect(this.watchNowLink).toBeVisible();
        await expect(this.userDisplayName).toBeVisible();
        await expect(this.userAvatar).toBeVisible();
        await expect(this.headlineImage).toBeVisible();
        await expect(this.searchBar).toBeVisible();
        await expect(this.spotlightText).toBeVisible();
    }

    async navigateToWatch() {
        await this.watchNowLink.click();
        await this.page.waitForLoadState('networkidle');
        
    }
}