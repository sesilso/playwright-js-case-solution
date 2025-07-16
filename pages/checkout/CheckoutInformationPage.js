export class CheckoutInformationPage {
    constructor(page){
        this.page= page;
        this.firstNameInput= page.locator('#first-name');
        this.lastNameInput= page.locator('#last-name');
        this.postalCodeInput= page.locator('#postal-code');
        this.continueButton= page.locator('#continue');
    }

async fillInformation(firstName, lastName, postalCode){
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
}

async continue(){
    await this.continueButton.click();
    await this.page.waitForURL(/checkout-step-two/);
}

async fillInformationAndContinue(firstName, lastName, postalCode){
    await this.fillInformation(firstName, lastName, postalCode);
    await this.continue();
}


}