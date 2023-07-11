const { input } = require('@inquirer/prompts');

input({ message: 'Please type max value range for your random number:' }).then(answer => {
  const number = getRandomNumber(answer);
  console.log('This is your random number:', number);
});

function getRandomNumber(maxNumber) {
  return Math.floor(Math.random() * (maxNumber - 1) + 1);
}
