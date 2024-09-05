const jwt = require('jsonwebtoken');
const secret_key = process.env.jwt_secret;

// Middleware for verifying the JWT token
function verifyToken(req, res, next) {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
        return res.status(400).json({
            msg: "Token is required..."
        });
    }

    try {
        req.user = jwt.verify(token, secret_key); // Decoded token is stored in req.user
        next();
    } catch (error) {
        console.error('JWT Error:', error.message);
        return res.status(400).json({
            msg: "Invalid token..."
        });
    }
}

module.exports = verifyToken;