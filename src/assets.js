define(
{
    tilemaps: {
        level1: {
            src: 'assets/maps/level1.json'
        }
    },

    tilesets: {
        main: {
            src: 'assets/tiles/main/main.png',
            tiles: {
                width: 32,
                height: 32
            }
        }
    },

    sprites: {
        player: {
            src: 'assets/sprites/produde.png',
            frames: {
                width: 18,
                height: 48,
                count: 8
            }
        },
        player_new: {
            src: 'assets/sprites/dude.png',
            frames: {
                width: 32,
                height: 48,
                count: 2
            },
            bounds: {
                width: 12,
                height: 38,
                offsetX: 0,
                offsetY: 10
            }
        },
        saw: {
            src: 'assets/sprites/saw.png',
            frames: {
                width: 32,
                height: 32,
                count: 4
            },
            bounds: {
                width: 28,
                height: 28,
                offsetX: 2,
                offsetY: 2
            }
        }
    },

    images: {
        moon: {
            src: 'assets/images/moon.png',
            size: {
                width: 100,
                height: 100
            }
        },
        star_small: {
            src: 'assets/images/stars/star-small.png',
            size: {
                width: 1,
                height: 1
            }
        },
        star_medium: {
            src: 'assets/images/stars/star-med.png',
            size: {
                width: 3,
                height: 3
            }
        }
    }
});