class Credits extends Phaser.Scene{
    constructor() {
        super("creditScene");
    }

    create() {
        this.loadDrop = this.add.tileSprite(0, 0, 640, 480, 'loadDrop').setOrigin(0, 0);
        this.add.text(centerX, centerY, "Angel's Ascent's Credits").setOrigin(0.5);

        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(keyJUMP.isDown) {
            this.scene.start('playScene');
        }
    }
}