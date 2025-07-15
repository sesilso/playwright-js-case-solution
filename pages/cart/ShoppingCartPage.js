export class ShoppingCartPage {
    constructor(page){
        this.page= page;
        this.cartItems= page.locator('div.cart_item');
        this.itemName = 'div.inventory_item_name';
        this.checkoutButton = page.locator('#checkout');
    }

async isProductItemInCart(productName){
    const count = await this.cartItems.count();
    for(let i=0;i<count; i++){
        const item = this.cartItems.nth(i);
        const name = await item.locator(this.itemName).innerText();
        if(name.trim() === productName){
            return true;
        }
    }
    return false;
}


async goToCheckout(){
    await this.checkoutButton.click();
    await this.page.waitForURL(/checkout-step-one/);
}

}