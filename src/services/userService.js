const { createCart } = require("../repository/cartRepository");
const { findUser, createUser } = require("../repository/userRepository");

    async function registerUser(userDetails) {
        // here we will find the user by email already exist or not with the help of repository layer
        const userByEmail = await findUser({
            email: userDetails.email,
        });

        //if the user already exist then throw this error
        if (userByEmail) {
            throw { reason: `User with the given ${userDetails.email} already exist, Please fill valid email`, statusCode: 400 }
        };

        // here we will find the user by MobileNumber already exist or not with the help of repository layer
        const userByMobileNumber = await findUser({
            mobileNumber: userDetails.mobileNumber
        });

        //if user already exist then throw this error
        if (userByMobileNumber) {
            throw { reason: `User with the given ${userDetails.mobileNumber} mobile number already exist`, statusCode: 400 }
        };


        // Here we will create a new user with the help of (createUser) function which lies in repository layer
        const newUser = await createUser({
            email: userDetails.email,
            password: userDetails.password,
            firstName: userDetails.firstName,
            midName: userDetails.midName,
            lastName: userDetails.lastName,
            mobileNumber: userDetails.mobileNumber
        });

        // if user can't create then thwo the error
        if (!newUser) {
            throw { reason: `Something went wrong user can't create`, statusCode: 500 }
        }

        // Here we can create the Cart for new user

        await createCart(newUser._id);

        return newUser;
    }

module.exports = registerUser;