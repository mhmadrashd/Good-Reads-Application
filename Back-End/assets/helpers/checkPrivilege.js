const util = require("util");
const jwt = require("jsonwebtoken");
const { authorizationError } = require("./customError");
//Make function jwt.verify to return promise
const verifyAsync = util.promisify(jwt.verify);

/************************** Admins Authorization *********************************/

const authorizeAdminsPriv = async (req, res, next) => {
    //Get authorizion from header
    const token = req.cookies.Authorization;
    try {
        //Get data from token after veify this token
        const payload = await verifyAsync(token, process.env.SECRET_KEY);
        //If token is incorrect
        if (payload.admin === false) throw authorizationError;
        varname = payload.name;
    } catch (error) {
        next(authorizationError);
    }
    next();
};

/************************** Users Authorization *********************************/


// const authorizeUsersPriv = async (req, res, next) => {
//     const token = req.cookies.Authorization;
//     try {
//         const payload = await verifyAsync(token, process.env.SECRET_KEY);
//         if(payload.admin === true) throw authorizationError;
//         varname = payload.name;
//     }catch (error) {
//         next(authorizationError)
//     }
//     next();
// };

/************************************** Login Authentication ************************/

async function loginName(req, res, next) {
    try {
        const token = req.cookies.Authorization;
        //Get data from token after veify this token
        const payload = await verifyAsync(token, process.env.SECRET_KEY);
        return payload.name;
    } catch (error) {
        next(error)
    }

};
module.exports = { loginName, authorizeAdminsPriv, authorizeUsersPriv }
