const router = require('express').Router()
const { check } = require('express-validator')
const { getUser, signUp, logIn } = require('../controllers/userController')
const {auth} = require('../middleware/auth')


// router.route('/').get(getUser).post(signUp)
router.get('/', auth,  getUser)

router.post('/signup', [
    check('name').not().isEmpty(),
    check('password').isLength({ min: 6 }).withMessage('must be a least 6 characters').matches(/\d/).withMessage('must contain a number'),
    check('email').isEmail().trim()
], signUp)

router.post('/login', [
    check('password').not().isEmpty().withMessage('please enter your password'),
    check('email').isEmail().trim().withMessage('please enter a valid email')
], logIn)

module.exports = router