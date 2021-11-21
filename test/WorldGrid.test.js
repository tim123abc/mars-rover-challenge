import expect from "expect"
import {getWorldGridBoundary, isRoverInBounds} from "../src/WorldGrid.js"
import {TestRover, WorldGridBounds} from "./TestUtils.js"

describe('WorldGrid', () => {
    describe('getWorldGridBoundary', () => {
        test('', () => {
            expect(getWorldGridBoundary("4, 8")).toEqual({"x": 4, "y": 8})
        })
    })

    describe('isRoverInBounds', () => {
        test('returns true when the rover is in bounds', () => {
            expect(isRoverInBounds(TestRover, WorldGridBounds)).toEqual(true)
        })

        test('returns false when x is out of bounds by being over the limit', () => {
            const roverOutOfBoundsX = {...TestRover}
            roverOutOfBoundsX.position.x = 100
            expect(isRoverInBounds(roverOutOfBoundsX, WorldGridBounds)).toEqual(false)
        })

        test('returns false when x is out of bounds by being less than 0', () => {
            const roverOutOfBoundsX = {...TestRover}
            roverOutOfBoundsX.position.x = -1
            expect(isRoverInBounds(roverOutOfBoundsX, WorldGridBounds)).toEqual(false)
        })

        test('returns false when y is out of bounds by being more than bounds', () => {
            const roverOutOfBoundsY = {...TestRover}
            roverOutOfBoundsY.position.y = 7
            expect(isRoverInBounds(roverOutOfBoundsY, WorldGridBounds)).toEqual(false)
        })

        test('returns false when y is out of bounds by being less than 0', () => {
            const roverOutOfBoundsY = {...TestRover}
            roverOutOfBoundsY.position.y = -1
            expect(isRoverInBounds(roverOutOfBoundsY, WorldGridBounds)).toEqual(false)
        })
    })
})
