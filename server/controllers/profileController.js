const Profile = require('../model/Profile')
const User = require('../model/User')
const Post= require('../model/Post')
const { validationResult } = require('express-validator')
const axios = require('axios')


const createAndUpdateProfile = async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        linkedIn,
        instagram,
        facebook
    } = req.body
 

    // filling the profile fields  

    let profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername

    // console.log(skills );
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
 
    // filling the social fields
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (linkedIn) profileFields.social.linkedIn = linkedIn
    if (instagram) profileFields.social.instagram = instagram
    if (facebook) profileFields.social.facebook = facebook


    // console.log(profileFields)



    try {

        // if user profile exist update it
        // console.log(req.user)
        let profile = await Profile.findOne({ user: req.user.id })
        // console.log(profile);

        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
            return res.status(200).json({ success: true, profile })
        }

        //if not create a new one
        profile = await Profile.create(profileFields)
        res.status(200).json({ success: true, profile })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const experienceProfile = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body


    // filling the profile fields

    let Exp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }


    try {

        // if user profile exist update it
        // console.log(req.user)
        let profile = await Profile.findOne({ user: req.user.id })
        // console.log(profile);
        profile.experience.unshift(Exp)
        await profile.save()
        res.status(200).json({ success: true, profile: profile })

    } catch (error) {
        res.status(500).json({ error })
    }
}

const removeExperience = async (req, res) => {
    const { id } = req.params
    try {


        let profile = await Profile.findOne({ user: req.user.id })
        // console.log( profile.experience);
        const Position = profile.experience.map(exp => exp.id).indexOf(id)
        // console.log('Position', Position);
        profile.experience.splice(Position, 1)
        // console.log('left', profile);
        await profile.save()
        res.status(200).json({ success: true, profile })
        // res.status(200).json({ success: true })

    } catch (error) {
        // console.log(error);
        res.status(500).json({ error })
    }
}

const addEducation = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const { school, degree, fieldofstudy, from, to, current, description } = req.body


    try {
        let profile = await Profile.findOne({ user: req.user.id })

        let Ed = {
            school,
            degree,
            fieldofstudy,
            from,
            to,

            description

        }
        profile.education.unshift(Ed)
        await profile.save()
        res.status(200).json({ success: true, profile: profile })
    } catch (error) {
        res.status(500).json({ error })
    }


}








const removeEducation = async (req, res) => {
    const { id } = req.params
    try {


        let profile = await Profile.findOne({ user: req.user.id })
        // console.log( profile.experience);
        const Index = profile.education.map(ed => ed.id).indexOf(id)
        // console.log( Index);
        profile.education.splice(Index, 1)
        await profile.save()
        res.status(200).json({ success: true, profile })

    } catch (error) {
        res.status(500).json({ error })
    }
}


const getMyProfile = async (req, res) => {
    try {
        //in profiledb find the profile of user with the id and then fill the profiledb user field with the name, and avatar 
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ["name", "avatar"])
        if (!profile) return res.status(400).json({ success: false, message: "profile not found" })
        res.status(200).json({ success: true, user: profile })

    } catch (error) {
        res.status(500).json({ error })
    }
}

const getProfileById = async (req, res) => {
    const { id } = req.params
    try {
        //in profiledb find the profile of user with the id and then fill the profiledb user field with the name, and avatar 
        const profile = await Profile.findOne({ user: id }).populate('user', ["name", "avatar"])
        if (!profile) return res.status(400).json({ success: false, message: "profile not found" })
        res.status(200).json({ success: true, user: profile })

    } catch (error) {
        // console.log(error)
        if (error.kind === "ObjectId") return res.status(400).json({ success: false, message: "profile not found" })
        res.status(500).json({ message: "Server Error" })
    }
}

const getAllProfile = async (req, res) => {
    try {
        //in profiledb find the profile of user with the id and then fill the profiledb user field with the name, and avatar 
        const profile = await Profile.find().populate('user', ["name", "avatar"])
        if (!profile) return res.status(400).json({ success: false, message: "profile not found" })
        res.status(200).json({ success: true, user: profile })

    } catch (error) {
        res.status(500).json({ error })
    }
}



const deleteProfile = async (req, res) => {
    // console.log(req.user)
    try {
       await Post.deleteMany({ user: req.user.id })
        await Profile.findOneAndRemove({ user: req.user.id })
       await User.findOneAndRemove({ _id: req.user.id })
        res.status(200).json({ success: true, msg:"User account deleted" })

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

const githubProfile = async (req, res) => {
    const { username } = req.params
    // console.log(username)
    try {

        let { data } = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`)
        // console.log(data)
        res.status(200).json({success:true, data })

    } catch (error) {
        // console.log(error)
        // if(error.response.status === 404) return res.status(400).json({ message: "profile not found" })
        res.status(500).json({ message: "Server Error" })
    }
}
module.exports = {
    createAndUpdateProfile,
    experienceProfile,
    removeExperience,
    addEducation,
    removeEducation,
    getMyProfile,
    getProfileById,
    getAllProfile,
    githubProfile,
    deleteProfile
}