const User = require('../schema/userSchema');

async function findUser(parameter) {
    try {
        const response = await User.findOne({ ...parameter });
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function createUser(userDetails) {
    try {
        const respone = await User.create(userDetails);
        return respone;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    findUser,
    createUser
}