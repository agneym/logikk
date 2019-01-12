function createMatrix(limit) {
  const array = [];

  for (let i = 0; i < limit * limit; i++) {
    array.push(i);
  }

  const matrix = array.map(item =>
    Number(item)
      .toString(2)
      .padStart(limit, "0")
      .split("")
      .map(num => Number(num))
  );

  return matrix;
}

export default createMatrix;
