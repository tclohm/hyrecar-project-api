const fs = require('fs')
const { parse, join } = require('path')
const { ApolloErorr, UserInputError } = require('apollo-server-express')


module.exports = {
	Query: {
		profile(_, {id}, {models}) {
			return models.Profile.findOne({ profile: profile.id })
		},
		carOwner(_, {id}, {models}) {
			return models.CarOwner.findOne({ owner: owner.id })
		},
		// car connection
		cars(_, {first, after, last, before, filter}, {models}) {
			return models.CarOwner.find(first, after, last, before, {})
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
			return models.Profile.delete(id)
		},
		updateUser(_, {input, id}, {models}) {
			return models.User.update(input, id)
		},
		deleteUser(_, {id}, {models}) {
			return models.User.delete(id)
		},
		addCar(_, {input}, {models}) {
			return models.Car.insert(input)
		},
		updateCar(_, {input, id}, {models}) {
			return models.Car.update(input, id)
		},
		deleteCar(_, {id}, {models}) {
			return models.Car.delete(id)
		},
		addCarOwner(_, {input}, {models}) {
			return models.CarOwner.insert(input)
		},
		updateCarOwner(_, {input, id}, {models}) {
			return models.CarOwner.update(input, id)
		},
		deleteCarOwner(_, {id}, {models}) {
			return models.CarOwner.delete(id)
		},
		addTransaction(_, {input}, {models}) {
			return models.Transaction.insert(input)
		},
		updateTransaction(_, {input}, {models}) {
			return models.Transaction.update(input, id)
		},
		deleteTransaction(_, {id}, {models}) {
			return models.Transaction.delete(id)
		},
		uploadProfileImage(_, {file}, {models}) {
			return models.ProfileImage.insert(file)
		},
		deleteProfileImage(_, {id}, {models}) {
			return models.ProfileImage.delete(id)
		},
		uploadCarImage(_, {file}, {models}) {
			return models.CarImage.insert(file)
		},
		deleteCarImage(_, {id}, {models}) {
			return models.CarImage.delete(id)
		}
	},
	Profile: {
		transactions(profile, {first, after, last, before, filter}, {models}) {
			return models.Transaction.findMany({ profile: profile.id })
		}
	},
	CarOwner: {
		cars(owner, _, {models}) {
			return models.CarOwner.findMany({ owner: owner.id })
		},
		transactions(owner, {first, after, last, before, filter}, {models}) {
			return models.Transaction.findMany({ owner: owner.id })
		}
	},
	Car: {
		owner(car, _, {models}) {
			return models.CarOwner.findOne({ car: car.id })
		}
	}
}