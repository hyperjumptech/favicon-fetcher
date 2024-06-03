import fetch from 'node-fetch'
import d from 'debug'
import { handleHttpStrategy, handleOtherStrategies } from './handlers'

// Initialize the debug instance
const debug = d('favicon')

// Enum to represent different favicon fetching strategies
export enum EStrategies {
  default = 'default',
  duckduckgo = 'duckduckgo',
  google = 'google',
  http = 'http'
}

// Interface for the options parameter
interface IOptions {
  strategies?: EStrategies[]
  output?: 'buffer' | 'url'
}

// Interface for the strategy objects
interface IStrategy {
  name: string
  url: string
}

/**
 * Fetches the favicon for a given hostname using various strategies.
 *
 * This function tries different strategies to fetch the favicon of a website.
 * It supports both returning the favicon as a URL string or a buffer.
 *
 * @param {string} hostname - The hostname of the website to fetch the favicon from.
 * @param {IOptions} [options] - Optional settings for the fetch operation.
 * @param {EStrategies[]} [options.strategies] - Array of strategies to use for fetching the favicon.
 * @param {'buffer' | 'url'} [options.output] - Desired output format, either 'buffer' or 'url'.
 * @returns {Promise<Buffer | string | null>} - A promise that resolves to the favicon as a buffer, a URL string, or null if not found.
 * @throws {Error} - Throws an error if the provided hostname is not a valid URL.
 */
export async function getFavicon(
  hostname: string,
  options?: IOptions
): Promise<Buffer | string | null> {
  let icon: Buffer | string | null = null
  const output = options?.output || 'url'

  let url: string
  try {
    // Validate the provided hostname
    const isValidURL = new URL(hostname).href
    if (isValidURL) {
      url = hostname
    }
  } catch (e) {
    throw new Error('The hostname provided is not a valid URL')
  }

  // Define available strategies for fetching the favicon
  const availableStrategies: IStrategy[] = [
    { name: 'default', url: `${url}/favicon.ico` },
    { name: 'http', url },
    { name: 'duckduckgo', url: `https://icons.duckduckgo.com/ip3/${url}.ico` },
    {
      name: 'google',
      url: `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    }
  ]

  // Filter strategies based on options provided
  const strategies = options?.strategies?.length
    ? availableStrategies.filter(s =>
        options.strategies.includes(s.name as EStrategies)
      )
    : availableStrategies

  // Iterate through the strategies and attempt to fetch the favicon
  for (const strategy of strategies) {
    try {
      debug(`Fetching using ${strategy.name} strategy`)

      const response = await fetch(strategy.url)
      if (strategy.name === 'http') {
        icon = await handleHttpStrategy(response, strategy.url, output)
      } else {
        icon = await handleOtherStrategies(response, strategy.url, output)
      }

      if (icon) break
    } catch (e: unknown) {
      debug(`Error using ${strategy.name} strategy: ${(e as Error).message}`)
      continue
    }
  }

  return icon
}
