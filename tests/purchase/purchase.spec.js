import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';
import { ProductsPage } from '../../pages/products/ProductsPage';
import { standardUser, lockedOutUser } from '../../utils/credentials';

test.describe('Purchase Tests', ()=>{
    
    //Scenario 1: The Full "Happy Path" Purchase Flow
    test('Sucessful purchase operation', async ({page}) =>{
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        await loginPage.initalPage();
        await loginPage.login(standardUser.username, standardUser.password);
        await expect(page).toHaveURL(/inventory/);
        await expect(await productsPage.getTitle()).toBe('Products');
        //await page.waitForTimeout(3000);
        productsPage.addProductToCart('Sauce Labs Backpack');
        //await page.waitForTimeout(3000);
        productsPage.addProductToCart('Sauce Labs Fleece Jacket');

    })

})