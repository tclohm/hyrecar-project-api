const { gql } = require('apollo-server-express')

const typeDefs = gql`
	scalar Upload

	type File {
		name: String!
		mimetype: String!
		encoding: String!
		location: String!
	}

	type User {
		id: ID!
		email: String!
		password: String!
	}

	type ProfileImage {
		id: ID!
		image: File
	}

	type Profile {
		id: ID!
		user: User!
		avatar: ProfileImage!
		license: String!
		firstName: String!
		lastName: String!
		rating: Int!
		cars: [Car]
		transactions: [Transaction]!
	}

	type CarImage {
		id: ID!
		image: File
	}

	type Car {
		id: ID!
		make: String!
		model: String!
		year: String!
		vin: String!
		condition: String!
		available: Boolean!
		ratePerDay: Int!
		maxMilesPerDay: Int!
		image: CarImage!
		owner: Profile!
	}

	enum Status {
		REJECT
		PENDING
		ACCEPT
		NOOFFER
		CANCEL
		COMPLETED
	}

	type Transaction {
		id: ID!
		renter: Profile!
		car: Car!
		status: Status! 
	}

	input ProfileInput {
		userId: ID
		profileImageId: ID
		license: String
		firstName: String
		lastName: String
		rating: Int
		renting: Boolean
	}

	input CarInput {
		make: String
		model: String
		year: String
		vin: String
		condition: String
		ratePerDay: Int
		maxMilesPerDay: Int
		available: Boolean
		carImageId: ID
		profileId: ID

	}

	input TransactionInput {
		owner: ID
		renter: ID
		status: Status!
	}

	enum Filter {
		profileId
		make
		model
		year
	}


	type Query {
		cars(filter: Filter, id: ID): [Car]
		car(id: ID!): Car
		profile(id: ID!): Profile
	}

	type Mutation {
		uploadProfileImage(file: Upload!): ProfileImage
		uploadCarImage(file: Upload!): CarImage
	}

`;

module.exports = typeDefs