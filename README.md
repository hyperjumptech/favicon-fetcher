# Favicon Fetcher

`favicon-fetcher` is a utility to fetch a website's favicon by using multiple strategies. By default, it will fetch the `href` attribute of the first `<link rel="icon">` element in the target's HTML file.

## How to Use

1. Command-Line Interface (CLI)

   You can use favicon-fetcher as a command-line tool to fetch favicons directly from the terminal using NPM.

   `npx @hyperjumptech/favicon-fetcher -u URL [-s strategies[,separated],...]`

   Options:

   - -u, --url: The URL of the website for which you want to fetch the favicon. (Required)
   - -s, --strategies: A comma-separated list of strategies to use for fetching the favicon. Available strategies are:
     - http: Fetches the favicon from the target website's HTML.
     - duckduckgo: Uses the DuckDuckGo API to search for the favicon.
     - google: Uses the Google Search API (unofficial) to search for the favicon.
     - default: The default strategy, which fetches the favicon from the target website's HTML.
   - -o, --output: The output format of the fetched favicon. Can be either url or buffer.
     - url: Returns the favicon URL (default).
     - buffer: Saves the favicon image data to a `favicon.ico` file

2. Use it in your code

   a. Install as dependencies

   ```bash
   npm install @hyperjumptech/favicon-fetcher
   ```

   b. Import the function

   ```js
   const { getFavicon, EStrategies } = require('@hyperjumptech/favicon-fetcher') // CommonJS
   import { getFavicon, EStrategies } from '@hyperjumptech/favicon-fetcher' // ES6

   const result1 = await getFavicon('https://www.google.com') // using all strategies
   console.log(result1) // returns a binary or a URL

   const options = {
     strategies: [EStrategies.duckduckgo, EStrategies.default], // use the DuckDuckGo API and default method
     output: 'url' // can be 'url' or 'buffer'
   }

   const result2 = await getFavicon('https://www.google.com', options) // use some strategies
   console.log(result2) // returns a binary or URL from either DuckDuckGo API or default method
   ```

   | Options    | Type       | Description                                                                                                                                                                                                                           | Default                                       |
   | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
   | strategies | `string[]` | Define the strategies that will be used to fetch the favicon. Each strategy will be run sequentially. Currently available strategies are: `http`, `duckduckgo`, `google`, and `default`. Strategies defined will be run sequentially. | `['http', 'duckduckgo', 'google', 'default']` |
   | output     | `string`   | Define the output format of the fetched favicon. Can be either `url` or `buffer`. URL will return the favicon URL, buffer will return the image of the favicon                                                                        | `'url'`                                       |

## Contributing

`favicon-fetcher` is a Node.js application written in TypeScript.
It was developed on **node v16 (LTS)**, and **npm v8**.

To start developing, clone this repository, then install the dependencies:

```bash
git clone git@github.com:hyperjumptech/favicon-fetcher.git
npm ci
```

To keep the formatting consistent, run the following command to format the source code:

```bash
npm run format
```

Finally you can also run `npm run test` to prevent regression.

Once you have made the changes, open a Pull Request and explain the issue your change will fix or the feature your change will add.

## Discussions

If you need help, want to give feedback, or have a great idea to improve Favicon Fetcher, get involved! Let us know in the [Github discussions](https://github.com/hyperjumptech/favicon-fetcher/discussions).

Please abide by the [Contributor's Code of Conduct](CODE_OF_CONDUCTS.md)

## License

[MIT](./LICENSE.txt) License.
