import HttpError from "http-errors"

const validateUserEmail = (req, next) => {
    console.log("-+++++++++++++++++++++++++--> EX:userHandler::userHandler");
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.body.username)) {

        next(HttpError(400, { message: 'Error formato username' }))
    }

}


export default validateUserEmail;
