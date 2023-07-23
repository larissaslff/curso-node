const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt(
   [ {
        name: 'nome',
        message: 'Nome: '

    },
    {
        name: 'idade',
        message: 'Idade: '

    }]
).then((answers) => {
    if(!answers.nome || !answers.idade) {
        throw new Error('O nome e idade são obrigatórios')
    }
    const response = `O nome é ${answers.nome} e tem ${answers.idade} anos`
    console.log(chalk.bgYellow.black(response))
}).catch((err) => console.log(err))