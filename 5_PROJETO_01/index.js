const inquirer = require("inquirer")
const chalk = require("chalk")

const fs = require("fs")

operation()

function operation() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que vc deseja fazer? ',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }])
        .then((answer) => {
            const action = answer['action']

            if (action === 'Criar conta') {
                createAccount()
            } else if (action === 'Consultar saldo') {
                getAccountBalance()
            } else if (action === 'Depositar') {
                deposit()

            } else if (action === 'Sacar') {
                withdraw()

            } else if (action === 'Sair') {
                console.log(chalk.bgBlue('Obrigado por usar nossos serviços!'))
                process.exit()
            }
        })
        .catch((err) => console.log(err))
}

//criando conta

function createAccount() {
    console.log(chalk.bgGreen.black('Parabens por escolher nosso banco'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount()
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite nome: '
        }
    ]).then(answer => {
        const accountName = answer['accountName']
        console.info(accountName)

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed('Essa conta já existe! Escolha outro nome'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function (err) {
            console.log(err)
        })

        console.log(chalk.green('Parabens, conta criada!'))

        operation()
    }).catch((err) => console.log(err))
}

function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ])
        .then((answer) => {
            const accountName = answer['accountName']

            if (!checkAccount(accountName)) {
                return deposit()
            }


            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Quanto deseja depositar?'
                }
            ]).then((answer) => {
                const amount = answer['amount']

                addAmount(accountName, amount)
                operation()
            }).catch(err => console.log(err))

        })
        .catch(err => console.log(err))
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed('Conta inexistente'))
        return false
    }

    return true
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed('Ocorreu um erro, tente novamente'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        }

    )
    console.log(chalk.green(`Valor depositado: R$ ${amount}`))
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

function getAccountBalance() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da conta? '
    }]).then(
        (answer) => {
            const accountName = answer['accountName']
            if (!checkAccount(accountName)) {
                return getAccountBalance()
            }

            const accountData = getAccount(accountName)

            console.log(chalk.bgBlue(`Olá, o saldo é de R$ ${accountData.balance}`))

            operation()
        }
    ).catch(err => console.log(err))
}

function withdraw() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {
            return withdraw()
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Qual o valor a sacar?'
        }]).then((answer) => {
            const amount = answer['amount']

            remove(accountName, amount)

        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

function remove(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed('Ocorreu um erro'))
        return withdraw()
    }

    if (accountData.balance < amount) {
        console.log(chalk.bgRed('Valor indisponível'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        }
    )

    console.log(chalk.green(`Realizado o saque de R$ ${amount} da sua conta`))
    operation()
}