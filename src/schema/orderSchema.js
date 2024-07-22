const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    price:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:["ORDERED", "CANCELLED", "DELEVERED", "PROCESSING", 'OUT_FOR_DELEVERY'],
        default:"ORDERED"
    },
    address:{
        type:String,
        minlength:[10, "Address should be atleast 10 characters"]
    },
    paymentMethod:{
        type:String,
        enum:["ONLINE", "CASH"],
        default:"CASH"
    }
}, {
    timestamps: true
});


const Order = mongoose.model ("Order", orderSchema);

module.exports = Order