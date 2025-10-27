import { expect, Locator, Page } from "playwright/test";
import { CookieBanner } from "./CookieBanner";
import { all } from "axios";

export class HomePage {
    readonly page: Page;
    readonly cookieBanner: CookieBanner;
    readonly hudlLogo : Locator;
    readonly navBarSolutions: Locator;
    readonly navBarResourcesAndSupport: Locator;
    readonly navBarCompany: Locator;
    readonly navBarLanguageSelector: Locator;
    readonly navBarSearchTeamsAndAthletes: Locator;
    readonly navBarLogin: Locator;
    readonly landingVideo: Locator;
    readonly landingTitleHeading: Locator;
    readonly landingSubTitle: Locator;
    readonly wantHudlText: Locator;
    readonly talkToOurTeamLink: Locator;
    readonly homepageHeroButtonTeams: Locator;
    readonly forCoachesAndTeamsLink: Locator;
    readonly bannerSearchTeamsAndAthletes: Locator;
    readonly homepageHeroButtonFans: Locator;
    readonly forFansAndFamiliesLink: Locator;

    constructor (page:Page) {
        this.page = page;
        this.cookieBanner = new CookieBanner(page);
        // Navigation elements
        this.hudlLogo = page.getByTestId("site-logo");
        this.navBarSolutions = page.getByRole('link', { name: 'Solutions', exact: true });
        this.navBarResourcesAndSupport = page.getByRole('link', { name: 'Resources & Support' });
        this.navBarCompany = page.getByRole('link', { name: 'Company', exact: true });
        this.navBarLanguageSelector = page.getByRole('combobox', {name: 'Language selector'}).first();
        this.navBarSearchTeamsAndAthletes = page.getByRole('link', {name: 'Search Teams & Athletes'}).first()
        this.navBarLogin = page.getByTestId("login-select");
        
        // Landing page elements
        this.landingVideo = page.locator('video');
        this.landingTitleHeading = page.getByRole('heading', { name: 'Change the Way You See the' });
        this.landingSubTitle = page.getByText('We help athletes, teams,');
        
        // Additional elements
        this.wantHudlText = page.getByText('Want Hudl for your program?');
        this.talkToOurTeamLink = page.getByRole('link', { name: 'Talk to our team' });
        this.homepageHeroButtonTeams = page.locator('#homepage-hero_button-teams');
        this.forCoachesAndTeamsLink = page.getByRole('link', { name: 'For Coaches and Teams Search' });
        this.bannerSearchTeamsAndAthletes = page.getByRole('banner').getByRole('link', { name: 'Search Teams & Athletes' });
        this.homepageHeroButtonFans = page.locator('#homepage-hero_button-fans');
        this.forFansAndFamiliesLink = page.getByRole('link', { name: 'For Fans and Families Watch' });
    }

    async load() {
        await this.page.goto('/', {waitUntil: 'networkidle'});
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/.*hudl\.com/);
    }

    async loadAndVerify(){
        await this.load();
        await this.verifyHomePageElements();
    }

    async loadAndHandleCookies(){
        await this.load();
        await this.handleCookieBanner();
    }

    async verifyHomePageElements(){

    const allElements = [
        // NavBar Elements
        this.hudlLogo,
        this.navBarSolutions,
        this.navBarResourcesAndSupport,
        this.navBarCompany,
        this.navBarLanguageSelector,
        this.navBarSearchTeamsAndAthletes,
        this.navBarLogin,

        // Landing Elements
        this.landingVideo,
        this.landingTitleHeading,
        this.landingSubTitle,
  
        // Additional elements
        this.wantHudlText,
        this.talkToOurTeamLink,
        this.homepageHeroButtonTeams,
        this.forCoachesAndTeamsLink,
        this.bannerSearchTeamsAndAthletes,
        this.homepageHeroButtonFans,
        this.forFansAndFamiliesLink
    ];

    for (const element of allElements) {
        await expect(element).toBeVisible();
    }    
}

    async acceptCookiesAndVerifyHomePage() {
        if (await this.cookieBanner.isBannerVisible()) {
            await this.cookieBanner.verifyBannerElements();
            await this.cookieBanner.acceptAllCookies();
        }
        await this.verifyHomePageElements();
    }

    async handleCookieBanner(){
         if (await this.cookieBanner.isBannerVisible()) {;
            await this.cookieBanner.acceptAllCookies();
        }
    }

    async getLandingTitle():Promise<string> {
        const title = await this.landingTitleHeading.textContent(); // Get raw text
        return title?.trim()|| ''; // Clean it and handle null case

    }

    async verifyLandingTitleContains(expectedText: string) {

        const actualTitle = await this.getLandingTitle();
        expect(actualTitle).toContain(expectedText);

    }

    async getLandingSubTitle():Promise<string>{
        const subtitle = await this.landingSubTitle.textContent(); // Get raw text
        return subtitle?.trim() || ''; // Clean it and handle null case
    }

    async verifyLandingSubTitleContains(expectedText: string){
        const actualSubTitle = await this.getLandingSubTitle();
        expect(actualSubTitle).toContain(expectedText);
    }

    async isVideoPlaying(): Promise<boolean>{
        return await this.landingVideo.evaluate((video: HTMLVideoElement) => {
            return !video.paused && video.readyState >=3; //checks if the video has enough data loaded to play smoothly
        });
    }

};
