import * as p5 from "p5";

import "../css/main.scss";

import { FpsCounter } from "./fpscounter";

import { Universe, Cell } from "wasm-game-of-life/wasm_game_of_life";

// Import the WebAssembly memory at the top of the file.
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

// Getting input controls
const restartButtom = <HTMLButtonElement>document.getElementById("restart");
const cleanButtom = <HTMLButtonElement>document.getElementById("clean");
const rangeFPS = <HTMLInputElement>document.getElementById("fps");
const playPauseButtom = <HTMLButtonElement>(
  document.getElementById("play-pause")
);
playPauseButtom.textContent = "⏸";

const fpsCounter = new FpsCounter(
  <HTMLDivElement>document.getElementById("fps-counter")
);
let fps = rangeFPS.valueAsNumber;

const canvas = <HTMLCanvasElement>(
  document.getElementById("game-of-life-canvas")
);

const BACKGROUND = "#000000";
const GRID_COLOR = "#0000FF";
const DEAD_COLOR = "#000000";
const ALIVE_COLOR = "#00FF00";
const CELL_SIZE = 2;
const COLUMNS = 500;
const ROWS = 300;

const sketch = (s: p5) => {
  let universe: Universe;
  let isPaused = false;

  s.setup = () => {
    // Construct the universe, and set its columns and rows.
    universe = Universe.new(COLUMNS, ROWS);
    s.createCanvas((CELL_SIZE + 1) * COLUMNS + 1, (CELL_SIZE + 1) * ROWS + 1);
    s.background(BACKGROUND);
    // drawGrid();
    s.frameRate(fps);
  };

  s.draw = () => {
    // drawGrid();
    drawCells();

    if (!isPaused) {
      fpsCounter.render();
      universe.tick();
    }
  };

  const drawGrid = () => {
    s.strokeWeight(1);
    s.stroke(GRID_COLOR);

    // Columns
    for (let col = 0; col <= COLUMNS; col++) {
      s.line(
        col * (CELL_SIZE + 1),
        0,
        col * (CELL_SIZE + 1),
        (CELL_SIZE + 1) * ROWS
      );
    }

    // Rows
    for (let row = 0; row <= ROWS; row++) {
      s.line(
        0,
        row * (CELL_SIZE + 1),
        (CELL_SIZE + 1) * COLUMNS,
        row * (CELL_SIZE + 1)
      );
    }
  };

  const drawCells = () => {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, COLUMNS * ROWS);
    const deltasPtr = universe.deltas();
    const deltas = new Uint8Array(memory.buffer, deltasPtr, COLUMNS * ROWS);

    // Dead cells
    s.fill(DEAD_COLOR);
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        const idx = getIndex(row, col);

        if (cells[idx] !== Cell.Dead) {
          continue;
        }

        if (deltas[idx] === 1) {
          s.rect(
            col * (CELL_SIZE + 1) + 1,
            row * (CELL_SIZE + 1) + 1,
            CELL_SIZE,
            CELL_SIZE
          );
        }
      }
    }

    // Alive cells
    s.fill(ALIVE_COLOR);
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        const idx = getIndex(row, col);

        if (cells[idx] !== Cell.Alive) {
          continue;
        }

        if (deltas[idx] === 1) {
          s.rect(
            col * (CELL_SIZE + 1) + 1,
            row * (CELL_SIZE + 1) + 1,
            CELL_SIZE,
            CELL_SIZE
          );
        }
      }
    }
  };

  const getIndex = (row: number, column: number) => {
    return row * COLUMNS + column;
  };

  const play = () => {
    playPauseButtom.textContent = "⏸";
    isPaused = false;
  };

  const pause = () => {
    playPauseButtom.textContent = "▶";
    isPaused = true;
  };

  playPauseButtom.addEventListener("click", event => {
    if (isPaused) {
      play();
    } else {
      pause();
    }
  });

  canvas.addEventListener("click", event => {
    const row = Math.min(Math.floor(s.mouseY / (CELL_SIZE + 1)), ROWS - 1);
    const col = Math.min(Math.floor(s.mouseX / (CELL_SIZE + 1)), COLUMNS - 1);
    universe.toggle_cell(row, col);
  });

  restartButtom.addEventListener("click", event => {
    universe.restart();
  });

  cleanButtom.addEventListener("click", event => {
    universe.clean();
  });

  rangeFPS.addEventListener("change", event => {
    fps = rangeFPS.valueAsNumber;
    s.frameRate(fps);
  });
};

new p5(sketch, canvas);
