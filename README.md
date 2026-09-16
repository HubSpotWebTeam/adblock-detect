<!-- preset:npm -->
<!-- project-name:adblocker-detect -->
<!-- project-title:AdBlocker Detect Script -->
# AdBlocker Detect Script

<!-- index-start -->
## Index

- [Development](#development)
- [How to use it](#how-to-use-it)
  - [A global variable](#a-global-variable)
<!-- index-end -->
## Development

This package requires **Node.js 22 or newer**. It is built with [Vite](https://vite.dev/) (library mode) and tested with [Vitest](https://vitest.dev/).

- `npm run build` — build the package (outputs ESM, CJS and type declarations to `dist/`)
- `npm run dev` — build in watch mode
- `npm run test` — run the test suite (`npm run test:watch` for watch mode)
- `npm run lint` — lint the source
- `npm run typecheck` — type-check without emitting

## How to use it

First thing is to install the package, as a dependency of your project.

```bash
npm install --save @hs-web-team/adblocker-detect
```

Once installed you need to simply import the `checkAdblock` function in your module. Here an example:

```javascript
import { checkAdblock } from '@hs-web-team/adblocker-detect';

/**
 * Checks the various strategies to detect an AdBlocker
 */
const hasAdBlockerWrapper = async () => {
  const adblocker = await checkAdblock();
  if (adblocker) {
    const adblockerElement = document.createElement('div');
    adblockerElement.id = 'adblocker-detected';
    adblockerElement.innerHTML = `
      <div class="adblocker-detected">
        <h2>Adblocker detected</h2>
        <p>
          Your browser is blocking ads.
        </p>
      </div>
    `;
    document.body.appendChild(adblockerElement);
  }
};

hasAdBlockerWrapper();
```

And that's it, you are good to go!

### A global variable

Once called for the first time, a global variable is created, which is used to store the state of the results of the checks. You can invoke the state by calling `window.hs_hasAdBlocker`.
