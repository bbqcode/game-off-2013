/// <reference path="../libs/phaser.js" />
define(['phaser', 'configs', 'src/game'], function (Phaser, configs, states) {
    var Engine = function () {
        Phaser.Game.call(
            this,
            configs.game.width, configs.game.height,
            Phaser.CANVAS, configs.game.canvasId,
            states
        );
    }
    
    Engine.prototype = Object.create(Phaser.Game.prototype);
    Engine.prototype.constructor = Engine;
    return Engine;
});

