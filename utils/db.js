import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(uri, {
      useUnifiedTopology: true,
    });

    this.isAlive = false;

    this.client.connect((err) => {
      if (err) {
        console.error(`MongoDB connection error: ${err.message}`);
        this.iisAlive = false;
      } else {
        this.isAlive = true;
      }
    });
  }

  isAlive() {
    return this.isAlive;
  }

  async nbUsers() {
    const usersCollection = this.client.db().collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    const filesCollection = this.client.db().collection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

export default dbClient;
