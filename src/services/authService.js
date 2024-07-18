const { findUser } = require("../repository/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

// Here we will get user details for login
async function loginUser(authDetails) {
    const email = authDetails.email;
    const planePassword = authDetails.password;
    // Check if there is a user registered with the given email


    // Here we will find the user by given email
    const user = await findUser({ email });
    // if the user not found 
    if (!user) {
        throw { message: "No user with the given email", statusCode: 404 }
    }

    // if the user is found we need to compare planePassword with hasshed Password
    const isPasswordValidated = await bcrypt.compare(planePassword, user.password);

    // if the isPlanePasword can't valid 
    if (!isPasswordValidated) {
        throw { message: "Invalid password, please try again", statusCode: 401 }
    }

    const userRole = user.role ? user.role : "USER"

    // if the password is validated, create a token and return it 
    const token = jwt.sign(
        { email: user.email, id: user._id, role: userRole }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    }
    );
    return token;
}


module.exports = {
    loginUser
}