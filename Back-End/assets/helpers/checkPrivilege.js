const util = require("util");
const jwt = require("jsonwebtoken");
const { authorizationError } = require("./customError");
//Make function jwt.verify to return promise
const verifyAsync = util.promisify(jwt.verify);

/************************** Admins Authorization *********************************/

const authorizeAdminsPriv = async (req, res, next) => {
    //Get authorizion from header
    const { token } = req.headers;
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
const requireAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (token) {
            const payload = await verifyAsync(token, process.env.SECRET_KEY);
            if (payload.admin === false) {
                res.redirect('/login');
            } else {
                next();
            }
        }
        else {
            res.redirect('/login');
        }
    } catch (error) {
        next(authorizationError);
        console.log(error.message)
    }
    next();
};

/************************** Users Authorization *********************************/


// const authorizeUsersPriv = async (req, res, next) => {
//     const token = req.cookies.Authorization;
//     try {
//         const payload = await verifyAsync(token, process.env.SECRET_KEY);
//         if(payload.admin === false) throw authorizationError;
//     }catch (error) {
//         next(authorizationError)
//     }
//     next();
// };

/************************************** Login Authentication ************************/

async function loginName(req, res) {
    try {
        const { token } = req.headers;
        //Get data from token after veify this token
        const payload = await verifyAsync(token, process.env.SECRET_KEY);
        return payload.name;
    } catch (error) {
        console.log(error)
    }

};

async function loginID(req, res) {
    try {
        const { token } = req.headers;
        //Get data from token after veify this token
        const payload = await verifyAsync(token, process.env.SECRET_KEY);
        return payload.id;
    } catch (error) {
        console.log(error)
    }
};
module.exports = { loginName, authorizeAdminsPriv, loginID, requireAuth }
