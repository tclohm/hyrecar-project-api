const { gql } = require('apollo-server-express')

const typeDefs = gql`
	scalar Upload
	scalar DateTime

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
		createdAt: DateTime!
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

	type Rating {
		id: ID!
		interiors: Float!
		exteriors: Float!
		steering: Float!
		braking: Float!
		acceleration: Float!
		cleaniness: Float!
		review: String!
		reviewer: Profile!
	}

	type Car {
		id: ID!
		make: String!
		model: String!
		year: String!
		vin: String!
		type: CarType!
		available: Boolean!
		ratePerDay: Int!
		maxMilesPerDay: Int!
		airConditioning: Boolean!
		image: CarImage!
		owner: Profile!
		rating: [Rating]!
	}

	enum CarType {
		ALL
		MICROCAR
		MINICOMPACT
		SUBCOMPACT
		COMPACT
		MID_SIZE
		FULL_SIZE
		FULL_SIZE_LUXURY
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

	type Query {
		cars(type: CarType, year: Int, id: ID): [Car]
		car(id: ID!): Car
		profile(id: ID!): Profile
	}

	type Mutation {
		uploadProfileImage(file: Upload!): ProfileImage
		uploadCarImage(file: Upload!): CarImage
	}

`;

module.exports = typeDefs