const router = require('express').Router()
const {addPost,likePost, getAllPost, getPostById, addComment,deleteComment, removePost} = require('../controllers/postController')
const {check} = require('express-validator')
const {auth} = require('../middleware/auth')


router.get('/',[auth], getAllPost)
router.get('/:id',[auth], getPostById)
router.put('/:id',[auth], likePost)
router.put('/comment/:id',[auth, [
    check('text').not().isEmpty().withMessage("text is required")

]], addComment)
 
router.post('/',[auth, [
    check('text').not().isEmpty().withMessage("text is required")
]], addPost)
router.delete('/:id',[auth], removePost)
router.delete('/comment/:post_id/:comment_id',[auth], deleteComment)

module.exports = router