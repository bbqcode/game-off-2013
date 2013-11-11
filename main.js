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
        'configs': 'src/configs',
        'assets': 'src/assets'
    }
})

require(['src/engine'], function (Engine) {
   new Engine();
});