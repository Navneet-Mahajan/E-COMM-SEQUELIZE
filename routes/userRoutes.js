const router = require('express').Router();
const upload = require('../middlewares/multer');
const { register, login, profile, update, sendOtp, resetPassword } = require('../controllers/userCon');
const { registerValidate, loginValidate, updateValidate, forgetPassValidate, resetPassValidate } = require('../validations/userValidations')
const { validate } = require('express-validation');
const { authorize } = require('../middlewares/authorize');

router.post('/register', upload.single('profileImage'), validate(registerValidate, { context: true }, { abortEarly: false }), register);

//To login
router.post('/', validate(loginValidate), login);

//Profile Route  
router.get('/', authorize(), profile);

//update Route
router.put('/', authorize(), upload.single('profileImage'), validate(updateValidate), update);

//send otp
router.post('/send-otp', validate(forgetPassValidate), sendOtp);

// reset-password 
router.put('/reset-password', validate(resetPassValidate), resetPassword);

module.exports = router;