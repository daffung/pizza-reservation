const mongoose = require('mongoose')
const tableSchema = require('./Table').schema
const daySchema = new mongoose.Schema({
    date:Date,
    tables:[tableSchema]
})
module.exports.model= mongoose.model('Day',daySchema)
module.exports.schema = daySchema