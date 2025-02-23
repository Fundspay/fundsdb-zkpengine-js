const pool = require('../../config/db');

async function query(sql, params) {
    const result = await pool.query(sql, params);
    return result.rows;
}

module.exports = { query };
