const {  validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

const signUp = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
    const {name, email, password} = req.body

    // console.log(req.body)

    try {
        //check if email already exist
        let user = await User.findOne({ email })
        if(user)  return res.status(400).json({ success: false, errors: [{ msg: "user already exists"}] })

        // if it doesnt exist create a new user in the database
        const avatar = gravatar.url(email, {
            s: '200',
            d: 'mm'
        })
        const save  = await User.create({name, email, password, avatar})
       
        // create a user object to sign the jwt using the id retruned from the db
        user = { 
           id: save._id
        }

        const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: 3600})
        const refreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: 3600})
        const result = await User.findOne({email}).select('-password')
        res.json({success: true, data: result, accessToken})
  
    } catch (error) {
        res.status(500).json({error})
 
    }
}

const logIn = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
    const {email, password} = req.body

    // console.log(req.body)

    try {
        //check if email already exist
        let user = await User.findOne({ email })
        // console.log(user)
        if(!user)  return res.status(400).json({ success: false, errors: [{ msg: "Incorrect Credentials"}] })
        const  validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) return res.status(400).json({ success: false, errors: [{ msg: "Incorrect Credentials"}] })

            user = {
                id : user._id
            }
            
        const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: 3600})
        const refreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: 3600})
        const result = await User.findOne({email}).select('-password')
        // console.log("result",result);
        res.json({success: true, data: result, accessToken})

  
    } catch (error) {
        res.status(500).json({error})
 
    }
}
const getUser = async (req, res) => {
    try {
        // the middleware makes id in the req.user available
        const user = await User.findById(req.user.id).select('-password')
        res.json({user})
   
    } catch (error) {
        res.status(404).json({success: false , msg: error.message})
    }
}
module.exports = {
    getUser,
    signUp,
    logIn
}