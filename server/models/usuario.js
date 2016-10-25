/* eslint new-cap: ["error", { "capIsNew": false }] */

const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const AbstractUserSchema = require('./abstractUsuario');

module.exports = mongoose.model('Usuario', AbstractUserSchema);
