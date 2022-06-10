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

If you need to build the code for this package, you just need to either run the `npm run build` command, or if you want to build it in watch mode, just run `npm run dev`.

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
