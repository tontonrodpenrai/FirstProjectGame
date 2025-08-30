import 'phaser';
import Phaser from 'phaser';
import GameScene from './scene/GameScene';
import MainMenu from './scene/MainMenu';
import GameOver from './scene/GameOver';

const config = {
    type : Phaser.AUTO,
    width : 1280, 
    height : 720,
    parent : 'content',
    backgroundColor : '#000',
    physics : {
        default : 'arcade',
        arcade : {
            debug : false
        }
    },
    scene : [
        MainMenu,
        GameScene,
        GameOver
    ]
}

let game = new Phaser.Game(config);
