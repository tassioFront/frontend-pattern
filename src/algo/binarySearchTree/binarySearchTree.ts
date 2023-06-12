interface TreeNode {
  data: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
export const treeNodeFactory = (data: number) => {
  return { data, left: null, right: null };
};

export function isBST(root: TreeNode) {
  function isBSTUtil(
    node: TreeNode | null,
    minVal: number,
    maxVal: number
  ): boolean {
    if (node === null) {
      return true;
    }
    const respectLeftSide = node.data > maxVal;
    const respectRightSide = minVal > node.data;
    if (respectLeftSide || respectRightSide) {
      return false;
    }
    return (
      isBSTUtil(node.left, minVal, node.data) &&
      isBSTUtil(node.right, node.data, maxVal)
    );
  }

  return isBSTUtil(root, 0, Number.MAX_SAFE_INTEGER);
}
