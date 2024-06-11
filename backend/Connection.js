require('dotenv').config()
const mongoose = require('mongoose')
const DB = process.env.DB

mongoose.connect(DB,{useNewUrlparser: true}).then(()=>{
    console.log('DB Connected');
}).catch(err=>console.log('Failed Connection',err));



module.exports =mongoose