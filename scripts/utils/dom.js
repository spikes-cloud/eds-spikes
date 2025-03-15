export default function promoteChild(node) {
  if (!node || !node.parentNode) return node;

  const parent = node.parentNode;
  const child = node.firstElementChild;

  if (!child) return node; // No child to promote

  // Insert child before the node
  parent.insertBefore(child, node);

  // Remove original node
  parent.removeChild(node);

  // Returns the new replaced node
  return child;
}
