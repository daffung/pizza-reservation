const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Day = require('../model/Day').model

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log("request attempted");
  console.log(req.body)
  const dateTime = new Date(req.body.date)
  Day.find({date: dateTime},(err,docs)=>{
    if(!err){
      if(docs.length>0){
        console.log("Record exists. Sent docs")
        res.status(200).send(docs[0])
      }else{
        const allTables = require('../data/allTable.js')
        console.log(allTables[0].location)
        const day = new Day({
          date:dateTime,
          tables: allTables
        })
        day.save((err)=>{
          if(err)
            {
              res.status(400).send("could not save data")
              console.error(err)
          }
          else{
            console.log("Created new! Here are the default")
            Day.find({date:dateTime},(err,docs)=>{
              err? res.status(400):res.status(200).send(docs[0])

            })
          }
        })
      }

    }else{
      res.status(400).send('Could not search for this date')
    }
  })
});

module.exports = router;
