import {getWorldGridBoundary} from "./WorldGrid.js"
import {trimCharArray} from "./StringUtils.js"
import {getRoverPositionsAndMoveCommands, moveRover} from "./Rover.js"
import {orientationMappings} from "./OrientationMappings.js"

/**
 * @description remove whitespace from string items in an array
 * @param {string} missionInput - string containing world bounds and initial rover position/orientation and movement commands
 * @returns {string[]} missionResult - array of final positions of rovers including if they've been lost or not
 */
export const executeMission = (missionInput) => {
    const missionInputs = trimCharArray(missionInput.split("\n"))
    const worldGridBoundary = getWorldGridBoundary(missionInputs[0])
    const unformattedRoversStartPosAndMoveCommands = missionInputs.slice(1)
    const {
        initialisedRovers,
        missionMoveCommands
    } = getRoverPositionsAndMoveCommands(unformattedRoversStartPosAndMoveCommands)

    const missionResult = initialisedRovers.map((rover, index) => {
        return moveRover(missionMoveCommands[index], rover, worldGridBoundary, orientationMappings)
    })
    return missionResult.map(result => {
        return `(${result.position.x}, ${result.position.y}, ${result.orientation})${result.lost ? " LOST" : ""}`
    })
}
