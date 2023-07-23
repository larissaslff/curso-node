const express = require('express')
const path = require('path')
const router = express.Router()

const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

router.post('/save', (req, res) => {
    console.log(req.body)

    const nome = req.body.nome

    const idade = req.body.idade

    console.log(`O nome é ${nome} e tem ${idade} anos`)

    res.sendFile(`${basePath}/userform.html`)
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    console.log(`Buscando o usuario ${id}`)
    
    res.sendFile(`${basePath}/users.html`)
})

module.exports = router