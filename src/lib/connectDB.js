import { MongoClient, ServerApiVersion } from "mongodb";

let db;
export const connectDB = async () => {
  if (db) return db;
  try {
    const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_USER}@cluster0.40hja.mongodb.net/`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    db = client.db("next-doctor");
    return db;
  } catch (error) {}
};
