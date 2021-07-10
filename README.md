## The problem

Importing constants from a shared library breaks the working "out of the box" configuration for e2e tests.  Here is the error:

```
Error: Webpack Compilation Error
/Users/grumpus/code/halcyon/libs/common/src/lib/constants/index.ts 1:9
Module parse failed: Unexpected token (1:9)
File was processed with these loaders:
 * ../../node_modules/ts-loader/index.js
You may need an additional loader to handle the result of these loaders.
> export * as NavConstants from './nav.const';
|
 @ /Users/grumpus/code/halcyon/libs/common/src/lib/index.ts 1:0-28 1:0-28
 @ /Users/grumpus/code/halcyon/libs/common/src/index.ts
 @ ./src/integration/app.spec.ts
...
```

## How to reproduce

* create Nx repo: `npx --ignore-existing create-nx-workspace halcyon` (choose `empty`)
* add Next support: `yarn add @nrwl/next`
* generate Next app with e2e: `yarn nx g @nrwl/next:app garden`
* run e2e, notice it works: `yarn nx e2e garden-e2e`
* generate common lib: `yarn nx g lib common`
* export const from common lib using an alias, i.e. `export * as NavConstants from './nav.const';` 
* import into `apps/garden-e2e/src/integration/app.spec.ts` using common lib's path alias (i.e. `import { NavConstants } from '@halcyon/common';`)
* run e2e, notice it fails with webpack compilation error

OR

* pull this repo and run `yarn nx e2e garden-e2e`

## Notes

importing without the common lib's path alias also breaks things: 

```
import { NavConstants } from '../../../../libs/common/src'; // doesn't work, same error
```
 

