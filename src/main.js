// global game options
let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 150],
    playerGravity: 900,
    playerStartPosition: 200,
    jumps: 2
}

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Load, Menu, Credits, Rules, Play, GameOver ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
  }  

let game = new Phaser.Game(config);

// Paddle Parkour Main.js
let centerX = game.config.width / 2;
let centerY = game.config.height/2;
let w = game.config.width;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyJUMP, keySPACE, keyLEFT, keyRIGHT, keyC, keyM;

// keep scores
let score;
let highScore = 0;
