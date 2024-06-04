import fetchMock from 'jest-fetch-mock'
import { getFavicon } from '../src'
import { type EStrategies } from '../src/get-favicon'

fetchMock.enableMocks()

beforeEach(() => {
  jest.setTimeout(10000)
  fetchMock.resetMocks()
})

describe('Get favicon function', () => {
  it('should get the favicon correctly without options', async () => {
    const result = await getFavicon('https://github.com')

    expect(result).not.toBeNull()
    expect(result).toBe('https://github.githubassets.com/favicons/favicon.svg')
  })

  it('should get the favicon correctly without options with buffer output', async () => {
    const result = await getFavicon('https://github.com', {
      output: 'buffer'
    })

    expect(result).not.toBeNull()
  })

  it('should get the favicon correctly using the default strategy', async () => {
    const result = await getFavicon('https://github.com', {
      strategies: ['default' as EStrategies]
    })

    expect(result).not.toBeNull()
    expect(result).toBe('https://github.com/favicon.ico')
  })

  it('should get the favicon correctly using the default strategy with buffer output', async () => {
    const result = await getFavicon('https://github.com', {
      strategies: ['default' as EStrategies],
      output: 'buffer'
    })

    expect(result).not.toBeNull()
  })

  it('should get the favicon correctly using the http strategy', async () => {
    const result = await getFavicon('https://github.com', {
      strategies: ['http' as EStrategies]
    })

    expect(result).not.toBeNull()
    expect(result).toBe('https://github.githubassets.com/favicons/favicon.svg')
  })

  it('should get the favicon correctly using the http strategy with buffer output', async () => {
    const result = await getFavicon('https://github.com', {
      strategies: ['http' as EStrategies],
      output: 'buffer'
    })

    expect(result).not.toBeNull()
  })

  it('should get the favicon correctly using the duckduckgo strategy', async () => {
    const result = await getFavicon('https://github.com', {
      strategies: ['duckduckgo' as EStrategies]
    })

    expect(result).not.toBeNull()
    expect(result).toBe(
      'https://icons.duckduckgo.com/ip3/https://github.com.ico'
    )
  })

  it('should get the favicon correctly using the duckduckgo strategy with buffer output', async () => {
    const result = await getFavicon('https://github.com', {
      strategies: ['duckduckgo' as EStrategies],
      output: 'buffer'
    })

    expect(result).not.toBeNull()
  })

  it('should get the favicon correctly using the google strategy', async () => {
    const result = await getFavicon('https://github.com', {
      strategies: ['google' as EStrategies]
    })

    expect(result).not.toBeNull()
    expect(result).toBe(
      'https://s2.googleusercontent.com/s2/favicons?domain=https://github.com'
    )
  })

  it('should get the favicon correctly using the google strategy with buffer output', async () => {
    const result = await getFavicon('https://github.com', {
      strategies: ['google' as EStrategies],
      output: 'buffer'
    })

    expect(result).not.toBeNull()
  })

  it('should not get the favicon correctly using unsupported strategy', async () => {
    const result = await getFavicon('https://github.com', {
      strategies: ['bing' as EStrategies]
    })

    expect(result).toBeNull()
  })

  it('should not get the favicon correctly using unsupported strategy with buffer output', async () => {
    const result = await getFavicon('https://github.com', {
      strategies: ['bing' as EStrategies],
      output: 'buffer'
    })

    expect(result).toBeNull()
  })

  it('should not get the favicon correctly because of bad URL', async () => {
    try {
      await getFavicon('nicelydone')
      // If the function doesn't throw an error, fail the test
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('The hostname provided is not a valid URL')
    }
  })

  it('should not get the favicon correctly because of bad URL with buffer output', async () => {
    try {
      await getFavicon('nicelydone', {
        output: 'buffer'
      })
      // If the function doesn't throw an error, fail the test
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('The hostname provided is not a valid URL')
    }
  })

  it('should handle fetch errors correctly with buffer output', async () => {
    fetchMock.mockReject(new Error('Fetch error'))

    const result = await getFavicon('https://github.com', {
      strategies: ['http' as EStrategies],
      output: 'buffer'
    })

    // Check that result is null because of fetch error
    expect(result).toBeNull()
  })
})
