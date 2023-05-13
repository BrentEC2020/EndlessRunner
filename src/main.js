/********************************************************************************************************************************************
 * Name: Brent Chou
 * Game Title: Angel's Ascent
 * Approx. Hours Spent: 27 Hours
 * 
 * Creative Tilt Justification
 * 
 * Technical Side:
 * I learned a lot more about CSS and HTML to design a website that looks cleaner and more unique. For example,
 * the borders we used in Rocket Patrol were only effective because the border was white and the ships were white.
 * In reality, if I had kept white borders, you would see my sprites overlap the border and it would look odd. With CSS
 * borders, I was still able to have a nice touch to my canvas while avoiding overlapping sprites. Additionally, I did not
 * learn how to create a High Score or even save the current score to my Game Over Screen during the Rocket Patrol Mod
 * assignment. For this project, I was able to research and fully accomplish both of those things. I also learned how to
 * work with player gravity and arcade physics which was really cool and helpful to introducing my jump mechanic.
 * 
 * Artistic Side;
 * I think the amount of effort that I put into designing this project goes without saying. I designed every single tilesprite
 * and background myself. All used sprites and animations were also created by me. I created a color palette so that every aspect of
 * my game would be cohesive with my theme. Every color used falls exactly within my chosen color palette except for the player sprite
 * which is a constrasting color so that it sticks out more and is easier to see. I also added a quick two sentence story to my game
 * to give it a little bit of life and lore.
 ********************************************************************************************************************************************/

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
