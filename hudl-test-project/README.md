# Hudl Automation Project
Welcome to the Huld Automation Project!!

This Test automation suite is written using Playwright with TypeScript and covers basic login functionality for two user types, i.e, Coach and Fan.

### Here are the Prerequisites that are required to run this project
- Node.js 16+
- Chrome browser
- VS Code with Playwright Test for VSCode (extension)
- Playwright

### How to install Playwright

```bash
npm init playwright@latest
```

## Environment Setup
Please ensure you do the following before running the test suite.

1. Make a Copy of the `.env.example` file and create a new `.env`
2. Replace the below fake credentials with real Hudl Team/Coach & Fan credentials

```bash
HUDL_COACH_EMAIL="coach-test-account@example.com"
HUDL_COACH_PASSWORD="coach-test-password"

HUDL_FAN_EMAIL="fan-test-account@example.com"
HUDL_FAN_PASSWORD="fan-test-password"
```

## Running Tests

```bash
# Run all tests (runs in headless mode)
npx playwright test

# Run specific test
npx playwright test <filename>

# Run all tests in headed mode (visible browser)
npx playwright test --headed

# View test report
npx playwright show-report
```
