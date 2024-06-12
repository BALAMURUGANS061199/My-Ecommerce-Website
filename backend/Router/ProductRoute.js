const router = require('express').Router();
const Product = require('../model/Product')
const User = require('../model/User')


//Get Product
router.get('/',async(req,res)=>{
    try{
const product = await Product.find();

if(!product){
    return res.status(404).json({message:"Products is Empty"})
}
res.json(product)
    }
    catch(err){
        console.log(err);
    }
})


//Create Product
router.post('/addproduct',async(req,res)=>{
    try{
        const product = await new User({
            ...req.body
        })
        await product.save();
    }
    catch(err){console.log(err);}
})

router.put('/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const product = await Product.findByIdAndUpdate(id,{
            ...req.body
        },{new: true})
        if(!product){
    return res.status(400).json({message:"Products Update Failed"})
        }
    return res.status(200).json({message:"Updated",product})

    }
    catch(err){console.log(err);}
})

router.delete('/:id',async(req,res)=>{
    const id = req.params.id
    const {user_id}= req.body;
    try{
        const user =await User.findById(user_id);
        if(!user.isAdmin) return res.status(401).json("you Don't Have a Permission")
        await Product.findByIdAndDelete(id)
    return res.status(200).json({message:"Deleted",})

    }
    catch(err){console.log(err.message);}
})


router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id);
    const similar =await Product.find({category: product.category}).limit(5)
    if(!product){
        return res.status(400).json({message:"Products Not found"})
    }
    return res.status(200).json({product})

})


module.exports =router