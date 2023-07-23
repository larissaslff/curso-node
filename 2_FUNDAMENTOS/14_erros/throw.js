const x = "10"

if (!Number.isInteger(x)) {
    throw new Error('x não é numero')
}

console.log('continuando...')