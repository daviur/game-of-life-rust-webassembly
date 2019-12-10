# `Conway's Game of Life`

[![Build Status](https://travis-ci.com/daviur/game-of-life.svg?branch=master)](https://travis-ci.com/daviur/game-of-life)

**An implementation of the cellular automata.**

Based on the [Rust 🦀 and WebAssembly 🕸 book.](https://rustwasm.github.io/docs/book)

## 💬 About

This [implementation](https://www.davidurbina.net/game-of-life/docs/index.html) fo Conway's Game of Life makes use of the following technologies:

-   Rust 🦀
-   WebAssembly 🕸
-   TypeScript
-   JavaScript
-   Sass
-   HTML5
-   Webpack

### ☑️ Requirements

-   [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) for WebAssembly 🕸

-   <abbr title="Node Packet Manager">[NPM](https://www.npmjs.com/get-npm)</abbr> from Node.JS

### 🛠️ Build with `wasm-pack` and `npm`

```
wasm-pack build
cd www
npm install
npm run build
```

### 🔬 Test in Headless Browsers with `wasm-pack test`

```
wasm-pack test --headless --firefox
```

### 🎁 Publish to NPM with `wasm-pack publish`

```
wasm-pack publish
```

## 🔋 Batteries Included

-   [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen) for communicating
    between WebAssembly and JavaScript.
-   [`console_error_panic_hook`](https://github.com/rustwasm/console_error_panic_hook)
    for logging panic messages to the developer console.
-   [`wee_alloc`](https://github.com/rustwasm/wee_alloc), an allocator optimized
    for small code size.

## ™️ License

-   [MIT](https://github.com/daviur/game-of-life/blob/master/LICENSE_MIT)
-   [APACHE 2.0](https://github.com/daviur/game-of-life/blob/master/LICENSE_APACHE)
