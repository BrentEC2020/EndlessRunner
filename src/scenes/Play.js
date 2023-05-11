class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('angel', './assets/angel.png');
        this.load.image('skytile', './assets/skytile.png');
        this.load.image('platform', './assets/platform.png');
      }
    
    create() {
        // Make background
        this.skytile = this.add.tileSprite(0, 0, 640, 480, 'skytile').setOrigin(0, 0);
        this.platform = this.physics.add.sprite(game.config.width / 4, game.config.height - borderUISize - borderPadding - 50, 'platform').setOrigin(0.5, 0);
        this.platform.setImmovable(true);
        this.platform.displayWidth = 100;

        // light blue UI background
        this.add.rectangle(0, borderUISize + borderPadding - 15, game.config.width, borderUISize * 2, 0xADD8E6).setOrigin(0, 0);
        // light yellow borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xffffe0).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xffffe0).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xffffe0).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xffffe0).setOrigin(0, 0);

        // add angel (p1)
        this.p1Angel = this.physics.add.sprite(game.config.width / 4, game.config.height - borderUISize - borderPadding - 120, 'angel').setOrigin(0.5, 0);
        this.p1Angel.setGravityY(gameOptions.playerGravity);

        // define keys
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // group with all active platforms.
        this.platformGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });
 
        // pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });

        this.physics.add.collider(this.p1Angel, this.platform);
 

    }

    update() {
        this.jumps = 0;
        this.skytile.tilePositionX -= 4;

        if (keyJUMP.isDown)
        {
            if (this.p1Angel.body.touching.down || this.jumps > 0 && this.jumps < gameOptions.jumps) {
                this.jumps = 0;
            }
            this.p1Angel.setVelocityY(-300);
            this.jumps++;
        }
        if (keyLEFT.isDown) {
            this.p1Angel.setVelocityX(-200);
        }
        if (keyRIGHT.isDown) {
            this.p1Angel.setVelocityX(200);
        }
    }
  }