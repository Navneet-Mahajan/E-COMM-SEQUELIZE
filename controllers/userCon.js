const passport = require('passport');
const jwt = require("jsonwebtoken");

const { Users } = require('../database/dbModels').models;
const SECRET_KEY = process.env.SECRET_KEY;

const { encrypt, decrypt, hash, generateOtp } = require('../utils/utility')
async function register(req, res, next) {
	try {
		console.log(req.body.email)
		if (await Users.findOne({ where: { email: encrypt(req.body.email) } })) {
			throw new Error('User already Exists');
		}
		const user = await Users.create({
			id: req.body.id,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			profileImage: req.file.path,
			role: req.body.role
		});
		res.send(`User Registered Successfully , User:${user}`);
	} catch (error) {
		console.log(error)
		next(error);
	}
}

async function login(req, res, next) {
	try {
		let email = req.body.email;
		let password = req.body.password;
		if (!email || !password) {
			throw new Error("Email and Password Required");
		}
		email = encrypt(email);
		password = hash(password);
		const user = await Users.findOne({
			where: {
				email: email, password: password
			}
		});
		if (!user) {
			throw new Error("User not Found");
		}
		const token = jwt.sign({ sub: user.id }, SECRET_KEY, { expiresIn: "24h" });
		if (token) {
			res.send(`Congratulations ${user.firstName + ' ' + user.lastName}, you are logged in , and your token is ${token}`)
		}
	} catch (err) {
		next(err);
	}
}

async function profile(req, res, next) {
	try {
		const userId = req.user.id;
		const user = await Users.findByPk(userId, {
			attributes: ['id', 'firstName', 'lastName', 'profileImage', 'role'
			]
		});
		res.send(user);
	} catch (error) {
		next(error);
	}
}

async function update(req, res, next) {
	try {
		let updatedPass = req.body.password ? hash(req.body.password) : null;
		let updatedProfile = req.file.path || null;
		const user = await Users.findByPk(req.user.id);
		const [updatedRowsCount] = await Users.update({
			firstName: req.body.firstName || user.firstName,
			lastName: req.body.lastName || user.lastName,
			profileImage: updatedProfile || user.profileImage,
			password: updatedPass || user.password,
		}, { where: { id: user.id } });
		console.log(updatedRowsCount);
		res.send(await Users.findByPk(req.user.id, {
			attributes: ['firstName', 'lastname', 'profileImage', 'role']
		}));
	} catch (error) {
		next(error);
	}
}

async function sendOtp(req, res, next) {
	try {
		let user = await Users.findOne({ where: { email: encrypt(req.body.email) } });
		if (!user) {
			throw new Error("User not Found");
		}
		user.OTP = generateOtp();
		await user.save();
		res.send(user.OTP)
	} catch (error) {
		next(error);
	}
}

async function resetPassword(req, res, next) {
	try {
		let user = await Users.findOne({ where: { email: encrypt(req.body.email) } });
		if (!user) {
			throw new Error("User not Found");
		}
		if (user.OTP != req.body.OTP) {
			throw new Error("OTP is incorrect");
		}
		let updatedPass = hash(req.body.newPassword);
		user.password = updatedPass;
		await user.save();
		res.send("password Reset")
	} catch (error) {
		next(error);
	}
}

module.exports = { register, login, profile, update, sendOtp, resetPassword }