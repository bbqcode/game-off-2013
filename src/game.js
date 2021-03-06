﻿define(['phaser', 'src/player', 'src/levels/level-1', 'src/loader', 'configs'],
function (Phaser, Player, Level1, Loader, configs) {
    function preload() {
        Loader.preload(this.game);
    }

    function create() {
        Phaser.Canvas.setSmoothingEnabled(this.game.context, false);

        this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        this.game.stage.scale.setShowAll();
        this.game.stage.scale.refresh();

        this.game.debug.renderBodies = [];
        this.game.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.level = new Level1(this.game);
    }

    function update() {
    }

    function render() {
        if (!configs.debug) return;

        var bodies = this.game.debug.renderBodies;
        for (var i = 0; i < bodies.length; i++) {
            this.game.debug.renderSpriteBody(bodies[i]);
        }

        this.game.debug.renderRectangle(this.game.camera.deadzone);
        this.game.debug.renderSpriteInfo(this.game.player, 32, 300);
        this.game.debug.renderSpriteCollision(this.game.player, 32, 32);
    }

    return {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
});