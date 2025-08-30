import Phaser, { Scene } from "phaser";

class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainMenu'
        });
        this.bg;
        this.button;
        this.bgMusic;

    }
    preload() {
        this.load.image('background', "assets/PNG/elements/mainmenu.png")
        this.load.image('start_button', "assets/PNG/elements/startbotton.PNG")
        this.load.audio('bgMusic', "assets/Sound/watery_cave.mp3");
    }
    create() {
        this.sound.removeAll();
        this.bg = this.add.image(0, 0,'background').setOrigin(0, 0)
        this.button = this.add.image(650, 490,'start_button').setScale(0.15,0.15)
        this.button.setInteractive();
        this.button.on("pointerdown",()=>{
            this.scene.start("GameScene", {music: this.bgMusic})
        })
        this.button.on('pointerover',()=>{
            this.button.setScale(0.25);
        })
        this.button.on('pointerout',()=>{
            this.button.setScale(0.2);
        })

        this.bgMusic = this.sound.add('bgMusic');
        var bgMusicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.bgMusic.play(bgMusicConfig);
    }
    update(delta, time) {

    }
}
export default MainMenu;
