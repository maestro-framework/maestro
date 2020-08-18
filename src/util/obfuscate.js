const obfuscate = (str, n) => {
  const nthFromEnd = str.length - n;
  const tail = str.slice(nthFromEnd);
  const obfuscatedHead = str.slice(0, nthFromEnd).replace(/./g, '*');

  return obfuscatedHead + tail;
};

module.exports = obfuscate;
