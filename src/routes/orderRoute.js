const express = require('express');
const { createNewOrder, getOrdersByUserId, getOrderById, updateOrderByAdmin, cancelOrder } = require("../controllers/orderController");
const { isLoggedIn, isAdmin } = require("../validation/authValidator");

const orderRouter = express.Router();


orderRouter.post('/', isLoggedIn, createNewOrder);
orderRouter.get('/', isLoggedIn, getOrdersByUserId);
orderRouter.get('/:orderId', isLoggedIn, getOrderById);
orderRouter.put('/:orderId/cancel', isLoggedIn, cancelOrder);
orderRouter.put('/:orderId/status', isLoggedIn, isAdmin, updateOrderByAdmin);


module.exports = {
    orderRouter
}