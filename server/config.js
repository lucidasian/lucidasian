export default {
  clientPort: 80,
  cookieSecret: 'my cookies secret',
  facebook: {
    clientID: 'your client id',
    clientSecret: 'your secret',
    callbackURL: 'http://localhost:10101/auth/facebook/callback'
  },
  google: {
    clientID: 'your client id',
    clientSecret: 'your secret',
    callbackURL: 'http://localhost:10101/auth/google/callback'
  },
  serverPort: 10101,
  sessionSecret: 'my sessions secret',
  twitter: {
    consumerKey: 'your client id',
    consumerSecret: 'your secret',
    callbackURL: 'http://localhost:10101/auth/twitter/callback'
  }
}
