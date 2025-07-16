import { FormatUtils } from "../../utils/formatUtils";

export class CheckoutOverviewPage {
    constructor(page){
        this.page= page;
        this.subtotalLabel= page.locator('.summary_subtotal_label');
        this.taxLabel= page.locator('.summary_tax_label');
        this.totalLabel= page.locator('.summary_total_label');
        this.finishButton= page.locator('#finish');
    }

async getDisplayedSubtotal(){
    return await this.subtotalLabel.innerText();
}   

async getDisplayedTax(){
    return await this.taxLabel.innerText();
}  

async getDisplayedTotal(){
    return await this.totalLabel.innerText();
}  

async isPriceTotalCorrect(){
    const subTotal = FormatUtils.parsePriceString(await this.getDisplayedSubtotal());
    const tax = FormatUtils.parsePriceString(await this.getDisplayedTax());
    const total = FormatUtils.parsePriceString(await this.getDisplayedTotal());
    return Math.abs((subTotal+tax)-total) < 0.01;
}

async finishPurchase(){
    await this.finishButton.click();    
    await this.page.waitForURL(/checkout-complete/);
}


}