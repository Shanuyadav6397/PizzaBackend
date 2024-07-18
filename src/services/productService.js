const cloudinary = require('../config/cloudinaryConfig');
const productRepository = require('../repository/productRepository');
const fs = require('fs/promises');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails) {
    /** 1. We should check if an image is coming to create the product, then we 
     *     sholud upload it on cloudinary */
    /** 2. Then use the url from cloudinary and other product Details to add product in db */

    const imagePath = productDetails.imagePath;
    try {
        if (imagePath) {
            const cloudinaryResponse = cloudinary.uploader.upload(imagePath);
            var productImage = (await cloudinaryResponse).secure_url;
            await fs.unlink(imagePath);
        }
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }

    const Product = productRepository.createProduct({
        ...productDetails,
        productImage: productImage
    });

    if (!Product) {
        throw { reason: 'Not able to create product', statusCode: 500 }
    }
    return Product;
}

async function getProductById(productId) {
    const response = await productRepository.getProductById(productId);
    if (!response) {
        throw new NotFoundError("Product");
    }
    return response
}

async function deleteProductById(productId) {
    const response = await productRepository.deleteProductById(productId);
    if (!response) {
        throw new NotFoundError('Product');
    }
    return response
}


module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}