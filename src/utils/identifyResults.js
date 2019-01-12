import { generate } from "astring";
import { cloneDeep } from "lodash";

function traverseTree(values) {
  return function traverse(node, acc = []) {
    if (node.type === "Identifier") {
      node.type = "Literal";
      const numOfCharacters = node.end - node.start;
      const value = values[acc.length].toString().padStart(numOfCharacters);
      node.value = values[acc.length];
      node.raw = value;
      acc.push(node.name);
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
    return acc;
  };
}

function identifyResults(ast, values) {
  return values.map(value => {
    const astClone = cloneDeep(ast);
    traverseTree(value)(astClone.body[0].expression, []);
    return generate(astClone);
  });
}

export default identifyResults;
