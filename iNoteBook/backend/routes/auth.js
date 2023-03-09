const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser")

const JWT_SECRET = "xfdxq1@3$5^7*9)!2#4%6&8(10.v";
// ROUTE 1 : Create a user using POST ===>> "/api/auth/signup". No login required
router.post(
	"/signup",
	body("name").isLength({ min: 2 }),
	body("email").isEmail(),
	body(
		"password",
		"Password must be greater than equal to 8 characters"
	).isLength({ min: 8 }),
	async (req, res) => {
		// if error then return bad request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			// check whether the email exists already
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res
					.status(400)
					.json({ error: "User already exists with this email" });
			}
			const salt = await bcrypt.genSalt();
			let secured_pass = await bcrypt.hash(req.body.password, salt);
			// Create a new User
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: secured_pass,
			});
			const data = {
				user: {
					id: user.id,
				},
			};
			const authtoken = jwt.sign(data, JWT_SECRET);
			res.json({ authtoken });
		} catch (error) {
			console.error(error.message);
			res.status(500).json({error:"Internal Server Error Occured"});
		}
	}
);

// ROUTE 2 : Authenticate a user using POST ===>> "/api/auth/login". No login required
router.post(
	"/login",
	body("email", "Enter a valid email").isEmail(),
	body("password", "Password cannot be blank").exists(),
	async (req, res) => {
		// if error then return bad request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const email = req.body.email;
		const password = req.body.password;
		try {
			let user = await User.findOne({ email: email });
			if (!user) {
				return res
					.status(400)
					.json({ error: "Please try to login with correct credentials" });
			}
			const password_compare = await bcrypt.compare(password, user.password);
			if (!password_compare) {
				return res
					.status(400)
					.json({ error: "Please try to login with correct credentials" });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};
			const authtoken = jwt.sign(payload, JWT_SECRET);
			res.json({ authtoken });
		} catch (error) {
			console.error(error.message);
			res.status(500).json({error:"Internal Server Error Occured"});
		}
	}
);
// ROUTE 3 : Get Loggedin User Details Using POST ===>> "/api/auth/login". Login Required
router.post(
	"/getuser",fetchUser,
	async (req, res) => {
		try {
			const userID = req.user.id;
			const user = await User.findById(userID).select("-password");
			res.status(200).send(user)
		} catch (error) {
			console.error(error)
			res.status(500).send("Internal Server Error")
		}
	}
);
module.exports = router;
