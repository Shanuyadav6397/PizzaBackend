const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name must required'],
        minlenght: [5, 'Product name must be atleast 5 character long'],
        trim:true
    },
    description: {
        type: String,
        minlenght: [5, 'Product description must be atleast 5 character long']
    },
    productImage: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'product price is required']
    },
    quantity:{
        type:Number,
        required:true,
        default:10
    },
    category: {
        type: String,
        enum: ['veg', 'Non-veg'],
        default: 'veg'
    },
    inStock: {
        type: Boolean,
        required: [true, 'in stock status in required'],
        default: true
    }
}, {
    timestamps: true
});


const Product = mongoose.model("Product", productSchema);


module.exports = Product;