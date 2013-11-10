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

var map;
var tileset;
var layer;
var layer2;
var bg;
var dude;

function preload() {
    //  You can fill the preloader with as many assets as your game requires
    //game.stage.backgroundColor = '#007236';
    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)

    game.load.tilemap('map_phaser', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tileset('phaser', 'assets/tiles/platformer_tiles.png', 16, 16);

    game.load.spritesheet('dude', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);    game.load.image('background', 'assets/backgrounds/background2.png');

    //game.load.image('cactuar', 'assets/images/cactuar.png');

}

function create() {
    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //cactuar = game.add.sprite(0, 400, 'cactuar');
    //game.world.setBounds(-1000, -1000, 2000, 2000);

    //  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
    //  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
    cursors = game.input.keyboard.createCursorKeys();

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    bg.fixedToCamera = true;

    map = game.add.tilemap('map_phaser');
    tileset = game.add.tileset('phaser');
    var width = map.layers[0].width * tileset.tileWidth;
    var height = map.layers[0].height * tileset.tileHeight;
    layer = game.add.tilemapLayer(0, 0, width, height, tileset, map, 0);
    layer2 = game.add.tilemapLayer(0, 0, width, height, tileset, map, 1);

    layer.fixedToCamera = false;
    layer2.fixedToCamera = false;
    

   

    tileset.setCollisionRange(0, tileset.tiles.length - 1, true, true, true, true)

    dude = game.add.sprite(10, 0, 'dude');    dude.animations.add('walk');    dude.animations.add()    dude.body.gravity.y = 10;
    dude.body.bounce.y = 0.1;
    dude.body.collideWorldBounds = true;
    game.camera.follow(dude);
    layer.resizeWorld();
    //constant x velocity
    //cactuar.body.velocity.x = 100;

    //var tileSize = 32;
    //for (var x = 0; x < map.length; x++) {
    //    for (var y = 0; y < map[x].length; y++) {
    //        var rect = new Phaser.Rectangle(y * tileSize, x * tileSize, tileSize, tileSize);
    //        switch (map[x][y]) {
    //            case 0:
    //                rect.color = '#000000';
    //                break;
    //            case 1:
    //                rect.color = '#00ff00';
    //                break;
    //            case 2:
    //                rect.color = '#0000ff';
    //                break;
    //            case 3:
    //                rect.color = '#ff0000';
    //                break;
    //        }
    //        rectangles.push(rect);
    //    }
    //}
}

function update() {
    game.physics.collide(dude, layer2);

    dude.body.velocity.x = 0;

    if (cursors.up.isDown) {
        if (dude.body.touching.down) {
            dude.body.velocity.y = -400;
        }
    }
    else if (cursors.down.isDown) {
        // game.camera.y += 4;
    }

    if (cursors.left.isDown) {
        dude.body.velocity.x = -150;
        dude.scale.x = -1;
    }
    else if (cursors.right.isDown) {
        dude.body.velocity.x = 150;
        dude.scale.x = 1;
    }

    if (dude.body.velocity.x !== 0) {
        dude.animations.play('walk', 20, false);
    } else {
        dude.animations.stop('walk');
    }

    //game.physics.collide(dude, tiles);
}

function render() {

    //game.debug.renderCameraInfo(game.camera, 302, 32);
    //game.debug.renderSpriteInfo(cactuar, 32, 200);
    //for (var x = 0; x < rectangles.length; x++) {
    //    var r = rectangles[x];
    //    game.debug.renderRectangle(r, r.color);
    //}
}