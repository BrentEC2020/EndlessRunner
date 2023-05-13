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
        this.platform = this.physics.add.sprite(game.config.width / 6, game.config.height - borderUISize - borderPadding - 50, 'platform').setOrigin(0.5, 0);
        this.platform.setImmovable(true);
        this.platform.displayWidth = 100;

        // add angel (p1)
        this.p1Angel = this.physics.add.sprite(game.config.width / 6, game.config.height - borderUISize - borderPadding - 120, 'angel');
        this.p1Angel.setGravityY(gameOptions.playerGravity);

        this.randX0 = Phaser.Math.Between(620, game.config.width);
        this.randX1 = Phaser.Math.Between(420, game.config.width);
        this.randX2 = Phaser.Math.Between(390, game.config.width);
        this.randX3 = Phaser.Math.Between(400, game.config.width);
        this.randX4 = Phaser.Math.Between(470, game.config.width);
        this.randX5 = Phaser.Math.Between(490, game.config.width);

        this.randX6 = Phaser.Math.Between(740, 800);
        this.randX7 = Phaser.Math.Between(550, 750);
        this.randX8 = Phaser.Math.Between(500, game.config.width);


        this.randY0 = Phaser.Math.Between(120, game.config.width - 20);
        this.randY1 = Phaser.Math.Between(220, game.config.width - 20);
        this.randY2 = Phaser.Math.Between(320, game.config.width - 20);
        this.randY3 = Phaser.Math.Between(420, game.config.width - 20);
        this.randY4 = Phaser.Math.Between(180, game.config.width - 20);
        this.randY5 = Phaser.Math.Between(280, game.config.width - 20);

        this.platform0 = new Platform(this, this.randX0, this.randY0, 'platform', 0).setOrigin(0,0);
        this.platform1 = new Platform(this, this.randX1, this.randY1, 'platform', 0).setOrigin(0,0);
        this.platform2 = new Platform(this, this.randX2, this.randY2, 'platform', 0).setOrigin(0,0);
        this.platform3 = new Platform(this, this.randX3, this.randY3, 'platform', 0).setOrigin(0,0);
        this.platform4 = new Platform(this, this.randX4, this.randY4, 'platform', 0).setOrigin(0,0);
        this.platform5 = new Platform(this, this.randX5, this.randY5, 'platform', 0).setOrigin(0,0);

        this.platform6 = new Platform(this, this.randX6, this.randY0, 'platform', 0).setOrigin(0,0);
        this.platform7 = new Platform(this, this.randX7, this.randY1, 'platform', 0).setOrigin(0,0);
        this.platform8 = new Platform(this, this.randX8, this.randY2, 'platform', 0).setOrigin(0,0);

        // define keys
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.physics.add.collider(this.p1Angel, this.platform);
        this.physics.add.collider(this.p1Angel, this.platform0);
        this.physics.add.collider(this.p1Angel, this.platform1);
        this.physics.add.collider(this.p1Angel, this.platform2);
        this.physics.add.collider(this.p1Angel, this.platform3);
        this.physics.add.collider(this.p1Angel, this.platform4);
        this.physics.add.collider(this.p1Angel, this.platform5);
        this.physics.add.collider(this.p1Angel, this.platform6);
        this.physics.add.collider(this.p1Angel, this.platform7);
        this.physics.add.collider(this.p1Angel, this.platform8);

        this.score = 0;

        this.clock = this.time.delayedCall(1000, () => {
            this.platform.destroy();
        })
 
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: "#843605",
            algin: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreText = this.add.text(game.config.width / 2 - 300, game.config.height - 465, this.score, scoreConfig).setScrollFactor(0);

    }

    update() {
        this.points = 0;
        this.currentTimer = Math.ceil(this.clock.getRemaining());
        this.jumps = 0;
        this.skytile.tilePositionX -= 4;
        this.moveSpeed = 3;

        this.platform1.x -= 1;
        this.platform2.x -= 2;
        this.platform3.x -= 1.7;
        this.platform4.x -= 3;
        this.platform5.x -= 2.7;
        this.platform6.x -= 1.5;
        this.platform7.x -= 2.5;
        this.platform8.x -= 0.5;

        if (keyJUMP.isDown && this.p1Angel.y > 55) {
            this.p1Angel.setVelocityY(-300);
            this.points++;
            this.score += this.points;
            this.scoreText.text = this.score;
        }

        if (keyLEFT.isDown && this.p1Angel.x > 20) {
            this.p1Angel.x -= this.moveSpeed;
        }

        if (keyRIGHT.isDown && this.p1Angel.x < 620) {
            this.p1Angel.x += this.moveSpeed;
        }

        if (this.currentTimer == 55000) {
            this.platform.destroy();
        }

        if (this.p1Angel.y > 480) {
            this.scene.start("overScene");
        }

        if (this.checkCollision(this.p1Angel, this.platform0)) {
            this.scene.start("overScene");
        }

        if (this.checkCollision(this.p1Angel, this.platform1)) {
            this.scene.start("overScene");
        }

        if (this.checkCollision(this.p1Angel, this.platform2)) {
            this.scene.start("overScene");
        }

        if (this.checkCollision(this.p1Angel, this.platform3)) {
            this.scene.start("overScene");
        }

        if (this.checkCollision(this.p1Angel, this.platform4)) {
            this.scene.start("overScene");
        }

        if (this.checkCollision(this.p1Angel, this.platform5)) {
            this.scene.start("overScene");
        }

        if (this.checkCollision(this.p1Angel, this.platform6)) {
            this.scene.start("overScene");
        }

        if (this.checkCollision(this.p1Angel, this.platform7)) {
            this.scene.start("overScene");
        }

        if (this.checkCollision(this.p1Angel, this.platform8)) {
            this.scene.start("overScene");
        }
        

        this.platform0.update();
        this.platform1.update();
        this.platform2.update();
        this.platform3.update();
        this.platform4.update();
        this.platform5.update();
        this.platform6.update();
        this.platform7.update();
        this.platform8.update();
  }

    checkCollision(angel, platform) {
        // simple AABB checking
        if (angel.x < platform.x + platform.width && 
            angel.x + angel.width > platform.x && 
            angel.y < platform.y + platform.height &&
            angel.height + angel.y > platform. y) {
            return true;
        } else {
            return false;
    }
  }
}