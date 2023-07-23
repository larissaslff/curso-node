const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')
const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senhadomysql',
    database: 'nodemysql'
})

conn.connect(function (err) {
    if (err) {
        console.log(err)
    }

    console.log('Conectou ao mysql')

    app.listen(3000, function () {
        console.log('Rodando na porta 3000')
    })
})
