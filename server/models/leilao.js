/* eslint new-cap: ["error", { "capIsNew": false }] */

'use strict';

const mongoose = require('mongoose');
const Book = require('./livro');
const Cliente = require('./cliente');

const auctionSchema = mongoose.Schema({
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuario',
	},
	state: String,
	description: String,
	limitDate: Date,
	maxDate: Date,
	initialPrice: Number,
	currentPrice: Number,
	finalPrice: Number,
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
	},
}, {
	collection: 'leiloes',
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
});

auctionSchema.methods.newAuction = function newAuction(form, seller, done) {
	const auction = this;

	auction.seller = seller;
	auction.state = 'validationPendingAuctions';
	auction.description = form.descricao;
	auction.initialPrice = form.preco;
	auction.currentPrice = form.preco;

	const book = new Book();
	const obj = {
		author: form.autor,
		title: form.titulo,
		publisher: form.editora,
		edition: form.edicao,
		images: [form.imagem],
		auction: auction._id,
	};
	book.newBook(obj);
	auction.book = book._id;

	Cliente.findById(seller, (err, vendedor) => {
		vendedor.addAuction(this._id, 'Vendedor', 'validationPendingAuctions');
		vendedor.save();
	});

	auction.save((err, doc) => {
		const date = doc.createdAt;

		auction.limitDate = new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000)); // + 7 dias
		auction.maxDate = new Date(date.getTime() + (21 * 24 * 60 * 60 * 1000)); // + 7 + 14 dias

		auction.save(() => {
			done(auction);
		});
	});
};

auctionSchema.methods.newBid = function newBid(bidder, value) {
	const currentDate = new Date();

	// max Date not reached. limit Date not reached, so you can bid.
	if (this.maxDate > currentDate && this.limitDate > currentDate) {
		if (value <= this.currentPrice && this.bids.length > 0) {
			return false;
		}

		const bid = {
			bidValue: value,
			bidder,
		};

		const updatedDate = new Date(this.limitDate.getTime() + (2 * 60 * 60 * 1000)); // + 2 horas
		if (updatedDate > this.maxDate) {
			this.limitDate = this.maxDate;
		} else {
			this.limitDate = updatedDate;
		}
		this.currentPrice = value;

		const newBids = this.bids.filter(function userAlreadyBid(elem) {
			return (elem.bidder.toString() !== bidder);
		});

		this.bids = newBids;
		this.bids.push(bid);

		Cliente.findById(bidder, (err, cliente) => {
			cliente.addAuction(this._id, 'Comprador', 'currentAuctions');
			cliente.save();
		});

		return {
			bidValue: bid.bidValue,
			bids: this.bids,
			state: this.state,
		};
	}

	return -1;
};

module.exports = mongoose.model('Leilao', auctionSchema);
