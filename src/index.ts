import { Tree } from "./tree.js";
import { Node } from "./node.js";

const NODE_RADIUS: number = 20;
const HORIZONTAL_SPACING: number = 50;
const VERTICAL_SPACING: number = 80;
const FONT_SIZE: number = 14;
const HIGHLIGHT_COLOR: string = "#4cc9f0";
const NODE_COLOR: string = "#4361ee";
const LINE_COLOR: string = "#3a56d4";
const TEXT_COLOR: string = "#ffffff";
const BG_COLOR: string = "#f8f9fa";

function initializeCanvas(): HTMLCanvasElement {
  const canvas = document.getElementById("drawing") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas element not found");
  }

  const updateCanvasSize = (): void => {
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth - 40;
      canvas.height = Math.max(500, window.innerHeight * 0.7);
    }
  };
  updateCanvasSize();
  window.addEventListener("resize", updateCanvasSize);
  return canvas;
}

function draw<T>(tree: Tree<T>, foundNode?: number): void {
  const canvas = initializeCanvas();
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (tree.root) {
    calculateTreeWidth(tree.root);
    const startX = canvas.width / 2;
    drawNode(tree.root, startX, VERTICAL_SPACING / 2, ctx, foundNode);
  }
}

function calculateTreeWidth<T>(node: Node<T> | null): number {
  if (!node) {
    return 0;
  }
  return (
    calculateTreeWidth(node.left) +
    HORIZONTAL_SPACING +
    calculateTreeWidth(node.right)
  );
}

function drawNode<T>(
  node: Node<T>,
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D,
  foundNode?: number,
  level: number = 1): void {
  const horizontalSpacing = HORIZONTAL_SPACING * (1 / Math.sqrt(level));

  if (node.left) {
    const leftX = x - horizontalSpacing;
    const leftY = y + VERTICAL_SPACING;
    drawLine(ctx, x, y, leftX, leftY);
    drawNode(node.left, leftX, leftY, ctx, foundNode, level + 1);
  }
  if (node.right) {
    const rightX = x + horizontalSpacing;
    const rightY = y + VERTICAL_SPACING;
    drawLine(ctx, x, y, rightX, rightY);
    drawNode(node.right, rightX, rightY, ctx, foundNode, level + 1);
  }
  ctx.beginPath();
  ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2);
  if (foundNode !== undefined && node.key === foundNode) {
    ctx.fillStyle = HIGHLIGHT_COLOR;
    ctx.strokeStyle = HIGHLIGHT_COLOR;
  } else {
    ctx.fillStyle = NODE_COLOR;
    ctx.strokeStyle = NODE_COLOR;
  }
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = `${FONT_SIZE}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(node.key), x, y);
}
function drawLine(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number): void {
  ctx.beginPath();
  ctx.moveTo(fromX, fromY + NODE_RADIUS);
  ctx.lineTo(toX, toY - NODE_RADIUS);
  ctx.strokeStyle = LINE_COLOR;
  ctx.lineWidth = 2;
  ctx.stroke();
}

const myTree = new Tree();
const btnAdd: HTMLElement | null = document.getElementById("add-to-tree");
const btnDel: HTMLElement | null = document.getElementById("delete-to-tree");
const btnFind: HTMLElement | null = document.getElementById("find-to-tree");

btnAdd?.addEventListener("click", addToTree);
btnDel?.addEventListener("click", delToTree);
btnFind?.addEventListener("click", findToTree);

function addToTree(): void {
  const inpAdd: HTMLInputElement | null = <HTMLInputElement | null>(
    document.getElementById("tree-input")
  );
  if (inpAdd?.value) {
    myTree.addNode(parseInt(inpAdd.value, 10), 0);
    draw(myTree);
    inpAdd.value = "";
  }
}

function delToTree(): void {
  const inpDel: HTMLInputElement | null = <HTMLInputElement | null>(
    document.getElementById("tree-delete")
  );
  if (inpDel?.value) {
    myTree.deleteItem(parseInt(inpDel.value, 10));
    draw(myTree);
    inpDel.value = "";
  }
}

function findToTree(): void {
  const inpFind: HTMLInputElement | null = <HTMLInputElement | null>(
    document.getElementById("tree-find")
  );
  if (!inpFind?.value) {
    return;
  }
  const info: HTMLInputElement | null = <HTMLInputElement | null>(
    document.getElementById("info")
  );
  while (info?.firstChild) {
    info.removeChild(info.firstChild);
  }

  const node = myTree.findByKey(parseInt(inpFind.value, 10));
  draw(myTree, node?.key);

  if (node && info) {
    const pKey = document.createElement("p");
    const pValue = document.createElement("p");
    pKey.textContent = `Key: ${node.key}`;
    pValue.textContent = `Value: ${node.value}`;
    info.append(pKey, pValue);
  }
}
