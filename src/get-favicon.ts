import fetch from 'node-fetch'
import { parse } from 'node-html-parser'
import d from 'debug'

// Initialize the debug instance
const debug = d('favicon')

// Enum to represent different favicon fetching strategies
export enum EStrategies {
  default = 'default',
  duckduckgo = 'duckduckgo',
  google = 'google',
  http = 'http',
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

// Function to fetch the favicon using different strategies
export async function getFavicon(
  hostname: string,
  options?: IOptions,
): Promise<Buffer | string | null> {
  // Initialize the icon variable to null
  let icon: Buffer | string | null = null
  // Set the output format (default is 'url')
  const output = options?.output || 'url'

  // Check whether the URL is valid
  let url: string
  try {
    const isValidURL = new URL(hostname).href
    if (isValidURL) {
      url = hostname
    }
  } catch (e) {
    throw new Error('The hostname provided is not a valid URL')
  }

  // Define the strategies to be used
  let strategies: IStrategy[] = []
  // List of available strategies
  const availableStrategies: IStrategy[] = [
    {
      name: 'default',
      url: `${url}/favicon.ico`,
    },
    {
      name: 'http',
      url,
    },
    {
      name: 'duckduckgo',
      url: `https://icons.duckduckgo.com/ip3/${url}.ico`,
    },
    {
      name: 'google',
      url: `https://s2.googleusercontent.com/s2/favicons?domain=${url}`,
    },
  ]

  // Handle the strategies options
  if (options?.strategies?.length > 0) {
    debug('Using selected strategies:', options.strategies.join(','))

    options.strategies.forEach(strategy => {
      if (!(strategy in EStrategies)) {
        // If the strategy is not available, skip it
        debug(`${strategy} strategy is not supported. Skipping`)
      } else {
        // If the strategy is available, use it
        const foundStrategy = availableStrategies.find(
          availableStrategy => availableStrategy.name === strategy,
        )
        strategies.push(foundStrategy)
      }
    })
  } else {
    debug('Using all strategies: default, http, duckduckgo, and google')

    // If no specific strategies are selected, use all available strategies
    strategies = availableStrategies
  }

  // Loop through the strategy URLs
  for await (const strategy of strategies) {
    try {
      debug(`Fetching using ${strategy.name} strategy`)

      // Fetch the icon from the strategy URL
      const response = await fetch(strategy.url)

      switch (strategy.name) {
        case 'http':
          {
            // Handle http strategy
            debug('Fetching HTML...')
            const html = await response.text()

            debug('Parsing HTML...')
            const root = parse(html)

            debug(
              'Getting the favicon URL from the <link rel="icon"> element...',
            )
            const head = root.querySelector('head')
            const element = head.querySelector('link[rel="icon"]')
            const iconPath = element.getAttribute('href')

            debug('Check if the icon path is an absolute URL...')
            let iconURL: string
            try {
              // Check if iconPath is an absolute URL
              iconURL = new URL(iconPath, strategy.url).href
            } catch (_) {
              // Handle invalid URL cases
              iconURL = `${strategy.url}${iconPath.replace(strategy.url, '')}`
            }

            debug(`Returning the favicon as ${output}...`)
            if (output === 'buffer') {
              // Get the image to buffer
              const iconResponse = await fetch(iconURL)
              const arrayBuffer = await iconResponse.arrayBuffer()
              icon = Buffer.from(arrayBuffer)
              break
            }

            if (output === 'url') {
              // Set the icon URL
              icon = iconURL
              break
            }
          }
          break

        default: {
          // Handle other strategies
          debug(`Returning the favicon as ${output}...`)
          const result = await response.arrayBuffer().then(ab => {
            return Buffer.from(ab)
          })

          if (output === 'buffer') {
            icon = result
            break
          }

          if (output === 'url') {
            icon = strategy.url
            break
          }
        }
      }

      // If icon is found, break the loop
      if (icon) {
        break
      }
    } catch (_) {
      // If an error occurs, continue with the next strategy
      continue
    }
  }

  // After the loop, check if icon has been found
  if (icon) {
    // If an icon is found, return it
    return icon
  } else {
    // If no icon is found, return null
    return null
  }
}
