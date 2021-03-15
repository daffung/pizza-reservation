const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Day = require('../model/Day').model
const Reservation = require('../model/Reservation').model

router.post('/', function(req, res, next) {
  console.log(req.body)
  Day.find({date:req.body.date},(err,days)=>{
    if(!err){
      if(days.length>0){
        let day = days[0]
        day.tables.forEach(table => {
          if(table.id == req.body.table && table.isAvailable == true){
            table.reservation = new Reservation({
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email
            });
            table.isAvailable = false
            day.save(err=>{
              if (err) {
                console.log(err);
              } else {
                console.log("Reserved");
                res.status(200).send("Added Reservation");
              }
            })
          }
          else if (table.id == req.body.table && table.isAvailable==false){
            res.status(200).send("There are a reservation!! please select another table")
          }
          
        });
      }else {
        console.log('day not found')
      }
    }
  })
});

module.exports = router;