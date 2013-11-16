/// <reference path="../libs/phaser.js" />
define(['underscore', 'phaser', 'configs', 'assets', 'src/player', 'src/dialogue', 'src/trigger-box'],
function (_, Phaser, configs, assets, Player, Dialogue, TriggerBox) {
    var Level1 = function (game) {
        //this.bg = game.add.tileSprite(0, 0, configs.game.width, configs.game.height, assets.images.sunshine.key);
        //this.bg.fixedToCamera = true;
       

        game.stage.backgroundColor = '#1d1426';

        this.map = game.add.tilemap(assets.tilemaps.level1.key);
        this.tileset = game.add.tileset(assets.tilesets.main.key);

        var width = this.map.layers[0].width * this.tileset.tileWidth;
        var height = this.map.layers[0].height * this.tileset.tileHeight;

        this.layers = [];

        this.layers.push(game.add.tilemapLayer(0, 0, width, height, this.tileset, this.map, 0));
        this.layers.push(game.add.tilemapLayer(0, 0, width, height, this.tileset, this.map, 1));

        this.layers[0].fixedToCamera = false;
        this.layers[1].fixedToCamera = false;

        this.collideLayer = this.layers[1];

        this.tileset.setCollisionRange(0, this.tileset.total - 1, true, true, true, true)

        this.layers[0].resizeWorld();

        this.player = new Player(game);
        
        game.player = this.player;

        this.oldManTriggerBox = new TriggerBox(game, 150, 940, 100, 100, this.player, function () {
            console.log('Inside!');
        });
        

        var moonAsset = assets.images.moon;
        var moon = game.add.tileSprite(300, 40, moonAsset.size.width, moonAsset.size.height, moonAsset.key);
        
        moon.fixedToCamera = true;
        moon.cameraOffset = new Phaser.Point(80, 20);
        
        var starLayer = game.add.group();
        var starAsset1 = assets.images.star_small;
        var starAsset2 = assets.images.star_medium;
        var starAssets = [starAsset1, starAsset2];
        for (var i = 0; i < 100; i++) {
            var idx = game.rnd.integerInRange(0, 1);
            var star = starLayer.create(0, 0, starAssets[idx].key);
            star.cameraOffset = new Phaser.Point(game.world.randomX, game.world.randomY);
            star.fixedToCamera = true;
        }
        starLayer.fixedToCamera = true;

        //trigger.push(new DialogueTrigger(x, y, w, h, dialogue, collider))
        
    }
    return Level1;
});