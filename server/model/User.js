const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true

    },
   avatar:{
        type: String,

    }
},{
    timestamps: true,
})

userSchema.pre('save', async function(next) {
    const salt= await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

module.exports = User = mongoose.model("user", userSchema)
