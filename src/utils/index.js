exports.cicle = (array) => {
  let nextIndex = 0;
  return {
    next: function(){
      if ( nextIndex == array.length) nextIndex = 0
      return array[nextIndex++]
    }
  }
}
