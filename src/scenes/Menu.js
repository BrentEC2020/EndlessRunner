class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    create() {
        this.menuDrop = this.add.tileSprite(0, 0, 640, 480, 'menuDrop').setOrigin(0, 0);

        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(keyJUMP.isDown) {
            this.scene.start('creditScene');
        }
    }
  }