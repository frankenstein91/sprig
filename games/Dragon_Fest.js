/*
@title: Dragon_Fest
@description: "Dragon Fest" is an endless survival game where the player must shoot down orbs with fireballs to prevent them from reaching the hedge. The objective is to survive for one minute, and the game involves strategic movement and shooting to manage the orbs effectively. It provides a dynamic challenge with increasing difficulty as the timer counts down.
@author: Peyeyey
@tags: ['endless']
@addedOn: 2022-12-27
*/

const player = "p";
const orb = "o";
const bush = "b";
const floor_tile = "t";
const fireball = "f";
const poof = "*";
const black = "a";
const dead_dragon = "d";
const confetti = "c";
const party_popper = "g";
const fireball_dragon = "<";
setLegend(
  [ player, bitmap`
..........7.7...
.........7.H.7..
..0L......7.7...
.H70L.....H00...
07700L...H0020..
H70H70L..H00000.
0H70770L.H06693.
H77H770000000993
07707H0H007.003.
.H0H0..0H77LLL..
.......0077000L.
.......H0070.H0.
.......0H000..1.
......0H000.....
.....H0.L00.....
....70...LH01...`],
  [ orb, bitmap`
................
................
................
.....0000000....
....002000000...
...00220021120..
...02200015510..
...02200015510..
...02200051150..
...00220051150..
...00020025520..
....000000000...
.....0000000....
................
................
................`],
  [ bush, bitmap`
DDDDDDDDD4D334.4
D34DD44DDD4D34..
4DD8DD8D88DDD..D
DD8684DD84DD34D.
DD48DDD4DDD363..
4D4DDD4DDD4D3DD.
33DDD884D8DDD..D
3D4DDD8D8684DD4.
DD443DDD48DDDD..
DDD363D444DDD.4.
4D4434D4DDD43D..
D8DDDDD3D4DDDDD.
DD4D44DDD8DDD8.4
D3DD334D868D4...
363DD3DDD8DD8DD.
D3DD4DD4DD4884.4`],
  [ floor_tile, bitmap`
FCFCCFCFCFCFCCFC
CFCCCCFCCCFCCCFF
CCCFCCCFCCCCFCCC
FCCCCCFCFCCCCCCF
CFCCFCCFCCFCFCFC
FCCFCFCCCFCFCCCF
CFCCFCCFCCFCCFCC
FCFCCCFCFCCCFCFC
CFCCFCCFCCFCCFCF
CCCFCFCCCFCFCCFC
CFCCFCCFCCFCCCCF
FCFCCCFCFCCCCFCC
CFCCFCCFCFCCFCFC
CCCFCFCCCCCCCFCC
CFCCFCFCCFCFCCCF
FCFCCFCFCCCCFCFC`],
  [ fireball, bitmap`
................
................
................
................
......33333.....
....33999933....
...3999969933...
..399666669933..
.39966666669933.
..399666669933..
...3996996933...
....39999933....
.....333333.....
................
................
................`],
  [ poof, bitmap`
................
....C3..C3......
.C.99C99.3C3....
...F.333F9.3C...
.93..9.333393...
..F36969693F3...
.3.9.69666339...
.33.69666963F3..
..C69666666FCC..
....3966696.39..
9C39969669339C3.
.93.F669F9.C.3..
.C.9999.3.39C...
.C3.9.3999C.....
...3....3.......
.....CCF..F.....`],
  [ black, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ dead_dragon, bitmap`
0000000000000000
0000000000000000
0003333000000000
0303111330000000
0331H55130300000
03155H5H13300000
315H5H5H51300000
3155HHH551333000
33155H55HLL30000
03LLLL55LHLL3310
03HH5LLLLLHLL101
003LH1LL1L0HL3L0
033LHLL11L0LL101
00333HL33LLL3310
0000333333L33300
0000030303303000`],
  [ confetti, bitmap`
4..9..54....H.46
.3H..3..7.9.37..
9.76H.9.6.H..45.
.3H.74...7.9....
6..4.3.9.3...H9.
..3...5.7..56...
7...67.5.H4.....
.3..H...9.6.3...
.4.7..3..7.H....
....6749.H.9....
...7...5.3......
....4.H.6.H5....
....9..7.9......
......6.4.......
.....3.3.3......
.......6H.......`],
  [ party_popper, bitmap`
..4.5..H.3..3...
.3.9.9..4.7..5..
.6.7..3H.69.....
5..34..65..3.H..
..5.H.H4..4.....
...9....4H.5....
.H..3.3...9.....
...5.6H.3.H5....
...333333333....
...999999999....
....6666666.....
.....44444......
......777.......
......3H3.......
.....33533......
.....35553......`],
  [ fireball_dragon, bitmap`
..........7.7...
.........7.H.7..
..0L......7.7...
.H70L.....H00...
07700L...H0020..
H70H70L..H00000.
0H70770L.H093...
H77H770000000...
07707H0H007.00..
.H0H0..0H77LLL..
.......0077000L.
.......H0070.H0.
.......0H000..1.
......0H000.....
.....H0.L00.....
....70...LH01...`],
);

