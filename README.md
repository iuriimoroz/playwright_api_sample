# Playwright API Testing Sample

This repository contains test scripts for API testing using [Playwright](https://playwright.dev/), a testing framework that automates web interactions. The tests are designed to verify various API endpoints with GET, POST, PUT, PATCH, and DELETE requests, covering common REST API functionalities such as user registration, login, resource fetching, and error handling.

## Features

- Automated API tests using Playwright's request capabilities.
- JSON schema validation using Zod (or similar) for API responses.
- Comprehensive tests for user and resource-related endpoints.
- Supports CRUD operations (Create, Read, Update, Delete) on users and resources.
- Includes tests for error handling (e.g., non-existent resources, missing parameters).
- Tests delayed responses to ensure API handles them correctly.

## API Endpoints Tested

1. **Users Endpoints**:
   - Get a list of users.
   - Get a specific user by ID.
   - Create, update, and delete users.
   - User registration and login.

2. **Resources Endpoints**:
   - Get a list of resources.
   - Get a specific resource by ID.

3. **Error Handling**:
   - Test for non-existent users and resources.
   - Handle unsuccessful registration and login attempts.

## Prerequisites

- Node.js (version 16 or higher)
- Playwright (`@playwright/test`)
- Zod (for JSON schema validation)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iuriimoroz/playwright_api_sample.git
   ```
2. Navigate to the project directory:
   ```bash
   cd playwright_api_sample
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
## Running the Tests
To run all tests, use the following command:
```bash
npx playwright test
```
You can also run individual tests by specifying the test file path:
```bash
npx playwright test tests/api.test.ts
```
## Folder Structure
- /tests: Contains the API test scripts.
- /json-schemas: JSON schema definitions for validating API responses.

## Example Test
```bash
test('Get list of users on default page', async ({ request }) => {
    const response = await request.get("/api/users");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(() => usersSchema.parse(responseBody)).not.toThrow();
});
```
## License
This project is licensed under the MIT License. See the LICENSE file for more details.
