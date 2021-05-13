const { gql } = require('apollo-server-express')

const typeDefs = gql`
	scalar Upload

	type File {
		filename: String!
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
		address: String!
		secondaryAddress: String!
		state: String!
		zipCode: String!
		dob: String!
		rating: Int!
		renting: Boolean!
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
		image: CarImage!
		ratePerDay: Int!
		maxMilesPerDay: Int!
		available: Boolean!
		owner: CarOwner!
	}

	type CarOwner {
		id: ID!
		profile: Profile!
		cars: [Car]!	
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
		owner: CarOwner!
		renter: Profile!
		car: Car!
		status: Status! 
	}

	type TransactionConnection {
		edges: [TransactionEdges!]!
		pageInfo: PageInfo
	}

	type TransactionEdges {
		cursor: String!
		node: Transaction!
	}

	type CarConnection {
		edges: [CarEdges!!
		pageInfo: PageInfo
	}

	type CarEdges {
		cursor: String!
		node: Car!
	}

	input ProfileInput {
		user: User
		avatar: ProfileImage
		license: String
		firstName: String
		lastName: String
		address: String
		secondaryAddress: String
		state: String
		zipCode: String
		dob: String
		rating: Int
		renting: Boolean
	}

	input UserInput {
		email: String
		password: String
	}

	input CarInput {
		make: String
		model: String
		year: String
		vin: String
		condition: String
		image: CarImage
	}

	input CarOwnerInput {
		profile: Profile
		car: Car
		available: Boolean
		ratePerDay: Int
		maxMilesPerDay: Int
	}

	input TransactionInput {
		owner: CarOwner
		renter: Profile
		status: Status!
	}

	type Query {
		profile(id: ID!): Profile 
		carOwner(id: ID!): CarOwner
		cars(first: Int, after: String, last: Int, before: String, filter: CarFilter): CarConnection!
		car(id: ID!): Car
	}

	type Mutation {
		addProfile(input: ProfileInput!): Profile
		updateProfile(input: ProfileInput, id: ID!): Profile
		deleteProfile(id: ID!): String

		updateUser(input: UserInput, id: ID!): User
		deleteUser(id: ID!): String

		addCar(input: CarInput): Car
		updateCar(input: CarInput): Car
		deleteCar(id: ID!): String

		addCarOwner(input: CarOwnerInput!): CarOwner
		updateCarOwner(input: CarOwnerInput, id: ID!): CarOwner
		deleteCarOwner(id: ID!): String

		addTransaction(input: TransactionInput): Transaction
		updateTransaction(input: TransactionInput): Transaction
		deleteTransaction(id: ID!): String

		uploadProfileImage(file: Upload!): File
		deleteProfileImage(id: ID!): String
		uploadCarImage(file: Upload!): File
		deleteCarImage(id: ID!): String
	}

`;

module.exports = typeDefs