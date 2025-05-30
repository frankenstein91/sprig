/*
@title: Flip a Coin
@description: "Flip a Coin" is a retro-themed game by Arnav Kumar where players can simulate flipping a coin, with the added twist of hidden Easter eggs throughout the gameplay. The simplicity of pressing a single button to flip the coin invites exploration and surprise. Players can enjoy the nostalgic feel while searching for unexpected elements hidden in the game.
@author: Arnav Kumar
@tags: ['retro']
@addedOn: 2024-07-24

*/
let background = "b";

setLegend(
  ["0", bitmap`
.....000000.....
...0066666600...
..066666666660..
.0666FFFFFF6660.
.066F666666F660.
066F660660662660
066F660660662660
066F660000662660
066F660660662660
066F660660662660
066F666666662660
.06626666662660.
.06662222226660.
..066666666660..
...0066666600...
.....000000.....`],
  ["1", bitmap`
................
.....000000.....
...0066666600...
..066666666660..
.0666FFFFFF6660.
0666F666666F6660
066F660660662660
066F660000662660
066F660660662660
066F660660662660
0666266666626660
.06662222226660.
..066666666660..
...0066666600...
.....000000.....
................`],
  ["2", bitmap`
................
................
.....000000.....
...0066666600...
..066666666660..
.0666FFFFFF6660.
0666F666666F6660
066F660660662660
066F660000662660
0666260660626660
.06662222226660.
..066666666660..
...0066666600...
.....000000.....
................
................`],
  ["3", bitmap`
................
................
................
................
...0000000000...
.00666666666000.
0666FFFFFFFF6660
066F660660662660
066F660000662660
0666222222226660
.00666666666600.
...0000000000...
................
................
................
................`],
  ["4", bitmap`
................
................
................
................
................
................
0000000000000000
0FF2666666666660
0FF2666666666660
0000000000000000
................
................
................
................
................
................`],
  ["5", bitmap`
................
................
................
................
...0000000000...
.00666666666000.
0666FFFFFFFF6660
066F660000662660
066F666666662660
0666222222226660
.00666666666600.
...0000000000...
................
................
................
................`],
  ["6", bitmap`
................
................
.....000000.....
...0066666600...
..066666666660..
.0666FFFFFF6660.
0666F666666F6660
066F660000662660
066F666006662660
0666266666626660
.06662222226660.
..066666666660..
...0066666600...
.....000000.....
................
................`],
  ["7", bitmap`
................
.....000000.....
...0066666600...
..066666666660..
.0666FFFFFF6660.
0666F666666F6660
066F660000662660
066F666006662660
066F666006662660
066F666006662660
0666266666626660
.06662222226660.
..066666666660..
...0066666600...
.....000000.....
................`],
  ["8", bitmap`
.....000000.....
...0066666600...
..066666666660..
.0666FFFFFF6660.
.066F666666F660.
066F666666662660
066F660000662660
066F666006662660
066F666006662660
066F666006662660
066F666666662660
.06626666662660.
.06662222226660.
..066666666660..
...0066666600...
.....000000.....`],
  [background, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`]
);

let page = "welcome";
const pages = {
  welcome: () => {
    page = "welcome";
    clearText();
    addText("Flip a Coin!", { x: 4, y: 2, color: color`2` });
    addText("press i to flip", { x: 2, y: 14, color: color`2` });
    return map`
.....
..0..
.....
.....`;
  },
  animation: coin => {
    page = "animation";
    clearText();
    return map`
.....
..${coin}..
.....
.....`;
  },
  result: (coin) => {
    page = "result";
    clearText();
    return map`
.....
..${coin}..
.....
.....`;
  },
}

setBackground(background);
setMap(pages.welcome());
let bias = null;
let previousKeys = [];

onInput("i", () => {
  let i = 0,
    modifier = 1;
  let interval = setInterval(() => {
    setMap(pages.animation(i));
    i += modifier;
    if (i > 8) {
      modifier = -1;
      i = 8;
    }
    if (i < 0) {
      modifier = 1;
      i = 0;
    }

  }, 50);
  let mapping = bias !== null ? [...new Array(3).fill([0, 8].filter(i => i !== bias)[0]), ...new Array(7).fill(bias)] : [0, 8];
  let result = mapping[Math.floor(Math.random() * mapping.length)];
  console.log(mapping, result)
  setTimeout(() => {
    clearInterval(interval);
    setMap(pages.result(result));
    addText(`You got ${result == 0 ? "Head!" : "Tail!"}`, { x: 4, y: 10, color: color`2` });
    bias = null;
  }, result == 0 ? 400 * 5 - 100 : 400 * 8 - 50);
});

onInput("w", () => {
  previousKeys.push("w");
  setTimeout(() => { previousKeys = []; }, 300);
});

onInput("a", () => {
  if (previousKeys[previousKeys.length - 1] == "w") {
    bias = 0;
  }
});

onInput("d", () => {
  if (previousKeys[previousKeys.length - 1] == "w") {
    bias = 8;
  }
});