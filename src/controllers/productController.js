const { createProduct, getProductById, deleteProductById } = require('../services/productService');
const AppError = require('../utils/appError');

async function addProduct(req, res) {
    try {
        const Product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            imagePath: req.file?.path,
            price: req.body.price,
            category: req.body.category,
            inStock: req.body.inStock
        });

        return res.status(201).json({
            success: true,
            message: "Succesfully created the product",
            error: {},
            data: Product
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: {},
            error: error
        });
    }

}

async function getProduct(req, res) {
    try {
        const getProduct = await getProductById(req.params.id);
        return res.status(201).json({
            success: true,
            message: "Succesfully fetch the product",
            error: {},
            data: getProduct
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Can not fetch the Product",
            data: {},
            error: error
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const deleteProduct = await deleteProductById(req.params.id);
        return res.status(201).json({
            success: true,
            message: "Succesfully deleted the product",
            error: {},
            data: deleteProduct
        })
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Can not delete the Product",
            data: {},
            error: error
        });
    }
}


module.exports = {
    addProduct,
    getProduct,
    deleteProduct
}