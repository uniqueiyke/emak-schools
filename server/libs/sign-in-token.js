const jwt = require('jsonwebtoken');

exports.signInToken = (userData) => {
    return jwt.sign(
        { user: { id: userData._id, roles: userData.roles } },
        process.env.jwtSecret,
        { expiresIn: 86400 },
    )
}