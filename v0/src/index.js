let ctx;
let canvas;

//fps math
let ping = 0;
let lastPing = 0;

$(document).ready(() => {
    canvas = document.getElementById("gameoflife")
    ctx = canvas.getContext("2d")
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    let state = []

    //fill the board
    for (let x = 0; x < Math.ceil(window.innerWidth); x++) {
        state.push(new Array(Math.ceil(window.innerHeight)).fill(0).map(n => Math.round(Math.random())))
    }

    setInterval(() => {
        const copy = deepCopy(state)
        const [xDim, yDim] = [state.length, state[0].length]

        for (let y = 0; y < yDim; y++) {
            for (let x = 0; x < xDim; x++) {
                //check neighbors
                let count = 0;
                if (y > 0) {
                    let yminus = y - 1;
                    if (x > 0 && state[x - 1][yminus] == 1) count++ //--
                    if (x < xDim - 1 && state[x + 1][yminus] == 1) count++//+-
                    if (state[x][yminus] == 1) count++//0-
                }
                if (y < yDim - 1) {
                    if (x > 0 && state[x - 1][y + 1] == 1) count++ //-+
                    if (x < xDim - 1 && state[x + 1][y + 1] == 1) count++//++
                    if (state[x][y + 1] == 1) count++//0+
                }
                if (x > 0 && state[x - 1][y] == 1) count++ //-0
                if (x < xDim - 1 && state[x + 1][y] == 1) count++//+0

                if (state[x][y] == 1 && (count > 3 || count < 2)) {
                    copy[x][y] = 0

                } else if (count == 3) {
                    copy[x][y] = 1
                }
            }
        }
        state = copy;

        //background
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        //display
        ctx.fillStyle = "#FFFFFF"
        for (let y = 0; y < state[0].length; y++) {
            for (let x = 0; x < state.length; x++) {
                if (state[x][y] == 1) {
                    ctx.fillRect(x, y, 1, 1)
                }
            }
        }

        //fps
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 60, 20)
        ctx.fillStyle = '#00FF00';
        lastPing = ping;
        ping = Date.now()
        ctx.fillText(`${(1000 / (ping - lastPing)).toFixed(1)} FPS`, 10, 10)
    }, 16)

})

function deepCopy(src) {
    let target = Array.isArray(src) ? [] : {};
    for (let key in src) {
        let v = src[key];
        if (v) {
            if (typeof v === "object") {
                target[key] = deepCopy(v);
            } else {
                target[key] = v;
            }
        } else {
            target[key] = v;
        }
    }

    return target;
}
