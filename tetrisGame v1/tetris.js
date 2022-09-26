// The actual Tetris game code

// setup
let canvas = document.getElementById("game-canvas")
let scoreboard = document.getElementById("scoreboard")

let ctx = canvas.getContext("2d")
ctx.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH)
let model = new GameModel(ctx)

let score = 0

// main game loop
setInterval(() => {
    newGameState()
}, GAME_CLOCK);

let newGameState = () => {
    fullSend()
    // check if current model has the fallen piece
    if (model.fallingPiece === null) {
        const rand = Math.round(Math.random() * 6) + 1
        const newPiece = new Piece(SHAPES[rand], ctx)
        model.fallingPiece = newPiece
        model.moveDown()
    } else {
        model.moveDown()
    }
}

const fullSend = () => {
    const allfilled = (row) => {
        for (let x of row) {
            if (x === 0) {
                return false
            }
        }
        return true
    }

    for (let i =0; i < model.grid.length; i++) {
        if (allfilled(model.grid[i])) {
            score += SCORE_WORTH
            model.grid.splice(i, 1)
            model.grid.unshift([0,0,0,0,0,0,0,0,0,0])
        }
    }

    scoreboard.innerHTML = "Score: " + String(score)
}


// updating UI to support the piece rotation; make ui accept user imputs
document.addEventListener("keydown", (e) => {
    e.preventDefault()
    switch(e.key) {
        case "w":
            model.rotate()
            break
        case "d":
            model.move(true) 
            break
        case "s":
            model.moveDown()
            break
        case "a":
            model.move(false)
            break
    }
})
