/// <reference path="../libs/phaser.js" />
define(['phaser', 'underscore', 'configs', 'src/player', 'src/level'], function (Phaser, _, configs, Player, Level) {
    var game;

    var Game = function () {
        Phaser.Game.call(this, configs.game.width, configs.game.height, Phaser.CANVAS, configs.game.canvasId,
        {
            preload: preload, create: create, update: update, render: render
        });
        game = this;
        this.player = null;
    }
    
    Game.prototype = Object.create(Phaser.Game.prototype);
    Game.prototype.constructor = Game;
   
    function preload() {
        game.load.tilemap('tilemap', 'assets/maps/map3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tileset('tileset', 'assets/tiles/sexy_tiles.png', 24, 24);

        game.load.spritesheet('player', 'assets/sprites/produde.png', 18, 48, 8);        game.load.image('background', 'assets/backgrounds/sunshine.png');

    }

    function create() {
        game.cursors = game.input.keyboard.createCursorKeys();
        game.level = new Level(game, 'tilemap', 'tileset', 'background');
        game.player = new Player(game, 'player');
    }

    function update() {

    }

    function render() {

    }

    return Game;
});

