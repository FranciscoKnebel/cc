/* eslint new-cap: ["error", { "capIsNew": false }] */

const mongoose = require('mongoose');

const auctionSchema = mongoose.Schema({
	seller: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuario',
	}],
	state: String,
	description: String,
	limitDate: Date,
	maxDate: Date,
	initialPrice: Number,
	currentPrice: Number,
	finalPrice: Number,
	topBidder: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuario',
	},
	bids: [
		{
			bidValue: Number,
			bidder: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Usuario',
			},
		},
	],
	book: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Livro',
	}
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
});

module.exports = mongoose.model('Leilao', auctionSchema);
