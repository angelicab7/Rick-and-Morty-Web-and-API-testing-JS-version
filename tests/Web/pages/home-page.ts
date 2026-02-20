import { type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly funFactsHeading: Locator;
  readonly charactersLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.funFactsHeading = page.getByRole("heading", { name: "Fun Facts" });
    this.charactersLink = page.getByRole("link", { name: "Characters" });
  }

  async goToHomePage() {
    await this.page.goto(
      "https://angelicab7.github.io/BOG001-data-lovers/index.html",
    );
  }

  async navigateToCharacters() {
    await this.charactersLink.click();
  }
}
