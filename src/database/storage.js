const db = require('./index');

async function getUserData(userId) {
    return await db.query('SELECT * FROM users WHERE id = $1', [userId]);
}

module.exports = { getUserData };
