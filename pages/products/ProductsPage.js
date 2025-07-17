import { Product } from "../models/Product";

export class ProductsPage {
    constructor(page){
        this.page= page;
        this.pageTitle= page.locator('.title');
        this.products = page.locator('.inventory_item');
        this.productNameElement = '.inventory_item_name';
        this.productDescElement = '.inventory_item_desc';
        this.productPriceElement = '.inventory_item_price';
        this.addToCartButton = 'button.btn_inventory';
        this.shoppingCartLink = page.locator('#shopping_cart_container');
        this.sortProductsSelect = page.locator('.product_sort_container');
        this.shoppingCartCount = page.locator('span.shopping_cart_badge');
    }

async isUserLoggedIn() {
    const inventoryPage = await this.page.url().includes('inventory');
    const title = await this.getTitle();
    return inventoryPage && title === 'Products';
}

async getTitle(){
    return await this.pageTitle.innerText();
}

async goToShoppingCart(){
    await this.shoppingCartLink.click();
    await this.page.waitForURL(/cart/);
}

async addProductItemToCart(productName){
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

async addProductsToCart(products){
    for(let product of products){
        await this.addProductItemToCart(product);
    }
}

async sortProductBy(criteria){
    await this.sortProductsSelect.selectOption(criteria);
}

async getAllProduct(){
    const products = [];
    const count = await this.products.count();
    for(let i=0;i<count; i++){
        const productItem = this.products.nth(i);
        const name = await productItem.locator(this.productNameElement).innerText();
        const desc = await productItem.locator(this.productDescElement).innerText();       
        const price = await productItem.locator(this.productPriceElement).innerText();   
        const product = new Product(name, desc, price);   
        products.push(product);
    }
    if(products.length>0){
        return products;
    }else{
        throw new Error('There are no available products to be mapped.');
    }
}

async getProductItemByPosition(pos){
    const product = await this.getAllProduct();
    if(pos>=0 && pos<product.length){
        return product[pos];
    }else{
        throw new Error('Invalid position based on product list size.');
    }
}

async getFirstAvaibleProductItem(){
    return await this.getProductItemByPosition(0);
}

async getShoppingCartProductsCount(){
    return await this.shoppingCartCount.innerText();
}

}