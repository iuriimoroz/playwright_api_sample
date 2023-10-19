import { test, expect } from '@playwright/test';
import { usersSchema } from '../json-schemas/usersSchema';
import { userSchema } from '../json-schemas/userSchema';
import { resourcesSchema } from '../json-schemas/resourcesSchema';
import { resourceSchema } from '../json-schemas/resourceSchema';

test('Get list of users on default page', async ({ request }) => {
    const response = await request.get("/api/users");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(() => usersSchema.parse(responseBody)).not.toThrow();
});
test('Get list of users on second page', async ({ request }) => {
    const response = await request.get("/api/users?page=2");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(() => usersSchema.parse(responseBody)).not.toThrow();
    expect(responseBody.page).toBe(2);
});
test('Get single user', async ({ request }) => {
    const response = await request.get("/api/users/2");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(() => userSchema.parse(responseBody)).not.toThrow();
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.email).toBe('janet.weaver@reqres.in');
    expect(responseBody.data.first_name).toBe('Janet');
    expect(responseBody.data.last_name).toBe('Weaver');
});
test('Single user not found', async ({ request }) => {
    const response = await request.get("/api/users/23");
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
});
test('Get list of resourses on default page', async ({ request }) => {
    const response = await request.get("/api/unknown");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(() => resourcesSchema.parse(responseBody)).not.toThrow();
});
test('Get single resource', async ({ request }) => {
    const response = await request.get("/api/unknown/2");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(() => resourceSchema.parse(responseBody)).not.toThrow();
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.name).toBe('fuchsia rose');
    expect(responseBody.data.year).toBe(2001);
    expect(responseBody.data.color).toBe('#C74375');
    expect(responseBody.data.pantone_value).toBe('17-2031');
});
test('Single resource not found', async ({ request }) => {
    const response = await request.get("/api/uncnown/23");
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
});
test('Create a user', async ({ request }) => {
    const response = await request.post("/api/users", {
        data: {
          name: 'Morpheus',
          job: 'Leader',
        }
});
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('Morpheus');
    expect(responseBody.job).toBe('Leader');
});
test('Update the user', async ({ request }) => {
    const response = await request.put("/api/users/2", {
        data: {
          name: 'Morpheus',
          job: 'Zion resident',
        }
});
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('Morpheus');
    expect(responseBody.job).toBe('Zion resident');
});
test('Update the user again', async ({ request }) => {
    const response = await request.patch("/api/users/2", {
        data: {
          name: 'Morpheus',
          job: 'Zion resident 1',
        }
});
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('Morpheus');
    expect(responseBody.job).toBe('Zion resident 1');
});
test('Delete the user', async ({ request }) => {
    const response = await request.delete("/api/users/2");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(204);
});
test('Register user', async ({ request }) => {
    const response = await request.post("/api/register", {
        data: {
          email: 'eve.holt@reqres.in',
          password: 'pistol',
        }
});
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBeGreaterThan(0);
    expect(responseBody.token).toBeDefined();
});
test('Register user unsuccessful', async ({ request }) => {
    const response = await request.post("/api/register", {
        data: {
          email: 'eve.holt@reqres.in',
        }
});
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.error).toBe('Missing password');
});
test('Login user', async ({ request }) => {
    const response = await request.post("/api/login", {
        data: {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka',
        }
});
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.token).toBeDefined();
});
test('Login user unsuccessful', async ({ request }) => {
    const response = await request.post("/api/login", {
        data: {
          email: 'eve.holt@reqres.in',
        }
});
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.error).toBe('Missing password');
});
test('Delayed response', async ({ request }) => {
    const response = await request.get("/api/users?delay=3");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(() => usersSchema.parse(responseBody)).not.toThrow();
});
