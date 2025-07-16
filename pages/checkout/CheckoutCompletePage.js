export class CheckoutCompletePage {
    constructor(page){
        this.page= page;
        this.completedHeader= page.locator('h2.complete-header');
        this.backToProductsButton = page.locator('#back-to-products');
    }

async getCompletedMessage(){
    return await this.completedHeader.innerText();
}   

}