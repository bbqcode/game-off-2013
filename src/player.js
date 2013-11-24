/// <reference path="../libs/phaser.js" />
define(['underscore', 'phaser', 'configs', 'assets'], function (_, Phaser, configs, assets) {

    var Player = function (game) {
        this.game = game;
        this.keyboard = game.input.keyboard;

        var spacebar = this.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(this.initJump, this);

        var leftKey = this.keyboard.addKey(Phaser.Keyboard.LEFT);
        leftKey.onUp.add(this.releasedLeft, this);
        var rightKey = this.keyboard.addKey(Phaser.Keyboard.RIGHT);
        rightKey.onUp.add(this.releasedRight, this);

        this.playerSprite = assets.sprites.player;
        this.canJumpUntil = 0;

        this.facing = 'right';

        Phaser.Sprite.call(this, game, 0, 0, this.playerSprite.key);

        this.body.gravity.y = configs.gravity;
        this.body.maxVelocity.x = configs.player.maxVelocityX;

        this.body.collideWorldBounds = true;

        this.anchor.setTo(0.5, 0)

        var bounds = this.playerSprite.bounds;
        this.body.setSize(bounds.width, bounds.height, bounds.offsetX, bounds.offsetY);

        this.animations.add('idle', [0, 1], 2, true);

        game.add.existing(this);
        game.debug.renderBodies.push(this);
        
        game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER);;

        game.camera.deadzone.height = configs.game.height - configs.camera.groundHeight;
        game.camera.deadzone.y = 0;
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.movePlayerTo = function(x, y) {
        this.renderable = false;
        this.body.acceleration = new Phaser.Point(0,0);
        this.body.velocity = new Phaser.Point(0,0);
        this.reset(x, y);
        this.renderable = true;
    }

    Player.prototype.restart = function () {
        var spawnPoint = this.game.level.spawnPoint;
        this.movePlayerTo(spawnPoint.x, spawnPoint.y);
    }

    Player.prototype.setFacing = function (side) {
        if (this.facing != side) {
            this.scale.x = side === 'left' ? 1 : -1;
            this.facing = side;
            this.animations.play('walk-' + side);
        }
    }

    Player.prototype.update = function () {
        this.game.physics.collide(this, this.game.level.collideLayer);

        var now = this.game.time.now,
            body = this.body,
            velocity = body.velocity,
            acceleration = body.acceleration,
            isTouchingDown = body.touching.down,
            isPressingRight = this.keyboard.isDown(Phaser.Keyboard.RIGHT),
            isPressingLeft = this.keyboard.isDown(Phaser.Keyboard.LEFT);


        if (isPressingRight) {
            acceleration.x = configs.player.accelerationX;
        }
        if (isPressingLeft) {
            acceleration.x = -configs.player.accelerationX;
        }
        if (isPressingRight && isPressingLeft) {
            velocity.x = 0;
            acceleration.x = 0;
        }

        if (isTouchingDown && velocity.y > 0) {

        }

        if (acceleration.x === 0) {
            //todo: set idles animation
        } else if (acceleration.x > 0) {
            this.setFacing('left');
        } else {
            this.setFacing('right');
        }

        var canKeepJumping = !isTouchingDown && now < this.canJumpUntil,
            isPressingJump = this.keyboard.isDown(Phaser.Keyboard.SPACEBAR);

        if (isPressingJump && canKeepJumping){
            acceleration.y = -configs.player.accelerationY;
        } else {
            acceleration.y = 0;

            if (!isPressingRight && !isPressingLeft) {
                acceleration.x = 0;
                velocity.x = 0;
            }
        }
    }

    Player.prototype.initJump = function() {
        if (this.body.touching.down) {
            var now = this.game.time.now;
            this.canJumpUntil = now + configs.player.jumpDuration;
            this.body.velocity.y -= configs.player.jumpForce;
//
//            if (this.body.velocity.x > 0){
//                this.body.velocity.x -= 50;
//            }else if (this.body.velocity.x < 0) {
//                this.body.velocity.x += 50;
//            }
        }
    }

    Player.prototype.releasedLeft = function() {
        if (this.body.velocity.x < 0) {
            this.body.acceleration.x = 0;
            this.body.velocity.x = 0;
        }
    }
    Player.prototype.releasedRight = function() {
        if (this.body.velocity.x > 0) {
            this.body.acceleration.x = 0;
            this.body.velocity.x = 0;
        }
    }

    Player.prototype.debugTeleport = function () {
        var input = this.game.input;
        this.movePlayerTo(input.worldX, input.worldY);
    }

    return Player;

});