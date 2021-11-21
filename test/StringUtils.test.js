import {createAlphanumericArray, removeNonAlphanumericChars, trimCharArray} from "../src/StringUtils.js"
import expect from "expect"

describe('StringUtils', () => {
    describe('trimCharArray', () => {
        test('correctly removes empty space prefixes and suffixes from each string character in the array', () => {
            expect(trimCharArray([" James Bond ", "007 "])).toEqual(["James Bond", "007"])
        })

        test('ignores non string array items', () => {
            expect(trimCharArray([" James Bond ", 7])).toEqual(["James Bond", 7])
        })
    })

    describe('removeNonAlphanumericChars', () => {
        test('correctly removes non alphanumeric characters', () => {
            expect(removeNonAlphanumericChars(" N)")).toEqual("N")
        })

        test('does not remove letters and digits', () => {
            expect(removeNonAlphanumericChars("FFFRRRLLL")).toEqual("FFFRRRLLL")
        })
    })

    describe('createAlphanumericArray', () => {
        test('creates array of alphanumeric characters with no whitespace', () => {
            expect(createAlphanumericArray("(2, 3, N) FFLRR")).toEqual(["2", "3", "N", "FFLRR"])
        })
    })
})
