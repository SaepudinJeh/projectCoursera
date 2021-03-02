const express = require('express');
const passport = require('passport');

const User = require('../models/user');
const auth = require('../authenticate');

const router = express.Router();


router
    .get('/', (req, res, next) => {
        res.send('respond with a resource');
    })
    .post('/signup', (req, res, next) => {
        console.log(req.body);
        User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ error: err })
            }

            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, status: 'Registration Successful!' });
            })
        })
    })
    .post('/login', passport.authenticate('local'), (req, res, next) => {
        const token = auth.getToken({ _id: req.user._id });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, token: token, status: 'Login Successful!' });
    })
    .get('/logout', (req, res, next) => {
        if (req.session) {
            req.session.destroy();
            res.clearCookie('kosku.com');
            res.redirect('/')
        } else {
            const err = new Error('You are not logget in!');
            err.status = 403;
            next(err);
        }
    })

module.exports = router;