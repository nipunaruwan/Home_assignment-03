const express=require('express')
const app=express()
const router=express.Router()
const User=require('../models/user.models')

app.use(express.json())

router.get('/',async (req, res) =>{
    try {
        const register = await User.find()
        res.json(register)
    }catch (error) {
        res.send('Error : '+error)
    }
})
router.get('/:id',async (req, res) =>{
    try {
        const register = await User.findById(req.params.id)
        res.json(register)
    }catch (error) {
        res.send('Error : '+error)
    }
})
router.get('/:email/:password',async (req, res) =>{
    try {
        const register = await User.findOne({ email: req.params.email, password: req.params.password })
        res.json(register)
    }catch (error) {
        res.send('Error : '+error)
    }
})
router.post('/',async (req,res) => {
    const user = new User({
        firstName:req.body.firstName,
        surname:req.body.surname,
        gender:req.body.gender,
        dob:req.body.dob,
        password:req.body.password,
        phoneNo:req.body.phoneNo,
        email:req.body.email,
    })

    try {
        const register = await user.save()
        res.json(register)
    }catch (error) {
        res.send('Error : '+error)
    }

})

router.put('/:id',async (req,res) =>{
    try {
        const register = await User.findById(req.params.id)
        register.firstName = req.body.firstName
        register.surname = req.body.surname
        register.gender = req.body.gender
        register.dob = req.body.dob
        register.password = req.body.password
        register.phoneNo = req.body.phoneNo
        register.email = req.body.email
        const response = await register.save()

        res.json(response)
    }catch (error) {
        res.send('Error : '+error)
    }
})

router.delete('/:id',async (req,res) =>{
    try {
        const register = await User.findById(req.params.id)
        const response = await register.remove()
        res.json(response)
    }catch (error) {
        res.send('Error : '+error)
    }
})
module.exports=router