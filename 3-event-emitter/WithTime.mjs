import EventEmitter from './EventEmitter.mjs';

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {}
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

console.log(withTime.rawListeners("end"));