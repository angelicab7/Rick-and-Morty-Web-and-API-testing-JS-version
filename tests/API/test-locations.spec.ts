import { test, expect } from "@playwright/test";

const baseURL = "https://rickandmortyapi.com/api";
const locationId = 1;
const locationType = "Planet";

test.describe("Rick and Morty API Tests - Locations", () => {
  test("get location healthcheck", async ({ request }) => {
    const response = await request.get(`${baseURL}/location/`);
    expect(response.status()).toBe(200);
  });

  test("get single location", async ({ request }) => {
    const response = await request.get(`${baseURL}/location/${locationId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(locationId);
    console.log(responseBody);
  });

  test("get multiple locations", async ({ request }) => {
    const response = await request.get(`${baseURL}/location/[1,2,3]`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBe(3);
    console.log(responseBody);
  });

  test("filter locations", async ({ request }) => {
    const response = await request.get(`${baseURL}/location/`, {
      params: {
        type: locationType,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.results.length).toBeGreaterThan(0);
    expect(responseBody.results[0].type.toLowerCase()).toContain(
      locationType.toLowerCase(),
    );
    console.log(responseBody);
  });
});
