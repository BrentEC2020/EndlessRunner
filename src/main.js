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
    scene: [ Menu, Play, GameOver ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
  }  

let game = new Phaser.Game(config);

let centerX = game.config.width / 2;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyJUMP, keyR, keyLEFT, keyRIGHT;
