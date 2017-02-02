const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const LENGTH = 8;

function hash() {
  let tmp = '';
  for (let i = 0; i < LENGTH; i++) {
    tmp += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return tmp;
}

module.exports = hash;
