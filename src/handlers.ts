import type { Response } from 'node-fetch'
import parse from 'node-html-parser'

/**
 * Handles fetching the favicon using the HTTP strategy.
 *
 * This function parses the HTML response to find the favicon link, constructs the
 * full URL of the favicon, and returns it either as a URL string or a buffer.
 *
 * @param {Response} response - The HTTP response containing the HTML.
 * @param {string} baseUrl - The base URL of the site being fetched.
 * @param {'buffer' | 'url'} output - The desired output format, either 'buffer' or 'url'.
 * @returns {Promise<Buffer | string | null>} - A promise that resolves to the favicon as a buffer, a URL string, or null if not found.
 */
export async function handleHttpStrategy(
  response: Response,
  baseUrl: string,
  output: 'buffer' | 'url'
): Promise<Buffer | string | null> {
  const html = await response.text()
  const root = parse(html)
  const iconPath = root
    .querySelector('head')
    ?.querySelector('link[rel="icon"]')
    ?.getAttribute('href')
  if (!iconPath) return null

  let iconURL: string
  try {
    const isAbsoluteURL = new URL(iconPath)
    if (isAbsoluteURL) {
      iconURL = isAbsoluteURL.href
    }
  } catch (e) {
    iconURL = `${baseUrl}${iconPath}`
  }

  if (output === 'buffer') {
    const iconResponse = await fetch(iconURL)
    const arrayBuffer = await iconResponse.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }

  return iconURL
}

/**
 * Handles fetching the favicon using other strategies.
 *
 * This function returns the response data either as a URL string or a buffer,
 * depending on the specified output format.
 *
 * @param {Response} response - The HTTP response containing the data.
 * @param {string} url - The URL of the resource being fetched.
 * @param {'buffer' | 'url'} output - The desired output format, either 'buffer' or 'url'.
 * @returns {Promise<Buffer | string | null>} - A promise that resolves to the resource data as a buffer or a URL string.
 */
export async function handleOtherStrategies(
  response: Response,
  url: string,
  output: 'buffer' | 'url'
): Promise<Buffer | string | null> {
  if (output === 'buffer') {
    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }

  return url
}
