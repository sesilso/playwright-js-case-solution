import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';
import { ProductsPage } from '../../pages/products/ProductsPage';
import { standardUser, lockedOutUser } from '../../utils/credentials';
import { Product } from "../../pages/models/Product";



test.describe('ProductsS Tests', ()=>{
    
    //Scenario 3: Sorting and Cart Verification
    test('Products sorting and Cart Verification', async ({page}) =>{
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        await loginPage.initalPage();
        await loginPage.login(standardUser.username, standardUser.password);
        await productsPage.sortProductBy('Price (high to low)');

        // Verify that the first item listed is the "Sauce Labs Fleece Jacket" and its price is $49.99.
        const firstProductItem = await productsPage.getFirstAvaibleProductItem();
        expect(firstProductItem.name).toBe('Sauce Labs Fleece Jacket');
        expect(firstProductItem.price).toBe('$49.99');

        await productsPage.addProductItemToCartByName('Sauce Labs Fleece Jacket');

        // Verify that the cart icon correctly shows a "1"
        expect(await productsPage.getShoppingCartProductsCount()).toBe('1'); 
    })

})