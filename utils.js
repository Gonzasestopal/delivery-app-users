const jwt = require('jsonwebtoken');

const token_key = process.env.TOKEN_KEY;


function signJWT(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        is_admin: user.is_admin,
        status: user.status,
    }, token_key, {
        expiresIn: "5m",
    })
}


module.exports = {
    signJWT,
}
