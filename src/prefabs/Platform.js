class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, texture, frame); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        scene.add.existing(this);    // add to existing scene, displayList, updateList
        this.moveSpeed = 3;
    }

    update() {
        this.x -= this.moveSpeed;
        if(this.x <= 0 - game.config.width)
        {
            this.x = Phaser.Math.Between(620, game.config.width - 30);
            this.y = Phaser.Math.Between(40, game.config.height - 30);
        }
        
    }
}