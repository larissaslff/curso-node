const express = require('express')
const exphbs = require('express-handlebars')

const app = express()


const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')



const products = [
    {
        id: '1',
        title: 'livro',
        price: 12.99
    },

    {
        id: '2',
        title: 'caneta',
        price: 2.99
    },
]

app.get('/', (req, res) => {
    res.render('home', { products })
})

app.get('/products/:id', (req, res) => {
    const product = products[parseInt(req.body.id - 1)]
    res.render('product', { product })
})

app.listen(3000, function () {
    console.log('Servidor iniciado')
})
