const Cart = require('../schema/cartSchema');


async function createCart(userId) {
    try {
        const newCart = await Cart.create({
            user:userId
        });
        return newCart
    } catch (error) {
        if (error.name == 'ValidatorError') {
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return property, error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        throw new InternalServerError();
    }
}


module.exports = {
    createCart
}