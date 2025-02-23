const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function generateToken(user) {
    return jwt.sign(user, SECRET, { expiresIn: '1h' });
}

function authenticate(req) {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        return jwt.verify(token, SECRET);
    } catch {
        return null;
    }
}

module.exports = { generateToken, authenticate };
