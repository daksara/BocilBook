export interface MazeCell {
  row: number;
  col: number;
  walls: { top: boolean; right: boolean; bottom: boolean; left: boolean };
}

export interface MazeGrid {
  cols: number;
  rows: number;
  cells: MazeCell[][];
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Generates a perfect maze (single unique path between any two cells) via recursive backtracking. */
export function generateMaze(cols: number, rows: number, seed: number): MazeGrid {
  const rand = mulberry32(seed || 1);
  const cells: MazeCell[][] = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      walls: { top: true, right: true, bottom: true, left: true },
    }))
  );
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  function neighbors(row: number, col: number) {
    const dirs: { row: number; col: number; from: keyof MazeCell["walls"]; to: keyof MazeCell["walls"] }[] = [
      { row: row - 1, col, from: "top", to: "bottom" },
      { row: row + 1, col, from: "bottom", to: "top" },
      { row, col: col - 1, from: "left", to: "right" },
      { row, col: col + 1, from: "right", to: "left" },
    ];
    return dirs.filter((d) => d.row >= 0 && d.row < rows && d.col >= 0 && d.col < cols && !visited[d.row][d.col]);
  }

  const stack: { row: number; col: number }[] = [{ row: 0, col: 0 }];
  visited[0][0] = true;

  while (stack.length) {
    const current = stack[stack.length - 1];
    const options = neighbors(current.row, current.col);
    if (options.length === 0) {
      stack.pop();
      continue;
    }
    const next = options[Math.floor(rand() * options.length)];
    cells[current.row][current.col].walls[next.from] = false;
    cells[next.row][next.col].walls[next.to] = false;
    visited[next.row][next.col] = true;
    stack.push({ row: next.row, col: next.col });
  }

  return { cols, rows, cells };
}

export function mazeSizeForDifficulty(difficulty: "easy" | "medium" | "advanced") {
  if (difficulty === "easy") return { cols: 6, rows: 7 };
  if (difficulty === "medium") return { cols: 8, rows: 9 };
  return { cols: 10, rows: 11 };
}
