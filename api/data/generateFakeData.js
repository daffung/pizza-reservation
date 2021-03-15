const fs = require('fs')

const numTables = Math.floor(Math.random()*10)+16;

let fakeTable = [];
for(i=1;i<numTables;i++){
    const chairs = Math.floor(Math.random()*6)+2;
    const name = `Table ${i}`;
    const location = ["Patio","Inside","Bar"][Math.floor(Math.random() * 3)];
    fakeTable.push({
        name:name,
        capacity:chairs,
        isAvailable:true,
        location:location
    })
}
const data = JSON.stringify({tables: fakeTable})
fs.writeFileSync(__dirname + "/allTable.json",data)