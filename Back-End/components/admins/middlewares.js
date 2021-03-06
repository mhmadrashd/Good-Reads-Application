const util = require("util");
const jwt = require("jsonwebtoken");
const { authorizationError } = require("../../assets/helpers/customError");

//Make function jwt.verify to return promise
const verifyAsync = util.promisify(jwt.verify);

exports.authorizeAdmin = async (req, res, next) => {
    const { token } = req.headers;
    const { id } = req.params;
    try {
        //Get data from token after veify this token
        const payload = await verifyAsync(token, process.env.SECRET_KEY);
        //If token is incorrect
        if (id !== payload.id || payload.admin === false) throw authorizationError;
    } catch (error) {
        next(authorizationError);
    }
    next();
};
