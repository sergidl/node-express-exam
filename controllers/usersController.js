import HttpError from "http-errors";
import usersList from "../data/user.js"
import usersModel from '../models/usersModel.js';
import bcrypt from "bcrypt"

const registerUser = (req, res, next) => {
	let exists = 0
	if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.body.username)) {

		usersList.forEach(element => {
			if (element.username == req.body.username) {
				exists = 1
				next(HttpError(400, { message: 'UPS!! Usuario Existente' }));
			}
		})
		if (exists == 0) {

			console.log("---> EX:usersController::registerUsers");
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(req.body.password, salt);
			req.body.password = hash
			let users = usersModel.registerUser(req.body, next);
			console.log(`---> END:usersModel::registerUser `);
			
			res.send(users)
		}
	}
	else {
		next(HttpError(400, { message: 'Error formato username' }))
	}
}

const loginUser = (req, res, next) => {


	console.log("---> EX:usersController::loginUsers");
	const user = usersModel.loginUser(req.body);
	console.log(`---> END:usersModel::loginUser `);
	res.send(user)
}


export default {
	registerUser,
	loginUser
}
