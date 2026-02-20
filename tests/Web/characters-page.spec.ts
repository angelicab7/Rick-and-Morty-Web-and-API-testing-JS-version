import { test, expect } from "@playwright/test";
import { CharactersPage } from "./pages/characters-page";

test("Verify and Filter Characters", async ({ page }) => {
  const charactersPage = new CharactersPage(page);
  await charactersPage.goToCharactersPage();
  await expect(charactersPage.heading).toBeVisible();
  await expect(page).toHaveScreenshot("characters-page.png");
  await expect(charactersPage.characterCardColumns).not.toHaveCount(0);
  await charactersPage.filterDropdown.selectOption("Order A-Z");
  await charactersPage.WaitToLoadAndCheckCharactersOrder();
  await charactersPage.selectAnimalsOption();
  await charactersPage.VerifyCategoryDisplayed();
  await charactersPage.searchCharacterByName("Izzy");
  await charactersPage.VerifyCharacterIsDisplayed("Izzy");
});
