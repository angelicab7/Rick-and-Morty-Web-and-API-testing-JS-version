import { test, expect } from "@playwright/test";

const baseURL = "https://rickandmortyapi.com/api";
const characterId = 2;
const name = "rick";
const status = "alive";

test.describe("Rick and Morty API Tests - Characters", () => {
  test("get characters healthcheck", async ({ request }) => {
    const response = await request.get(`${baseURL}/character/`);
    expect(response.status()).toBe(200);
  });

  test("get single character", async ({ request }) => {
    const response = await request.get(`${baseURL}/character/${characterId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(characterId);
    console.log(responseBody);
  });

  test("get multiple characters", async ({ request }) => {
    const response = await request.get(`${baseURL}/character/[1,2,3]`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBe(3);
  });

  test("filter characters", async ({ request }) => {
    const response = await request.get(`${baseURL}/character/`, {
      params: {
        name: name,
        status: status,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.results.length).toBeGreaterThan(0);
    expect(responseBody.results[0].name.toLowerCase()).toContain(name);
    expect(responseBody.results[0].status.toLowerCase()).toBe(status);
  });
});
