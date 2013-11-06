/// <reference path="../libs/phaser.js" />
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

var cactuar;
var cursors;

var map =
[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0]
]

var rectangles = [];
function preload() {
    //  You can fill the preloader with as many assets as your game requires
    game.stage.backgroundColor = '#007236';
    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)


    game.load.tileset('phaser', 'assets/tiles/platformer_tiles.png', 16, 16);
    game.load.image('cactuar', 'assets/images/cactuar.png');

}

function create() {
    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    cactuar = game.add.sprite(0, 400, 'cactuar');
    game.world.setBounds(-1000, -1000, 2000, 2000);

    //  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
    //  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
    cursors = game.input.keyboard.createCursorKeys();


    //constant x velocity
    cactuar.body.velocity.x = 100;

    var tileSize = 32;
    for (var x = 0; x < map.length; x++) {
        for (var y = 0; y < map[x].length; y++) {
            var rect = new Phaser.Rectangle(y * tileSize, x * tileSize, tileSize, tileSize);
            switch (map[x][y]) {
                case 0:
                    rect.color = '#000000';
                    break;
                case 1:
                    rect.color = '#00ff00';
                    break;
                case 2:
                    rect.color = '#0000ff';
                    break;
                case 3:
                    rect.color = '#ff0000';
                    break;
            }
            rectangles.push(rect);
        }
    }
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

    if (cactuar.x > 800) {
        cactuar.x = 0;
    }
}

function render() {

    game.debug.renderCameraInfo(game.camera, 302, 32);
    game.debug.renderSpriteInfo(cactuar, 32, 200);
    for (var x = 0; x < rectangles.length; x++) {
        var r = rectangles[x];
        game.debug.renderRectangle(r, r.color);
    }
}