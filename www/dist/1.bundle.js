(window.webpackJsonp=window.webpackJsonp||[]).push([[1],[,function(t,e,n){"use strict";n.r(e);var r=n(4),o=(n(6),n(2)),i=n(3),a=document.getElementById("restart"),c=document.getElementById("clean"),s=document.getElementById("play-pause");s.textContent="⏸";var f=document.getElementById("fps"),u=document.getElementById("game-of-life-canvas"),l=f.valueAsNumber,d=o.b.new(256,128),h=!1,m=new r((function(t){t.setup=function(){t.createCanvas(769,385),t.background("#000000"),e(),t.frameRate(l)},t.draw=function(){n(),h||(p.render(),d.tick())};var e=function(){t.strokeWeight(1),t.stroke("#000000");for(var e=0;e<=256;e++)t.line(3*e,0,3*e,384);for(var n=0;n<=128;n++)t.line(0,3*n,768,3*n)},n=function(){var e=d.cells(),n=new Uint8Array(i.e.buffer,e,32768),a=d.deltas(),c=new Uint8Array(i.e.buffer,a,32768);t.fill("#000000");for(var s=0;s<128;s++)for(var f=0;f<256;f++){n[u=r(s,f)]===o.a.Dead&&(1===c[u]&&t.rect(3*f+1,3*s+1,2,2))}t.fill("lightblue");for(s=0;s<128;s++)for(f=0;f<256;f++){var u;n[u=r(s,f)]===o.a.Alive&&(1===c[u]&&t.rect(3*f+1,3*s+1,2,2))}},r=function(t,e){return 256*t+e}}),u);s.addEventListener("click",(function(t){h?(s.textContent="⏸",h=!1):(s.textContent="▶",h=!0)})),u.addEventListener("click",(function(t){var e=Math.min(Math.floor(m.mouseY/3),127),n=Math.min(Math.floor(m.mouseX/3),255);d.toggle_cell(e,n)})),a.addEventListener("click",(function(t){d.restart()})),c.addEventListener("click",(function(t){d.clean()})),f.addEventListener("change",(function(t){l=f.valueAsNumber,m.frameRate(l)}));var p=new(function(){function t(){this.fps=document.getElementById("fps-counter"),this.frames=[],this.lastFrameTimeStamp=performance.now()}return t.prototype.render=function(){var t=performance.now(),e=t-this.lastFrameTimeStamp;this.lastFrameTimeStamp=t;var n=1/e*1e3;this.frames.push(n),this.frames.length>100&&this.frames.shift();for(var r=1/0,o=-1/0,i=0,a=0;a<this.frames.length;a++)i+=this.frames[a],r=Math.min(this.frames[a],r),o=Math.max(this.frames[a],o);var c=i/this.frames.length;this.fps.textContent=("\n  Frames per Second:\n           latest = "+Math.round(n)+"\n  avg of last 100 = "+Math.round(c)+"\n  min of last 100 = "+Math.round(r)+"\n  max of last 100 = "+Math.round(o)+"\n  ").trim()},t}())},function(t,e,n){"use strict";n.d(e,"a",(function(){return b})),n.d(e,"b",(function(){return w})),n.d(e,"d",(function(){return v})),n.d(e,"f",(function(){return y})),n.d(e,"c",(function(){return k})),n.d(e,"g",(function(){return E})),n.d(e,"e",(function(){return M})),n.d(e,"h",(function(){return A}));var r=n(3);let o=null;function i(){return null!==o&&o.buffer===r.e.buffer||(o=new Int32Array(r.e.buffer)),o}let a=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});a.decode();let c=null;function s(){return null!==c&&c.buffer===r.e.buffer||(c=new Uint8Array(r.e.buffer)),c}function f(t,e){return a.decode(s().subarray(t,t+e))}const u=new Array(32);u.fill(void 0),u.push(void 0,null,!0,!1);let l=u.length;function d(t){return u[t]}let h=0,m=new TextEncoder("utf-8");const p="function"==typeof m.encodeInto?function(t,e){return m.encodeInto(t,e)}:function(t,e){const n=m.encode(t);return e.set(n),{read:t.length,written:n.length}};function g(t){const e=d(t);return function(t){t<36||(u[t]=l,l=t)}(t),e}const b=Object.freeze({Dead:0,Alive:1});class w{static __wrap(t){const e=Object.create(w.prototype);return e.ptr=t,e}free(){const t=this.ptr;this.ptr=0,r.a(t)}tick(){r.o(this.ptr)}static new(t,e){const n=r.j(t,e);return w.__wrap(n)}render(){r.k(8,this.ptr);const t=i(),e=f(t[2],t[3]).slice();return r.b(t[2],1*t[3]),e}width(){return r.q(this.ptr)>>>0}height(){return r.i(this.ptr)>>>0}cells(){return r.f(this.ptr)}deltas(){return r.h(this.ptr)}set_width(t){r.n(this.ptr,t)}set_height(t){r.m(this.ptr,t)}toggle_cell(t,e){r.p(this.ptr,t,e)}restart(){r.l(this.ptr)}clean(){r.g(this.ptr)}}const v=function(){return function(t){l===u.length&&u.push(u.length+1);const e=l;return l=u[e],u[e]=t,e}(new Error)},y=function(t,e){const n=function(t){let e=t.length,n=r.c(e);const o=s();let i=0;for(;i<e;i++){const e=t.charCodeAt(i);if(e>127)break;o[n+i]=e}if(i!==e){0!==i&&(t=t.slice(i)),n=r.d(n,e,e=i+3*t.length);const o=s().subarray(n+i,n+e);i+=p(t,o).written}return h=i,n}(d(e).stack),o=h;i()[t/4+0]=n,i()[t/4+1]=o},k=function(t,e){const n=f(t,e).slice();r.b(t,1*e),console.error(n)},E=function(t){g(t)},M="function"==typeof Math.random?Math.random:(x="Math.random",()=>{throw new Error(`${x} is not defined`)});var x;const A=function(t,e){throw new Error(f(t,e))}},function(t,e,n){"use strict";var r=n.w[t.i];t.exports=r;n(2);r.r()},,,function(t,e,n){var r=n(7);"string"==typeof r&&(r=[[t.i,r,""]]);var o={insert:"head",singleton:!1};n(9)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(8)(!1)).push([t.i,".game-of-life{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:#000;color:#fff}.blue_btn{background-image:-webkit-gradient(linear, 0% 100%, 0% 0%, from(#1a61db), color-stop(0.51, #3690f0), color-stop(0.54, #54a4ee), to(#70b5f2));background-image:-moz-linear-gradient(center bottom, #1a61db 0%, #3690f0 51%, #54a4ee 54%, #70b5f2 100%);background-color:#1c65dc}#fps-counter{white-space:pre;font-family:monospace}\n",""])}]]);