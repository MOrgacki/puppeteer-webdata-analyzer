import { connect } from "puppeteer-real-browser";
import "dotenv/config";
import {
  loginSelectors,
  searchSelectors,
  siteDataSelectors,
  tileSelectors,
} from "./locators.js";

class WebAutomation {
  constructor() {
    this.mainURL = process.env.MAIN_URL;
    this.userEmail = process.env.USER_EMAIL;
    this.userPassword = process.env.USER_PASSWORD;
  }

  async init() {
    const response = await connect({
      turnstile: true,
    });

    this.page = response.page;
    this.browser = response.browser;
    this.setTarget = response.setTarget;

    await this.page.goto(this.mainURL, {
      waitUntil: "domcontentloaded",
    });

    await this.setTarget({ status: true });
    await this.login();
    await this.search();
    const siteData = await this.getSiteData();
    const tilesData = await this.getTilesData();
    // await this.parseTile(siteData.maxPageNumber, siteData.tilesCount, tilesData);
  }

  async login() {
    const { usernameInput, passwordInput, submitButton } = loginSelectors;
    await this.page.waitForSelector(loginButton);
    await this.page.click(loginButton);
    await this.page.url().match(this.mainURL + "/login");
    await this.page.waitForSelector(usernameInput);
    await this.page.type(usernameInput, this.userEmail);
    await this.page.type(passwordInput, this.userPassword);
    await this.page.click(submitButton);
    await this.page.waitForNavigation();
  }

  async search() {
    await this.page.goto(searchSelectors.searchURL, {
      waitUntil: "domcontentloaded",
    });
  }

  async getSiteData() {
    try {
      const { maxPageNumber, tilesCount } = siteDataSelectors;
      const maxPageNum = await this.page.evaluate((selector) => {
        const el = document.querySelector(selector).innerText;
        return el;
      }, maxPageNumber);
      const tilesCountNum = await this.page.evaluate((selector) => {
        const el = document.querySelectorAll(selector).length;
        return el;
      }, tilesCount);
      return { maxPageNum, tilesCountNum };
    } catch (err) {
      console.log("Couldn't parse data");
    }
  }

  async getTilesData() {
    try {
      const tilesData = await this.page.evaluate((selectors) => {
        const {
          mainInfo,
          holders,
          image,
          vehicleData,
          auctionData,
          bidData,
          name,
          damage,
          runAndDrive,
          odometer,
          saleDate,
          price,
        } = selectors;
        const tiles = document.querySelectorAll(mainInfo);
        return Array.from(tiles).map((tile) => {
          const columns = tile.querySelectorAll(holders);
          const imageText = columns[0].querySelector(image)?.innerText || null;
          const vehicleDataEl = columns[1].querySelector(vehicleData);
          const auctionDataEl = columns[2].querySelector(auctionData);
          const bidDataEl = columns[3].querySelector(bidData);

          return {
            image: imageText,
            name: vehicleDataEl.querySelector(name)?.innerText || null,
            damage: vehicleDataEl.querySelector(damage)?.innerText || null,
            runAndDrive:
              vehicleDataEl.querySelector(runAndDrive)?.innerText || null,
            odometer: vehicleDataEl.querySelector(odometer)?.innerText || null,
            saleDate: auctionDataEl.querySelector(saleDate)?.innerText || null,
            price: bidDataEl.querySelector(price)?.innerText || null,
          };
        });
      }, tileSelectors);
      return tilesData;
    } catch (err) {
      console.log("Couldn't parse tiles data");
    }
  }

  // async parseTile(maxPageNumber, tilesCount, tilesData) {
  //   maxPageNumber = 1;
  //   return tilesData.map((tile) => {
  //     console.log(tile.innerText);
  //     return tile.innerText;
  //   });
  // }
}

const automation = new WebAutomation();
automation.init();
