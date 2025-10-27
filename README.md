# Welcome to the Hudl Refactor Test Project #

This is part 2 of the initial project i.e, https://github.com/nihalalfred/hudl-test-project, which has been reviewed and refactored to enhance the overall coding structure.

Some of the things done as part of this refactored project are:
- **Fixed the assertio pattern**: `expect().toBeVisible()` instead of the earlier `.isVisible()`
- **Enhanced page loading**: `{waitUntil:'networkidle'}` or `.waitForLoadState('networkidle')`
- **Better Organisation**: use of test `tags` for better test management & clear seperation of concerns `test.describe`
-**Added Content verification**: `toContain()`, `textContent()`
- **Removed Anti-pattern**: ❌ await page.waitForTimeout(1000) 
- **Added a validation function** `validateEnvironmentVariables()` to check if the required environment variables are available in `beforeAll`
- **Updated page objects** with `new helper methods`
- **Removed code duplication** across tests
- Added **missing error handling**
- Added **Test Data Utility** `const testData = []`
- Removed **unused imports**

You can view all these changes here: https://github.com/nihalalfred/hudl-refactor-test-project/tree/main/hudl-test-project

