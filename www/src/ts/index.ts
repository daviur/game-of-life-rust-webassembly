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
const rangeFPS = <HTMLInputElement>document.getElementById('fps');

let fps = rangeFPS.valueAsNumber;
let fpsInterval: number;
let then: number;

const startAnimating = (fps: number) => {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    play();
};

const play = () => {
    playPauseButtom.textContent = '⏸';
    renderLoop();
};

const pause = () => {
    playPauseButtom.textContent = '▶';
    cancelAnimationFrame(animationId);
    animationId = null;
};

let animationId = null;

const isPaused = () => {
    return animationId === null;
};

let elapsed: number;
let now: number;

const renderLoop = () => {
    now = window.performance.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        fpsCounter.render();

        // ! debugger;
        universe.tick();
        drawGrid();
        drawCells();
    }
    animationId = requestAnimationFrame(renderLoop);
};

const CELL_SIZE = 15;
const GRID_COLOR = '#555555';
const DEAD_COLOR = '#FFFFFF';
const ALIVE_COLOR = '#000000';
const width = 32;
const height = 32;

// Construct the universe, and set its width and height.
const universe = Universe.new(width, height);

// Give the canvas room for all of our cells and a 1px border
// around each of them.
const canvas = <HTMLCanvasElement>(
    document.getElementById('game-of-life-canvas')
);
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    // Vertical lines.
    for (let i = 0; i <= width; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    // Horizontal lines.
    for (let j = 0; j <= height; j++) {
        ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
};

const getIndex = (row, column) => {
    return row * width + column;
};

const drawCells = () => {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);
    const deltasPtr = universe.deltas();
    const deltas = new Uint8Array(memory.buffer, deltasPtr, width * height);

    // Dead cells.
    ctx.fillStyle = DEAD_COLOR;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);

            if (cells[idx] !== Cell.Dead) {
                continue;
            }

            if (deltas[idx] === 1) {
                ctx.fillRect(
                    col * (CELL_SIZE + 1) + 1,
                    row * (CELL_SIZE + 1) + 1,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        }
    }

    // Alive cells.
    ctx.fillStyle = ALIVE_COLOR;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);

            if (cells[idx] !== Cell.Alive) {
                continue;
            }

            if (deltas[idx] === 1) {
                ctx.fillRect(
                    col * (CELL_SIZE + 1) + 1,
                    row * (CELL_SIZE + 1) + 1,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        }
    }
};

canvas.addEventListener('click', event => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

    universe.toggle_cell(row, col);

    // drawGrid();
    drawCells();
});

playPauseButtom.addEventListener('click', event => {
    if (isPaused()) {
        play();
    } else {
        pause();
    }
});

restartButtom.addEventListener('click', event => {
    universe.restart();
    drawGrid();
    drawCells();
});

cleanButtom.addEventListener('click', event => {
    universe.clean();
    drawGrid();
    drawCells();
});

rangeFPS.addEventListener('change', event => {
    fps = rangeFPS.valueAsNumber;
    fpsInterval = 1000 / fps;
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

drawGrid();
drawCells();
startAnimating(fps);
