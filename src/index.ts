import { Tree } from "./tree.js";
import { Node } from "./node.js";

const RADIUS: number = 10;
const RADIUS2: number = RADIUS * 2;
const RADIUS3: number = RADIUS * 3;
const RADIUS12: number = RADIUS / 2;

function draw<T>(tree: Tree<T>, findedNode?: number): void {
  const c: HTMLCanvasElement | null = <HTMLCanvasElement | null>(
    document.getElementById("drawing")
  );
  if (c) {
    const ctx: CanvasRenderingContext2D | null = c.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, c.width, c.height);
      if (tree.root) {
        if (findedNode) {
          drawNode(tree.root, c.width / 2, 2 * RADIUS, ctx, findedNode);
        } else {
          drawNode(tree.root, c.width / 2, 2 * RADIUS, ctx);
        }
      }
    }
  }
}

function drawNode<T>(
  node: Node<T>,
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D,
  findedNode?: number,
): void {
  ctx.beginPath();
  ctx.arc(x, y, RADIUS, 0, 2 * Math.PI, false);
  ctx.textAlign = "center";
  ctx.strokeStyle = "#FF9B40";
  ctx.stroke();
  ctx.closePath();
  ctx.fillStyle = "#FF9B40";
  if (findedNode !== undefined && node.key === findedNode) {
    ctx.fill();
    ctx.fillStyle = "#476BD6";
  }
  ctx.fillText(String(node.key), x, y);

  if (node.left) {
    drawLine(ctx, x, y, x - RADIUS2, y + RADIUS3);
    drawNode(node.left, x - RADIUS2, y + RADIUS3, ctx, findedNode);
  }
  if (node.right) {
    drawLine(ctx, x, y, x + RADIUS2, y + RADIUS3);
    drawNode(node.right, x + RADIUS2, y + RADIUS3, ctx, findedNode);
  }
}
function drawLine(
  ctx: CanvasRenderingContext2D,
  moveToX: number,
  moveToY: number,
  lineToX: number,
  lineToY: number,
): void {
  ctx.beginPath();
  ctx.moveTo(moveToX + RADIUS12 - 5, moveToY + RADIUS12 + 5);
  ctx.lineTo(lineToX - RADIUS12 + 5, lineToY - RADIUS12 - 5);
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
  if (inpAdd && inpAdd.value !== "") {
    myTree.addNode(parseInt(inpAdd.value, 10), 0);
    draw(myTree);
  }
}

function delToTree(): void {
  const inpDel: HTMLInputElement | null = <HTMLInputElement | null>(
    document.getElementById("tree-delete")
  );
  if (inpDel && inpDel.value !== "") {
    myTree.deleteItem(parseInt(inpDel.value, 10));
    draw(myTree);
  }
}

function findToTree(): void {
  const inpFind: HTMLInputElement | null = <HTMLInputElement | null>(
    document.getElementById("tree-find")
  );
  if (inpFind && inpFind.value !== "") {
    const info: HTMLInputElement | null = <HTMLInputElement | null>(
      document.getElementById("info")
    );
    while (info?.firstChild) {
      info.removeChild(info.firstChild);
    }
    const node = myTree.findByKey(parseInt(inpFind.value, 10));
    draw(myTree, node?.key);
    if (node && info) {
      // info.style.display = "block";
      const pKey = document.createElement("p");
      const pValue = document.createElement("p");
      pKey.append("Key node: " + String(node.key));
      info.append(pKey);
      pValue.append("Value node: " + String(node.value));
      info.append(pValue);
    }
  }
}
