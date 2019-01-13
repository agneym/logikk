function traverse(node, acc) {
  if (node.type === "Identifier") {
    acc.add(node.name);
  } else if (node.type === "UnaryExpression") {
    traverse(node.argument, acc);
  } else {
    if (node.left) {
      traverse(node.left, acc);
    }
    if (node.right) {
      traverse(node.right, acc);
    }
  }
  return [...acc];
}

function walkTree(node) {
  if (node.type !== "ExpressionStatement") {
    throw new Error("Expression is not valid!");
  }
  const identifiers = traverse(node.expression, new Set());
  return identifiers;
}

export default walkTree;
