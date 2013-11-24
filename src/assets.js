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
                width: 64,
                height: 64
            }
        }
    },

    sprites: {
        player: {
            src: 'assets/sprites/dude.png',
            frames: {
                width: 149,
                height: 200,
                count: 2
            },
            bounds: {
                width: 65,
                height: 180,
                offsetX: 0,
                offsetY: 20
            }
        },
        saw: {
            src: 'assets/sprites/saw.png',
            frames: {
                width: 96,
                height: 96,
                count: 4
            },
            bounds: {
                width: 76,
                height: 76,
                offsetX: 10,
                offsetY: 10
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
    },

    levels : {
        level1: {
            backgroundColor : '#1d1426',
            spawnPoint : {
                x: 100,
                y: 650
            }
        }
    }
});