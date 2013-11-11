define(['phaser', 'configs'], function (Phaser, configs) {
    var TriggerBox = function (game, x, y, width, height, collider, callback, callbackContext)
    {
        this.game = game;

        Phaser.Sprite.call(this, game, x, y);

        this.bounds.width = width;
        this.bounds.height = height;
        this.width = this.bounds.width;
        this.height = this.bounds.height;

        //this.body.immovable = true;

        this.renderable = false;

        this.callback = callback;
        this.collider = collider;
        this.callbackContext = callbackContext || this;

        game.add.existing(this);
    }

    TriggerBox.prototype = Object.create(Phaser.Sprite.prototype);
    TriggerBox.prototype.constructor = TriggerBox;


    TriggerBox.prototype.update = function () {
        if (this.bounds.intersects(this.collider.bounds)) {
            this.callback.call(this.callbackContext, this, this.collider);
        }
    }

    TriggerBox.prototype.render = function () {
    }

    return TriggerBox;
});