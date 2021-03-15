const mongoose = require('mongoose')
const Table = require('../model/Table').model
const fs = require('fs')

let tableData=fs.readFileSync(__dirname + '/allTable.json')
tableData = JSON.parse(tableData).tables

let allTable=[]

tableData.forEach(table => {
    allTable.push(new Table(table))
});
module.exports= allTable;