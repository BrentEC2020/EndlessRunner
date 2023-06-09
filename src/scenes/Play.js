class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        this.anims.create({
            key: 'angelJump',
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('angel', { start: 0, end: 3 }),
            repeat: -1,
        });
      }
    
    create() {
        // Make background
        this.skytile = this.add.tileSprite(0, 0, 640, 480, 'skytile').setOrigin(0, 0);
        this.platform = this.physics.add.sprite(game.config.width / 6, game.config.height - borderUISize - borderPadding - 50, 'platform').setOrigin(0.5, 0);
        this.platform.setImmovable(true);
        this.platform.displayWidth = 100;

        // add angel (p1)
        this.p1Angel = this.physics.add.sprite(game.config.width / 6, game.config.height - borderUISize - borderPadding - 120, 'angel', 0).setOrigin(0, 0);
        this.p1Angel.setGravityY(gameOptions.playerGravity);

        // add sounds
        this.song = this.sound.add('song');
        this.death = this.sound.add('death');
        this.p1Jump = this.sound.add('jump');

        this.song.loop = true;
        this.song.play();
        this.song.setVolume(0.5);

        this.randX0 = Phaser.Math.Between(940, game.config.width + 200);
        this.randX1 = Phaser.Math.Between(860, game.config.width + 200);
        this.randX2 = Phaser.Math.Between(840, game.config.width + 200);
        this.randX3 = Phaser.Math.Between(880, game.config.width + 200);
        this.randX4 = Phaser.Math.Between(800, game.config.width + 200);
        this.randX5 = Phaser.Math.Between(790, game.config.width + 200);

        this.randX6 = Phaser.Math.Between(940, 800 + 200);
        this.randX7 = Phaser.Math.Between(920, 750 + 200);
        this.randX8 = Phaser.Math.Between(820, game.config.width + 200);


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

        score = 0;

        this.clock = this.time.delayedCall(1000, () => {
            this.platform.destroy();
        })
 
        let playConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FF886F',
            color: "#FFE56F",
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreText = this.add.text(game.config.width / 2 - 300, game.config.height - 465, score, playConfig).setOrigin(0, 0);

    }

    update() {
        this.p1Angel.anims.play('angelJump', true);
        this.points = 0;
        this.currentTimer = Math.ceil(this.clock.getRemaining());
        this.jumps = 0;
        this.skytile.tilePositionX -= 4;
        this.moveSpeed = 3;

        // Get to normal speed after 5 seconds to give player time to react and not die instantly
        this.startClock = this.time.delayedCall(1500, () => {
            this.platform1.x -= 1.85;
            this.platform2.x -= 2;
            this.platform3.x -= 1.35;
            this.platform4.x -= 1.5;
            this.platform5.x -= 0.5;
            this.platform6.x -= 2.3;
            this.platform7.x -= 2.5;
            this.platform8.x -= 1.15;
        })

        // increase platform speed at 25 seconds
        this.time.delayedCall(25000, () => {
            this.platform1.x -= 2.15;
            this.platform2.x -= 2.3;
            this.platform3.x -= 1.65;
            this.platform4.x -= 1.8;
            this.platform5.x -= 0.8;
            this.platform6.x -= 2.6;
            this.platform7.x -= 2.8;
            this.platform8.x -= 1.15;
        })

        // increase platform speed at 70 seconds
        this.time.delayedCall(70000, () => {
            this.platform1.x -= 2.45;
            this.platform2.x -= 2.6;
            this.platform3.x -= 1.95;
            this.platform4.x -= 2.1;
            this.platform5.x -= 1.1;
            this.platform6.x -= 1.9;
            this.platform7.x -= 3.1;
            this.platform8.x -= 1.45;
        })

        // final increase in platform speed at 120 seconds
        this.time.delayedCall(120000, () => {
            this.platform1.x -= 2.75;
            this.platform2.x -= 2.9;
            this.platform3.x -= 1.25;
            this.platform4.x -= 2.4;
            this.platform5.x -= 1.4;
            this.platform6.x -= 2.2;
            this.platform7.x -= 3.4;
            this.platform8.x -= 1.75;
        })

        if (keyJUMP.isDown && this.p1Angel.y > 55) {
            this.p1Jump.play();
            this.p1Jump.setVolume(0.3);
            this.p1Angel.setVelocityY(-300);
            this.points++;
            score += this.points;
            this.scoreText.text = score;
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
            this.death.play();
            this.song.stop();
            if (score > highScore) {
                highScore = score;
            }
            this.scene.start('overScene');
        }

        if (this.checkCollision(this.p1Angel, this.platform0)) {
            this.death.play();
            this.death.setVolume(0.3);
            this.song.stop();
            this.scene.start('overScene');
        }

        if (this.checkCollision(this.p1Angel, this.platform1)) {
            this.death.play();
            this.death.setVolume(0.3);
            this.song.stop();
            this.scene.start('overScene');
        }

        if (this.checkCollision(this.p1Angel, this.platform2)) {
            this.death.play();
            this.death.setVolume(0.3);
            this.song.stop();
            this.scene.start('overScene');
        }

        if (this.checkCollision(this.p1Angel, this.platform3)) {
            this.death.play();
            this.death.setVolume(0.3);
            this.song.stop();
            this.scene.start('overScene');
        }

        if (this.checkCollision(this.p1Angel, this.platform4)) {
            this.death.play();
            this.death.setVolume(0.3);
            this.song.stop();
            this.scene.start('overScene');
        }

        if (this.checkCollision(this.p1Angel, this.platform5)) {
            this.death.play();
            this.death.setVolume(0.3);
            this.song.stop();
            this.scene.start('overScene');
        }

        if (this.checkCollision(this.p1Angel, this.platform6)) {
            this.death.play();
            this.death.setVolume(0.3);
            this.song.stop();
            this.scene.start('overScene');
        }

        if (this.checkCollision(this.p1Angel, this.platform7)) {
            this.death.play();
            this.death.setVolume(0.3);
            this.song.stop();
            this.scene.start('overScene');
        }

        if (this.checkCollision(this.p1Angel, this.platform8)) {
            this.death.play();
            this.death.setVolume(0.3);
            this.song.stop();
            this.scene.start('overScene');
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
            if (score > highScore) {
                highScore = score;
            }
            return true;
        } else {
            return false;
    }
  }
}