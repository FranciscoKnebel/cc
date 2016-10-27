/* eslint new-cap: ["error", { "capIsNew": false }] */

const mongoose = require('mongoose');

const auctionSchema = mongoose.Schema({
	seller: ObjectID de vendedor,
	state: String,
	description: String,
	limitDate: Date,
	maxDate: Date,
	initialPrice: Number,
	currentPrice: Number,
	finalPrice: Number,
	topBidder: ObjectID de comprador,
	bidders: [ObjectID de comprador],
	bids: [
		{
			bidValue: Number,
			bidder: ObjectID de comprador
		}
	],
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
});

module.exports = mongoose.model('Leilão', auctionSchema);
