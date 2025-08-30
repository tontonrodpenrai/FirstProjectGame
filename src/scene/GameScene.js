import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });

    this.bg;
    this.platformtop;
    this.stonetop;
    this.platformbottom;
    this.stonebottom;
    this.player;
    this.coins;
    this.tank;
    this.tankCount = 0;
    this.fishCount = 0;
    this.bubble = 5;
    this.bubbles = []; 
    this.score = 0;
    this.fishs;
  }

  preload() {
    this.load.image("bg-underwater", "assets/PNG/environment/background.png");
    this.load.spritesheet("player", "assets/PNG/player/player-swiming.png", {
      frameWidth: 80,
      frameHeight: 80,
    });

    this.load.spritesheet("player-idle", "assets/PNG/player/player-idle.png", {
      frameWidth: 80,
      frameHeight: 80,
    });

    this.load.image("bg-platformtop", "assets/PNG/elements/top.png");

    this.load.image("bg-platformbottom", "assets/PNG/elements/bottom.png");

    this.load.image("bg-stonetop", "assets/PNG/elements/stone-top.png");
    this.load.image("bg-stonebottom", "assets/PNG/elements/stone-bottom.png");
    this.load.image("coins", "assets/PNG/elements/coin-small.png");
    this.load.image("bubble", "assets/PNG/elements/bubble.png");
    this.load.image("tank", "assets/PNG/elements/o2_tank.png");
    this.load.spritesheet("fish", "assets/PNG/enemies/fish-big.png", {
      frameWidth: 54,
      frameHeight: 49,
    });
  }

  initUI() {
    this.info = this.add
      .text(1200, 15, "", { font: "32px Pixel", fill: "#ffffff" })
      .setDepth(99);
  }

  collectCoin(player, coins) {
    coins.destroy();
    this.events.emit("collectedCoins");
    this.events.emit("createNewCoins");
  }

  collectTank(player, tanks) {
    tanks.destroy();
    this.events.emit("collectedTanks");
    this.events.emit("createNewTanks");
  }

  fishAttack(player, fishs) {
    fishs.destroy();
    this.events.emit("fishAttacked");
    this.events.emit("createNewFishs");
  }
  

  initCoins(numberOfCoins = 1) {
    for (let i = 0; i < numberOfCoins; i++) {
      const randomX = Phaser.Math.Between(1280, 1290);
      const randomY = Phaser.Math.Between(95, 540);
      this.coins
        .create(randomX, randomY, "coins")
        .setScale(0.5)
        .setSize(45, 45)
        .setOffset(25, 25);
    }
  }

  initTanks(numberOfTanks = 1) {
    for (let i = 0; i < numberOfTanks; i++) {
      const randomX = Phaser.Math.Between(1350, 1400);
      const randomY = Phaser.Math.Between(95, 540);
      this.tanks
        .create(randomX, randomY, "tank")
        .setScale(0.05)
        .setSize(950, 750)
        .setOffset(100, 190);
    }
  }

  initFishs(numberOfFishs = 1) {
    for (let i = 0; i < numberOfFishs; i++) {
      const randomX = Phaser.Math.Between(1300, 1310);
      const randomY = Phaser.Math.Between(95, 540);
      this.fishs
        .create(randomX, randomY, "fish")
        .setDepth(99)
        .setFlipX(true);
    }
  }

  
  bubbleInit(bubble = 1) {
    let bubbleX = [20, 80, 140, 200, 260];
    for (let i = 0; i < bubble; i++) {
      let bubbleSprite = this.add 
        .sprite(bubbleX[i], 10, "bubble")
        .setOrigin(0, 0)
        .setScale(0.05)
        .setDepth(99)
        .setVisible(true);

      this.bubbles.push(bubbleSprite); 
    }
  }

  create() {
    this.platformtop = this.add
      .tileSprite(0, 0, 1280, 720, "bg-platformtop")
      .setOrigin(0, 0)
      .setDepth(5)
      .setSize(1280, 90);

    this.platformbottom = this.add
      .tileSprite(0, 550, 1280, 720, "bg-platformbottom")
      .setOrigin(0, 0)
      .setDepth(5)
      .setSize(1280, 170);

    this.bg = this.add
      .tileSprite(0, 0, 1280, 720, "bg-underwater")
      .setOrigin(0, 0)
      .setScale(3)
      .setDepth(-5);

    this.player = this.physics.add
      .sprite(200, 350, "player-idle")
      .setScale(1.5)
      .setDepth(5);

    this.player.setCollideWorldBounds(true)

    this.anims.create({
      key: "player",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: 1,
    });

    this.anims.create({
      key: "player-idle",
      frames: this.anims.generateFrameNumbers("player-idle", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: 1,
    });

    this.anims.create({
      key: "fish",
      frames: this.anims.generateFrameNumbers("fish", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 1,
    });

    this.stonetop = this.add
      .tileSprite(0, 0, 1280, 720, "bg-stonetop")
      .setOrigin(0, 0);

    this.platformGroup = this.physics.add.staticGroup();
    this.platformGroup.add(this.platformbottom);
    this.platformGroup.add(this.platformtop);
    this.physics.add.collider(this.player, this.platformGroup);

    this.stonebottom = this.add
      .tileSprite(0, 50, 1280, 720, "bg-stonebottom")
      .setOrigin(0, 0)
      .setScale(1);

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.events.on(
      "collectedCoins",
      function (score2 = 1) {
        this.score += score2;
        console.log(`Score : ${this.score}`);
      },
      this
    );

    this.events.on(
      
      "collectedTanks",
      function () {
        this.tankCount++;
        console.log("tank: " + this.tankCount);
        if (this.tankCount === 2) {
          this.bubbleIncrease();
          this.tankCount = 0;
        }
      },
      this
    );

    this.events.on(
      "fishAttacked",
      function () {
        this.fishCount++;
        if (this.fishCount === 1) {
          this.bubbleDecrese();
          this.fishCount = 0;
        }
      },
      this
    );

    this.coins = this.physics.add.group();
    this.physics.world.enable(this.coins);
    this.initCoins(5);
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      null,
      this
    );

    this.tanks = this.physics.add.group();
    this.physics.world.enable(this.tanks);
    this.initTanks(1);
    this.physics.add.overlap(
      this.player,
      this.tanks,
      this.collectTank,
      null,
      this
    );

    this.fishs = this.physics.add.group();
    this.physics.world.enable(this.fishs);
    this.initFishs(3);
    this.physics.add.overlap(
      this.player,
      this.fishs,
      this.fishAttack,
      null,
      this
    );

    this.events.on("createNewCoins", this.initCoins, this);
    this.events.on("createNewTanks", this.initTanks, this);
    this.events.on("createNewFishs", this.initFishs, this);

    this.initUI();
    this.scoreCoin = this.add
      .image(1150, 0, "coins")
      .setOrigin(0, 0)
      .setDepth(99)
      .setScale(0.7);

    let initCount = 0;
    if (initCount === 0) {
      this.bubbleInit(this.bubble);
      initCount = 1;
    }
    this.time.addEvent({
      delay: 10000,
      callback: this.bubbleDecrese,
      callbackScope: this,
      loop: true,
    });
  } 

  bubbleIncrease() {
    if (this.bubble < this.bubbles.length) {
      this.bubbles[this.bubble].setVisible(true);
      this.bubble++;
    } else {
      console.log("Maximum number of bubbles reached.");
    }
  }

  bubbleDecrese() {
    if (this.bubble > 0) {
      this.bubbles[--this.bubble].setVisible(false);
    } else {
      this.scene.start("GameOver", {score: this.score});
      this.events.off("collectedCoins");
      this.events.off("createNewCoins");
      this.events.off("fishAttacked");
      this.events.off("createNewFishs");
      this.events.off("collectedTanks");
      this.events.off("createNewTanks");
      this.score = 0;
      this.tankCount = 0;
      this.bubble = 5;
      this.bubbles = [];
    }
  }

  update(time) {
    this.bg.tilePositionX += 0.2;
    this.platformtop.tilePositionX += 0.7;
    this.stonetop.tilePositionX += 0.7;
    this.platformbottom.tilePositionX += 0.7;
    this.stonebottom.tilePositionX += 0.7;
    this.coins.children.iterate((coin) => {
      coin.x -= 2;
      if (coin.x < 0) {
        coin.x = 1280;
        coin.y = Phaser.Math.Between(95, 540);
      }
    });

    this.tanks.children.iterate((tank) => {
      tank.x -= 3;
      if (tank.x < 0) {
        tank.x = 1280;
        tank.y = Phaser.Math.Between(95, 540);
      }
    });

    this.fishs.children.iterate((fish) => {
      fish.x -= 6;
      if (fish.x < 0) {
        fish.x = 1280;
        fish.y = Phaser.Math.Between(95, 540);
      }
    });

    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("player", true);
      this.player.setFlipX(true);
      this.player.setSize(60, 30);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("player", true);
      this.player.setFlipX(false);
      this.player.setSize(60, 30);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play(`player-idle`, true);
      this.player.setSize(30, 50);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-200);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(200);
    } else {
      this.player.setVelocityY(0);
    }

    this.info.setText(` : ${this.score}`);
  }
}

export default GameScene;
