/// <reference path="../libs/phaser.js" />
define(['underscore', 'phaser', 'configs', 'assets'], function (_, Phaser, configs, assets) {

    var Player = function (game) {
        this.game = game;

        this.playerSprite = assets.sprites.player;
        this.cursors = game.cursors;
        this.jumpTimer = 0;

        this.jumpVelocity = configs.player.jumpVelocity;

        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.facing = 'right';

        Phaser.Sprite.call(this, game, 0, 0, this.playerSprite.key)
        this.body.gravity.y = configs.gravity;
        this.body.bounce.y = configs.bounce;

        this.body.collideWorldBounds = true;

        this.animations.add('walk-right', [0, 1, 2, 3], 10, true);
        this.animations.add('walk-left', [4, 5, 6, 7], 10, true);        game.add.existing(this);
        game.debug.renderBodies.push(this);
        
        game.camera.follow(this);
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.update = function () {
        this.game.physics.collide(this, this.game.level.collideLayer);

        this.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            this.body.velocity.x = -150;
            if (this.facing != 'left') {
                this.facing = 'left';
                this.animations.play('walk-left');
            }
        }
        else if (this.cursors.right.isDown) {
            this.body.velocity.x = 150;
            if (this.facing != 'right') {
                this.facing = 'right';
                this.animations.play('walk-right');
            }
        }
        else {
            if (this.facing != 'idle') {
                this.animations.stop();
                if (this.facing == 'right') {
                    this.frame = 0;
                } else {
                    this.frame = 4;
                }
                this.facing = 'idle';
            }
        }

        
        if (this.jumpButton.isDown && this.body.touching.down && this.game.time.now > this.jumpTimer) {
            this.body.velocity.y = this.jumpVelocity;
            this.jumpTimer = this.game.time.now + 750;
        }
    }

    
    //Player.prototype.render = function () {
    //    this.game.debug.renderSpriteBody(this);
    //}

    return Player;

});