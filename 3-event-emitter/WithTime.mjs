import EventEmitter from './EventEmitter.mjs';

export default class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    asyncFunc(this, ...args);
  }
}
