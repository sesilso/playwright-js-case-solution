import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';
import { standardUser, lockedOutUser } from '../../utils/credentials';

test.describe('Login Tests', ()=>{
    
    //Scenario 2: The Locked-Out User
    test('Locked out user login attempt displays error message', async ({page}) =>{
        const loginPage = new LoginPage(page);
        await loginPage.initalPage();
        await loginPage.login(lockedOutUser.username, lockedOutUser.password);
        await expect(await loginPage.getErrorMessage()).toContain('Epic sadface: Sorry, this user has been locked out.');
    })

})