const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//@desc login/landing page
// @route GET

router.get('/', ensureGuest, (req,res)=> {
    res.render('login', { 
        title: 'Diarium Login',
        layout: 'login'
     })
})


//@desc dashboard
// @route GET /dashboard

router.get('/dashboard', ensureAuth, (req,res)=> {
    res.render('dashboard', { title: 'Diarium Dashboard' })
})


module.exports = router