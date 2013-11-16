define(
{
    tilemaps: {
        level1: {
            src: 'assets/maps/map3.json'
        }
    },

    tilesets: {
        main: {
            src: 'assets/tiles/sexy_tiles.png',
            tiles: {
                width: 24,
                height: 24
            }
        },
    },

    sprites: {
        player: {
            src: 'assets/sprites/produde.png',
            frames: {
                width: 18,
                height: 48,
                count: 8
            }
        }
    },

    images: {
        sunshine: {
            src: 'assets/backgrounds/sunshine.png',
            size: {
                width: 800,
                height: 600
            }
        },
        moon: {
            src: 'assets/images/moon.png',
            size: {
                width: 100,
                height: 100
            }
        },
        star_small: {
            src: 'assets/images/star-small.png',
            size: {
                width: 1,
                height: 1
            }
        },
        star_medium: {
            src: 'assets/images/star-med.png',
            size: {
                width: 3,
                height: 3
            }
        }
    }
});