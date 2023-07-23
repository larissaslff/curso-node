const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')
const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

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

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', ${pageqty})`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/books')
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id=${id}`

    conn.query(sql, function(err, data){

        if (err) {
            console.log(err)
            return
        }

        const book = data[0]

        res.render('book', {book})

    })
})

app.get('/books', (req, res)=> {
    const sql = 'SELECT * FROM books'

    conn.query(sql, function(err, data){
        if (err) {
            console.log(err)
            return
        }

        const books = data

        res.render('books', {books})
    })
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
