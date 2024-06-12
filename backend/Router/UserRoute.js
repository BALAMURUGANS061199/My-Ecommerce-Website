const router = require('express').Router();
const User = require('../model/User')
const bcrypt = require('bcryptjs')


router.post('/Signup', async (req, res) => {
    try {
        const { email } = req.body;
        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(400).json({ message: 'Email is Already Exists Try Another' });
        }
        const user = new User({ email, ...req.body });
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        if(password !== user.password ){
            return res.status(400).json({ message: 'Invalid Password' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
});



module.exports = router;


router.get('/getUsers', async (req, res) => {
    try {
        const user = await User.find().populate('orders')
    }
    catch (e) { return res.status(400).send(e.message) }
})


module.exports = router