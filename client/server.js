const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 11111
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const serverConfig = require('./config/config')

var proxy = require('http-proxy-middleware');

app.prepare()
    .then(() => {
        const server = express()

        server.use('/api/*', proxy({ target: `http://${serverConfig.serverHostname}:${serverConfig.serverPort}`, changeOrigin: true }));

        server.get('/auth/:provider', (req, res) => {
            res.redirect(`http://${serverConfig.serverHostname}:${serverConfig.serverPort}/auth/${req.params.provider}`)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })