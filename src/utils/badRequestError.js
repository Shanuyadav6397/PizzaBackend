const AppError = require("./appError")

class BadRequestError extends AppError{
    constructor(invalidParms){
        let message = '';
        invalidParms.forEach(Parms => message += `${Parms}\n`);

        super(`The request has the following invalid parameters \n ${invalidParms}`, 404);
    }
}


module.exports = BadRequestError;