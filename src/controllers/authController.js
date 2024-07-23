const { loginUser } = require("../services/authService");

async function login(req, res) {

    try {
        const loginPayload = req.body;
        // Here we will call loginUser function for response and pass the authDetails by using loginPayload
        const response = await loginUser(loginPayload);
        // here we will return the Token by cookie_parser
        res.cookie("authToken", response, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            success: true,
            message: "LoggedIn success",
            data: {},
            error: {}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            data: {},
            error: error
        })
    }
}

async function logout(req,res){
    res.cookie("authToken", '');
    return  res.status(200).json({
        success:true,
        message:"Log out success",
        data:{},
        error:{}
    })
}

module.exports = {
    login,
    logout
}