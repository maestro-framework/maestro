const capitalize = require("./capitalize");

const special = new Set();
const specialArray = [
  'and',
  'or',
  'to',
  'of',
  'for',
  'in',
  'the',
  'a',
  'an',
  'nor',
  'but',
];

specialArray.forEach((word) => special.add(word));

const titleize = (str) => {
  if (str === '') return '';

  const words = str.split(/\s/);
  if (words.length === 1) {
    return capitalize(words[0]);
  }

  const middleWords = words.slice(1, words.length - 1);
  const firstWord = words[0];
  const lastWord = words[words.length - 1];
  const resultWords = [];

  resultWords.push(capitalize(firstWord));

  middleWords.forEach((word) => {
    word = word.toLowerCase();
    resultWords.push(special.has(word) ? word : capitalize(word));
  });

  resultWords.push(capitalize(lastWord));

  return resultWords.join(' ');
};

module.exports = titleize;
