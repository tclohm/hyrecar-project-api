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

function createToken(info) {
	console.log("creating token")
	console.log(info)
	if (!info.app_metadata.roles) {
		throw new UserInputError("error, not complete");
	}


	return jwt.sign(
		{
			sub: info.sub,
			app_metadata: info.app_metadata,
			expiresAt: info.expiresAt
		},
		process.env.JWT_SECRET,
		{ algorithm: "HS256", expiresIn: "5h" }
	);
};

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
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