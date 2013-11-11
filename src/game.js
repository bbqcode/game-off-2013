define(['phaser', 'src/player', 'src/levels/level-1', 'src/loader'],
function (Phaser, Player, Level1, Loader) {
    function preload() {
        Loader.preload(this.game);
    }

    function create() {
        this.game.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.level = new Level1(this.game);
    }

    function update() {
    }

    function render() {
        var target = this.game.triggers[0];
        this.game.debug.renderSpriteBody(this.game.triggers[0]);
        this.game.debug.renderSpriteBody(this.game.player);
        this.game.debug.renderSpriteInfo(this.game.player, 32, 32);
        this.game.debug.renderSpriteCollision(this.game.player, 32, 400);
    }

    return {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
});