const shootInterval = 3;

let timer;

let orbChance = -Infinity;  // 0 -> no chance, 10 -> fire for sure
let lives = 0;
let dragon;
let playback;
let shoot = shootInterval;  // number of frames until player can shoot

const themeMusic = tune`
157.89473684210526: g4~157.89473684210526 + g5-157.89473684210526 + c5/157.89473684210526 + c4/157.89473684210526 + e4^157.89473684210526,
157.89473684210526: e4~157.89473684210526 + e5~157.89473684210526,
157.89473684210526: c5~157.89473684210526 + a5-157.89473684210526 + a4/157.89473684210526,
157.89473684210526: d4~157.89473684210526 + f4-157.89473684210526 + g5/157.89473684210526 + e5^157.89473684210526,
157.89473684210526: b4^157.89473684210526 + a5^157.89473684210526,
157.89473684210526: g5~157.89473684210526 + d5/157.89473684210526 + f4/157.89473684210526,
157.89473684210526: a4~157.89473684210526 + d4-157.89473684210526,
157.89473684210526: d5-157.89473684210526 + a5/157.89473684210526,
157.89473684210526: f4~157.89473684210526 + f5~157.89473684210526 + b5-157.89473684210526 + d4/157.89473684210526 + b4/157.89473684210526,
157.89473684210526,
157.89473684210526: b4-157.89473684210526 + c4-157.89473684210526 + e5^157.89473684210526,
157.89473684210526: g5~157.89473684210526 + f4/157.89473684210526,
157.89473684210526: c5~157.89473684210526,
157.89473684210526: e4~157.89473684210526 + f5/157.89473684210526 + b5/157.89473684210526 + g4^157.89473684210526 + a5^157.89473684210526,
157.89473684210526: d5~157.89473684210526 + a4-157.89473684210526,
157.89473684210526: g5~157.89473684210526 + e4^157.89473684210526,
157.89473684210526: g4~157.89473684210526 + c5^157.89473684210526,
157.89473684210526: b5~157.89473684210526 + d5-157.89473684210526 + d4-157.89473684210526,
157.89473684210526: g4/157.89473684210526 + f5^157.89473684210526,
157.89473684210526: d4~157.89473684210526 + b4~157.89473684210526 + a5-157.89473684210526 + e5/157.89473684210526 + a4^157.89473684210526,
157.89473684210526,
157.89473684210526: e5~157.89473684210526 + b5~157.89473684210526 + a4-157.89473684210526 + a5^157.89473684210526,
157.89473684210526: d4/157.89473684210526,
157.89473684210526: g4~157.89473684210526 + d5^157.89473684210526 + e4^157.89473684210526,
157.89473684210526: b4/157.89473684210526 + a5/157.89473684210526,
157.89473684210526: e4~157.89473684210526 + d5~157.89473684210526 + b5-157.89473684210526 + f5^157.89473684210526,
157.89473684210526: g4-157.89473684210526,
157.89473684210526: d5~157.89473684210526 + d4^157.89473684210526 + b4^157.89473684210526 + a5^157.89473684210526,
157.89473684210526: g5-157.89473684210526 + e5/157.89473684210526,
157.89473684210526: f4~157.89473684210526 + d4-157.89473684210526 + b4/157.89473684210526,
157.89473684210526: a5~157.89473684210526 + d5-157.89473684210526,
157.89473684210526: e4/157.89473684210526 + f5^157.89473684210526 + a4^157.89473684210526`
const playerStep = tune`
38.265306122448976: b4^38.265306122448976 + d5^38.265306122448976 + g4^38.265306122448976 + e4^38.265306122448976 + f5^38.265306122448976,
38.265306122448976: b4^38.265306122448976 + f5^38.265306122448976 + d5^38.265306122448976 + g4^38.265306122448976 + e4^38.265306122448976,
1147.9591836734694`
const fireballShot = tune`
42.857142857142854: f4~42.857142857142854 + g4/42.857142857142854 + e4^42.857142857142854 + c4^42.857142857142854 + d4-42.857142857142854,
42.857142857142854: e4~42.857142857142854 + f4~42.857142857142854 + g4/42.857142857142854 + d4^42.857142857142854 + c4-42.857142857142854,
42.857142857142854: e4~42.857142857142854 + d4~42.857142857142854 + f4/42.857142857142854 + c4^42.857142857142854,
42.857142857142854: d4~42.857142857142854 + c4~42.857142857142854 + e4/42.857142857142854,
42.857142857142854: d4/42.857142857142854 + c4/42.857142857142854,
1157.142857142857`
const pOOf = tune`
42.857142857142854: f4-42.857142857142854 + e4/42.857142857142854 + g4/42.857142857142854 + a4~42.857142857142854 + d4^42.857142857142854,
42.857142857142854: g4-42.857142857142854 + a4-42.857142857142854 + f4/42.857142857142854 + b4/42.857142857142854,
42.857142857142854: b4-42.857142857142854 + a4^42.857142857142854 + g4^42.857142857142854,
42.857142857142854: b4-42.857142857142854 + a4-42.857142857142854 + g4/42.857142857142854,
42.857142857142854: g4-42.857142857142854 + e4/42.857142857142854 + a4~42.857142857142854 + f4^42.857142857142854,
42.857142857142854: f4-42.857142857142854 + e4-42.857142857142854 + d4~42.857142857142854 + c4~42.857142857142854,
1114.2857142857142`
const looseHeart = tune`
300: e4~300,
300: d4~300 + f4~300 + e4/300,
300: c4~300 + e4~300 + d4/300,
300: f4~300 + d4~300 + e4/300,
300: e4~300,
8100`
const ded = tune`
428.57142857142856: c4~428.57142857142856 + d4-428.57142857142856 + e4/428.57142857142856 + f4^428.57142857142856,
428.57142857142856: d4~428.57142857142856 + e4-428.57142857142856 + f4/428.57142857142856 + c4^428.57142857142856,
428.57142857142856: e4~428.57142857142856 + f4-428.57142857142856 + d4/428.57142857142856 + c4^428.57142857142856,
428.57142857142856: f4~428.57142857142856 + c4-428.57142857142856 + e4/428.57142857142856 + d4^428.57142857142856,
12000`
const win = tune`
94.6372239747634: d4~94.6372239747634 + g5-94.6372239747634 + a4/94.6372239747634,
94.6372239747634: e4~94.6372239747634 + f5-94.6372239747634 + a4/94.6372239747634,
94.6372239747634: a4~94.6372239747634 + c5-94.6372239747634,
94.6372239747634: a4-94.6372239747634,
94.6372239747634: b4~94.6372239747634 + f4-94.6372239747634 + a4/94.6372239747634 + b5~94.6372239747634,
94.6372239747634: a4/94.6372239747634 + c4-94.6372239747634 + a5~94.6372239747634,
94.6372239747634: d5~94.6372239747634 + a4/94.6372239747634 + d4-94.6372239747634 + g5~94.6372239747634,
94.6372239747634: a4/94.6372239747634 + e4-94.6372239747634 + f5~94.6372239747634,
94.6372239747634: a4/94.6372239747634 + f4-94.6372239747634 + e5~94.6372239747634,
94.6372239747634: a4/94.6372239747634 + g4-94.6372239747634 + d5~94.6372239747634,
94.6372239747634: a4/94.6372239747634 + b4-94.6372239747634 + c5~94.6372239747634,
94.6372239747634: a4/94.6372239747634 + c5-94.6372239747634 + b4~94.6372239747634,
94.6372239747634: a4/94.6372239747634 + d5-94.6372239747634 + g4~94.6372239747634,
94.6372239747634: a4/94.6372239747634 + e5-94.6372239747634 + f4~94.6372239747634,
94.6372239747634: a4/94.6372239747634 + f5-94.6372239747634 + e4~94.6372239747634,
94.6372239747634: a4/94.6372239747634 + g5-94.6372239747634 + d4~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + a5-94.6372239747634 + c4~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + b5-94.6372239747634 + d4-94.6372239747634,
94.6372239747634: a4^94.6372239747634 + e4-94.6372239747634 + a5~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + f4-94.6372239747634 + g5~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + g4-94.6372239747634 + f5~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + e5~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + b4-94.6372239747634 + d5~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + c5-94.6372239747634,
94.6372239747634: a4^94.6372239747634 + d5-94.6372239747634 + b4~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + e5-94.6372239747634,
94.6372239747634: a4^94.6372239747634 + f5-94.6372239747634 + g4~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + g5-94.6372239747634 + f4~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + a5-94.6372239747634 + e4~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + b5-94.6372239747634 + d4~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + c4~94.6372239747634 + a5~94.6372239747634,
94.6372239747634: a4^94.6372239747634 + d4-94.6372239747634 + g5~94.6372239747634`


