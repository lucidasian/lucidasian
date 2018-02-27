export default {
  clientPort: 80,
  cookieSecret: 'my cookies secret',
  facebook: {
    clientID: '175720876520097',
    clientSecret: '10e8d77c6ccd75077ffdb0675bf5ac81',
    callbackURL: 'http://localhost:10101/auth/facebook/callback'
  },
  google: {
    clientID: '275735785771-ao85s84ncrb3r3utavgc2h3isi22snc7.apps.googleusercontent.com',
    clientSecret: '62ShAiSLa-I2tYtYo7CwZNl6',
    callbackURL: 'http://localhost:10101/auth/google/callback'
  },
  jwtSecret: 'my jwt secret',
  serverPort: 10101,
  sessionSecret: 'my sessions secret',
  twitter: {
    consumerKey: 'Ck9AXFtgsRw4dVK9DzwYOZ9KJ',
    consumerSecret: 'c8td27bPLbn0SZGTzDRiscp5aSjAARscxk3yynxTXAZuXi6ROK',
    callbackURL: 'http://localhost:10101/auth/twitter/callback'
  }
}