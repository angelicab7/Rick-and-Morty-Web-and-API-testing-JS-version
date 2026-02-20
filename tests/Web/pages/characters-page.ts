import { expect, type Locator, type Page } from "@playwright/test";

export class CharactersPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly filterDropdown: Locator;
  readonly characterCards: Locator;
  readonly characters_sorted: Locator;
  readonly characterCardColumns: Locator;
  readonly searchInput: Locator;
  readonly speciesDropdown: Locator;
  readonly categoryDisplayed: Locator;
  readonly animalCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Characters" });
    this.filterDropdown = page.locator("#filter-input-order");
    this.characterCards = page.locator(".card-container");
    this.characters_sorted = page.getByText("Abadango Cluster Princess");
    this.characterCardColumns = page.locator("#characters-container > .column");
    this.searchInput = page.locator("#searchIn");
    this.speciesDropdown = page.locator("#filter-input-species");
    this.categoryDisplayed = page
      .locator(".card-back")
      .filter({ hasText: "Specie: Animal" });
    this.animalCard = page.getByText("Izzy");
  }

  async goToCharactersPage() {
    await this.page.goto(
      "https://angelicab7.github.io/BOG001-data-lovers/characters.html",
    );
  }

  async WaitToLoadAndCheckCharactersOrder() {
    await this.characterCards.first().waitFor({ state: "visible" });
    await expect(this.characters_sorted).toBeVisible();
  }

  async selectAnimalsOption() {
    await this.speciesDropdown.selectOption("Animal");
  }

  async VerifyCategoryDisplayed() {
    await this.characterCards.first().click();
    await expect(this.categoryDisplayed.first()).toBeVisible();
  }
  async searchCharacterByName(name: string) {
    await this.searchInput.fill(name);
  }

  async VerifyCharacterIsDisplayed(name: string) {
    await expect(this.page.getByRole("heading", { name: name })).toBeVisible();
  }
}
