/**
 * @description Get the x and y co-ordinates of the world grid boundary
 * @param {string} input
 * @returns {{}} worldGridBounds - x,y boundary of the world grid
 */
export const getWorldGridBoundary = (input) => {
    const worldGridBounds = input.split(",").map(number => parseFloat(number))
    return {x: worldGridBounds[0], y: worldGridBounds[1]}
}

/**
 * @description Check if rover position is within the world bounds
 * @param {{}} rover
 * @param {{}} worldGridBoundary
 * @returns {boolean} isRoverInBounds - if the rover is in bounds
 */
export const isRoverInBounds = (rover, worldGridBoundary) => {
    return (rover.position.x <= worldGridBoundary.x && rover.position.x >= 0) &&
        (rover.position.y <= worldGridBoundary.y && rover.position.y >= 0)
}
