//makes updating mappings easier if the rover can jump multiple spaces etc
export const orientationMappings = {
    N: {
        L: 'W',
        R: 'E',
        move: (x, y) => ({x: x, y: y + 1})
    },
    E: {
        L: 'N',
        R: 'S',
        move: (x, y) => ({x: x + 1, y: y})
    },
    S: {
        L: 'E',
        R: 'W',
        move: (x, y) => ({x: x, y: y - 1})
    },
    W: {
        L: 'S',
        R: 'N',
        move: (x, y) => ({x: x - 1, y: y})
    }
}
