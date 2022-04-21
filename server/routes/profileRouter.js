const router = require('express').Router()
const {
    createAndUpdateProfile,
    experienceProfile,
    removeExperience,
    addEducation,
    removeEducation,
    getMyProfile,
    getProfileById,
    getAllProfile,
    githubProfile,
    deleteProfile } = require('../controllers/profileController')
const { auth } = require('../middleware/auth')
const { check } = require('express-validator')



router.get('/', getAllProfile)
router.get('/me', auth, getMyProfile)
router.get('/:id', auth, getProfileById)
router.delete('/delete', auth, deleteProfile)

//the auth and validator middleware in an array to create and update
router.post('/create', [auth, [
    check("status").not().isEmpty().withMessage("status is required"),
    check("skills").not().isEmpty().withMessage("skills is required"),
]
], createAndUpdateProfile)

//the auth and validator middleware in an array to create and update the experience and school in profile
router.put('/experience', [auth, [
    check("title").not().isEmpty().withMessage("title is required"),
    check("company").not().isEmpty().withMessage("company is required"),
    check("from").not().isEmpty().withMessage("From Date is required")
]
], experienceProfile)

router.delete('/experience/:id', auth, removeExperience)


router.put('/education', [auth, [
    check("school").not().isEmpty().withMessage("school is required"),
    check("degree").not().isEmpty().withMessage("degree is required"),
    check("fieldofstudy").not().isEmpty().withMessage("field of study is required"),
    check("from").not().isEmpty().withMessage("From Date is required")
]
], addEducation)

router.get('/github/:username', auth, githubProfile)
router.delete('/education/:id', auth, removeEducation)








module.exports = router