const gameMap = map`
b..........
bpf.......o
b..........`;
const endMap = map`
aaaaaaaaaaa
aaaaaaaaaaa
aaaaaaaaaaa`;
const startingMap = map`
b.......aaa
b..pf..a.ao
b.......aaa`;
const goodEndMap = map`
b.c.f...o.c
bpcf.....oc
b.g.f...o.g`;

reset();

function reset() {
  setMap(startingMap);
  if (playback) {
    playback.end();
  }
  orbChance = -Infinity;
  lives = 0;
  clearText()
  addText("Welcome to",{x: 5, y: 2, color: color`0`});
  addText("Dragon Fest!",{x: 4, y: 3, color: color`3`});
  addText("W",{x: 6, y: 6, color: color`7`});
  addText("S",{x: 6, y: 9, color: color`7`});
  addText("J",{x: 8, y: 8, color: color`7`});
  addText("Press L \nto start",{x: 6, y: 12, color: color`7`});

}

function start() {
  setMap(gameMap);
  lives = 5;
  orbChance = 0;
  displayLives();
  dragon = getFirst(player);
  dragonChange(false)
  playback = playTune(themeMusic, Infinity)
  timer = 60000
  displayTimer()
}

function badEnd() {
  const {x, y} = dragon;
  playTune(ded)
  playback.end()
  setMap(endMap);
  clearTile(x, y);
  addSprite(x, y, dead_dragon);
  clearText()
  addText( "You Died!!!",{
    x: 5,
    y: 2,
    color: color`3`
  });
  addText( "Press 'k'\nto Restart",{
    x: 5,
    y: 12,
    color: color`7`
  });
}

