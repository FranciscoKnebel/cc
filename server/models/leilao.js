/* eslint new-cap: ["error", { "capIsNew": false }] */

'use strict';

const mongoose = require('mongoose');
const Book = require('./livro');

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
	auction.state = 'pendente';
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

	auction.save((err, doc) => {
		const date = doc.createdAt;

		auction.limitDate = new Date(date.getTime() + (14 * 24 * 60 * 60 * 1000)); // + 14 dias
		auction.maxDate = new Date(date.getTime() + (28 * 24 * 60 * 60 * 1000)); // + 28 dias

		auction.save(() => {
			done(auction);
		});
	});
};

module.exports = mongoose.model('Leilao', auctionSchema);
