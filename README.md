<!-- preset:npm -->
<!-- project-name:adblocker-detect -->
<!-- project-title:AdBlocker Detect Script -->
# AdBlocker Detect Script

<!-- index-start -->
## Index

- [Development](#development)
- [How to use it](#how-to-use-it)
  - [A global variable](#a-global-variable)
- [How to publish an npm package](#how-to-publish-an-npm-package)
  - [Before you start](#before-you-start)
  - [Login into npm](#login-into-npm)
  - [Publish the package](#publish-the-package)
    - [Multiple npm accounts](#multiple-npm-accounts)
- [Maintain this docs](#maintain-this-docs)
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

<!-- deployment/npm-start -->
## How to publish an npm package

### Before you start

Before you can publish anything, you must have an npm account associated with your Hubspot account.
You also must be included in the `hs-web-team` organization.
We also assume that you have Node.js and `npm` installed, possibly to a stable version at the very least.

### Login into npm

Once your account is setup, you need to login in `npm`, and this is as simple as running:

```bash
npm login
```

### Publish the package

Once you have logged in successfully, you must cd into the project root folder, then run the following commands:

```bash
# If you have tests, run them before publishing anything
npm test

# If you have a linter script, run it before publishing anything
npm run eslint

# Check if the package can be published
npm publish --dry-run

# Publish the package to npmjs.com
npm publish
```

#### Multiple npm accounts

If you have a personal account, what you can do is to login with npm with the Hubspot account, copy the `.npmrc` file into the project folder, and you can find it in your home folder.
When you will publish the package, the npm command will look at that file first, and fallback to the global file if not found.

<!-- deployment/npm-end -->
<!-- wt-docs/maintain-docs-start -->
## Maintain this docs

This docs are maintained by the WebTeam Documentation CLI, to keep this document up to date, you can run `npx @hs-web-team/wt-docs update README.md`.
<!-- wt-docs/maintain-docs-end -->

