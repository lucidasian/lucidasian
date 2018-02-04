const express = require('express')
const next = require('next')
const config = require('./config/config')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.get('/auth/:provider', function (req, res) {
            res.redirect(`http://${req.hostname}:${config.serverPort}/auth/${req.params.provider}`)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(config.port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${config.port}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })