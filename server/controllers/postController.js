const { validationResult } = require('express-validator')
const Post = require('../model/Post')
const Profile = require('../model/Profile')
const User = require('../model/User')






const addPost = async (req, res) => {
    const { text } = req.body
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
        let user = await User.findById(req.user.id).select('-password')
        let data = {
            text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        let post = await Post.findOne({ user: req.user.id })

        post = await Post.create(data)
        res.status(200).json({ success: true, post })


    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

const getAllPost = async (req, res) => {
    try {
        const post = await Post.find().sort({ date: -1 })
        res.status(200).json({ success: true, post })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

const getPostById = async (req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findById(id)
        if (!post) return res.status(400).json({ success: false, message: "post does not exist" })
        res.status(200).json({ success: true, post })
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(400).json({ success: false, message: "post does not exist" })
        res.status(500).json({ message: "Server Error" })
    }
}

const likePost = async (req, res) => {
    const { id } = req.params
    try {
        let post = await Post.findById(id)
        // console.log(id)

        // to convert new ObjectId("61e96740c6193748d7c264e0") to a value .toString()
        const like = post.likes.find(likes => likes.user.toString() === req.user.id)
        //    console.log(like) 

        if (!like) {
            post.likes.unshift({ user: req.user.id })
            await post.save()
            // console.log(post.likes)
            return res.status(200).json({ success: true, post })
        }

        //if i want to unlike
        const findIndex = post.likes.findIndex(likes => likes.user.toString() === req.user.id)
        // console.log(findIndex)
        post.likes.splice(findIndex, 1)
        await post.save()
        res.status(200).json({ success: true, post })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })

    }
}


const removePost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findById(id)
        if (!post) return res.status(400).json({ success: false, message: "post does not exist" })

        //only a user should delete post
        if (post.user.toString() !== req.user.id) return res.status(400).json({ message: "you are not authorized" })
        await post.remove()
        res.status(200).json({ success: true,message: "post deleted" })

    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(400).json({ success: false, message: "post does not exist" })
        res.status(500).json({ message: "Server Error" }) 
    }
}

const addComment = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const { id } = req.params
    try {
        let post = await Post.findById(id)
        const user = await User.findById(req.user.id).select('-password')
        const { text } = req.body
        const comment = {
            user: req.user.id,
            text,
            name: user.name,
            avatar: user.avatar,

        }

        post.comments.unshift(comment)
        await post.save()
        res.status(200).json({ success: true, post })

    } catch (error) {
        res.status(500).json({ message: "Server Error" })

    }
}

const deleteComment = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const { post_id, comment_id } = req.params
    try {
        let post = await Post.findById(post_id)
        // console.log('post', post)

        const comment = post.comments.find(comment => comment.id === comment_id)
        // console.log('comment', comment) 

        if (!comment) return res.status(400).json({ success: false, message: "comment does not exist" })
       
        // check if comment is owned by the user
       
        if (comment.user.toString() !== req.user.id) return res.status(400).json({ success: false, message: "you are not authorized to delete" })
        const findIndex = post.comments.findIndex(comment => comment.id === comment_id)
        // console.log('findIndex', findIndex)
        post.comments.splice(findIndex, 1)
        await post.save()
        res.status(200).json({ success: true, post })
        // res.status(200).json({ success: true})



    } catch (error) {
        res.status(500).json({ message: "Server Error" })

    }
}
module.exports = {
    addPost,
    getPostById,
    getAllPost,
    likePost,
    removePost,
    addComment,
    deleteComment
}