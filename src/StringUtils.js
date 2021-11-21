import {CommaAndWhitespace, NonAlphanumericChars} from "./Regex.js"

/**
 * @description remove whitespace from string items in an array
 * @param {[]} input
 * @returns {[]} charArray - array in which the string items have been trimmed for whitespace
 */
export const trimCharArray = (input) => input.map(item => typeof item === 'string' ?
    item.trim() :
    item)

/**
 * @description remove non alphanumeric characters from a string
 * @param {string} input
 * @returns {string} alphanumeric string
 */
export const removeNonAlphanumericChars = (input) => input.replace(NonAlphanumericChars, '')

/**
 * @description split string input and remove non alphanumeric characters from its items
 * @param {string} input
 * @returns {[]} alphanumeric string
 */
export const createAlphanumericArray = (input) => {
    return trimCharArray(input.split(CommaAndWhitespace).reduce((array, item) => {
        return [...array, removeNonAlphanumericChars(item)]
    }, []))
}
