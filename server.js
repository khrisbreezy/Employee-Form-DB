const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const express = require('express');

const cookieParser = require('cookie-parser');

app.prepare()
    .then(() => {
        const server = express();
        server.use(cookieParser());

        server.all('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    })