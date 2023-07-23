const fs = require('fs')
const { stat } = require('fs/promises')

fs.stat('novo.txt', (err, stats) => {
    if(err) {
        console.log(err)
        return
    } 

    console.log(stats.isFile())
    console.log(stats.isDirectory())
    console.log(stats.isSymbolicLink())
    console.log(stats.ctime)
    console.log(stats.size)
})