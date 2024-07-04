import { siteDataSelectors, tileSelectors } from '../helpers/locators.js';
import { Routes } from '../helpers/routes.js';
import { DatabaseClient } from '../helpers/db_connect.js';

export class SearchPage {
  constructor(page) {
    this.page = page;
    this.routes = Routes.instance;
    this.dbClient = DatabaseClient.instance;
  }

  async getSiteData() {
    try {
      await this.page.waitForSelector(siteDataSelectors.maxPageNumber, {
        timeout: 5000,
      });
      const maxPageNum = await this.page.evaluate((selector) => {
        const el = document.querySelector(selector).innerText;
        return el;
      }, siteDataSelectors.maxPageNumber);
      await this.page.waitForSelector(siteDataSelectors.tilesCount, {
        timeout: 5000,
      });
      const tilesCountNum = await this.page.evaluate((selector) => {
        const el = document.querySelectorAll(selector).length;
        return el;
      }, siteDataSelectors.tilesCount);
      console.log({ maxPageNum, tilesCountNum });
      return { maxPageNum, tilesCountNum };
    } catch {
      console.log("Couldn't parse data on first search page");
    }
  }

  async #getTilesData() {
    try {
      await this.page.waitForSelector(tileSelectors.mainInfo, {
        timeout: 5000,
      });
      await this.page.waitForSelector(tileSelectors.vehicleData, {
        timeout: 5000,
      });
      await this.page.waitForSelector(tileSelectors.auctionData, {
        timeout: 5000,
      });

      const tilesData = await this.page.evaluate((selectors) => {
        const tiles = document.querySelectorAll(selectors.mainInfo);
        return Array.from(tiles).map((tile) => {
          const columns = tile.querySelectorAll(selectors.holders);
          const imageText =
            columns[0].querySelector(selectors.image)?.src || null;

          const vehicleDataEl = columns[1].querySelector(selectors.vehicleData);
          const auctionDataEl = columns[2].querySelector(selectors.auctionData);
          const bidDataEl = columns[3].querySelector(selectors.bidData);

          return {
            image: imageText,
            name:
              vehicleDataEl.querySelector(selectors.name)?.innerText || null,
            damage:
              vehicleDataEl.querySelector(selectors.damage)?.innerText || null,
            runAndDrive:
              vehicleDataEl.querySelector(selectors.runAndDrive)?.innerText ||
              null,
            odometer:
              vehicleDataEl.querySelector(selectors.odometer)?.innerText ||
              null,
            saleDate:
              auctionDataEl.querySelector(selectors.saleDate)?.innerText ||
              null,
            facility:
              auctionDataEl.querySelector(selectors.facility)?.innerText ||
              null,
            saleDocument:
              auctionDataEl.querySelector(selectors.saleDocument)?.innerText ||
              null,
            price: bidDataEl.querySelector(selectors.price)?.innerText || null,
            lotStatus:
              bidDataEl.querySelector(selectors.lotStatus)?.innerText || null,
            seller:
              bidDataEl.querySelector(selectors.seller)?.innerText || null,
          };
        });
      }, tileSelectors);
      return tilesData;
    } catch (err) {
      console.log("Couldn't parse tiles data");
    }
  }

  async parseAllTiles(maxPageNumber, tilesCount) {
    await this.dbClient.connect();
    await this.dbClient.clearCollection();
    for (let i = 0; i < maxPageNumber; i++) {
      if (tilesCount >= 1) {
        this.routes.goTo(this.page, this.routes.searchURL + '&page=' + (i + 1));
        try {
          const tilesData = await this.#getTilesData();
          console.log(tilesData);
          await this.dbClient.insertData(tilesData);
        } catch {
          console.log("Couldn't get data from tiles");
        }

        // save tilesData to db
        await setTimeout(() => {}, 4000);
      }
    }
    await this.dbClient.close();
  }
}
