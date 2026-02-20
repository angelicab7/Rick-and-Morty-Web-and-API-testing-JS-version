import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home-page";
import { CharactersPage } from "./pages/characters-page";

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
});

test("Verify Characters List is displayed", async ({ page }) => {
  const homePage = new HomePage(page);
  const charactersPage = new CharactersPage(page);

  await expect(homePage.funFactsHeading).toBeVisible();
  await expect(page).toHaveScreenshot("home-page.png");
  await homePage.navigateToCharacters();
  await expect(charactersPage.heading).toBeVisible();
  await expect(charactersPage.characterCards.first()).toBeVisible();
});
