class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xADD8E6, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/'

        // player
        this.load.spritesheet('angel', 'angel.png', {frameWidth: 41, frameHeight: 50});

        // backdrops
        this.load.image('skytile', 'skytile.png');
        this.load.image('loadDrop', 'load.png');
        this.load.image('rules', 'rules.png');
        this.load.image('menuDrop', 'menu.png');
        this.load.image('overDrop', 'gameover.png');

        // enemy
        this.load.image('platform', 'platform.png')

        // Sounds and Music
        this.load.audio('click', ['button-click.wav']);
        this.load.audio('death', ['death.mp3']);
        this.load.audio('jump', ['jump.mp3']);
        this.load.audio('song', ['angelmusic.mp3']);

    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}