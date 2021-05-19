const fs = require('fs')
const { parse, join } = require('path')
const { ApolloError, UserInputError } = require('apollo-server-express')


module.exports = {
	Query: {
		// car connection
		cars(_, {filter}, {models}, info) {
			return models.Owner.find(filter)
		},
		// car, look into using the parent to get the car
		car(_, {id}, {models}, info) {
			return models.Car.findOne({id})
		},
		profile(_, args, {sub, app_metadata, models}) {
			if (sub) {
				return models.Profile.findOne({ userId: sub })
			}
			return null
		},
		owner(_, {id}, {models}) {
			return models.Owner.find({ profileId: id })
		},
		user(_, {id}, {models}) {
			return models.User.findProfile({ userId: id })
		},
		getUser(_, args, {sub, app_metadata, models}) {
			if (sub) {
				return models.User.findOne({ id: sub })
			}
			return null
		}
	},
	Mutation: {
		addProfile(_, {input}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('edit:own_content')) {
				return null;
			}
			return models.Profile.create(input)
		},
		updateProfile(_, {input, id}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('edit:own_content')) {
				return null;
			}
			return models.Profile.update(input, id)
		},
		deleteProfile(_, {id}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('edit:own_content')) {
				return null;
			}
			return models.Profile.remove(id)
		},
		updateUser(_, {input, id}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('edit:own_content')) {
				return null;
			}
			return models.User.update(input, id)
		},
		deleteUser(_, {id}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('edit:own_content')) {
				return null;
			}
			return models.User.remove(id)
		},
		async addCar(_, {input}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('edit:own_content')) {
				return null;
			}
			// MARK: -- clean this up
			const { make, model, year, vin, condition, carImageId, ...carOwnerFields } = input
			const { id } = await models.Car.create({ make, model, year, vin, condition, carImageId })
			const carOwnerInput = Object.assign({}, carOwnerFields, {carId: id})
			const car = await models.Owner.create(carOwnerInput)
			return car
		},
		updateCar(_, {input, id}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('edit:own_content')) {
				return null;
			}
			return models.Car.update(input, id)
		},
		async deleteCar(_, {id}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('edit:own_content')) {
				return null;
			}
			console.log("in delete", id)
			await models.Owner.remove(id)
			return models.Car.remove(id)
		},
		addTransaction(_, {input}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('edit:own_content')) {
				return null;
			}
			return models.Transaction.insert(input)
		},
		updateTransaction(_, {input}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('edit:own_content')) {
				return null;
			}
			return models.Transaction.update(input, id)
		},
		deleteTransaction(_, {id}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('edit:own_content')) {
				return null;
			}
			return models.Transaction.remove(id)
		},
		async uploadProfileImage(_, {file}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('create:own_content')) {
				return null;
			}

			const { filename, mimetype, createReadStream, encoding } = await file.file;
			let stream = createReadStream();
			let { name, ext } = parse(filename);
			name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');
			let path = join(__dirname, `../static/assets/images/faces/${name}${ext}`);

			await new Promise((resolve, reject) => {
				const writeStream = fs.createWriteStream(path);
				writeStream.on('finish', resolve);
				writeStream.on('error', (error) => {
					fs.unlink(path, () => {
						reject(error);
					});
				});
				stream.on('error', (error) => writeStream.destroy(error));
				stream.pipe(writeStream);
			});
			
			// MARK: -- Record the file metadata in the Database
			const location = path.split('api')[1];

			const image = await models.Profile.Image.insert({ name: filename, mimetype, encoding, location });
			return image
		},
		async uploadCarImage(_, {file}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('create:own_content')) {
				return null;
			}
			const { filename, mimetype, createReadStream, encoding } = await file.file;
			let stream = createReadStream();
			let { name, ext } = parse(filename);
			name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');
			let path = join(__dirname, `../static/assets/images/cars/${name}${ext}`);

			await new Promise((resolve, reject) => {
				const writeStream = fs.createWriteStream(path);
				writeStream.on('finish', resolve);
				writeStream.on('error', (error) => {
					fs.unlink(path, () => {
						reject(error);
					});
				});
				stream.on('error', (error) => writeStream.destroy(error));
				stream.pipe(writeStream);
			});
			
			// MARK: -- Record the file metadata in the Database
			const location = path.split('api')[1];

			const image = await models.Car.Image.insert({ name: filename, mimetype, encoding, location });
			return image
		}
	},
	Profile: {
		transactions(profile, {first, after, last, before, filter}, {models}) {
			return models.Transaction.findRenter({ renterId: profile.id })
		},
		avatar(profile, _, {models}) {
			console.log("find avatar")
			return models.Profile.findImage({ id: profile.profileImageId })
		},
		user(profile, _, {models}) {
			console.log("find user")
			return models.Profile.findUser({ userId: profile.userId })
		}
	},
	Car: {
		owner(carAndOwner, _, {models}) {
			console.log("CAR?")
			return models.Owner.findOne({ profileId: carAndOwner.profileId })
		},
		image(car, _, {models}) {
			return models.Car.findImage({ id: car.carImageId })
		}
	},
	CarOwner: {
		profile(owner, _, {}) {
			return owner
		},
		cars(owner, _, {}) {
			console.log("cars")
		}
	}
}