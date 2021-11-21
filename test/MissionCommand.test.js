import expect from "expect"
import {executeMission} from "../src/MissionCommand.js"

describe('Mission Command', () => {
    describe('executeMission', () => {
        test('returns expected output based on specification examples and answers', () => {
            const exampleOne = `4, 8
    (2, 3, E) LFRFF
    (0, 2, N) FFLFRFF`

            const exampleTwo = `4, 8
    (2, 3, N) FLLFR
    (1, 0, S) FFRLF`

            expect(executeMission(exampleOne)).toEqual(["(4, 4, E)", "(0, 4, W) LOST"])
            expect(executeMission(exampleTwo)).toEqual(["(2, 3, W)", "(1, 0, S) LOST"])
        })

        test('returns input the same positions and orientations as output if rovers do a 360 degree spin', () => {
            const exampleOne = `4, 8
    (2, 3, E) LLLL
    (0, 2, N) RRRR`

            expect(executeMission(exampleOne)).toEqual(["(2, 3, E)", "(0, 2, N)"])
        })

        test('returns input the same positions and new orientations as output if rovers do a 90 degree spin', () => {
            const exampleOne = `4, 8
    (2, 3, E) L
    (0, 2, N) R`

            expect(executeMission(exampleOne)).toEqual(["(2, 3, N)", "(0, 2, E)"])
        })
    })
})
