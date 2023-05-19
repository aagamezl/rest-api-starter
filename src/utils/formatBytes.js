/**
 * @typedef {object} FormatBytes
 *
 * @property {number} value
 * @property {string} unit
 */

/**
 *
 * @param {number} bytes
 * @param {number} decimals
 * @returns {FormatBytes}
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (!Number(bytes)) {
    return
  }

  const kilobyte = 1024
  const toFixed = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const index = Math.floor(Math.log(bytes) / Math.log(kilobyte))

  return {
    value: parseFloat((bytes / Math.pow(kilobyte, index)).toFixed(toFixed)),
    unit: sizes[index]
  }
}
