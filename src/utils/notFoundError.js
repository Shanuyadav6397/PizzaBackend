const AppError = require("./appError")

class NotFoundError extends AppError {
    constructor(resource) {
        super(`Not abel to find ${resource}`, 404);
    }
}


module.exports = NotFoundError;