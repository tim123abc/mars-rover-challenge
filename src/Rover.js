import {isRoverInBounds} from "./WorldGrid.js"
import {createAlphanumericArray} from "./StringUtils.js"

/**
 * @description Get Rover positions and move commands
 * @param {string[]} roversStartPosAndMoveCommands
 * @returns {{initialisedRovers: {}[], missionMoveCommands: string[]}}
 */
export const getRoverPositionsAndMoveCommands = (roversStartPosAndMoveCommands) => {
    const initialisedRovers = []
    const missionMoveCommands = []
    roversStartPosAndMoveCommands.forEach(positionAndCommand => {
        const splitPoint = positionAndCommand.lastIndexOf(")")
        const startPosition = positionAndCommand.substring(0, splitPoint + 1)
        const moveCommands = positionAndCommand.substring(splitPoint + 1)
        const startingPosition = createAlphanumericArray(startPosition)
        initialisedRovers.push(initialiseRover(startingPosition, ["x", "y", "orientation"]))
        missionMoveCommands.push(moveCommands.trim())
    })
    return {initialisedRovers, missionMoveCommands}
}

/**
 * @description Get Rover positions and move commands
 * @param {string[]} roverOrientation
 * @param {string[]} axisKeys
 * @returns {{orientation: string, position: {}}} - position and orientation object
 */
export const initialiseRover = (roverOrientation, axisKeys) => {
    const flatRover = axisKeys.reduce((rover, item, index) => ({
        ...rover,
        [item]: roverOrientation[index]
    }), {})
    const orientation = flatRover.orientation
    delete flatRover["orientation"]
    Object.keys(flatRover).forEach(key => flatRover[key] = parseFloat(flatRover[key]))
    return {
        position: {...flatRover},
        orientation
    }
}

/**
 * @description Update Rover x,y position, orientation and lost status
 * @param {string} moveCommands
 * @param {{}} rover
 * @param {{}} bounds
 * @param {{}} orientationMappings
 * @returns {{}} movedRover - Rover that has been updated
 */
export const moveRover = (moveCommands, rover, bounds, orientationMappings) => {
    let movedRover = {...rover}
    if (!isRoverInBounds(movedRover, bounds)) {
        movedRover["lost"] = true
        return movedRover
    }
    moveCommands.split("").some(moveCommand => {
        if (moveCommand === 'F') {
            const tempRover = {...movedRover}
            tempRover.position = orientationMappings[movedRover.orientation]['move'](movedRover.position.x, movedRover.position.y)
            if (!isRoverInBounds(tempRover, bounds)) {
                return movedRover["lost"] = true
            }
            movedRover = tempRover
        } else {
            movedRover.orientation = orientationMappings[movedRover.orientation][moveCommand]
        }
    })
    return movedRover
}
