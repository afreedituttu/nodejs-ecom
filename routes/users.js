const router = require('express').Router();
const {verifyTokenAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const User = require('../models/User')
const CryptoJS = require('crypto-js')

router.put("/:id", verifyTokenAuthorization, async(req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString();
    }else{
        res.status(401).json("No Password");
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            {
                new:true
            }
        )
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/delete/:id',verifyTokenAndAdmin,async(req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('Deleted')
    }catch(err){
        res.status(500).json(err);
    }
})

router.get('/find/:id',verifyTokenAndAdmin,async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json({...others});
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.get('/',verifyTokenAndAdmin,async(req, res)=>{
    const query = req.query.new
    try{
        const users = query? await User.find().sort({_id:-1}).limit(query) : await User.find({}).lean();;
        res.status(200).json(users);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.get('/stats', verifyTokenAndAdmin, (req, res)=>{
    const date = new Date();
    const lastYear = new Date(date.getFullYear() - 1);

    try{
        //continues
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;