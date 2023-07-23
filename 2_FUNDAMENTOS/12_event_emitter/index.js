const EventEmitter = require('events')
const event = new EventEmitter()

event.on('start', ()=>{
    console.log('Durante')
})

console.log('Antes')

event.emit('start')

console.log('Depois')