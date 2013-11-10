require.config({
    shim: {
        'underscore': {
            exports: '_'
        },
        'phaser': {
            exports: 'Phaser'
        }
    },
    paths: {
        'underscore': 'libs/underscore',
        'phaser': 'libs/phaser',
        'configs': 'src/configs'
    }
})

require(['src/game'], function (Game) {
    new Game();
});