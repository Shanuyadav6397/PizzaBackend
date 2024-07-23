const { getCartByUserId } = require("../repository/cartRepository");
const { createNewOrder, getOrdersByUserId, getOrderById, updateOrderStatus } = require("../repository/orderRepository");
const { findUser } = require("../repository/userRepository");
const { clearProductFromCart } = require('../services/cartService');
const BadRequestError = require("../utils/badRequestError");
const InternalServerError = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");

async function createOrder(userId, paymentMethod) {

    const cart = await getCartByUserId(userId);
    const user = await findUser({ _id: cart.user });
    if (!cart) {
        throw new NotFoundError('Cart');
    }

    if (cart.items.length === 0) {
        throw new BadRequestError(['Cart is empty, please add some item to the cart'])
    }

    const orderObject = {}

    orderObject.user = cart.user;
    orderObject.items = cart.items.map(cartItem => {
        return {
            product: cartItem.product._id,
            quantity: cartItem.quantity
        }
    });
    orderObject.status = "ORDERED";
    orderObject.price = 0;
    cart.items.forEach((cartItem) => {
        orderObject.price += cartItem.quantity * cartItem.product.price
    });
    orderObject.addres = user.address;
    orderObject.paymentMethod = paymentMethod;

    const order = await createNewOrder(orderObject);

    if (!order) {
        throw new InternalServerError();
    }

    await clearProductFromCart(userId);

    return order;
}

async function getAllOrdersByUser(userId){
    const orders = await getOrdersByUserId(userId);
    if(!orders){
        throw new NotFoundError("orders");
    }

    return orders;
}

async function getOrderByOrderId(orderId){
    const order = await getOrderById(orderId);
    console.log(orderId)
    if(!order){
        throw new NotFoundError("order");
    }

    return order;
}

async function UpdateOrderStatusById(orderId, status){
    const order = await updateOrderStatus(orderId, status);
    if(!order){
        throw new NotFoundError("order");
    }

    return order;
}

module.exports = {
    createOrder,
    getAllOrdersByUser,
    getOrderByOrderId,
    UpdateOrderStatusById
}