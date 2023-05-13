class GameOver extends Phaser.Scene {
    constructor() {
      super("overScene");
    }
    
    create() {
      this.add.text(20, 20, "Endless Runner Game Over Screen");
    }
  }