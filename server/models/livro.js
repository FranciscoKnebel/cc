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

module.exports = mongoose.model('Livro', bookSchema);
