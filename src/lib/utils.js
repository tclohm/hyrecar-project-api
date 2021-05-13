const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randToken = require("rand-token");
const { UserInputError } = require("apollo-server-express");

module.exports = {
	createToken,
	hashPassword,
	getRefreshToken,
	verifyPassword,
	getDatePlusFiveHours,
	decodedCursor,
	encodedCursor,
};

function createToken(profile) {
	console.log("creating token", )
	if (!profile.app_metadata.roles) {
		throw new UserInputError("error, not complete");
	}

	return jwt.sign(
		{
			sub: profile.sub,
			app_metadata: profile.app_metadata,
			expiresAt: profile.expiresAt
		},
		process.env.JWT_SECRET,
		{ algorithm: "HS256", expiresIn: "5h" }
	);
};

function hashPassword(password) {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(12, (err, salt) => {
			if (err) { reject(err); }
			bcrypt.hash(password, salt, (error, hash) => {
				if (error) { reject(error); }
				resolve(hash);
			});
		});
	});
};

function verifyPassword(attempt, hashed) {
	return bcrypt.compare(attempt, hashed);
}

function getRefreshToken() {
	return randToken.uid(64);
}

function getDatePlusFiveHours() {
	const now = new Date();
	now.setHours(now.getHours()+5);
	return now.toISOString();
}

function encodedCursor(cursor) {
	return Buffer.from(cursor).toString("base64");
}

function decodedCursor(cursor) {
	return Buffer.from(cursor, "base64").toString("ascii");
}