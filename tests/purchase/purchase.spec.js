import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';
import { ProductsPage } from '../../pages/products/ProductsPage';
import { standardUser, lockedOutUser } from '../../utils/credentials';
import { ShoppingCartPage } from '../../pages/cart/ShoppingCartPage';
import { CheckoutPage } from '../../pages/checkout/CheckoutPage';
import { faker } from '@faker-js/faker';

test.describe('Purchase Tests', ()=>{
    
    //Scenario 1: The Full "Happy Path" Purchase Flow
    test('Sucessful purchase operation', async ({page}) =>{
        
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const shoppingCartPage = new ShoppingCartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.initalPage();
        await loginPage.login(standardUser.username, standardUser.password);
        await expect(page).toHaveURL(/inventory/);
        await expect(await productsPage.getTitle()).toBe('Products');

        
        const products = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
        for(let product of products){
            await productsPage.addProductToCart(product);
        }
        await productsPage.goToShoppingCart();
        for(let product of products){
            expect(await shoppingCartPage.isProductItemInCart(product)).toBe(true);
        }

        await shoppingCartPage.goToCheckout();
        await checkoutPage.fillInformation(faker.person.firstName(),faker.person.lastName(), faker.location.zipCode());
        await checkoutPage.continue();

        //await page.waitForTimeout(3000);
    })

})