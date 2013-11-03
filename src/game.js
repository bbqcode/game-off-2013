/// <reference path="../libs/phaser.js" />
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('cactuar', 'assets/img/cactuar.png');
}

function create() {
    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    game.add.sprite(0, 0, 'cactuar');

}