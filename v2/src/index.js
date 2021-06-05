let ctx;
let canvas;
let [width, height] = [0, 0];

//fps math
let ping = 0;
let lastPing = 0;

$(document).ready(() => {
    console.log(`document ready, starting...`)

    canvas = document.getElementById("gameoflife")
    ctx = canvas.getContext("2d")
    width = canvas.height = window.innerHeight
    height = canvas.width = window.innerWidth

    //create array of random positions
    console.log(`initializing array...`)
    let state = new Uint8Array(window.innerHeight * window.innerWidth).map(n => Math.round(Math.random()))

    //map every alpha to 255 before starting
    console.log(`initializing screen...`)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    setInterval(() => {
        //display 
        let id = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = id.data;
        let offset = 0;

        //copy state
        let copy = state.slice()

        //process each pixel
        for (let pos = 0; pos < state.length; pos++) {
            //count neighbors
            let count = (state[pos - height - 1] || 0) + (state[pos - height] || 0) + (state[pos - height + 1] || 0) + (state[pos - 1] || 0) + (state[pos + 1] || 0) + (state[pos + height - 1] || 0) + (state[pos + height] || 0) + (state[pos + height + 1] || 0)

            //compute offset
            offset = pos << 2;

            //change conditions
            if (state[pos] == 1 && (count > 3 || count < 2)) {
                //changes to dead
                copy[pos] = 0

                //change display
                pixels[offset] = 0
                pixels[offset + 1] = 0
                pixels[offset + 2] = 0
            } else if (count == 3) {
                //changes to alive
                copy[pos] = 1

                //change display 
                pixels[offset] = 255
                pixels[offset + 1] = 255
                pixels[offset + 2] = 255
            }
        }

        ctx.putImageData(id, 0, 0);
        state = copy

        //fps
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 60, 20)
        ctx.fillStyle = '#00FF00';
        lastPing = ping;
        ping = Date.now()
        ctx.fillText(`${(1000 / (ping - lastPing)).toFixed(1)} FPS`, 10, 10)
    }, 16)

})
