export class ProductsPage {
    constructor(page){
        this.page= page;
        this.pageTitle= page.locator('.title');
        this.products = page.locator('.inventory_item');
        this.productNameElement = '.inventory_item_name';
        this.addToCartButton = 'button.btn_inventory';
    }

async getTitle(){
    return await this.pageTitle.innerText();
}

async addProductToCart(productName){
    const count = await this.products.count();

    for(let i=0;i<count; i++){
        const product = this.products.nth(i);
        const name = await product.locator(this.productNameElement).innerText();

        if(name.trim() === productName){
            await product.locator(this.addToCartButton).click();
            break;
        }
    }
}

}