require('dotenv').config({ path: '../.env' });
const passport = require('passport');
const JWTStategy = require('passport-jwt').Strategy;
const ExtarctJwt = require('passport-jwt').ExtractJwt;
const SECRET_KEY = process.env.SECRET_KEY;
const { Users } = require('../database/dbModels').models;

const opts = {
    jwtFromRequest: ExtarctJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
};

passport.use(new JWTStategy(opts, async (jwt_payload, done) => {
    const user = await Users.findByPk(jwt_payload.sub);
    if (!user) {
        return done(null, false);
    } else {
        return done(null, user);
    }
}));


exports.authorize = (roles = []) => (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) return next(res.sendStatus(401));
        if (!user) return next(res.sendStatus(401));

        if (!roles.length) {
            req.user = user;
            return next(null);
        } else {
            if (roles.includes(user.role)) {
                req.user = user;
                return next(null);
            } else {
                return next(res.sendStatus(401));
            }
        }
    })(req, res, next);
}