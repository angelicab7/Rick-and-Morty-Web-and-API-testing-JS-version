import { test, expect } from "@playwright/test";

const baseURL = "https://rickandmortyapi.com/api";
const episodeId = 28;
const episodeName = "Pilot";

test.describe("Rick and Morty API Tests - Episodes", () => {
  test("get episode healthcheck", async ({ request }) => {
    const response = await request.get(`${baseURL}/episode/`);
    expect(response.status()).toBe(200);
  });

  test("get single episode", async ({ request }) => {
    const response = await request.get(`${baseURL}/episode/${episodeId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(episodeId);
    console.log(responseBody);
  });
});

test("get multiple episodes", async ({ request }) => {
  const response = await request.get(`${baseURL}/episode/[1,2,3]`);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBeTruthy();
  expect(responseBody.length).toBe(3);
  console.log(responseBody);
});

test("filter episodes", async ({ request }) => {
  const response = await request.get(`${baseURL}/episode/`, {
    params: {
      name: episodeName,
    },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.results.length).toBeGreaterThan(0);
  expect(responseBody.results[0].name.toLowerCase()).toContain(
    episodeName.toLowerCase(),
  );
  console.log(responseBody);
});
