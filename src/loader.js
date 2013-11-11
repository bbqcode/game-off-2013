define(['phaser', 'assets'], function (Phaser, assets) {
    function preload(game) {
        for (var key in assets.tilemaps) {
            var tilemap = assets.tilemaps[key];
            tilemap.key = key;
            game.load.tilemap(key, tilemap.src, null, Phaser.Tilemap.TILED_JSON);
        }

        for (var key in assets.tilesets) {
            var tileset = assets.tilesets[key];
            tileset.key = key;
            game.load.tileset(key, tileset.src, tileset.tiles.width, tileset.tiles.height);
        }


        for (var key in assets.sprites) {
            var sprite = assets.sprites[key];
            sprite.key = key;
            game.load.spritesheet(key, sprite.src, sprite.frames.width, sprite.frames.height, sprite.frames.count);
        }


        for (var key in assets.images) {
            var image = assets.images[key];
            image.key = key;
            game.load.image(key, image.src);
        }
    } 

    return { preload: preload }
});