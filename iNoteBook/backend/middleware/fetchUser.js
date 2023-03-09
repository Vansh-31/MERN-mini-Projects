const jwt = require("jsonwebtoken");
const JWT_SECRET = "xfdxq1@3$5^7*9)!2#4%6&8(10.v";
const fetchUser = (req, res, next) => {
	// Get the user from the jwt and add id to req object
	const token = req.header("auth-token");
	if (!token) {
		res.status(401).send("Please Authenticate using a valid token");
	}
	try {
		const data = jwt.verify(token, JWT_SECRET);
		req.user = data.user;
		next();
	} catch (error) {
		res.status(401).send("Please Authenticate using a valid token");
	}
};

module.exports = fetchUser;
