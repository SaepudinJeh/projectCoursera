const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');


const User = require('./models/user');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const secretKey = 'LKJUibaiuai&%$^$&HJkhhhfhes%^^$%'
exports.getToken = function (user) {
    return jwt.sign(user, secretKey, {
        expiresIn: '1h'
    })
}

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log('JWT payload: ', jwt_payload);
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false)
            }
        })
    }));

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyOrdinaryUser = (req, res, next) => {

    if (!req.get('Authorization')) {
        const err = new Error('No Token Provided!');
        err.status = 403;
        return next(err)
    }

    try {
        // Check token
        const token = req.get('Authorization').split(' ')[1];
        // Decode Token
        if (token) {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    var err = new Error('You are not authenticated!');
                    err.status = 401;
                    return next(err);
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            })
        }
    } catch (error) {
        return next(error)
    }
}

exports.verifyAdmin = async (req, res, next) => {

    const reqId = req.decoded._id;

    const isAdmin = await User.findById(reqId);
    // If no token return error
    if (isAdmin.admin !== true) {
        return next()
    } else {
        const err = new Error('You are not authorized to perform this operation!')
        err.status = 403;
        return next(err)
    }

    next()
}