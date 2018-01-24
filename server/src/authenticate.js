import config from '../config'
import FacebookStrategy from 'passport-facebook'
import GoogleStrategy from 'passport-google-oauth20'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import TwitterStrategy from 'passport-twitter'

export default ({ app, DB }) => {
  app.use(passport.initialize())
  app.use(passport.session())
  
  app.get('/auth/facebook', passport.authenticate('facebook'))
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
  app.get('/auth/twitter', passport.authenticate('twitter'))

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      const token = jwt.sign(req.user, config.jwtSecret, {
          expiresIn: '1d'
      })
      res.cookie('token', token)
      res.redirect(`http://${req.hostname}:${config.clientPort}`)
    }
  )

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      const token = jwt.sign(req.user, config.jwtSecret, {
        expiresIn: '1d'
      })
      res.cookie('token', token)
      res.redirect(`http://${req.hostname}:${config.clientPort}`)
    }
  )

  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
    // Successful authentication, redirect home.
    const token = jwt.sign(req.user, config.jwtSecret, {
      expiresIn: '1d'
    })
    res.cookie('token', token)
    res.redirect(`http://${req.hostname}:${config.clientPort}`)
  })
  
  passport.serializeUser(function(user, done) {
    done(null, user)
  })
  
  passport.deserializeUser(function(user, done) {
    done(null, user)
  })
  
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(async function () {
      const newUser = await DB.User.findOneAndUpdate({
        // conditions
        socialID: profile.id,
        socialType: 'facebook'
      }, {
        // update
        token: accessToken,
        $push: {
          loginLogs: {
            uuid: req.cookies.UUID,
            token: accessToken,
            ipAddress: req.header('x-forwarded-for') || req.connection.remoteAddress,
            loginAt: Date.now()
          }
        }
      }, {
        new: true, // return modified document
        upsert: true // create the object if it doesn't exist
      })
      return done(null, {
        socialID: newUser.socialID,
        socialType: newUser.socialType,
        token: newUser.token
      })
    })
  }))

  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(async function () {
      const newUser = await DB.User.findOneAndUpdate({
        // conditions
        socialID: profile.id,
        socialType: 'google'
      }, {
        // update
        token: accessToken,
        $push: {
          loginLogs: {
            uuid: req.cookies.UUID,
            token: accessToken,
            ipAddress: req.header('x-forwarded-for') || req.connection.remoteAddress,
            loginAt: Date.now()
          }
        }
      }, {
        new: true, // return modified document
        upsert: true // create the object if it doesn't exist
      })
      return done(null, {
        socialID: newUser.socialID,
        socialType: newUser.socialType,
        token: newUser.token,
      })
    })
  }))

  passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL,
    passReqToCallback: true
  }, function(req, token, tokenSecret, profile, done) {
    process.nextTick(async function () {
      const newUser = await DB.User.findOneAndUpdate({
        // conditions
        socialID: profile.id,
        socialType: 'twitter'
      }, {
        // update
        token: token,
        $push: {
          loginLogs: {
            uuid: req.cookies.UUID,
            token: token,
            ipAddress: req.header('x-forwarded-for') || req.connection.remoteAddress,
            loginAt: Date.now()
          }
        }
      }, {
        new: true, // return modified document
        upsert: true // create the object if it doesn't exist
      })
      return done(null, {
        socialID: newUser.socialID,
        socialType: newUser.socialType,
        token: newUser.token,
      })
    })
  }))

}