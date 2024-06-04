# Favicon Fetcher

`favicon-fetcher` is a utility to fetch a website's favicon by using multiple strategies. By default, it will fetch the `href` attribute of the first `<link rel="icon">` element in the target's HTML file.

## How to Use

1. Install the dependencies

```bash
npm install @hyperjumptech/favicon-fetcher
```

2. Use it in your code

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

## Options

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
