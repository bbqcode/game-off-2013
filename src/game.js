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
var facing = 'right';
var jumpButton;
var jumpTimer = 0;
function preload() {
    game.load.tilemap('map_phaser', 'assets/maps/map3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tileset('phaser', 'assets/tiles/sexy_tiles.png', 24, 24);

    game.load.spritesheet('player', 'assets/sprites/produde.png', 18, 48, 8);    game.load.image('background', 'assets/backgrounds/sunshine.png');
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

    player = game.add.sprite(10, 0, 'player');    player.animations.add('walk-right', [0, 1, 2, 3], 30, true);    player.animations.add('walk-left', [4, 5, 6, 7], 30, true);    player.animations.add()    player.body.gravity.y = 10;
    player.body.bounce.y = 0.1;
    player.body.collideWorldBounds = true;
    game.camera.follow(player);
    layer.resizeWorld();

    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    game.physics.collide(player, layer2);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        if (facing != 'left') {
            facing = 'left';
            player.animations.play('walk-left');
        }
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        if (facing != 'right') {
            facing = 'right';
            player.animations.play('walk-right');
        }
    }
    else {
        if (facing != 'idle') {
            player.animations.stop();
            if (facing == 'right') {
                player.frame = 0;
            } else {
                player.frame = 4;
            }
            facing = 'idle';
        }
    }

    if (jumpButton.isDown && player.body.touching.down && game.time.now > jumpTimer) {
        player.body.velocity.y = -400;
        jumpTimer = game.time.now + 750;
    }
}

function render() {

}