import 'dotenv/config';

export class Routes {
  static instance = new Routes();

  constructor() {
    this.mainURL = process.env.MAIN_URL;
    this.loginURL = this.mainURL + '/login';
    this.searchURL =
      this.mainURL +
      '/form?type=1&make=10&model%5B0%5D=175&yearFrom=2012&yearTo=2013&auction%5B0%5D=1&auction%5B1%5D=2&auction%5B2%5D=4&dateFrom=2023-02-07&dateTo=2024-05-07&region=&sort%5Bsale_date%5D=desc&f%5Bwinamount%5D%5Bfrom%5D=&f%5Bwinamount%5D%5Bto%5D=&f%5Bestimatedrepairamount%5D%5Bfrom%5D=&f%5Bestimatedrepairamount%5D%5Bto%5D=&f%5Bactualcostvalue%5D%5Bfrom%5D=&f%5Bactualcostvalue%5D%5Bto%5D=&f%5Brundrive%5D%5B%5D=yes&f%5Bodometer%5D%5Bfrom%5D=&f%5Bodometer%5D%5Bto%5D=&f%5Bengine%5D%5B%5D=62';
    this.goTo = async function (page, route) {
      try {
        await page.goto(route, {
          waitUntil: 'domcontentloaded',
        });
      } catch (err) {
        console.log('Cannot get to the page: ->', err);
      }
    };
  }
}
