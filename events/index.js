const EventEmitter = require('events');
const logEvent = require('./eventLogger');

class MyEmitter extends EventEmitter {};

const myEmitterObj = new MyEmitter();

myEmitterObj.on('log', () => {
  logEvent('Custom Event Logged', 'customLogs.txt');
})

setInterval(() => {
  myEmitterObj.emit('log');
}, 2000)