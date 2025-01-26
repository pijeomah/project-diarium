const express = require('express')
const passport = require('passport')
const session = require('express-session')
const router = express.Router()

//@desc Auth with google
// @route GET /auth/google

router.get('/google', passport.authenticate('google', {scope: ['profile']}
) )


//@desc google auth callback
// @route GET /auth/google/callback

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
(req, res) => {
res.redirect('/dashboard')
}
)


// Logout User
router.get('/logout', (req,res,next) => {
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect('/')
    })
})

module.exports = router