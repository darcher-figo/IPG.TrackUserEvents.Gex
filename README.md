# <abbr title="Independence Pet Group">IPG</abbr> event tracking library

## Table of contents

- [Commands](#cli-commands)
- [Nodes](#misc-notes)

### Resources

- [GA4 Hardcoded to GTM](https://www.upbuild.io/blog/seamlessly-switch-from-hardcoded-analytics-to-gtm/) - Configure GA4 to execute with GTM script snippet (only).

---

## CLI Commands

Collection of callable Command Line Interface (CLI) scripts

| CMD       | Description                                    |
| :-------- | :--------------------------------------------- |
| `nvm use` | loads the expected `node` version for library. |

---

## Misc notes

- We should be utilizing environment variables (.env), install using: `npm i -D dotenv`.

  - [_dotenv_](https://www.npmjs.com/package/dotenv)
    ```plaintext
      GTM_HOST_URL=https://www.googletagmanager.com
      GTM_UUID_TOKEN=GTM-#######
      GA4_UUID_TOKEN=G-##########
    ```

- Prefetch **GTM** origin host DNS, should be `firstChild` in `<head />`

  ```html
  <link rel="dns-prefetch" href="%GTM_HOST_URL%" />
  ```

- Initialize **GTM**, ensure this is the `lastChild` in `<head />`

  ```html
  <script async src="%GTM_HOST_URL%/gtag/js?id=%GTM_UUID_TOKEN%"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", process.env.GTM_UUID_TOKEN);
  </script>
  ```

- NonJS accommodation, should be `firstChild` in `<body />`
  ```html
  <noscript>
    <iframe
      src="%GTM_HOST_URL%/ns.html?id=%GTM_UUID_TOKEN%"
      style="display:none;height:0;width:0;visibility:hidden"
    ></iframe>
  </noscript>
  ```

---

## Testing (Jest)

> node_modules/.bin/jest --verbose --coverage .

 PASS  src/track-events.test.ts<br />
  runs trackPageView tracking method<br />
    ✓ should emit a page viewed event (1 ms)<br />
    ✓ should emit an error in console (1 ms)<br />
  runs dispatchEvent tracking method<br />
    ✓ should emit an action event<br />

| File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| ------------------- | ------- | -------- | ------- | ------- | ----------------- |
| src/track-events.ts | 100     | 100      | 100     | 100     | <small>--</small>

| name | status | #
| :--  | :--- | :--
| Test Suites | <mark>100% passed</mark> | 1 of 1 passed
| Tests | <mark>100% passed</mark> | 3 of 3 passing
| Time Elapsed | `0.771 s` |