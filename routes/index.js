const express = require('express')
const router = express.Router()

//@desc login/landing page
// @route GET

router.get('/', (req,res)=> {
    res.render('login', { 
        title: 'Diarium Login',
        layout: 'login'
     })
})


//@desc dashboard
// @route GET /dashboard

router.get('/dashboard', (req,res)=> {
    res.render('dashboard', { title: 'Diarium Dashboard' })
})


module.exports = router