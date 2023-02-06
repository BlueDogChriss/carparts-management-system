const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const EXPIRATION_DATE = process.env.EXPIRATION_TIME;

const createToken = (userFound) => {
    return jwt.sign({ id: userFound.id }, TOKEN_SECRET,
        {
            expiresIn: EXPIRATION_DATE
        });
}

const getUserId = (token) => {
    let trimmedToken = token.split(" ")[1]
    const decode = jwt.decode(trimmedToken, TOKEN_SECRET);
    console.log(decode, token)
    return decode.id;
}
module.exports = {
    createToken,
    getUserId
}