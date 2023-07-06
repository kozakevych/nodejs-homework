const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = `${__dirname}/csvdirectory/nodejs-hw1-ex1.csv`;

const readableStream = fs.createReadStream(csvFilePath);
const writableStream = fs.createWriteStream(`${__dirname}/result-file.txt`);

writableStream.on('error', (error) => {
  console.error(`Error writing to the output stream: ${error}`);
});

csv()
	.fromStream(readableStream)
	.subscribe(jsonObj => {
		const formattedChunk = replaceKeysAndStringify(jsonObj);
		writableStream.write(formattedChunk, () => console.log('Chunk added!'));
	}, 
	(error) => {
		console.error(`An error occurred during stream processing: ${error}`);
	});

/**
 * Put object keys to lower case as in example.
 * Skip "Amount" key.
 * Returns stringified chunk.
 */
const replaceKeysAndStringify = (obj) => {
	const exceptionKey = 'Amount';

  const updatedJSON = Object.keys(obj).reduce((acc, key) => {
		if (key !== exceptionKey) {
			acc[key.toLowerCase()] = obj[key];
		}
    return acc;
  }, {});
	return JSON.stringify(updatedJSON) + '\n';
}
