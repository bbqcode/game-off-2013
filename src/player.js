/// <reference path="../libs/phaser.js" />
define(['underscore', 'phaser', 'configs', 'assets'], function (_, Phaser, configs, assets) {

    var Player = function (game) {
        this.game = game;

        this.playerSprite = assets.sprites.player_new;
        this.cursors = game.cursors;
        this.jumpTimer = 0;

        this.jumpVelocity = configs.player.jumpVelocity;

        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.facing = 'right';

        Phaser.Sprite.call(this, game, 0, 0, this.playerSprite.key)
        this.body.gravity.y = configs.gravity;
        this.body.bounce.y = configs.bounce;

        this.body.collideWorldBounds = true;

        var bounds = this.playerSprite.bounds;
        this.body.setSize(bounds.width, bounds.height, bounds.offsetX, bounds.offsetY);

        this.animations.add('idle', [0, 1], 2, true);
        //this.animations.add('walk-left', [4, 5, 6, 7], 10, true);        game.add.existing(this);
        game.debug.renderBodies.push(this);
        
        game.camera.follow(this);

        //this.scale.x = 10;
        //this.scale.y = 10;
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.restart = function () {
        var spawnPoint = this.game.level.spawnPoint;
        var tween = this.game.add.tween(this).to(spawnPoint, 10, Phaser.Easing.Linear.None, true);

        //  When the tween completes it calls descend, before looping again
        //tween.onComplete.add(descend, this);
    }

    Player.prototype.update = function () {
        this.game.physics.collide(this, this.game.level.collideLayer);

        //this.body.velocity.x = 0;

        var MAX_SPEED = 160;

        var delta = this.game.time.elapsed;
        var slideMagicNumber = 15;
        var runMagicNumber = 0.8;
        var actualSlide = delta + slideMagicNumber;



        if (this.cursors.left.isDown) {
            this.body.velocity.x -= delta * runMagicNumber;
            if (this.body.velocity.x < MAX_SPEED * -1) {
                this.body.velocity.x = MAX_SPEED * -1;
            }
            if (this.facing != 'left') {
                this.facing = 'left';
                this.animations.play('walk-left');
            }
        }
        else if (this.cursors.right.isDown) {
            this.body.velocity.x += delta * runMagicNumber;
            if (this.body.velocity.x > MAX_SPEED) {
                this.body.velocity.x = MAX_SPEED;
            }
            if (this.facing != 'right') {
                this.facing = 'right';
                this.animations.play('walk-right');
            }
        }
        else {
            if (this.body.velocity.x > 0) {
                this.body.velocity.x -= actualSlide;
                if (this.body.velocity.x < 0) {
                    this.body.velocity.x = 0;
                }
            } else if (this.body.velocity.x < 0) {
                this.body.velocity.x += actualSlide;
                if (this.body.velocity.x > 0) {
                    this.body.velocity.x = 0;
                }
            }

            if (this.facing != 'idle') {
                this.animations.stop();
                this.animations.play('idle');
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

    Player.prototype.debugTeleport = function () {
        var input = this.game.input;
        this.centerOn(input.x, input.y);
    }

    return Player;

});