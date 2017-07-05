module.exports.cicle = array => {
  let nextIndex = 0;
  return {
    next() {
      if (nextIndex === array.length) {
        nextIndex = 0;
      }
      return array[nextIndex++];
    }
  };
};

module.exports.validateId = id => {
  return (/^[0-9a-fA-F]{24}$/).test(id);
};
