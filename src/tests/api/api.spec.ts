import { test, expect, APIRequestContext, request } from '@playwright/test';

// Sample API URL
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

test('GET request to the API', async ({ request }: { request: APIRequestContext }) => {
  // Disable SSL verification
  const response = await request.get(API_URL, {
    // // Optional: if you want to add custom headers or settings
    // extraHTTPHeaders: {
    //   'Accept': 'application/json'
    // },
    // Disable SSL certificate validation
    ignoreHTTPSErrors: true
  });

  // Assert the status code
  expect(response.status()).toBe(200);

  // Assert the response body contains expected data
  const responseBody = await response.json();
  expect(responseBody).toBeInstanceOf(Array); // Should be an array of posts
});
