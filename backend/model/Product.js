const mongoose = require('mongoose')

const schema = mongoose.Schema;

const ProductSchema =new schema({
    name:{
        type:String,
        required:[true,"can't Be Blank"]
    },
    description:{
        type:String,
        required:[true,"can't Be Blank"]
    },
    price:{
        type:String,
        required:[true,"can't be blank"]
    },
    category:{
        type:String,
        required:[true]
    },
    images:{
        type:Array,
        required: true
    }
},{minimize: false});


const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;