const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'first Name must provided'],
        minlength: [5, 'first Name must be atleast 5 characters long'],
        maxlength: [20, 'first Name can not greater then 20 characters'],
        trim: true,
        lowercase: true
    },
    midName: {
        type: String,
        maxlength: [20, 'mid Name can not greater then 20 characters'],
        trim: true,
        lowercase: true,
        default: ""
    },
    lastName: {
        type: String,
        required: [true, 'last Name must provided'],
        minlength: [5, 'last Name must be atleast 5 characters long'],
        maxlength: [20, 'last Name can not greater then 20 characters'],
        trim: true,
        lowercase: true
    },
    mobileNumber: {
        type: String,
        trim: true,
        unique: [true, 'Phone number is already in use'],
        minlength: [10, 'mobile number atleast 10 numbers long'],
        maxlength: [10, `mobile number can't greater then 10 numbers`],
        required: [true, 'phone number should be provided']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'email should be provided'],
        unique: [true, 'email is already in use'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'password atleast 6 characters long'],
        maxlength: [20, 'password atleast 20 characters length']
    },
    role:{
        type:String,
        enum:["USER", "ADMIN"],
        default:"USER"
    }
}, {
    timestamp: true
});

userSchema.pre('save', async function(){
    // here we can bcrypt (Hashed) the user password before save in mongoDB
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
})


const User = mongoose.model("User", userSchema);

module.exports = User;