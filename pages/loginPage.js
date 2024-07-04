import { loginSelectors } from '../helpers/locators.js';
import { Routes } from '../helpers/routes.js';
import 'dotenv/config';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.userEmail = process.env.USER_EMAIL;
    this.userPassword = process.env.USER_PASSWORD;
    this.routes = new Routes();
  }

  async login() {
    const { loginButton, usernameInput, passwordInput, submitButton } =
      loginSelectors;
    await this.page.waitForSelector(loginButton);
    await this.page.click(loginButton);
    await this.page.url().match(this.routes.loginURL);
    await this.page.waitForSelector(usernameInput);
    await this.page.type(usernameInput, this.userEmail);
    await this.page.type(passwordInput, this.userPassword);
    await this.page.click(submitButton);
    await this.page.url().match(this.routes.mainURL);
  }
}
