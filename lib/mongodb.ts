import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  console.warn('MONGODB_URI environment variable is not set. Some features may not work.');
  // Create a dummy promise that rejects to prevent crashes
  clientPromise = Promise.reject(new Error('MONGODB_URI not configured'));
} else {
  if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      // @ts-ignore
      global._mongoClientPromise = client.connect();
    }
    // @ts-ignore
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export default clientPromise; 