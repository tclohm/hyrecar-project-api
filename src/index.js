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
	
	return { req, res, models }

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


app.get('/', (req, res) => {
	res.json({
		'api': true,
	});
});

app.listen({ port }, (error) => {
	if (error) throw error;
	console.info(`🚀🚀🚀 ✅ Server ready at ${url}`);
})