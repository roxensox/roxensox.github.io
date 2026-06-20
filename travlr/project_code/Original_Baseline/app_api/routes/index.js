const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON web tokens

const tripsController = require("../controllers/trips");
const authController = require('../controllers/authentication');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

router
	.route('/trips')
	.get(tripsController.tripsList)         // GET method routes tripList
        .post(authenticateJWT, tripsController.tripsAddTrip);     // POST method adds a trip

router
	.route('/trips/:tripCode')		// GET method routes a single trip
	.get(tripsController.tripsFindByCode) 	// Requires parameter
        .put(authenticateJWT, tripsController.tripsUpdateTrip);  // PUT method updates a trip

function authenticateJWT(req, res, next) {
	//console.log('In Middleware');
//
	const authHeader = req.headers['authorization'];
	//console.log('Auth Header: ' + authHeader);
	
	if (authHeader == null) {
		console.log('Auth Header required but not present.');
		return res.sendStatus(401);
	}
	
	let headers = authHeader.split(' ');
	if (headers.length < 1) {
		console.log('Not enough tokens in Auth Header: ' + headers.length);
		return res.sendStatus(501);
	}
	
	const token = authHeader.split(' ')[1];
	//console.log('Token: ' + token);

	if (token == null) {
		console.log('Null Bearer Token');
		return res.sendStatus(401);
	}

	//console.log(process.env.JWT_SECRET);
	//console.log(jwt.decode(token));
	const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
		if (err) {
			// console.log("Invalid token");
			return res.sendStatus(401).json('Token validation error');
		}
		req.auth = verified; // Set the auth param to the decoded object
	});
	next();
}

module.exports = router;