function goodEnd() {
  lives = 0
  setMap(goodEndMap)
  orbChance = -Infinity
  clearText()
  addText("You Won!!!", {x: 7, y: 7, color: color`7` });
  addText( "Press 'k'\nto Restart",{
    x: 5,
    y: 12,
    color: color`7`
  });
  playback.end()
  playback = playTune(win, Infinity);
}

onInput("s", () => {
  if (lives > 0 && dragon.y < 2){
    dragon.y = dragon.y + 1;
    playTune(playerStep)
  }
});
onInput("w", () => {
  if (lives > 0 && dragon.y > 0) {
    dragon.y = dragon.y - 1;
    playTune(playerStep)
  }
});
onInput("j", () => {
  if(shoot <= 0 && lives > 0){
    addSprite(2, dragon.y, fireball);
    shoot = shootInterval
    playTune(fireballShot)
    dragonChange(false)
  }
});
onInput("l", () => {
  start();
});
onInput("k", () =>{
  reset();
});

setInterval(() => {
  const poofs = getAll(poof);
  for (const {x, y} of poofs){
    clearTile(x, y);
  }
  const fireballs = getAll(fireball);
  for (const sprite of fireballs) {
    if (sprite.x >= 10) {
      clearTile(10, sprite.y);
    } else {
      sprite.x = sprite.x + 1;
      checkCollision(sprite.x, sprite.y);
    }
  }
  const orbs = getAll(orb);
  for (const sprite of orbs) {
    if (sprite.x <= 0) {
      clearTile(sprite.x, sprite.y);
      if (lives > 0){
        addSprite(sprite.x, sprite.y, bush);
        lives = lives - 1;
        playTune(looseHeart)
        displayLives();
        if (lives == 0){
          badEnd();
        }
      }else{
        addSprite(sprite.x, sprite.y, black);
      }

    } else {
      sprite.x = sprite.x - 1;
      checkCollision(sprite.x, sprite.y);
    }
  } 
  if (Math.random() * 10 < orbChance) {
    addSprite(10, Math.floor(Math.random() * 3), orb);
    const scaledTimer = Math.ceil(timer / 6000 / 2);
    orbChance = 0-scaledTimer;
  }
  timer = timer - 200;
  displayTimer();
  if (timer == 0 && lives > 0) {
    goodEnd();
  }
  shoot = shoot - 1;
  if(shoot <= 0 && dragon && lives > 0){
    dragonChange(true)
  }
  orbChance = orbChance + 1;
}, 200);

function checkCollision(x, y){
  const hasFireball = getTile(x, y).some(sprite => sprite.type == fireball);
  const hasOrb = getTile(x, y).some(sprite => sprite.type == orb);
  if (hasFireball && hasOrb){
    clearTile(x, y);
    addSprite(x, y, poof);
    playTune(pOOf)
    
  }
}
function displayLives(){
  clearText()
  addText("*".repeat(lives), {
          x: 8,
          y: 2,
          color: color `3`
  })
  addText("Lives:", {
      x: 2,
      y: 2,
    color: color`0`
  })
}
function displayTimer(){
  if(lives > 0){
    addText(`Time: ${Math.ceil(timer/1000)} `, {x: 6, y: 13, color: color`7`});
  }
}
function dragonChange(ready) {
  const sprite = ready ? player : fireball_dragon;
  if (dragon.type != sprite) {
    const {x, y} = dragon;
    clearTile(x, y)
    addSprite(x, y, sprite);
    dragon = getFirst(sprite);
  }
}
