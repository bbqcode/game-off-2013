define(['phaser', 'configs'], function (Phaser, configs) {
    var TriggerBox = function (game, x, y, width, height, collider, callback, callbackContext)
    {
        this.game = game;

        Phaser.Sprite.call(this, game, x, y);

        this.width = width;
        this.height = height;

        this.body.immovable = true;
        this.renderable = false;

        this.callback = callback;
        this.collider = collider;
        this.callbackContext = callbackContext || this;

        this.setEnable(true);

        game.add.existing(this);
        game.debug.renderBodies.push(this);
    }

    TriggerBox.prototype = Object.create(Phaser.Sprite.prototype);
    TriggerBox.prototype.constructor = TriggerBox;


    TriggerBox.prototype.setEnable = function (value) {
        this.isEnabled = value;
    }
0
    TriggerBox.prototype.update = function () {
        if (this.isEnabled) {
            if (this.bounds.intersects(this.collider.getBodyBounds())) {
                this.callback.call(this.callbackContext, this, this.collider);
            }
        }
    }

    return TriggerBox;
});