export default class EventEmitter {
  listeners = {};  // key-value pair

  addListener(eventName, fn) {
    if (typeof eventName !== "string" || typeof fn !== "function") {
      return;
    }
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(fn);
  }

  // Alias for addListener method
  on(eventName, fn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    if (!this.listeners[eventName]) {
      console.log(`No listeners found for "${eventName}" event!`);
      return;
    }

    this.listeners[eventName] = this.listeners[eventName].filter((listener) => listener !== fn);
  }

  // Alias for removeListener method
  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const onceCb = (data) => {
      fn(data);
      delete this.listeners[eventName];
    }

    this.addListener(eventName, onceCb);
  }

  emit(eventName, ...args) {
    if (!this.listeners[eventName]) {
      console.log(`No listeners found for "${eventName}" event!`);
      return;
    }

    this.listeners[eventName].forEach(callback => {
      callback(...args);
    });
  }

  listenerCount(eventName) {
    if (!this.listeners[eventName]) {
      return 0;
    }

    return this.listeners[eventName].length;
  }

  rawListeners(eventName) {
    return this.listeners[eventName];
  }
}