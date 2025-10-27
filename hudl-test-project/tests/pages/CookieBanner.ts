import { TIMEOUT } from "dns";
import { expect, Locator, Page } from "playwright/test";

export class CookieBanner {
    readonly page: Page;
    readonly banner: Locator;
    readonly policyText: Locator;
    readonly privacyLink: Locator;
    readonly byClickingText: Locator;
    readonly cookiesSettingsButton: Locator;
    readonly rejectAllButton: Locator;
    readonly acceptAllButton: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.banner = page.locator('#onetrust-banner-sdk');
        this.policyText = page.locator('#onetrust-policy-text');
        this.privacyLink = page.getByRole('link', { 
            name: 'More information about your privacy, opens in a new tab' 
        });
        this.byClickingText = page.locator('#onetrust-policy-text');
        this.cookiesSettingsButton = page.getByRole('button', { name: 'Cookies Settings' });
        this.rejectAllButton = page.locator('#onetrust-reject-all-handler');
        this.acceptAllButton = page.locator('#onetrust-accept-btn-handler');
        this.closeButton = page.getByRole('button', { name: 'Close' });
    }

    async verifyBannerElements() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.banner).toBeVisible();
        await expect(this.policyText).toBeVisible();
        await expect(this.privacyLink).toBeVisible();
        await expect(this.byClickingText).toBeVisible();
        await expect(this.cookiesSettingsButton).toBeVisible();
        await expect(this.rejectAllButton).toBeVisible();
        await expect(this.acceptAllButton).toBeVisible();
        await expect(this.closeButton).toBeVisible();
    }

    async waitForBanner(){
        await this.banner.waitFor({state: 'visible', timeout: 10000});
    }

    async acceptAllCookies() {
        await this.waitForBanner();
        await this.acceptAllButton.click();
    }

    async rejectAllCookies() {
        await this.waitForBanner();
        await this.rejectAllButton.click();
    }

    async openCookiesSettings() {
        await this.cookiesSettingsButton.click();
    }

    async closeBanner() {
        await this.waitForBanner();
        await this.closeButton.click();
    }

    async isBannerVisible(): Promise<boolean> {
        return await this.banner.isVisible();
    }

    async waitForBannerToClose(){
        await this.banner.waitFor({state: "hidden", timeout: 5000});
    }

    async isBannerClosed(): Promise<boolean>{
        return await this.banner.isHidden();
    }

    async verifyBannerClosed(){
        await expect(this.banner).toBeHidden();
    }

    async safeAcceptAllCookies(): Promise<boolean>{
        if (await this.isBannerVisible()){
            await this.acceptAllCookies();
            return true
        }
        return false;
    }

    async safeRejectAllCookies(): Promise<boolean> {
        if (await this.isBannerVisible()) {
            await this.rejectAllCookies();
            return true;
        }
        return false;
    }

    async getPolicyText(): Promise<string> {
        const text = await this.policyText.textContent();
        return text?.trim() || '';
    }

    async verifyPolicyTextContains(expectedText: string){
        const actualText = await this.getPolicyText();
        expect(actualText).toContain(expectedText);
    }

    async clickPrivacyLink(){
        await this.privacyLink.click();
        await this.page.waitForLoadState('networkidle');
    }
}