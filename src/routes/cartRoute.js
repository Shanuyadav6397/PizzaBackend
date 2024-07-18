const express = require('express');
const { getCartById } = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.post('/:id', getCartById);

module.exports = {
    cartRouter
}