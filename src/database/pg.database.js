require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
});
const connect = async () => {
  try {
    await pool.connect();
    console.log("Connected to Postgres");
  } catch (error) {
    console.log("Error connecting to Postgres", error);
  }
};
connect();
const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res;
  }
  catch (error) {
    console.log("Error executing query", error);
  }
}
module.exports = { query };