const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Entry = require('../models/Entry')

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

router.get('/dashboard', ensureAuth, async (req,res)=> {
    try {
        const entries = await Entry.find({
            user: req.user.id}).lean()
       
        res.render('dashboard', { 
            title: 'Diarium Dashboard',
            name: req.user.firstName,
            entries
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
    
})


module.exports = router