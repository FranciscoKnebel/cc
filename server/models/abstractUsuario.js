const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
	name: String,
	address: String,
	CPF: String,
	phone: String,
	email: String,
	password: String,
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
	collection: 'usuarios',
	discriminatorKey: '_type',
});

userSchema.methods.generateHash = function generateHash(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function validPassword(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = userSchema;
