const path = require('path')

//path absoluto
console.log(path.resolve('text.txt'))

//formar path
const midFolder = "relatorios"
const filename = "arquivo.txt"

const finalPath = path.join('/', 'diretorio', midFolder, filename)
console.log(finalPath)