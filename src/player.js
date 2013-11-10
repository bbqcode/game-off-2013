define(['underscore', 'phaser', 'configs'], function (_,  Phaser, configs) {
    var Player = function (game, cursors, spriteKey) {
        this.cursors = cursors;

        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.facing = 'left';

        Phaser.Sprite.call(this, game, 0, 0, spriteKey)
        this.body.gravity.y = configs.gravity;
        this.body.bounce.y = configs.bounce;

        this.body.collideWorldBounds = true;

        this.animations.add('walk-right', [0, 1, 2, 3], 30, true);
        this.animations.add('walk-left', [4, 5, 6, 7], 30, true);
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.update = function () {
        var cursors = this.cursors;
        var facing = this.facing;
        var jumpButton = this.jumpButton;
        this.body.velocity.x = 0;

        if (cursors.left.isDown) {
            this.body.velocity.x = -150;
            if (facing != 'left') {
                facing = 'left';
                this.animations.play('walk-left');
            }
        }
        else if (cursors.right.isDown) {
            this.body.velocity.x = 150;
            if (facing != 'right') {
                facing = 'right';
                this.animations.play('walk-right');
            }
        }
        else {
            if (facing != 'idle') {
                this.animations.stop();
                if (facing == 'right') {
                    this.frame = 0;
                } else {
                    this.frame = 4;
                }
                facing = 'idle';
            }
        }

        if (jumpButton.isDown && this.body.touching.down && this.time.now > jumpTimer) {
            this.body.velocity.y = -400;
            jumpTimer = this.time.now + 750;
        }
    }

    
    return Player;

});