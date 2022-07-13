import { Node } from "./node.js";

class Tree<T> {
  private _root: Node<T> | null;
  constructor() {
    this._root = null;
  }
  get root(): Node<T> | null {
    return this._root;
  }

  addNode(key: number, value: T): void {
    const newNode = new Node(key, value);
    if (this._root == null) {
      this._root = newNode;
    } else {
      let currentNode: Node<T> | null = this._root;
      while (currentNode) {
        if (newNode.key < currentNode.key) {
          if (!currentNode.left) {
            currentNode.left = newNode;
            return;
          }
          currentNode = currentNode.left;
        } else if (newNode.key > currentNode.key) {
          if (!currentNode.right) {
            currentNode.right = newNode;
            return;
          }
          currentNode = currentNode.right;
        } else {
          return;
        }
      }
    }
  }

  findByKey(key: number): Node<T> | null {
    let currentNode: Node<T> | null = this._root;
    while (currentNode) {
      if (currentNode.key === key) {
        break;
      }
      if (currentNode.key > key) {
        currentNode = currentNode.left;
      } else if (currentNode.key < key) {
        currentNode = currentNode.right;
      }
    }
    return currentNode;
  }

  findMinElement(node: Node<T>): Node<T> {
    if (node.left === null) {
      return node;
    }
    return this.findMinElement(node.left);
  }

  deleteNode(currentNode: Node<T>, itemValue: number): Node<T> | null {
    if (currentNode.key === itemValue) {
      if (currentNode.left === null && currentNode.right === null) {
        return null;
      }
      if (currentNode.left === null) {
        return currentNode.right;
      }
      if (currentNode.right === null) {
        return currentNode.left;
      }
      const minNodeInRightSubtree: Node<T> = this.findMinElement(
        currentNode.right,
      );
      currentNode.key = minNodeInRightSubtree.key;
      currentNode.right = this.deleteNode(
        currentNode.right,
        minNodeInRightSubtree.key,
      );
      return currentNode;
    }

    if (itemValue < currentNode.key) {
      if (currentNode.left === null) {
        return currentNode;
      }
      currentNode.left = this.deleteNode(currentNode.left, itemValue);
      return currentNode;
    }

    if (itemValue > currentNode.key) {
      if (currentNode.right === null) {
        return currentNode;
      }
      currentNode.right = this.deleteNode(currentNode.right, itemValue);
      return currentNode;
    }
    return null;
  }

  deleteItem(nodeValue: number): number | null {
    if (this._root === null) {
      return null;
    }
    this._root = this.deleteNode(this._root, nodeValue);
    return 1;
  }
}
export { Tree };
