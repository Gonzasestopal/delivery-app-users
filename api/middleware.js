const db = require('../database/db-config.js');
const users = require('../models/users.js');

module.exports = {
	validateItemId,
	validatePostReqBody,
	isAdmin
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
	if (req.user.is_admin) {
		next();
	} else {
		res.status(403).send();
	}
}
