/// <reference path="../libs/phaser.js" />
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

var cactuar;
var cursors;

function preload() {
    //  You can fill the preloader with as many assets as your game requires
    game.stage.backgroundColor = '#007236';
    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)

    

    game.load.image('cactuar', 'assets/img/cactuar.png');
    
}

function create() {
    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    cactuar = game.add.sprite(0, 0, 'cactuar');
    game.world.setBounds(-1000, -1000, 2000, 2000);

    //  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
    //  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
    cursors = game.input.keyboard.createCursorKeys();


    //constant x velocity
    cactuar.body.velocity.x = 50;

}

function update() {
    if (cursors.right.isDown) {
        cactuar.x += 4;
    } else if (cursors.left.isDown) {
        cactuar.x -= 4;
    }
    if (cursors.down.isDown) {
        cactuar.y += 4;
    } else if (cursors.up.isDown) {
        cactuar.y -= 4;
    }
}

function render() {

    game.debug.renderCameraInfo(game.camera, 32, 32);
    game.debug.renderSpriteInfo(cactuar, 32, 200);

}