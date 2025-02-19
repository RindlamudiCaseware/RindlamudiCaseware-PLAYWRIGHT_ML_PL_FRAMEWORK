// import { Low } from 'lowdb';
// import { JSONFile } from 'lowdb/node';
// import { ElementSignature } from '../types';

// // Define your schema
// interface DataSchema {
//   baselineSignatures: ElementSignature[];
//   // You can add other collections (tables) like testRunLogs, trainingData, etc.
// }

// // Path to the JSON file that will serve as our DB
// // const file = 'db.json';
// // const adapter = new JSONFile<DataSchema>(file);
// // const db = new Low<DataSchema>(adapter, { baselineSignatures: [] });

// const file = 'db.json';
// const adapter = new JSONFile<DataSchema>(file);
// const db = new Low<DataSchema>(adapter, { baselineSignatures: [] });
// //const db = new Low<DataSchema>(adapter);


// // Initialize the DB with default data if file does not exist.
// async function initDB() {
//   await db.read();
//   db.data ||= { baselineSignatures: [] };
//   await db.write();
// }

// initDB();

// export default db;


// src/db/db.ts
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ElementSignature } from '../types';

// Derive __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define your schema
interface DataSchema {
  baselineSignatures: ElementSignature[];
  // Add additional collections here if needed
}

// Define the path for the database file
const filePath = path.join(__dirname, 'db.json');
const adapter = new JSONFile<DataSchema>(filePath);
const db = new Low<DataSchema>(adapter, { baselineSignatures: [] });

/**
 * Initialize the database.
 * - Checks if the db file exists.
 * - If not, creates the file with default content.
 * - Reads the file and initializes db.data.
 * - Writes back to ensure the file is up to date.
 */
async function initDB() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ baselineSignatures: [] }, null, 2));
  }
  await db.read();
  db.data ||= { baselineSignatures: [] };
  await db.write();
}

await initDB();

export default db;
