import Router from 'express';
import usersController from '../controllers/usersController.js';
import validateUserEmail from '../middleware/userHandler.js';

const router = Router();

router.use((req, res, next) => {
	console.log('---> EX:usersRouter.js');
	next();
})
router.use((req, res, next) => {
	validateUserEmail(req,next)
	next();
})

router.route('/register')
	.post(usersController.registerUser); // get('/',function (req, res) {})

router.route('/login')
	.post(usersController.loginUser);



export default router;
