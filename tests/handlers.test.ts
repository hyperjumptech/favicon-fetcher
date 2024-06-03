import { Response } from 'node-fetch'
import { handleHttpStrategy, handleOtherStrategies } from '../src/handlers'
import fetchMock from 'jest-fetch-mock'
import { Buffer } from 'buffer'

fetchMock.enableMocks()

describe('handleHttpStrategy', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should return null if no icon is found', async () => {
    const response = new Response('<html><head></head><body></body></html>')
    const result = await handleHttpStrategy(
      response,
      'http://example.com',
      'url',
    )
    expect(result).toBeNull()
  })

  it('should return null if no head is found', async () => {
    const response = new Response('<html><body></body></html>')
    const result = await handleHttpStrategy(
      response,
      'http://example.com',
      'url',
    )
    expect(result).toBeNull()
  })

  it('should return icon URL for relative path', async () => {
    const response = new Response(
      '<html><head><link rel="icon" href="/favicon.ico"/></head><body></body></html>',
    )
    const result = await handleHttpStrategy(
      response,
      'http://example.com',
      'url',
    )
    expect(result).toBe('http://example.com/favicon.ico')
  })

  it('should return icon URL for absolute path', async () => {
    const response = new Response(
      '<html><head><link rel="icon" href="http://example.com/favicon.ico"/></head><body></body></html>',
    )
    const result = await handleHttpStrategy(
      response,
      'http://example.com',
      'url',
    )
    expect(result).toBe('http://example.com/favicon.ico')
  })
})

describe('handleOtherStrategies', () => {
  it('should return buffer for response', async () => {
    const arrayBuffer = new Uint8Array([1, 2, 3]).buffer
    const response = new Response(arrayBuffer)
    const result = await handleOtherStrategies(
      response,
      'http://example.com',
      'buffer',
    )

    expect(result).toEqual(Buffer.from(arrayBuffer))
  })

  it('should return URL for response', async () => {
    const response = new Response()
    const result = await handleOtherStrategies(
      response,
      'http://example.com',
      'url',
    )

    expect(result).toBe('http://example.com')
  })
})
