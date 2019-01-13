function createSelectors(identifiers) {
  const identifierSelectors = identifiers.map(
    (identifier, index) => `${identifier}-${index}`
  );
  const selectors = identifierSelectors.concat([
    `result-${identifiers.length}`
  ]);
  return selectors.reduce((acc, selector) => {
    acc[selector] = "all";
    return acc;
  }, {});
}

export default createSelectors;
