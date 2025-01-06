// config/astraDb.js
const { DataAPIClient } = require('@datastax/astra-db-ts');

const connectAstraDB = async () => {
  const client = new DataAPIClient(process.env.ASTRADB_TOKEN);
  const db = client.db('https://e3c8baad-1df2-44ca-8d97-609652850786-us-east-2.apps.astra.datastax.com');

  try {
    const colls = await db.listCollections();
    console.log('Connected to AstraDB:', colls);
  } catch (err) {
    console.error('Error connecting to AstraDB:', err);
  }

  return db;
};

module.exports = connectAstraDB;
