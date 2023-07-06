import EventEmitter from './EventEmitter.mjs';
import https from 'https';

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    asyncFunc(this, ...args);
  }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

console.log(withTime.rawListeners("end"));

const requestJson = (parent, url) => {
  console.time('requestJson');
  parent.emit('begin');

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      console.log(JSON.parse(data));
      
      parent.emit('end');
      console.timeEnd('requestJson');
    });
  }).on('error', (error) => {
    console.log(`Error: ${error.message}`);
  });
}

withTime.execute(requestJson, 'https://jsonplaceholder.typicode.com/posts/1');
