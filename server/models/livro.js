/* eslint new-cap: ["error", { "capIsNew": false }] */

const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
	author: String,
	title: String,
	publisher: String,
	edition: String,
	images: [String],
	auction: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Leilao',
	},
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
});

bookSchema.methods.newBook = function newBook(book) {
	this.author = book.author;
	this.title = book.title;
	this.publisher = book.publisher;
	this.edition = book.edition;
	this.images = book.images;

	this.auction = book.auction;

	this.save();
	return this;
};

module.exports = mongoose.model('Livro', bookSchema);
