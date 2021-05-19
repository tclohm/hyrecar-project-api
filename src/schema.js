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
		transactions: [Transaction]!	
	}

	enum Status {
		REJECT
		PENDING
		ACCEPT
		NOOFFER
		CANCEL
		COMPLETED
	}

	enum CarFilter {
		AUDI
		MERCEDES
		LAMBORGHINI
		ASTON_MARTIN
		JEEP
		FORD
		TOYOTA
		TESLA
		BMW
		MAZDA
		HONDA
		KIA
		FERRARI
		VOLVO
		CHRYSLER
		HYUNDAI
	}

	type Transaction {
		id: ID!
		owner: CarOwner!
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
		image: ID
	}

	input CarOwnerInput {
		profile: ID
		car: ID
		available: Boolean
		ratePerDay: Int
		maxMilesPerDay: Int
	}

	input TransactionInput {
		owner: ID
		renter: ID
		status: Status!
	}

	type Query {
		profile: Profile 
		owner(id: ID!): CarOwner
		cars(filter: CarFilter): [Car]
		car(id: ID!): Car
		user(id: ID!): Profile
		getUser: User
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

		addTransaction(input: TransactionInput): Transaction
		updateTransaction(input: TransactionInput): Transaction
		deleteTransaction(id: ID!): String

		uploadProfileImage(file: Upload!): ProfileImage
		uploadCarImage(file: Upload!): CarImage
	}

`;

module.exports = typeDefs