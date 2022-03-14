import users from './users/users.js';
import userPojo from './users/userPojo.js';


class UsersModel {
	registerUser(req) {
		console.log(`---> EX:usersModel::registerUser `);
		let new_user = userPojo(req)
		if (typeof new_user == 'undefined')
			throw new Error('Ups! Error new_user');
		let user=users.registerUser(new_user)
		console.log(`---> END:users::registerUsers`);
		return user

	}

	loginUser(req) {

		console.log(`---> EX:usersModel::loginUser `);
		const user=users.loginUser(req)
		console.log(`---> END:users::loginUsers`);

		return user


	}
}

export default new UsersModel()
