import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardSquare from "./BoardSquare";
import Knight from "./Knight";
import { moveKnight, canMoveKnight } from "./Game";

function handleSquareClick(toX, toY) {
  if (canMoveKnight(toX, toY)) {
    moveKnight(toX, toY);
  }
}

function renderPiece(x, y, [knightX, knightY]) {
  if (x === knightX && y === knightY) {
    return <Knight />;
  }
}

function renderSquare(i, knightPosition) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  // const isKnightHere = x === knightPosition[0] && y === knightPosition[1];
  // const black = (x + y) % 2 === 1;
  // const piece = isKnightHere ? <Knight /> : null;

  return (
    <div key={i} style={{ width: "50px", height: "50px" }}>
      <BoardSquare x={x} y={y}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  );
}

export default function Board({ knightPosition }) {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: "400px",
          height: "400px",
          display: "flex",
          flexWrap: "wrap",
          border: "1px solid black",
        }}
      >
        {squares}
      </div>
    </DndProvider>
  );
}
