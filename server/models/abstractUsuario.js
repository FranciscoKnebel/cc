const mongoose = require('mongoose');
const util = require('util');

function AbstractUserSchema() {
	mongoose.Schema.apply(this, arguments);

	this.add({
		name: String,
		address: String,
		CPF: String,
		phone: String,
		email: String,
		password: String,
	});
}

util.inherits(AbstractUserSchema, mongoose.Schema);

module.exports = AbstractUserSchema;
