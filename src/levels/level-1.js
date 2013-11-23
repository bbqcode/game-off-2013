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
    var Level1 = function (game) {
        //this.bg = game.add.tileSprite(0, 0, configs.game.width, configs.game.height, assets.images.sunshine.key);
        //this.bg.fixedToCamera = true;



        var starLayer = game.add.group();
        var starAsset1 = assets.images.star_small;
        var starAsset2 = assets.images.star_medium;
        var starAssets = [starAsset1, starAsset2];

        var stars = [];

        for (var i = 0; i < 200; i++) {
            var idx = game.rnd.integerInRange(0, 2);
            var star = starLayer.create(0, 0, starAssets[idx].key);
            star.cameraOffset = new Phaser.Point(game.world.randomX, game.world.randomY);
            star.fixedToCamera = true;
            star.alpha = game.rnd.realInRange(0.05, 1);
            stars.push(star);
            
        }
        starLayer.fixedToCamera = true;

        this.stars = stars;
        
//
//        var moonAsset = assets.images.moon;
//        var moon = game.add.tileSprite(300, 40, moonAsset.size.width, moonAsset.size.height, moonAsset.key);
//
//
//
//        moon.fixedToCamera = true;
//        moon.cameraOffset = new Phaser.Point(80, 20);


        game.stage.backgroundColor = '#1d1426';

        this.map = game.add.tilemap(assets.tilemaps.level1.key);
        this.tileset = game.add.tileset(assets.tilesets.main.key);



        var width = this.map.layers[0].width * this.tileset.tileWidth;
        var height = this.map.layers[0].height * this.tileset.tileHeight;

        this.layers = [];

        this.layers.push(game.add.tilemapLayer(0, 0, width, height, this.tileset, this.map, 1));
        this.spawnPoint = new Phaser.Point(20, 650);
        this.player = new Player(game);
        this.player.centerOn(this.spawnPoint.x, this.spawnPoint.y);

        game.player = this.player;
        var sawX = 350
        var saws = [
          new Saw(game, sawX, 32 * 21.5, 32, 32, this.player),
          new Saw(game, sawX+70, 32 * 21.5, 32, 32, this.player),
          new Saw(game, sawX+180, 32 * 21.5, 32, 32, this.player),
          new Saw(game, sawX+270, 32 * 21.5, 32, 32, this.player)
        ];

        var movingSaw = new Saw(game, 500, 32 * 17.5, 32, 32, this.player);
        game.add.tween(movingSaw)
            .to({ y: 32 * 21 }, 1000, Phaser.Easing.Linear.None)
            .to({ y: 32 * 17.5 }, 1000, Phaser.Easing.Linear.None)
            .loop().start();
        saws.push(movingSaw);

        var movingSaw2 = new Saw(game, 550, 32 * 21.5, 32, 32, this.player)
        game.add.tween(movingSaw2)
            .to({ x: 800 }, 1500, Phaser.Easing.Bounce.Out)
            .to({ x: 550 }, 1500, Phaser.Easing.Bounce.Out)
            .loop().start();
        saws.push(movingSaw2);

        this.layers.push(game.add.tilemapLayer(0, 0, width, height, this.tileset, this.map, 2));
        this.layers.push(game.add.tilemapLayer(0, 0, width, height, this.tileset, this.map, 3));

        this.layers[0].fixedToCamera = false;
        this.layers[1].fixedToCamera = false;
        this.layers[2].fixedToCamera = false;

        this.collideLayer = this.layers[2];

        this.tileset.setCollisionRange(0, this.tileset.total - 1, true, true, true, true)

        this.layers[0].resizeWorld();

        var triggerPosition = new Phaser.Point(650, 606);
        this.oldManTriggerBox = new TriggerBox(game, triggerPosition.x, triggerPosition.y, 100, 100, this.player, function () {
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