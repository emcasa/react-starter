# Tests

This project is set up for both node and browser environments.
Test cases run on either or both environments depending on the test file's
extension.

| Extension       | Environment
| --------------: | ------------------------------------------------------------------
| `.nodespec.js`  | Runs on node environment. Use for code that only runs on the server
| `.webspec.js`   | Runs on browser environment. Use for code that only runs on the browser
| `.spec.js`      | Runs on both environments. Use this for testing isomorphic modules

Set up files for each environment can be found in the `/setup` folders. Files
there are suffixed by `.env.js` for jest's `setupFiles` or `.setup.js` for
`setupFilesAfterEnv`.

See jest's documentation for more info.
https://jestjs.io/docs/en/configuration/#setupfiles-array

## Structure

```
.
├── fixtures/            -- Static mocks and such
├── helpers/             -- Helpers for running tests
├── setup/               -- Setup files
├── src/                 -- Tests with same dir structure as /src
├── web.config.json      -- Jest config for browser environment
├── node.config.json     -- Jest config for node environment
└── README.md
```
