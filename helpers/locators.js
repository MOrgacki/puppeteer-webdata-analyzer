// locators.js
export const loginSelectors = {
  loginButton: "#navbar-header .btn-secondary", // replace with actual selector
  usernameInput: "#_username",
  passwordInput: "#_password",
  submitButton: "button[type=submit]",
};

export const siteDataSelectors = {
  maxPageNumber: "li.page-item:nth-last-child(2)",
  tilesCount: "div.block",
};

export const tileSelectors = {
  mainInfo: ".lot-main-info",
  holders: ".holder",
  image: "div:nth-child(1) img",
  vehicleData: "div:nth-child(1)",
  auctionData: "div:nth-child(1)",
  bidData: "div:nth-child(1)",
  name: ".subtitle-outline",
  damage: "div > dl > dd:nth-child(2)",
  runAndDrive: "div > dl > dd:nth-child(4)",
  odometer: "div > dl > dd:nth-child(6)",
  saleDate: "div > dl > dd:nth-child(2)",
  facility: "div > dl > dd:nth-child(4)",
  saleDocument: "div > dl > dd:nth-child(6)",
  price: ".subtitle.green",
  lotStatus: "div > dl > dd:nth-child(4) > span",
  seller: "div > dl > dd:nth-child(6) > span",
};
