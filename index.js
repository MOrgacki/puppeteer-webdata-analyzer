import { connect } from 'puppeteer-real-browser';

import { Routes } from './helpers/routes.js';
import { LoginPage } from './pages/loginPage.js';
import { SearchPage } from './pages/searchPage.js';

class WebAutomation {
  async init() {
    try {
      // Connect to Puppeteer Browser
      const response = await connect({
        turnstile: true,
      });

      // Initialize instance variables
      this.page = response.page;
      this.browser = response.browser;
      this.setTarget = response.setTarget;

      // Initialize page objects
      this.loginPage = new LoginPage(this.page);
      this.searchPage = new SearchPage(this.page);

      // Initialize singleton instances
      this.routes = Routes.instance;

      // Navigate and perform actions
      await this.routes.goTo(this.page, this.routes.mainURL);
      await this.setTarget({ status: true });
      await this.loginPage.login();
      await this.routes.goTo(this.page, this.routes.searchURL);
      const { maxPageNum, tilesCountNum } = await this.searchPage.getSiteData();
      await this.searchPage.parseAllTiles(maxPageNum, tilesCountNum);
      await this.browser.close();
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  }
}

// Initialize WebAutomation instance

const automation = new WebAutomation();
automation.init();
