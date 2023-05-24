# Favicon Fetcher

`favicon-fetcher` is a utility to fetch a website's favicon by using multiple strategies (the favicon.ico method, the DuckDuckGo API method, and the Google API method).

## How to Use

1. Install the dependencies

```
npm install @hyperjumptech/favicon-fetcher
```

2. Use it in your code

```js
const { getFavicon } = require('@hyperjumptech/favicon-fetcher') // CommonJS
import { getFavicon } from '@hyperjumptech/favicon-fetcher' // ES6

const result1 = await getFavicon('https://www.google.com') // using all strategies
console.log(result1) // returns a binary

const options = {
  strategies: ['duckduckgo', 'default'], // use the DuckDuckGo API and default method
}

const result2 = await getFavicon('https://www.google.com', options) // use some strategies
console.log(result2) // returns a binary from either DuckDuckGo API or default method
```

## Options

| Options    | Type       | Description                                                                                                                                                                   | Default                               |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| strategies | `string[]` | Define the strategies that will be used to fetch the favicon. Each strategies will be run sequentially. Currently available strategies are: `default`, `duckduckgo`, `google` | `['default', 'duckduckgo', 'google']` |

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
