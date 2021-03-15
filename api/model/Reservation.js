const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String
})
module.exports.model= mongoose.model('Reservation',reservationSchema)
module.exports.schema = reservationSchema