const fs = require('fs')
const { parse, join } = require('path')
const { ApolloErorr, UserInputError } = require('apollo-server-express')


module.exports = {
	Query: {
		profile(_, {id}, {models}) {
			return models.Profile.findOne({ profile: profile.id })
		},
		carOwner(_, {id}, {models}) {
			return models.Owner.findOne({ owner: owner.id })
		},
		// car connection
		cars(_, {filter}, {models}, info) {
			const query = info.fieldNodes.find(field => field.name.value === info.fieldName)
			return models.Car.find(filter, query)
		},
		// car, look into using the parent to get the car
		car(_, {id}, {models}) {
			return models.Car.findOne()
		},
	},
	Mutation: {
		addProfile(_, {input}, {models}) {
			return models.Profile.insert(input)
		},
		updateProfile(_, {input, id}, {models}) {
			return models.Profile.update(input, id)
		},
		deleteProfile(_, {id}, {models}) {
			return models.Profile.remove(id)
		},
		addUser(_, {input}, {models}) {
			return models.User.create(input)
		},
		updateUser(_, {input, id}, {models}) {
			return models.User.update(input, id)
		},
		deleteUser(_, {id}, {models}) {
			return models.User.remove(id)
		},
		addCar(_, {input}, {models}) {
			return models.Car.insert(input)
		},
		updateCar(_, {input, id}, {models}) {
			return models.Car.update(input, id)
		},
		deleteCar(_, {id}, {models}) {
			return models.Car.remove(id)
		},
		addCarOwner(_, {input}, {models}) {
			return models.Owner.insert(input)
		},
		updateCarOwner(_, {input, id}, {models}) {
			return models.Owner.update(input, id)
		},
		deleteCarOwner(_, {id}, {models}) {
			return models.Owner.remove(id)
		},
		addTransaction(_, {input}, {models}) {
			return models.Transaction.insert(input)
		},
		updateTransaction(_, {input}, {models}) {
			return models.Transaction.update(input, id)
		},
		deleteTransaction(_, {id}, {models}) {
			return models.Transaction.remove(id)
		},
		uploadProfileImage(_, {file}, {models}) {
			return models.Profile.Image.insert(file)
		},
		deleteProfileImage(_, {id}, {models}) {
			return models.Profile.Image.remove(id)
		},
		uploadCarImage(_, {file}, {models}) {
			return models.Car.Image.insert(file)
		},
		deleteCarImage(_, {id}, {models}) {
			return models.Car.Image.remove(id)
		}
	},
	Profile: {
		transactions(profile, {first, after, last, before, filter}, {models}) {
			return models.Transaction.findMany({ profile: profile.id })
		}
	},
	CarOwner: {
		cars(owner, _, {models}) {
			return models.Owner.findMany({ owner: owner.id })
		},
		transactions(owner, {first, after, last, before, filter}, {models}) {
			return models.Transaction.findMany({ owner: owner.id })
		}
	},
	Car: {
		owner(car, _, {models}) {
			return models.Owner.findOne({ car: car.id })
		}
	}
}