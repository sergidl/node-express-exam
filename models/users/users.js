
import usersList from "../../data/user.js"
import bcrypt from "bcrypt"

class Movies {


	registerUser(req) {
		console.log(`---> EX:users::registerUsers`);
		console.log(req)
		usersList.push(req)
		return usersList

	}
	loginUser(req,next) {
		console.log(`---> EX:users::loginUsers`);
		let userLogged=0
		usersList.forEach(element => {
			if (element.username==req.username) {
				if(bcrypt.compareSync(req.password, element.password)){
					userLogged=element
				}
			}
		})
		if(userLogged==0){
			next(HttpError(400, { message: 'UPS!! Contraseña incorrecta' }));
		}
		return userLogged
	}
}

export default new Movies()
