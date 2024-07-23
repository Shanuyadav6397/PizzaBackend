const { createOrder, getAllOrdersByUser, getOrderByOrderId, UpdateOrderStatusById } = require("../services/orderService");
const AppError = require("../utils/appError");

async function createNewOrder(req, res) {
    try {
        const order = await createOrder(req.user.id, req.body.paymentMethod);
        return res.status(201).json({
            success: true,
            message: 'Successfully placed the order',
            error: {},
            data: order
        })
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function getOrdersByUserId(req, res) {
    try {
        const order = await getAllOrdersByUser(req.user.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the orders',
            error: {},
            data: order
        })
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function getOrderById(req, res) {
    try {
        const order = await getOrderByOrderId(req.params.orderId);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the order',
            error: {},
            data: order
        })
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function cancelOrder(req, res) {
    try {
        const order = await UpdateOrderStatusById(req.params.orderId, "CANCELLED");
        return res.status(201).json({
            success: true,
            message: 'Successfully updated the order',
            error: {},
            data: order
        })
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function updateOrderByAdmin(req, res) {
    try {
        const order = await UpdateOrderStatusById(req.params.orderId, req.body.status);
        return res.status(201).json({
            success: true,
            message: 'Successfully updated the order',
            error: {},
            data: order
        })
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}


module.exports = {
    createNewOrder,
    getOrdersByUserId,
    getOrderById,
    cancelOrder,
    updateOrderByAdmin
}