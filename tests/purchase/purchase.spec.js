import {test, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../../pages/login/LoginPage';
import { ProductsPage } from '../../pages/products/ProductsPage';
import { standardUser, lockedOutUser } from '../../utils/credentials';
import { ShoppingCartPage } from '../../pages/cart/ShoppingCartPage';
import { CheckoutInformationPage } from '../../pages/checkout/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../../pages/checkout/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../pages/checkout/CheckoutCompletePage';


test.describe('Purchase Tests', ()=>{
    
    //Scenario 1: The Full "Happy Path" Purchase Flow
    test('Sucessful purchase operation', async ({page}) =>{
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const shoppingCartPage = new ShoppingCartPage(page);
        const checkoutInformatioPage = new CheckoutInformationPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        await loginPage.initalPage();
        await loginPage.login(standardUser.username, standardUser.password);
        // Verify that the user is successfully logged in and is on the products page.
        expect(await productsPage.isUserLoggedIn()).toBe(true);
        
        const products = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
        await productsPage.addProductsToCart(products);        
        await productsPage.goToShoppingCart();
        // Verify that both items are in the cart.
        expect(await shoppingCartPage.areAllItemsAddedToCart(products)).toBe(true);

        await shoppingCartPage.goToCheckout();
        await checkoutInformatioPage.fillInformation(faker.person.firstName(),faker.person.lastName(), faker.location.zipCode());
        await checkoutInformatioPage.continue();
        // Verify the total price is correct.
        expect(await checkoutOverviewPage.isPriceTotalCorrect()).toBe(true);

        await checkoutOverviewPage.finishPurchase();
        // Verify that the confirmation page is displayed 
        expect(await checkoutCompletePage.getCompletedMessage()).toBe('Thank you for your order!');
 
    })

})