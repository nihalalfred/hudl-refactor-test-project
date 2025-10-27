import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    
    // Login page elements
    readonly loginLink: Locator;
    readonly hudlLoginButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly continueButton: Locator;


    constructor(page: Page) {
        this.page = page;
        
        this.loginLink = page.getByRole("link", { name: "Log in" });
        this.hudlLoginButton = page.getByTestId("login-hudl");
        this.emailInput = page.getByRole("textbox", { name: "Email" });
        this.passwordInput = page.getByRole("textbox", { name: "Password" });
        this.continueButton = page.getByRole("button", { name: "Continue", exact: true });
    }

    async navigateToLogin() {
        await this.loginLink.click();
        await this.page.waitForLoadState('networkidle');
        await this.hudlLoginButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.verifyOnLoginPage();
    }

    async login(email: string, password: string) {
        await this.verifyOnLoginPage();
        await this.fillEmail(email);
        await this.clickContinue();
        await this.verifyOnPasswordPage();
        await this.fillPassword(password);
        await this.clickContinue();
        await this.verifyLoginSuccessful();
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async verifyOnLoginPage() {
        await expect(this.emailInput).toBeVisible();
        await expect(this.continueButton).toBeVisible();
        await expect(this.page).toHaveURL(/.*login/);
    }

    async verifyOnPasswordPage(){
        await expect(this.passwordInput).toBeVisible();
        await expect(this.continueButton).toBeVisible();
    }

    async verifyLoginSuccessful() {
        await expect(this.page).not.toHaveURL(/.*login/);
        await expect(this.page).toHaveURL(/.*home|.*fan/);     
    }

    async fillEmail(email:string){
        await this.emailInput.fill(email);
    }

    async fillPassword(password:string){
        await this.passwordInput.fill(password);
    }

    async clickContinue(){
        await this.continueButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async attemptLogin(email: string, password: string): Promise<void>{
        await this.verifyOnLoginPage();
        await this.fillEmail(email);
        await this.clickContinue();
        if (await this.passwordInput.isVisible()) {
            await this.fillPassword(password);
            await this.clickContinue();
        }
    }

    async verifyErrorMessage(errorText: string){
       await this.page.waitForLoadState('networkidle');
       await expect(this.page.getByText(errorText)).toBeVisible(); 
    }

};