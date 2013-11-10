define(['underscore', 'phaser', 'configs'], function (_, Phaser, configs) {
    var Level = function (game, tilemapKey, tilesetKey, backgroundKey) {
        this.bg = game.add.tileSprite(0, 0, configs.game.width, configs.game.height, backgroundKey);
        this.bg.fixedToCamera = true;

        this.map = game.add.tilemap(tilemapKey);
        this.tileset = game.add.tileset(tilesetKey);

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
    }
    return Level;
});