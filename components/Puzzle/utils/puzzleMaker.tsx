type EdgeType = "0" | "1" | "2";

export interface PuzzlePiece {
  code: string;
  row: number;
  col: number;
}

export interface PuzzleGrid {
  pieces: PuzzlePiece[][];
  rows: number;
  cols: number;
}

function getCompatibleEdge(edge: EdgeType): EdgeType {
  if (edge === "1") return "2";
  if (edge === "2") return "1";
  return "0";
}

function getRandomEdge(): EdgeType {
  const random = Math.floor(Math.random() * 2) + 1;
  return random.toString() as EdgeType;
}

function generatePieceCode(
  row: number,
  col: number,
  grid: (PuzzlePiece | null)[][],
  rows: number,
  cols: number
): string {
  let edges: EdgeType[] = ["0", "0", "0", "0"];

  const isTopRow = row === 0;
  const isBottomRow = row === rows - 1;
  const isLeftCol = col === 0;
  const isRightCol = col === cols - 1;
  const isCorner = (isTopRow || isBottomRow) && (isLeftCol || isRightCol);
  const isEdge = isTopRow || isBottomRow || isLeftCol || isRightCol;

  if (isTopRow) {
    edges[0] = "0";
  } else {
    const topPiece = grid[row - 1]?.[col];
    if (topPiece) {
      edges[0] = getCompatibleEdge(topPiece.code[2] as EdgeType);
    } else {
      edges[0] = getRandomEdge();
    }
  }

  if (isRightCol) {
    edges[1] = "0";
  } else {
    edges[1] = getRandomEdge();
  }

  if (isBottomRow) {
    edges[2] = "0";
  } else {
    edges[2] = getRandomEdge();
  }

  if (isLeftCol) {
    edges[3] = "0";
  } else {
    const leftPiece = grid[row]?.[col - 1];
    if (leftPiece) {
      edges[3] = getCompatibleEdge(leftPiece.code[1] as EdgeType);
    } else {
      edges[3] = getRandomEdge();
    }
  }

  if (isCorner) {
    if (isTopRow && isLeftCol) {
      edges[1] = getRandomEdge();
      edges[2] = getRandomEdge();
    } else if (isTopRow && isRightCol) {
      edges[2] = getRandomEdge();
      edges[3] = getRandomEdge();
    } else if (isBottomRow && isLeftCol) {
      edges[0] = getRandomEdge();
      edges[1] = getRandomEdge();
    } else if (isBottomRow && isRightCol) {
      edges[0] = getRandomEdge();
      edges[3] = getRandomEdge();
    }
  } else if (isEdge) {
    let flatEdgeIndex = -1;
    if (isTopRow) flatEdgeIndex = 0;
    else if (isBottomRow) flatEdgeIndex = 2;
    else if (isLeftCol) flatEdgeIndex = 3;
    else if (isRightCol) flatEdgeIndex = 1;

    for (let i = 0; i < 4; i++) {
      if (i !== flatEdgeIndex && edges[i] === "0") {
        edges[i] = getRandomEdge();
      }
    }
  } else {
    for (let i = 0; i < 4; i++) {
      if (edges[i] === "0") {
        edges[i] = getRandomEdge();
      }
    }
  }

  const flatCount = edges.filter((e) => e === "0").length;
  if (!isCorner && flatCount >= 2) {
    let flatEdgeIndex = -1;
    if (isTopRow) flatEdgeIndex = 0;
    else if (isBottomRow) flatEdgeIndex = 2;
    else if (isLeftCol) flatEdgeIndex = 3;
    else if (isRightCol) flatEdgeIndex = 1;

    for (let i = 0; i < 4; i++) {
      if (i !== flatEdgeIndex && edges[i] === "0") {
        edges[i] = getRandomEdge();
      }
    }
  }

  const finalNonFlatCount = edges.filter((e) => e !== "0").length;
  if (finalNonFlatCount < 2) {
    if (!isCorner) {
      let changed = 0;
      for (let i = 0; i < 4 && changed < 2 - finalNonFlatCount; i++) {
        const isOuterEdge =
          (isTopRow && i === 0) ||
          (isBottomRow && i === 2) ||
          (isLeftCol && i === 3) ||
          (isRightCol && i === 1);

        if (!isOuterEdge && edges[i] === "0") {
          edges[i] = getRandomEdge();
          changed++;
        }
      }
    }
  }

  return edges.join("");
}

function fixPieceCompatibility(
  row: number,
  col: number,
  grid: (PuzzlePiece | null)[][],
  rows: number,
  cols: number
): void {
  const piece = grid[row][col];
  if (!piece) return;

  if (row < rows - 1) {
    const bottomPiece = grid[row + 1]?.[col];
    if (bottomPiece) {
      const compatibleTopEdge = getCompatibleEdge(piece.code[2] as EdgeType);
      if (bottomPiece.code[0] !== compatibleTopEdge) {
        let bottomEdges = bottomPiece.code.split("") as EdgeType[];
        bottomEdges[0] = compatibleTopEdge;
        grid[row + 1][col] = {
          ...bottomPiece,
          code: bottomEdges.join(""),
        };
      }
    }
  }

  if (col < cols - 1) {
    const rightPiece = grid[row]?.[col + 1];
    if (rightPiece) {
      const compatibleLeftEdge = getCompatibleEdge(piece.code[1] as EdgeType);
      if (rightPiece.code[3] !== compatibleLeftEdge) {
        let rightEdges = rightPiece.code.split("") as EdgeType[];
        rightEdges[3] = compatibleLeftEdge;
        grid[row][col + 1] = {
          ...rightPiece,
          code: rightEdges.join(""),
        };
      }
    }
  }
}

export function generatePuzzleGrid(rows: number, cols: number): PuzzleGrid {
  const grid: (PuzzlePiece | null)[][] = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const code = generatePieceCode(row, col, grid, rows, cols);
      grid[row][col] = {
        code,
        row,
        col,
      };
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      fixPieceCompatibility(row, col, grid, rows, cols);
    }
  }

  const pieces: PuzzlePiece[][] = grid.map((row) => row.map((piece) => piece!));

  return {
    pieces,
    rows,
    cols,
  };
}

export function getPuzzlePiece(
  grid: PuzzleGrid,
  row: number,
  col: number
): PuzzlePiece | null {
  if (row < 0 || row >= grid.rows || col < 0 || col >= grid.cols) {
    return null;
  }
  return grid.pieces[row][col];
}
