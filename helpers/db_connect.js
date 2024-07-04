import { MongoClient } from 'mongodb';

export class DatabaseClient {
  static instance = new DatabaseClient();

  constructor() {
    this.client = new MongoClient('mongodb://localhost:27017');
    this.dbName = 'scraped_data';
    this.collectionName = 'cars';
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      this.collection = this.db.collection(this.collectionName);
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  }

  /**
   *
   *
   * @param {Object} data
   * @memberof DatabaseClient
   */
  async insertData(data) {
    try {
      await this.collection.insertMany(data);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }

  async close() {
    await this.client.close();
  }

  async clearCollection() {
    try {
      await this.collection.drop();
      console.log(`Collection ${this.collectionName} dropped successfully.`);
    } catch (err) {
      if (err.code === 26) {
        console.log(`Collection ${this.collectionName} does not exist.`);
      } else {
        throw err;
      }
    }
  }
}
