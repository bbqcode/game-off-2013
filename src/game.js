/// <reference path="../libs/phaser.js" />
define(['phaser', 'underscore', 'configs', 'src/Player'], function (Phaser, _, configs, Player) {
    var game = function () {
        Phaser.Game.call(this, configs.game.width, configs.game.height, Phaser.CANVAS, configs.game.canvasId,
        {
            preload: preload, create: create, update: update, render: render
        });
    }
    
    _.extend(game.prototype, Phaser.Game.prototype);

    var cursors;


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
        this.load.tilemap('map_phaser', 'assets/maps/map3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tileset('phaser', 'assets/tiles/sexy_tiles.png', 24, 24);
        
        this.load.spritesheet('player', 'assets/sprites/produde.png', 18, 48, 8);        this.load.image('background', 'assets/backgrounds/sunshine.png');

    }

    function create() {
        cursors = this.input.keyboard.createCursorKeys();

        bg = this.add.tileSprite(0, 0, configs.game.width, configs.game.height, 'background');
        bg.fixedToCamera = true;

        map = this.add.tilemap('map_phaser');
        tileset = this.add.tileset('phaser');

        var width = map.layers[0].width * tileset.tileWidth;
        var height = map.layers[0].height * tileset.tileHeight;

        layer = this.add.tilemapLayer(0, 0, width, height, tileset, map, 0);
        layer2 = this.add.tilemapLayer(0, 0, width, height, tileset, map, 1);

        layer.fixedToCamera = false;
        layer2.fixedToCamera = false;

        tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true)

        player = new Player(this, cursors, 'player');        this.add.existing(player);
        this.camera.follow(player);
        layer.resizeWorld();
    }

    function update() {
        this.physics.collide(player, layer2);

    }

    function render() {

    }

    return game;
});

