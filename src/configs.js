define({
    game: {
        width: 360,
        height: 225,
        canvasId: 'game'
    },
    player: {
        jumpVelocity: 4.5,
        jumpDuration: 150,
        cannotJumpUntil: 80,
        drag: 3000,
        acceleration: 1000,
        maxVelocity: 155
    },

    gravity: 40,
    bounce: 0,

    debug: false
});