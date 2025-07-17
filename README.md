# QA Automation Engineer - Challenge

#  Description
This project contains automated tests using playwright to validate application funcionality

# Requirements
- Node.js (v18 or higher)
- npm

# Installation
```bash
npm install
```

# Configuration and Environments
- Environment variables are loaded from .env files like .env.dev or env.prod
- The environment is selected via the ENV variable (default=dev)
- BASE_URL is set in the .env file and is used as the base url for tests

# Running Tests (Default Configuration)
*Default configuration (environment: dev, parallel: 2 workers, browsers: chrome, firefox, safari)
```bash
npm run test:dev
```
or
```bash
npx playwright test
```

# Parallel Execution
- Tests run in parallel using 2 workers 
- Adjust the number of workers in playwright.config.js if needed
- Tests can be run with specific number of parallel worker:
```bash
npx playwright test --workers=1
```

# Browsers
- Tests run on 3 browsers (Chrome, Firefox and Safari)
- Adjust the browsers in playwright.config.js if needed
- Tests can be run with an specific browser. E.g. using firefox:
```bash
npx playwright test --project=firefox
```

# Reports
- Test report is generated inside playwright-report folder


**Author:** Sergio Silva 