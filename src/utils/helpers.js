import { COLORS } from './constants';

/**
 * Return a color if one is found otherwise return null
 * 
 * @param {array} colors 
 * @param {string} speech 
 */
export function findLastColor(speech) {
    let foundColor;
    speech.split(' ').forEach((word) => {
        if (COLORS.regex.test(word)) {
            foundColor = word
        }
    })
    return foundColor;
}