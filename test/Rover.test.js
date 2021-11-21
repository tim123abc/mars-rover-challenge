import expect from "expect"
import {getRoverPositionsAndMoveCommands, initialiseRover, moveRover} from "../src/Rover.js"
import {TestRover, WorldGridBounds} from "./TestUtils.js"
import {orientationMappings} from "../src/OrientationMappings.js"

describe('Rover', () => {
    const testUnformattedRoverStartPosAndMoveCommands = ["(2,3,E) FFLR", "(4,7,S) FFRR"]
    describe('getRoverPositionsAndMoveCommands', () => {
        test('returns object with separate correct starting positions and move command children', () => {
            expect(getRoverPositionsAndMoveCommands(testUnformattedRoverStartPosAndMoveCommands).initialisedRovers).toEqual(
                [
                    {
                        "orientation": "E",
                        "position": {
                            "x": 2,
                            "y": 3
                        }
                    },
                    {
                        "orientation": "S",
                        "position": {
                            "x": 4,
                            "y": 7
                        }
                    }
                ])
            expect(getRoverPositionsAndMoveCommands(testUnformattedRoverStartPosAndMoveCommands).missionMoveCommands).toEqual(["FFLR", "FFRR"])
        })
    })

    describe('initialiseRover', () => {
        test('returns rover with position and orientation child objects from roverOrientation array inputs', () => {
            expect(initialiseRover([2, 3, "E"], ["x", "y", "orientation"])).toEqual({
                "orientation": "E",
                "position": {"x": 2, "y": 3}
            })
        })
    })

    describe('moveRover', () => {
        test('updates orientation of rover with new position and orientation if within bounds', () => {
            expect(moveRover("LF", TestRover, WorldGridBounds, orientationMappings)).toEqual({
                "orientation": "W",
                "position": {
                    "x": 1,
                    "y": 6
                }
            })
        })

        test('does not move rover if starting position is out of bounds', () => {
            expect(moveRover("RR", TestRover, {x: 1, y: 1}, orientationMappings)).toEqual({
                "lost": true,
                "orientation": "N",
                "position": {
                    "x": 2,
                    "y": 6
                }
            })
        })

        test('orientation stays the same if rover does 360 rotation left or right', () => {
            expect(moveRover("LLLL", TestRover, WorldGridBounds, orientationMappings)).toEqual({
                "orientation": "N",
                "position": {
                    "x": 2,
                    "y": 6
                }
            })

            expect(moveRover("RRRR", TestRover, WorldGridBounds, orientationMappings)).toEqual({
                "orientation": "N",
                "position": {
                    "x": 2,
                    "y": 6
                }
            })
        })

        test('if lost returns rovers last valid position and a lost flag is added to the rover object if out of bounds to left of grid', () => {
            expect(moveRover("LFFFFFRR", TestRover, WorldGridBounds, orientationMappings)).toEqual({
                "lost": true,
                "orientation": "W",
                "position": {
                    "x": 0,
                    "y": 6
                }
            })
        })

        test('if lost returns rovers last valid position and a lost flag is added to the rover object if out of bounds to right of grid', () => {
            expect(moveRover("RFFFFFFL", TestRover, WorldGridBounds, orientationMappings)).toEqual({
                "lost": true,
                "orientation": "E",
                "position": {
                    "x": 4,
                    "y": 6
                }
            })
        })

        test('if lost returns rovers last valid position and a lost flag is added to the rover object if out of bounds to bottom of grid', () => {
            expect(moveRover("RRFFFFFFFL", TestRover, WorldGridBounds, orientationMappings)).toEqual({
                "lost": true,
                "orientation": "S",
                "position": {
                    "x": 2,
                    "y": 0
                }
            })
        })

        test('if lost returns rovers last valid position and a lost flag is added to the rover object if out of bounds to top of grid', () => {
            expect(moveRover("FFFFFFFL", TestRover, WorldGridBounds, orientationMappings)).toEqual({
                "lost": true,
                "orientation": "N",
                "position": {
                    "x": 2,
                    "y": 6
                }
            })
        })
    })
})
