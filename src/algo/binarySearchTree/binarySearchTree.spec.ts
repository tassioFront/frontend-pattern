import { isBST, treeNodeFactory } from './binarySearchTree';

describe('algo - binarySearchTree', () => {
  it('should return isBST=true as it respects the bst rules', () => {
    const root = treeNodeFactory(4);
    root.left = treeNodeFactory(2);
    root.right = treeNodeFactory(6);
    root.left.left = treeNodeFactory(1);
    root.left.right = treeNodeFactory(3);
    root.right.left = treeNodeFactory(5);
    root.right.right = treeNodeFactory(7);

    expect(isBST(root)).toBeTruthy();
  });

  it('should return isBST=false as it does not respect the bst rules', () => {
    const root = treeNodeFactory(4);
    root.left = treeNodeFactory(2);
    root.right = treeNodeFactory(6);
    root.left.left = treeNodeFactory(4);
    root.left.right = treeNodeFactory(3);
    root.right.left = treeNodeFactory(5);
    root.right.right = treeNodeFactory(7);

    expect(isBST(root)).toBeFalsy();
  });
});
