## The problem

Exporting all with a name (i.e. `export * as ... from '...';`) from a shared library breaks the working "out of the box" configuration for e2e tests.  Here is the error:

```
Oops...we found an error preparing this test file:

  src/integration/app.spec.ts

The error was:

Error: Webpack Compilation Error
/Users/grumpus/code/halcyon/libs/common/src/lib/index.ts 1:9
Module parse failed: Unexpected token (1:9)
File was processed with these loaders:
 * ../../node_modules/ts-loader/index.js
You may need an additional loader to handle the result of these loaders.
> export * as NavConstants from './nav.const';
|
 @ /Users/grumpus/code/halcyon/libs/common/src/index.ts 1:0-22 1:0-22
 @ ./src/integration/app.spec.ts
...
```

## How to reproduce

* create Nx repo: `npx --ignore-existing create-nx-workspace halcyon` (choose `empty`)
* add Next support: `yarn add @nrwl/next`
* generate Next app with e2e: `yarn nx g @nrwl/next:app garden`
* run e2e, notice it works: `yarn nx e2e garden-e2e`
* generate common lib: `yarn nx g lib common`
* export '*' from common lib and rename, i.e. `export * as NavConstants from './nav.const';` 
* import into `apps/garden-e2e/src/integration/app.spec.ts`.
* run e2e, notice it fails with the above webpack compilation error

OR

* pull this repo and run `yarn nx e2e garden-e2e`

## Notes

Importing without the `as` typescript keyword works.  So I wonder if it has something to do with the `ts-loader` it defaults to using.

declare:
```ts
// in libs/common/src/lib/nav.const.ts
export const NAV_ITEMS = [
  'Home',
  'Products',
  'About',
  'Contact'
];
```

export:
```ts
// in libs/common/src/lib/index.ts
export * from './nav.const';
```

import:
```ts
// in apps/garden-e2e/src/integration/app.spec.ts
import { NAV_ITEMS } from '@halcyon/common';
```
