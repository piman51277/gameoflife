# v2 optimizations

## previous
 - Use `ctx.getImageData` and `ctx.putImageData` to draw quickly
 - Only fill in cells that have changed since last cycle

## new 
 - Use a Uint8Array to store data, instead of Array
 - Use a single (combined) statement to get neighbor count, instead of multiple `if` statements

