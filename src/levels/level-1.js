/// <reference path="../libs/phaser.js" />
define([
    'underscore',
    'phaser',
    'configs',
    'assets',
    'src/player',
    'src/dialogue',
    'src/trigger-box',
    'src/saw'
],
function (_, Phaser, configs, assets, Player, Dialogue, TriggerBox, Saw) {

    var generateStars = function (level, game) {
        var starLayer = game.add.group();
        var starAsset1 = assets.images.star_small;
        var starAsset2 = assets.images.star_medium;
        var starAssets = [starAsset1, starAsset2];

        for (var i = 0; i < 500; i++) {
            var idx = game.rnd.integerInRange(0, 2);
            var star = starLayer.create(0, 0, starAssets[idx].key);
            star.cameraOffset = new Phaser.Point(game.world.randomX, game.world.randomY);
            star.fixedToCamera = true;
            star.alpha = game.rnd.realInRange(0.05, 1);

        }
        starLayer.fixedToCamera = true;

        this.starLayer = starLayer;
    }

    var generateSaws = function (level, game) {
        var groundY = 658;
        var sawAsset = assets.sprites.saw;

        var sawWidth = sawAsset.frames.width;
        var sawHeight = sawAsset.frames.height;

        var saws = [
            new Saw(game, 1000, groundY, sawWidth, sawHeight, level.player),
            new Saw(game, 1280, groundY, sawWidth, sawHeight, level.player),
            new Saw(game, 1580, groundY, sawWidth, sawHeight, level.player),
            new Saw(game, 1880, groundY, sawWidth, sawHeight, level.player)
        ];

        var movingSaw = new Saw(game, 1880, 100, sawWidth, sawHeight, level.player);
        game.add.tween(movingSaw)
            .to({ y: 500 }, 500, Phaser.Easing.Linear.None)
            .to({ y: 100 }, 1000, Phaser.Easing.Linear.None)
            .loop().start();
        saws.push(movingSaw);

        var movingSaw2 = new Saw(game, 1880, groundY, sawWidth, sawHeight, level.player)
        game.add.tween(movingSaw2)
            .to({ x: 2800 }, 3000, Phaser.Easing.Bounce.Out)
            .to({ x: 1880 }, 3000, Phaser.Easing.Bounce.Out)
            .loop().start();
        saws.push(movingSaw2);
    }

    var Level1 = function (game) {
        var levelAsset = assets.levels.level1;
        game.stage.backgroundColor = levelAsset.backgroundColor;
        this.spawnPoint = new Phaser.Point(levelAsset.spawnPoint.x, levelAsset.spawnPoint.y);

        this.map = game.add.tilemap(assets.tilemaps.level1.key);
        this.tileset = game.add.tileset(assets.tilesets.main.key);

        var width = this.map.layers[0].width * this.tileset.tileWidth;
        var height = this.map.layers[0].height * this.tileset.tileHeight;

        this.layers = [];
        this.layers.push(game.add.tilemapLayer(0, 0, width, height, this.tileset, this.map, 0));
        this.layers.push(game.add.tilemapLayer(0, 0, width, height, this.tileset, this.map, 1));
        generateStars(this, game);

        this.player = new Player(game);
        game.player = this.player;

        generateSaws(this, game);

        this.layers.push(game.add.tilemapLayer(0, 0, width, height, this.tileset, this.map, 2));

        for (var i = 0; i < this.layers.length; i++){
            this.layers[i].fixedToCamera = false;
        }

        this.collideLayer = this.layers[2];

        this.tileset.setCollisionRange(0, this.tileset.total - 1, true, true, true, true)

        this.layers[0].resizeWorld();


        this.player.movePlayerTo(this.spawnPoint.x, this.spawnPoint.y);

        var triggerPosition = new Phaser.Point(2800, 404);
        new TriggerBox(game, triggerPosition.x, triggerPosition.y, 300, 300, this.player, function () {
            var text = "Yay, you won!";
            var style = { font: "65px Helvetica", fill: "#ff0044", align: "center" };

            var t = game.add.text(triggerPosition.x + 50, triggerPosition.y - 50, text, style);
            setTimeout(function () {
                t.destroy();
            }, 2500)
            t.anchor.setTo(0.5, 0.5);
        });
        
        if (configs.debug) {
            game.input.onDown.add(this.player.debugTeleport, this.player);
        }
    }
    return Level1;
});