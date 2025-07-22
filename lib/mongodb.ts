import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

    if (!global._mongoClientPromise) {
  client = new MongoClient(uri!, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;

export default clientPromise; 