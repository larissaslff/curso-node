const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

app.use(express.static('public'))

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine())

app.set('view engine', 'handlebars')


app.get('/dashboard', (req, res) => {

    const items = ["item a", "item b", "item c"]

    res.render('dashboard', { items })
})

app.get('/blog', (req, res) => {
    const posts = [ {
        title: 'Aprender Node.js',
        category: 'Js',
        body: 'Esse artigo vai te ajudar',
        comments: 4,
    },
        {
            title: 'Aprender',
            category: 'J',
            body: 'Esse artigo vai te ajudar',
            comments: 1,
        },

        {
            title: 'Aprender Node',
            category: 'Jss',
            body: 'Esse tigo vai te ajudar',
            comments: 2,
        },]

        res.render('blog', [posts])
})

app.get('/', (req, res) => {
    const user = {
        name: 'Lari',
        surname: 'Silva'
    }

    const auth = false

    const approved = false

    res.render('home', { user: user, auth, approved })
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: 'Js',
        body: 'Esse artigo vai te ajudar',
        comments: 4,
    }

    res.render('blogpost', { post })
})

app.listen(3000, () => {
    console.log('Rodando')
})