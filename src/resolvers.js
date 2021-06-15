const fs = require('fs')
const { parse, join } = require('path')
const { ApolloError, UserInputError } = require('apollo-server-express')


module.exports = {
	Query: {
		cars(_, {type, year, id}, {models}) {
			return models.Car.find(type, year, id)
		},
		car(_, {id}, {models}) {
			return models.Car.findOne({ id })
		},
		profile(_, {id}, {models}) {
			return models.Profile.findOne({ id })
		},
		self(_, args, {sub, app_metadata, models}) {
			if(!sub) {
				return null
			}
			return models.Profile.findOne({ userId: sub })
		}
	},
	Mutation: {
		async addProfile(_, {profile}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('create:own_content')) {
				return null
			} 
			return models.Profile.update({...profile}, { userId: sub })
		},
		async updateProfile(_, {profile}, {sub, app_metadata, models}) {
			if (!sub || !app_metadata.permissions.includes('edit:own_content')) {
				return null
			}
			return models.Profile.update({...profile}, { userId: sub })
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

			const image = await models.Profile.insertImage({ name: filename, mimetype, encoding, location });
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

			const image = await models.Car.insertImage({ name: filename, mimetype, encoding, location });
			return image
		}
	},
	Car: {
		image(car, _, {models}) {
			return models.Car.findImage({ id: car.carImageId })
		},
		owner(car, _, {models}) {
			return models.Profile.findOne({ id: car.profileId })
		},
		rating(car, _, {models})  {
			return models.Rating.find({ carId: car.id })
		}
	},
	Profile: {
		avatar(owner, _, {models}) {
			return models.Profile.findImage({ id: owner.profileImageId })
		},
		cars(owner, _, {models}) {
			return models.Car.findByProfileId({ profileId: owner.id })
		},
		user(profile, _, {models}) {
			return models.User.findOne({ id: profile.userId })
		}
	},
	Rating: {
		reviewer(rating, _, {models}) {
			return models.Profile.findOne({ id: rating.profileId })
		}
	}
}