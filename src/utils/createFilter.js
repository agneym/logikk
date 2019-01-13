function createFilter(selectors, matrix) {
  const filterCondition = Object.entries(selectors).reduce(
    (acc, [id, value]) => {
      const identifiers = id.split("-");
      const index = identifiers[identifiers.length - 1];
      if (value !== "all") {
        acc[index] = value === "correct" ? 1 : 0;
      }
      return acc;
    },
    []
  );
  return matrix.filter(row => {
    return row.every((value, index) => {
      if (!filterCondition.hasOwnProperty(index)) {
        return true;
      } else if (filterCondition[index] === value) {
        return true;
      } else {
        return false;
      }
    });
  });
}

export default createFilter;
