const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "jcgl2021",
  host: "localhost",
  port: 5432,
  database: "appgestacion"
});

module.exports = pool;
