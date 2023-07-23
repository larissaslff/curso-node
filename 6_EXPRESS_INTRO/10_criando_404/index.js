const express = require('express')
const path = require('path')

const app = express()

const port = 3000

const users = require('./users')

//le body
app.use(
    express.urlencoded({
        extended:true,
    })
)

app.use(express.json())

//arq estáticos
app.use(express.static('public'))

const basePath = path.join(__dirname, 'templates')

//redireciona para rotas users
app.use('/users', users)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

//404
app.use(function(req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})