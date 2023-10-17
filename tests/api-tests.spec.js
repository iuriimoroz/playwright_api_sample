import { test, expect } from '@playwright/test';

test('Get list of users on default page', async ({ request }) => {
    const response = await request.get("/api/users");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});
