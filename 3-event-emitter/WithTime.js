import EventEmitter from './EventEmitter.js';

export default class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    asyncFunc(this, ...args);
  }
}
