//externo
const minimist = require('minimist')

const args = minimist(process.argv.slice(2))

//interno
const soma = require('./soma.js').soma

const a = parseInt(args['a'])
const b = parseInt(args['b'])

soma(a, b)