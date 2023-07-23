//+de 1 valor

const x = 10
const y = "texto"
const z = [1,2]

console.log(x, y, z)

//contagem de impressões
console.count(`Valor de x é ${x}`)
console.count(`Valor de x é ${x}`)
console.count(`Valor de x é ${x}`)

//variaveis entre string
console.log("O valor é %s", y)

//limpar console
setTimeout(()=> {
    console.clear()
}, 1000)