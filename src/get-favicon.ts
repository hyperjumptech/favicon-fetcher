import fetch from 'node-fetch'
import debug from 'debug'

const debugInstance = debug('favicon')

export enum EStrategies {
  default = 'default',
  duckduckgo = 'duckduckgo',
  google = 'google',
}

interface IOptions {
  strategies: EStrategies[]
}

interface IStrategy {
  name: string
  url: string
}

export async function getFavicon(
  hostname: string,
  options?: IOptions,
): Promise<Buffer | null> {
  // This will fetch the favicon using three strategies:
  // Using the /favicon.ico path, the DuckDuckGo API, and Google API
  let icon: Buffer | null = null

  // Define the used strategies
  let strategies: IStrategy[] = []
  const availableStrategies: IStrategy[] = [
    {
      name: 'default',
      url: `${hostname}/favicon.ico`,
    },
    {
      name: 'duckduckgo',
      url: `https://icons.duckduckgo.com/ip3/${hostname}.ico`,
    },
    {
      name: 'google',
      url: `https://s2.googleusercontent.com/s2/favicons?domain=${hostname}`,
    },
  ]

  // Handle the strategies options, meaning users only
  // select some of the available strategies
  if (options?.strategies.length > 0) {
    debugInstance('Selected strategies:', options.strategies.join(','))

    options.strategies.forEach(strategy => {
      if (!(strategy in EStrategies)) {
        // If the strategy is not available, skip it
        debugInstance(`${strategy} strategy is not supported. Skipping`)
      } else {
        // If the strategy is available, use it
        const foundStrategy = availableStrategies.find(
          availableStrategy => availableStrategy.name === strategy,
        )
        strategies.push(foundStrategy)
      }
    })
  } else {
    debugInstance('Using all strategies')

    strategies = availableStrategies
  }

  // Loop API call to the strategy urls
  for await (const strategy of strategies) {
    try {
      debugInstance(`Fetching using ${strategy.name} strategy`)

      // Get the icon from the strategy url
      const response = await fetch(strategy.url)
      const result = await response.arrayBuffer().then(ab => {
        return Buffer.from(ab)
      })

      icon = result

      // Else, use another strategy
      continue
    } catch (_) {
      // API error catched, use another strategy
      continue
    }
  }

  // After the loop, check if result has an icon
  debugInstance('Icon result:', icon)

  if (icon) {
    // If there is any icon, cache the icon
    // Then return the icon
    return icon
  } else {
    // Else, return
    return null
  }
}
