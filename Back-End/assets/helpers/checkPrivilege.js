const util = require("util");
const jwt = require("jsonwebtoken");
const { authorizationError } = require("./customError");
//Make function jwt.verify to return promise
const verifyAsync = util.promisify(jwt.verify);

exports.authorizeAdminsPriv = async (req, res, next) => {
    //Get authorizion from header
    const token = req.cookies.Authorization;
    try {
        //Get data from token after veify this token
        const payload = await verifyAsync(token, process.env.SECRET_KEY);
        //If token is incorrect
        if (payload.admin === false) throw authorizationError;
    } catch (error) {
        next(authorizationError);
    }
    next();
};
