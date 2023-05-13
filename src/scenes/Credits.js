class Credits extends Phaser.Scene{
    constructor() {
        super("creditScene");
    }

    create() {
        this.loadDrop = this.add.tileSprite(0, 0, 640, 480, 'loadDrop').setOrigin(0, 0);
        this.add.text(centerX, centerY - 80, "Angel's Ascent's Credits").setOrigin(0.5);
        this.add.text(centerX, centerY - 60, "Art Assets: Brent Chou").setOrigin(0.5);
        this.add.text(centerX, centerY - 40, "Code: Brent Chou").setOrigin(0.5);
        this.add.text(centerX, centerY - 20, "Music: Ivymusic").setOrigin(0.5);
        this.add.text(centerX, centerY + 15, "Sounds:").setOrigin(0.5);
        this.add.text(centerX, centerY + 35, "Button Click by mixkit.co").setOrigin(0.5);
        this.add.text(centerX, centerY + 55, "Death by Envato Elements").setOrigin(0.5);
        this.add.text(centerX, centerY + 75, "Wing Flap by Envato Elements").setOrigin(0.5);

        this.click = this.sound.add('click');

        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(keyJUMP.isDown) {
            this.click.play();
            this.scene.start('playScene');
        }
    }
}