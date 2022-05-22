const util = require("util");
const jwt = require("jsonwebtoken");
const { authorizationError } = require("../../assets/helpers/customError");
const { loginID } = require("../../assets/helpers/checkPrivilege");
//Make function jwt.verify to return promise
const verifyAsync = util.promisify(jwt.verify);

exports.authorizeUser = async (req, res, next) => {
    //Get authorizion and id from header
    const token = req.cookies.Authorization;
    const id = await loginID(req, res);
    try {
        //Get data from token after veify this token
        const payload = await verifyAsync(token, process.env.SECRET_KEY);
        //If token is incorrect
        if (id !== payload.id || payload.admin === true) throw authorizationError;
    } catch (error) {
        next(authorizationError);
    }
    next();
};
