const { Pool } = require('pg')

const pool = new Pool({
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  host: "chunee.db.elephantsql.com",
  user: "afgzdqex",
  password: "B0_NgA9_vSFQk3oMY2oV_wH9gR3QHLQx",
  database: "afgzdqex"
})

module.exports = pool;
