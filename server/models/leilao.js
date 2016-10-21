/* eslint new-cap: ["error", { "capIsNew": false }] */

const mongoose = require('mongoose');

const auctionSchema = mongoose.Schema({
	state: String,
	initialPrice: Number,
	actualPrice: Number,
	description: String,
	price: Number,
	limitDate: Date,
	maxDate: Date,
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
});

module.exports = mongoose.model('Leilão', auctionSchema);
