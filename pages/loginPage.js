import { loginSelectors } from '../helpers/locators.js';
import { Routes } from '../helpers/routes.js';
import 'dotenv/config';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.userEmail = process.env.USER_EMAIL;
    this.userPassword = process.env.USER_PASSWORD;
    this.routes = Routes.instance;
  }

  async login() {
    await this.page.waitForSelector(loginSelectors.loginButton);
    await this.page.click(loginSelectors.loginButton);
    await this.page.url().match(this.routes.loginURL);
    await this.page.waitForSelector(loginSelectors.usernameInput);
    await this.page.type(loginSelectors.usernameInput, this.userEmail);
    await this.page.type(loginSelectors.passwordInput, this.userPassword);
    await this.page.click(loginSelectors.submitButton);
    await this.page.url().match(this.routes.mainURL);
  }
}
