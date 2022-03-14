import HttpError from "http-errors"

const validateUserEmail = (error, req, res, next) => {

    console.log("-+++++++++++++++++++++++++--> EX:errorHandler::userHandler");
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.body.username)) {
		next(HttpError(400, { message: 'Error formato username' }))
    }

}


export default validateUserEmail;
