import fs from 'node:fs'
import { type EStrategies, getFavicon } from './get-favicon'

interface TCLIParams {
  target: string
  strategies?: string
  output?: 'url' | 'buffer'
}

export function handleCLI({ target, strategies, output }: TCLIParams): void {
  if (!target) {
    throw new Error('No target URL specified!')
  }

  if (!strategies) {
    void getFavicon(target, { output: output ?? 'url' }).then(result => {
      if (output === 'url') {
        console.info(result)
      } else {
        // Write the buffer to a file
        fs.writeFileSync('favicon.ico', result)
        console.info('Favicon saved to favicon.ico')
      }
    })
  } else {
    void getFavicon(target, {
      strategies: strategies.split(',') as EStrategies[],
      output: output ?? 'url'
    }).then(result => {
      if (output === 'url') {
        console.info(result)
      } else {
        // Write the buffer to a file
        fs.writeFileSync('favicon.ico', result)
        console.info('Favicon saved to favicon.ico')
      }
    })
  }
}
