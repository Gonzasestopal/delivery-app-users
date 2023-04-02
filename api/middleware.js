const db = require('./db-config.js');
const users = require('../repositories/users.js');
const jwt = require("jsonwebtoken");

const config = process.env;

module.exports = {
	validateItemId,
	validatePostReqBody,
	isAdmin,
	verifyToken
}

function validateItemId(req, res, next) {
	users.findById(req.params.id)
		.then(response => {
			if (response) {
				res.id = response
				next()
			} else {
				res.status(404).json({ message: 'No item found with that ID.' })
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Error finding the item ID.' })
		})
}

function validatePostReqBody(req, res, next) {
	if (!req.body.name) {
		res.status(404).json({ message: 'Name field is required.' })
	}
	if (!req.body.email) {
		res.status(404).json({ message: 'Email field is required.' })
	}
	if (!req.body.password) {
		res.status(404).json({ message: 'Password field is required.' })
	}
	next();

}

function isAdmin(req, res, next) {
	const token =
		req.body.token || req.query.token || req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		const decoded = jwt.verify(token, config.TOKEN_KEY);
		req.user = decoded;

		if (!decoded.is_admin) {
			return res.status(401).send("Operation not allowed");
		}

	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	return next();
}


function verifyToken(req, res, next) {
	const token =
		req.body.token || req.query.token || req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		const decoded = jwt.verify(token, config.TOKEN_KEY);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	return next();
};


