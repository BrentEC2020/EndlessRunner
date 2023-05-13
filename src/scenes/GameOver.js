class GameOver extends Phaser.Scene {
    constructor() {
      super("overScene");
    }
    
    create() {
        this.menuDrop = this.add.tileSprite(0, 0, 640, 480, 'overDrop').setOrigin(0, 0);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        
        this.click = this.sound.add('click');
    }

    update() {
        if (keySPACE.isDown) {
            this.click.play();
            this.scene.start('playScene');
        }

        if (keyC.isDown) {
            this.click.play();
            this.scene.start('creditScene');
        }

        if (keyM.isDown) {
            this.click.play();
            this.scene.start('menuScene');
        }
    }
  }