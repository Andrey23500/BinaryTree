class Node<T> {
  private _value: T;
  private _key: number;
  private _left: Node<T> | null;
  private _right: Node<T> | null;
  constructor(key: number, data: T) {
    this._value = data;
    this._key = key;
    this._left = null;
    this._right = null;
  }
  get value(): T {
    return this._value;
  }
  set key(val: number) {
    this._key = val;
  }
  get key(): number {
    return this._key;
  }
  get left(): Node<T> | null {
    return this._left;
  }
  set left(node: Node<T> | null) {
    this._left = node;
  }
  get right(): Node<T> | null {
    return this._right;
  }
  set right(node: Node<T> | null) {
    this._right = node;
  }
}
export { Node };
