const express = require('express')
const path = require('path')

const app = express()

const port = 3000

app.use(
    express.urlencoded({
        extended:true,
    })
)

app.use(express.json())

const basePath = path.join(__dirname, 'templates')

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req, res) => {
    console.log(req.body)

    const nome = req.body.nome

    const idade = req.body.idade

    console.log(`O nome é ${nome} e tem ${idade} anos`)

    res.sendFile(`${basePath}/userform.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})