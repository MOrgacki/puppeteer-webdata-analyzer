// locators.js
export const loginSelectors = {
  loginButton: "#navbar-header .btn-secondary", // replace with actual selector
  usernameInput: "#_username",
  passwordInput: "#_password",
  submitButton: "button[type=submit]",
};

export const searchSelectors = {
  searchURL: `${process.env.MAIN_URL}/form?type=1&make=10&model%5B0%5D=175&yearFrom=2010&yearTo=2013&auction%5B0%5D=1&auction%5B1%5D=2&dateFrom=2023-02-18&dateTo=2024-05-18&region=&sort%5Bsale_date%5D=desc&f%5Bwinamount%5D%5Bfrom%5D=&f%5Bwinamount%5D%5Bto%5D=&f%5Bestimatedrepairamount%5D%5Bfrom%5D=&f%5Bestimatedrepairamount%5D%5Bto%5D=&f%5Bactualcostvalue%5D%5Bfrom%5D=&f%5Bactualcostvalue%5D%5Bto%5D=&f%5Bodometer%5D%5Bfrom%5D=&f%5Bodometer%5D%5Bto%5D=&f%5Bcylinders%5D%5B%5D=8`,
};

export const siteDataSelectors = {
  maxPageNumber: "li.page-item:nth-last-child(2)",
  tilesCount: "div.block",
};

export const tileSelectors = {
  mainInfo: ".lot-main-info",
  holders: ".holder",
  image: "div:nth-child(1)",
  vehicleData: "div:nth-child(1)",
  auctionData: "div:nth-child(1)",
  bidData: "div:nth-child(1)",
  name: ".subtitle-outline",
  damage: "div > dl > dd:nth-child(2)",
  runAndDrive: "div > dl > dd:nth-child(4)",
  odometer: "div > dl > dd:nth-child(6)",
  saleDate: "div > dl > dd:nth-child(2)",
  price: ".subtitle green",
};
