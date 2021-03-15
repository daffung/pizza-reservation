const mongoose = require('mongoose')
const reservationSchema = require("./Reservation").schema

const tableSchema = new mongoose.Schema({
    name:String,
    capacity:Number,
    isAvailable:Boolean,
    location:{type: String,required:true},
    reservation:
    {
        required:false,
        type:reservationSchema
    }
})
module.exports.model= mongoose.model('Table',tableSchema)
module.exports.schema = tableSchema