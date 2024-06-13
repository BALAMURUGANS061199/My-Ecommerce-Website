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
res.status(200).json({product})
    }
    catch(err){
        console.log(err);
    }
})


//Create Product
router.post('/addproduct',async(req,res)=>{
    try{
        const product = await new Product({
            ...req.body
        })
        await product.save();
        if(!product){
            res.status(400).json({message:"Product Created Failed"})
        }
     res.status(200).json({message:"Product Created SuccessFully",product})
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
    const {id} = req.params;
    try{
        const product = await Product.findById(id);
        const similar =await Product.find({category: product.category}).limit(5)
        if(!product){
            return res.status(400).json({message:"Products Not found"})
        }
        return res.status(200).json({product,similar})
    }
    catch(err){
        return res.status(400).send(err.message)

    }
})


router.get('/category/:category',async(req,res)=>{
    const {category} =req.params;
    let products ;
    try{
if(category === 'all'){
    products =await Product.find().sort({'date': -1});
}
else{
    products = await Product.find({category}).sort({'date' :-1})
}
return res.status(200).json(products)
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports =router