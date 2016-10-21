/* eslint new-cap: ["error", { "capIsNew": false }] */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const AbstractUserSchema = require('./abstractUsuario');

const userSchema = new AbstractUserSchema({},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	}
);

userSchema.methods.generateHash = function generateHash(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function validPassword(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Usuario', userSchema);
