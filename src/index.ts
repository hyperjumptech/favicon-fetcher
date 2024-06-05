import { handleCLI } from './cli'
import minimist from 'minimist'

// Check if the script is being run directly (CLI mode)
if (require.main === module) {
  const argv = minimist(process.argv.slice(2)) // Remove script name and node path
  const target = argv.url || argv.u
  const strategies = argv.strategies || argv.s
  const output = argv.output || argv.o

  handleCLI({
    target: target || '',
    strategies,
    output
  })
}

// Export getFavicon for external usage (module mode)
export { getFavicon } from './get-favicon'
