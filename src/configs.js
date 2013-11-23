define({
    game: {
        width: 360,
        height: 225,
        canvasId: 'game'
    },
    camera: {
        deadzoneHeight: 150,
        deadzoneY: 40
    },
    player: {
        jumpDuration: 200,
        cannotJumpUntil: 80,
        jumpForce: 140,
        accelerationX: 2000,
        accelerationY : 3500 ,
        maxVelocityX: 200,
        maxVelocityY: 350
    },

    gravity: 40 ,
    bounce: 0,

    debug: false
});