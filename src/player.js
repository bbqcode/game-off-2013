/// <reference path="../libs/phaser.js" />
define(['underscore', 'phaser', 'configs', 'assets'], function (_, Phaser, configs, assets) {

    var Player = function (game) {
        this.game = game;
        this.keyboard = game.input.keyboard;
        this.playerSprite = assets.sprites.player_new;
        this.cannotJumpUntil = 0;
        this.canJumpUntil = 0;

        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.facing = 'right';

        Phaser.Sprite.call(this, game, 0, 0, this.playerSprite.key);

        this.body.gravity.y = configs.gravity;
        this.body.bounce.y = configs.bounce;
        this.body.drag.x = configs.player.drag;
        this.body.maxVelocity.x = configs.player.maxVelocity;
//        this.body.maxVelocity.y = configs.player.maxVelocity;
        this.body.drag.y = 0;

        this.body.collideWorldBounds = true;

        this.anchor.setTo(0.5, 0)

        var bounds = this.playerSprite.bounds;
        this.body.setSize(bounds.width, bounds.height, bounds.offsetX, bounds.offsetY);

        this.animations.add('idle', [0, 1], 2, true);
        //this.animations.add('walk-left', [4, 5, 6, 7], 10, true);

        game.add.existing(this);
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


        var isTouchingDown = this.body.touching.down;
        if (isTouchingDown) {
            this.body.drag.x = configs.player.drag;
        } else {
            this.body.drag.x = 0;
        }

        if (
                this.keyboard.justReleased(Phaser.Keyboard.LEFT) ||
                this.keyboard.justReleased(Phaser.Keyboard.RIGHT))
        {
            this.body.acceleration.x = 0;
        }
        if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            if (this.body.velocity.x < 0) {
                this.body.velocity.x = 0;
            }
            this.body.acceleration.x = configs.player.acceleration;
            if (this.facing != 'left') {
                this.scale.x = 1;
                this.facing = 'left';
                this.animations.play('walk-left');
            }
        }
        else if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            if (this.body.velocity.x > 0) {
                this.body.velocity.x = 0;
            }
            this.body.acceleration.x = -configs.player.acceleration;
            if (this.facing != 'right') {
                this.scale.x = -1;
                this.facing = 'right';
                this.animations.play('walk-right');
            }
        }
        else {
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

        var now = this.game.time.now;

        if (isTouchingDown) {
            this.canJumpUntil = now + configs.player.jumpDuration ;
        }
        if (isTouchingDown && this.isJumping) {
            this.cannotJumpUntil = now + configs.player.cannotJumpUntil;
            this.isJumping = false;
        }

        var canJump = isTouchingDown && now > this.cannotJumpUntil;
        var canKeepJumping = !isTouchingDown && now < this.canJumpUntil;
        var isPressingJump = this.keyboard.isDown(Phaser.Keyboard.SPACEBAR);

        if (isPressingJump && (canJump ||canKeepJumping)) {
            this.isJumping = true;
            this.body.velocity.y -= configs.player.jumpVelocity * this.game.time.elapsed;
        }
    }

    Player.prototype.debugTeleport = function () {
        var input = this.game.input;
        this.centerOn(input.x, input.y);
    }

    return Player;

});