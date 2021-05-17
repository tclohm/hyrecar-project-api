require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { createToken, hashPassword, verifyPassword, getDatePlusFiveHours } = require('./lib/utils');

const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { models } = require('./db');

const port = process.env.PORT || 4000;
const url = process.env.SERVICE_URL || 'http://localhost:4000';
const app = express();

const options = {
	origin: process.env.BASE_URL || 'http://localhost:3000',
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true
}

app.use(cors(options));
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.disable('x-powered-by');
app.use(cookieParser());
app.use("/static/assets/images", express.static(path.join(__dirname, "../static/assets/images")));
app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));

const context = ({ req, res }) => {
	const token = req.headers.authorization || ''

	try {
		const { id } = jwt.verifyPassword(token.split(' ')[1], SECRET_KEY)
		return { req, res, models, id }
	} catch (error) {
		return { req, res, models }
	}

	

} 

const server = new ApolloServer({
	introspection: (process.env.NODE_ENV === 'production') ? false : true,
	playground: (process.env.NODE_ENV === 'production') ? false : true,
	uploads: false,
	typeDefs,
	resolvers,
	context,
	cors: false
}).applyMiddleware({ app, cors: false });

app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res) => {
	const { email, password, owner } = req.body
	try {
		const exists = await model.User.findOne({ email })
		if (exists) {
			res.status(404).json({ success: false })
			return
		}

		const hashedPassword = await hashedPassword(password)

		const app_metadata = {
			roles: ['renter'],
			permissions: ['create:own_content', 'edit:own_content', 'upload:own_media'],
		}

		if (owner) {
			app_metadata.roles.push('owner')
		}

		const user = await models.User.create({
			email,
			password
		})

		if (user) {
			const { id } = user
			const expiresAt = getDatePlusFiveHours()
			const info = Object.assign({}, { sub: id, email, app_metadata, expiresAt })
			const token = createToken(info)

			const savedToken = await models.Token.create({
				refreshToken: token,
				userId: id,
				expiresAt
			})

			console.log('saved token')

			if (!savedToken) {
				res.status.json({ success: false })
			}

			res.cookie('token', token, {
				httpOnly: true,
				secure: true,
				maxAge: 18000000,
				sameSite: 'Strict'
			})

			res.status(200).json({ success: true })
		}
	} catch (err) {
		res.json({ sucess: false })
	}
})

app.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await models.User.findOne({ email })
		if (!user) {
			res.status(404).json({ success: false })
			return
		}

		const valid = verifyPassword(password, user.password)

		if (valid) {
			const { id, email, app_metadata } = user
			const expiresAt = getDatePlusFiveHours()
			const info = Object.assign({}, { sub: id, email, app_metadata, expiresAt })
			const token = createToken(info)

			const savedToken = await models.Token.create({
				refreshToken: token,
				userId: id,
				expiresAt
			})

			console.log('saved token')

			if (!savedToken) {
				res.status.json({ success: false })
			}

			res.cookie('token', token, {
				httpOnly: true,
				secure: true,
				maxAge: 18000000,
				sameSite: 'Strict'
			})

			res.status(200).json({ success: true })
		}
	} catch (err) {
		res.json({ success: false })
	}
})

app.get('/', (req, res) => {
	res.json({
		'api': true,
	});
});

app.listen({ port }, (error) => {
	if (error) throw error;
	console.info(`🚀🚀🚀 ✅ Server ready at ${url}`);
})