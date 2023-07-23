const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root','senhadomysql', {
    host: 'localhost',
    dialect:'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado com sucesso!')
} catch (error) {
    console.log('Não foi possivel conectar: ', error)
}

module.exports = sequelize