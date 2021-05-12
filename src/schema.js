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
	}

	type CarOwner {
		id: ID!
		profile: Profile!
		car: Car!
		available: Boolean!
		ratePerDay: Int!
		maxMilesPerDay: Int!
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
		availableCars(first: Int, after: String, before: String, filter: CarFilter): CarConnection!
		profile(id: ID!): Profile
		carOwner(id: ID!): CarOwner
		transactions(first: Int, after: String, before: String, filter: StatusFilter, carOwnerId: ID, renterId: ID): TransactionConnection!
		transaction(id: ID!): Transaction
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

		imageUpload(file: Upload!): File
		deleteImage(fileId: ID!): String
	}


`;