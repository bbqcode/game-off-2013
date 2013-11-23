/// <reference path="../libs/phaser.js" />
define(['phaser', 'configs', 'src/game'], function (Phaser, configs, states) {
    Phaser.Sprite.prototype.getBodyBounds = function () {
        var b = this.body;
        return new Phaser.Rectangle(b.screenX, b.screenY, b.width, b.height);
    }


    var Engine = function () {
        Phaser.Game.call(
            this,
            configs.game.width, configs.game.height,
            Phaser.CANVAS, configs.game.canvasId,
            states, false, false
        );
    }
    
    Engine.prototype = Object.create(Phaser.Game.prototype);
    Engine.prototype.constructor = Engine;
    return Engine;
});

