import { MongoClient } from "mongodb";

export class DatabaseClient {
  static instance = new DatabaseClient();
  constructor() {
    this.client = new MongoClient("mongodb://localhost:27017");
  }

  async run() {
    try {
      const database = this.client.db("scraped_data");
      const cars = database.collection("cars");
      const query = { title: "Back to the Future" };
      const car = await cars.insertOne(query);
      console.log(car);
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close();
    }
  }
  invoke() {}
}
