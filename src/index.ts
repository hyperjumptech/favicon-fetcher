import minimist from 'minimist'
import fs from 'node:fs'
import { getFavicon } from './get-favicon'

function handleCLI(): void {
  const argv = minimist(process.argv.slice(2)) // Remove script name and node path
  const target = argv.url || argv.u
  const strategies = argv.strategies || argv.s
  const output = argv.output || argv.o

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
      process.exit(0)
    })
  } else {
    void getFavicon(target, {
      strategies: strategies.split(','),
      output: output ?? 'url'
    }).then(result => {
      if (output === 'url') {
        console.info(result)
      } else {
        // Write the buffer to a file
        fs.writeFileSync('favicon.ico', result)
        console.info('Favicon saved to favicon.ico')
      }
      process.exit(0)
    })
  }
}

// Check if the script is being run directly (CLI mode)
if (require.main === module) {
  handleCLI()
}

// Export getFavicon for external usage (module mode)
export { getFavicon } from './get-favicon'
