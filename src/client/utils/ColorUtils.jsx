/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

/**
 * function to test if a color is more dark type or more light type
 * (inspired by https://stackoverflow.com/a/39077686 and https://github.com/xxasd/TEXTColor)
 * @param {string} hexColor the color to test in shorthand (#fff) or regular hex triplet (#ffffff) from, # can be omitted
 * @return {string}
 */
export const getColorType = (hexColor) => {
    // get rgb values
    const hexArray = hexColor.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16));
    // determine light or dark color
    const color = 0.213 * hexArray[0] + 0.715 * hexArray[1] + 0.072 * hexArray[2] > 255 / 2;
    return color ? 'dark' : 'light';
}
