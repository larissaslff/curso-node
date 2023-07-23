const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', 'senhadomysql', {
    host: 'localhost',
    dialect: 'mysql',
})


try {
    sequelize.authenticate()
    console.log('Conectado com sucesso')
} catch (err) {
    console.log(err)
}

exports.default = sequelize