const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnAuthorisedError = require('../utils/unAuthoriserError');


async function isLoggedIn(req, res, next) {
    const token = req.cookies['authToken'];
    if (!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No auth Token provided"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            throw new UnAuthorisedError();
        }
        req.user = {
            email: decoded.email,
            id: decoded.id,
            role:decoded.role
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            data: {},
            error: error,
            message: "Invalid Token provided"
        })
    }

}


// This function check if the authenticated user is an admin or not
function isAdmin(req, res, next) {
    const loggedInUser = req.user;
    if (loggedInUser.role == "ADMIN") {
        next();
    } else {
        return res.status(401).json({
            success: false,
            data: {},
            message: "You are not authorsied for this action",
            error: {
                statusCode: 401,
                reason: "unauthorsied user for this action"
            }
        });
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}