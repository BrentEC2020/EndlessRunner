class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOverScene");
    }
    
    create() {
      this.add.text(20, 20, "Endless Runner Game Over Screen");
    }
  }