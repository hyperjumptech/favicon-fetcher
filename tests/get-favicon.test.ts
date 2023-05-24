import { getFavicon } from '../src'
import { type EStrategies } from '../src/get-favicon'

describe('Get favicon function', () => {
  it('should get the favicon correctly without options', async () => {
    const result = await getFavicon('https://www.google.com')
    expect(result).not.toBeNull()
  })

  it('should get the favicon correctly using the default strategy', async () => {
    const result = await getFavicon('https://www.google.com', {
      strategies: ['default' as EStrategies],
    })
    expect(result).not.toBeNull()
  })

  it('should get the favicon correctly using the duckduckgo strategy', async () => {
    const result = await getFavicon('https://www.google.com', {
      strategies: ['duckduckgo' as EStrategies],
    })
    expect(result).not.toBeNull()
  })

  it('should get the favicon correctly using the google strategy', async () => {
    const result = await getFavicon('https://www.google.com', {
      strategies: ['google' as EStrategies],
    })
    expect(result).not.toBeNull()
  })

  it('should not get the favicon correctly using unsupported strategy', async () => {
    const result = await getFavicon('https://www.google.com', {
      strategies: ['bing' as EStrategies],
    })
    expect(result).toBeNull()
  })

  it('should not get the favicon correctly because of bad URL', async () => {
    const result = await getFavicon('ww.goo.gle')
    expect(result).not.toBeNull()
  })
})
