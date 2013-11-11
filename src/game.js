define(['phaser', 'src/player', 'src/levels/level-1', 'src/loader'],
function (Phaser, Player, Level1, Loader) {
    function preload() {
        Loader.preload(this.game);
    }

    function create() {
        this.game.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.level = new Level1(this.game);
        this.game.player = new Player(this.game);

    }

    function update() {

    }

    function render() {

    }

    return {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
});