const router = require('express').Router();

const cloudinary = require('cloudinary')


cloudinary.config({
    cloud_name:'Bala',
    api_key:'817166123321473',
    api_secret:'Qqj0y_U5f6LJbPeesViSdx-TPHA'
})

router.delete('/:public_id',async(req,res)=>{
    const {public_id} = req.params;
    try{
        await cloudinary.uploader.destroy(public_id)
        res.status(200).send()
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = router;