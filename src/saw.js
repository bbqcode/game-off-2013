define(['phaser', 'configs', 'assets'], function (Phaser, configs, assets) {
    var Saw = function (game, x, y, width, height, player) {
        this.game = game;

        this.asset = assets.sprites.saw;

        Phaser.Sprite.call(this, game, x, y, this.asset.key);



        this.width = width;
        this.height = height;

        this.body.immovable = true;

        var bounds = this.asset.bounds;
        this.body.setSize(bounds.width, bounds.height, bounds.offsetX, bounds.offsetY);
        this.animations.add('rotate', [0, 3], 10, true);
        this.animations.play('rotate');
        this.player = player;
        
        game.add.existing(this);
        game.debug.renderBodies.push(this);
    }

    Saw.prototype = Object.create(Phaser.Sprite.prototype);
    Saw.prototype.constructor = Saw;

    Saw.prototype.update = function () {
        var self = this;
        var test = function () {
            self.player.restart();
        }
        this.game.physics.collide(this, this.player, test, null, this);
    }

    return Saw;
});