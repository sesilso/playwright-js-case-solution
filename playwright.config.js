import {defineConfig} from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const envFile = '.env.'+(process.env.ENV || 'dev');

dotenv.config({path: path.resolve(__dirname, envFile)}); // Carga variables de .env

if(!process.env.BASE_URL){
  throw new Error('BASE_URL is not defined. Please, verify ${envFile} exists and has a value.');
}

export default defineConfig({
    use:{
        baseURL: process.env.BASE_URL,
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    timeout: 30000,
    retries: 0,

    reporter:[
      ['list'],
      ['html', {outputFolder: 'playwright-report', open: 'never'}]
    ],

    workers: 2,
    fullyParallel: true,

    projects: [
      {
        name: 'chromium',
        use: {browserName: 'chromium'}
      },
      {
        name: 'firefox',
        use: {browserName: 'firefox'}
      },
      {
        name: 'webkit',
        use: {browserName: 'webkit'}
      }
    ]

});

