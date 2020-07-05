// require
const pg = require( 'pg' );

const pool = new pg.Pool({
    database: 'TODOLIST',
    host: 'localhost',
    port: 5432,
    max: 15,
    idleTimeoutMillis: 30000
})

// send it out
module.exports = pool;