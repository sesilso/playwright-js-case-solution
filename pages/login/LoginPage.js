export class LoginPage {
    constructor(page){
        this.page= page;
        this.usernameInput= page.locator('#user-name');
        this.passwordInput= page.locator('#password');
        this.loginButton= page.locator('#login-button');
        this.errorMessage= page.locator('h3[data-test="error"]');
    }


async initalPage(){
    await this.page.goto('/');
} 

async login(username, password){
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}

async getErrorMessage(){
    return await this.errorMessage.textContent();
}

}