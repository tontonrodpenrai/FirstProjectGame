export function preload() {
  this.load.image(
    "bg-underwater",
    "assets/PNG/environment/background.png"
  );
  
  this.load.spritesheet(
    "player",
    "assets/PNG/player/player-swiming.png",
    {
      frameWidth: 81,
      frameHeight: 80,
    }
  );

  this.load.image(
    "bg-platformtop",
    "assets/PNG/elements/layerplatform-top.png"
  );

  this.load.image(
    "bg-stonetop",
    "assets/PNG/elements/stone-top.png"
  );

  this.load.image(
    "bg-platformbottom",
    "assets/PNG/elements/layerplatform-bottom.png"
  )

  this.load.image(
    "bg-stonebottom",
    "assets/PNG/elements/stone-bottom.png"
  );
}
export function create(applyPhysics) {
  this.bg = this.add.tileSprite(0, 0, 1280, 720, "bg-underwater")
  .setOrigin(0, 0)
  .setScale(3);
  console.log(this.bg);
this.player = this.physics.add.sprite(200, 350, 'player')
  .setScale(1.5);

this.anims.create({
  key: "player",
  frames: this.anims.generateFrameNumbers("player", {
    start: 0,
    end: 6,
  }),
  frameRate: 7,
  repeat: -1,
})

this.platformtop = this.add.tileSprite(0, 0, 1280, 720, "bg-platformtop")
.setOrigin(0, 0);

this.stonetop = this.add.tileSprite(0, 0, 1280, 720, "bg-stonetop")
.setOrigin(0, 0);

this.platformbottom = this.add.tileSprite(0, 30, 1280, 720, "bg-platformbottom")
.setOrigin(0, 0);

this.stonebottom = this.add.tileSprite(0, 50, 1280, 720, "bg-stonebottom")
.setOrigin(0, 0)
.setScale(1);
}
export function update() {
  this.bg.tilePositionX += .7;
  this.platformtop.tilePositionX += 0.7;
  this.stonetop.tilePositionX += 0.7;
  this.platformbottom.tilePositionX += 0.7;
  this.stonebottom.tilePositionX += 0.7;
  this.player.anims.play(`player`, true)
}
