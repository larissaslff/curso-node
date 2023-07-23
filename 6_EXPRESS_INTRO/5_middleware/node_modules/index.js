const express = require('express')
const path = require('path')

const app = express()

const port = 3000

const basePath = path.join(__dirname, 'templates')

const checkAuth = function (req, res, next) {
    req.authStatus = false

    if (req.authStatus) {
        console.log('Logado, pode continuar')
        next()
    } else {
        console.log('Não logado, faça login')
        next()
    }
}

app.use(checkAuth)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})