/// <reference path="../libs/phaser.js" />
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

var cursors;

var rectangles = [];

var map;
var tileset;
var layer;
var layer2;
var bg;
var player;

function preload() {
    game.load.tilemap('map_phaser', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tileset('phaser', 'assets/tiles/platformer_tiles.png', 16, 16);

    game.load.spritesheet('player', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);    game.load.image('background', 'assets/backgrounds/sunshine.png');
}

function create() {
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

    tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true)

    player = game.add.sprite(10, 0, 'player');    player.animations.add('walk');    player.animations.add()    player.body.gravity.y = 10;
    player.body.bounce.y = 0.1;
    player.body.collideWorldBounds = true;
    game.camera.follow(player);
    layer.resizeWorld();
   
}

function update() {
    game.physics.collide(player, layer2);

    player.body.velocity.x = 0;

    if (cursors.up.isDown) {
        if (player.body.touching.down) {
            player.body.velocity.y = -400;
        }
    }
    else if (cursors.down.isDown) {
        // game.camera.y += 4;
    }

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.scale.x = -1;
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.scale.x = 1;
    }

    if (player.body.velocity.x !== 0) {
        player.animations.play('walk', 20, false);
    } else {
        player.animations.stop('walk');
    }
}

function render() {

}