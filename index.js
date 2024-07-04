import { connect } from 'puppeteer-real-browser';

import { DatabaseClient } from './helpers/db_connect.js';
import { Routes } from './helpers/routes.js';
import { LoginPage } from './pages/loginPage.js';
import { SearchPage } from './pages/searchPage.js';

class WebAutomation {
  constructor() {}

  async init() {
    const response = await connect({
      turnstile: true,
    });

    this.page = response.page;
    this.browser = response.browser;
    this.setTarget = response.setTarget;
    this.dbclient = new DatabaseClient();
    this.loginPage = new LoginPage(this.page);
    this.searchPage = new SearchPage(this.page);
    this.routes = new Routes();

    await this.routes.goTo(this.page, this.routes.mainURL);
    await this.setTarget({ status: true });
    await this.loginPage.login();
    await this.routes.goTo(this.page, this.routes.searchURL);
    await this.dbclient.run();
    const { maxPageNum, tilesCountNum } = await this.searchPage.getSiteData();
    await this.searchPage.parseAllTiles(maxPageNum, tilesCountNum);
  }

  async savetoDB() {}
}

const automation = new WebAutomation();
automation.init();
