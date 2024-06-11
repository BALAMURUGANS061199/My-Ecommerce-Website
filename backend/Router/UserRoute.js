const router = require('express').Router();
const User = require('../model/User')



router.post('/Signup', async (req, res) => {
    try {
        const user = new User({ ...req.body });
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        if (e.code === 11000) {
            // Duplicate key error
            return res.status(400).send('Email already exists');
        }
        res.status(400).send(e.message);
    }
});

router.post('/Login',async(req,res)=>{
    const {email,password} = req.body
    try{
const user = await User.findByCredentials(email,password);
res.json(user)
    }
    catch(e){return res.json(400).send(e.message)}
})

router.get('/getUsers',async(req,res)=>{
    try{
const user = await User.find().populate('orders')
    }
    catch(e){return res.status(400).send(e.message)}
})


module.exports = router