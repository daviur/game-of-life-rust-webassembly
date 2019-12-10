import * as p5 from 'p5';

import '../css/main.scss';
import { Universe, Cell } from 'wasm-game-of-life/wasm_game_of_life';

// Import the WebAssembly memory at the top of the file.
import { memory } from 'wasm-game-of-life/wasm_game_of_life_bg';

// Getting input controls
const restartButtom = <HTMLButtonElement>document.getElementById('restart');
const cleanButtom = <HTMLButtonElement>document.getElementById('clean');
const playPauseButtom = <HTMLButtonElement>(
    document.getElementById('play-pause')
);
playPauseButtom.textContent = '⏸';

const rangeFPS = <HTMLInputElement>document.getElementById('fps');

const canvas = <HTMLCanvasElement>(
    document.getElementById('game-of-life-canvas')
);

const BACKGROUND = '#000000';
const GRID_COLOR = '#000000';
const DEAD_COLOR = '#000000';
const ALIVE_COLOR = '#FF0000';
const CELL_SIZE = 2;
const COLUMNS = 512;
const ROWS = 256;

let fps = rangeFPS.valueAsNumber;

// Construct the universe, and set its columns and rows.
const universe = Universe.new(COLUMNS, ROWS);

let isPaused = false;

const sketch = (s: p5) => {
    s.setup = () => {
        s.createCanvas(
            (CELL_SIZE + 1) * COLUMNS + 1,
            (CELL_SIZE + 1) * ROWS + 1,
        );
        s.background(BACKGROUND);
        drawGrid();
        s.frameRate(fps);
    };

    s.draw = () => {
        // ! debugger;
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
                (CELL_SIZE + 1) * ROWS,
            );
        }

        // Rows
        for (let row = 0; row <= ROWS; row++) {
            s.line(
                0,
                row * (CELL_SIZE + 1),
                (CELL_SIZE + 1) * COLUMNS,
                row * (CELL_SIZE + 1),
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
                        CELL_SIZE,
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
                        CELL_SIZE,
                    );
                }
            }
        }
    };

    const getIndex = (row: number, column: number) => {
        return row * COLUMNS + column;
    };
};

const myp5 = new p5(sketch, canvas);

const play = () => {
    playPauseButtom.textContent = '⏸';
    isPaused = false;
};

const pause = () => {
    playPauseButtom.textContent = '▶';
    isPaused = true;
};

playPauseButtom.addEventListener('click', event => {
    if (isPaused) {
        play();
    } else {
        pause();
    }
});

canvas.addEventListener('click', event => {
    const row = Math.min(Math.floor(myp5.mouseY / (CELL_SIZE + 1)), ROWS - 1);
    const col = Math.min(
        Math.floor(myp5.mouseX / (CELL_SIZE + 1)),
        COLUMNS - 1,
    );
    universe.toggle_cell(row, col);
});

restartButtom.addEventListener('click', event => {
    universe.restart();
});

cleanButtom.addEventListener('click', event => {
    universe.clean();
});

rangeFPS.addEventListener('change', event => {
    fps = rangeFPS.valueAsNumber;
    myp5.frameRate(fps);
});

const fpsCounter = new (class {
    fps: HTMLDivElement;
    frames: Array<number>;
    lastFrameTimeStamp: number;

    constructor() {
        this.fps = <HTMLDivElement>document.getElementById('fps-counter');
        this.frames = [];
        this.lastFrameTimeStamp = performance.now();
    }

    render() {
        // Convert the delta time since the last frame render into a measure
        // of frames per second.
        const now = performance.now();
        const delta = now - this.lastFrameTimeStamp;
        this.lastFrameTimeStamp = now;
        const fps = (1 / delta) * 1000;

        // Save only the latest 100 timings.
        this.frames.push(fps);
        if (this.frames.length > 100) {
            this.frames.shift();
        }

        // Find the max, min, and mean of our 100 latest timings.
        let min = Infinity;
        let max = -Infinity;
        let sum = 0;
        for (let i = 0; i < this.frames.length; i++) {
            sum += this.frames[i];
            min = Math.min(this.frames[i], min);
            max = Math.max(this.frames[i], max);
        }
        let mean = sum / this.frames.length;

        // Render the statistics.
        this.fps.textContent = `
  Frames per Second:
           latest = ${Math.round(fps)}
  avg of last 100 = ${Math.round(mean)}
  min of last 100 = ${Math.round(min)}
  max of last 100 = ${Math.round(max)}
  `.trim();
    }
})();
