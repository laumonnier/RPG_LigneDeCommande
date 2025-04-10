import { Character } from "./Character";
import { Inventory } from "./Inventory";
import { MonsterRoom } from "./MonsterRoom";
import { ChestRoom } from "./ChestRoom";
import { BossRoom } from "./BossRoom";
import { Room } from "./Room";
import { Menu } from "./Menu";

/**
 * Manages the sequence of rooms in a dungeon and the exploration process.
 */
export class RoomManager {
  private rooms: Room[] = [];

  /**
   * Initializes the RoomManager with a predefined sequence of rooms.
   */
  constructor() {
    this.rooms = [
      new MonsterRoom(),
      new ChestRoom(),
      new MonsterRoom(),
      new ChestRoom(),
      new BossRoom(),
    ];
  }

  /**
   * Explores each room in the dungeon with the given party of characters and inventory.
   * If all characters in the party are knocked out, the exploration ends with a game over.
   * If all rooms are successfully explored, the dungeon is completed.
   * @param party - The party of characters exploring the dungeon.
   * @param inventory - The inventory used during the exploration.
   */
  async explore(party: Character[], inventory: Inventory) {
    let roomIndex = 0;

    while (roomIndex < this.rooms.length) {
      console.log(`\n➡ Room ${roomIndex + 1}!`);

      const room = this.rooms[roomIndex];

      await room.enter(party, inventory);

      if (party.every((p) => p.isKO())) {
        console.log("❌ All adventurers are dead. Game Over!");
        return;
      }

      if (roomIndex < this.rooms.length - 1) {
        const menu = new Menu("What would you like to do next?", [
          "Continue to the next room",
          "Check party status",
          "Use items",
        ]);

        menu.display();
        const choice = menu.getResponse();

        switch (choice) {
          case "Continue to the next room":
            roomIndex++;
            break;

          case "Check party status":
            this.displayPartyStatus(party);
            break;

          case "Use items":
            await this.useInventoryItems(party, inventory);
            break;
        }
      } else {
        roomIndex++;
      }
    }

    console.log("🏆 Congratulations! You have completed the dungeon!");
  }

  /**
   * Displays the status of all party members
   * @param party - The party of characters
   */
  private displayPartyStatus(party: Character[]): void {
    console.log("\n=== Party Status ===");

    party.forEach((character) => {
      console.log(
        `- ${character.name}: Health ${character.currentHealth}/${character.maxHealth}, Attack ${character.attack}, Defense ${character.defense}`
      );
    });

    console.log("===================");
  }

  /**
   * Allows the player to use items from the inventory
   * @param party - The party of characters
   * @param inventory - The inventory to use
   */
  private async useInventoryItems(
    party: Character[],
    inventory: Inventory
  ): Promise<void> {
    const items = inventory.getItems();

    if (items.size === 0) {
      console.log("Your inventory is empty!");
      return;
    }

    console.log("\n=== Inventory ===");
    for (const [item, quantity] of items) {
      console.log(`${item} x${quantity}`);
    }

    const itemsArray = Array.from(items.keys());
    const itemOptions = itemsArray.map(
      (item) => `${item} (x${items.get(item)})`
    );
    itemOptions.push("Back");

    const menu = new Menu("Choose an item to use:", itemOptions);
    menu.display();
    const choice = menu.getResponse();

    if (choice === "Back") {
      return;
    }

    const selectedItem = itemsArray[itemOptions.indexOf(choice)];

    const characterOptions = party.map(
      (character) =>
        `${character.name} (HP: ${character.currentHealth}/${character.maxHealth})`
    );

    const characterMenu = new Menu("Use on which character?", characterOptions);
    characterMenu.display();
    const characterChoice = characterMenu.getResponse();
    const characterIndex = characterOptions.indexOf(characterChoice);
    const targetCharacter = party[characterIndex];

    if (selectedItem.includes("Potion")) {
      const healPercentage = 20;
      targetCharacter.heal(healPercentage);
      console.log(
        `${targetCharacter.name} uses ${selectedItem} and recovers ${healPercentage}% of their HP!`
      );
      inventory.removeItem(selectedItem, 1);
    } else if (selectedItem.includes("Ether")) {
      const manaHealPercentage = 30;
      // TODO: Add mana healing
      console.log(
        `${targetCharacter.name} uses ${selectedItem} and recovers ${manaHealPercentage}% of their MP!`
      );
      inventory.removeItem(selectedItem, 1);
    } else if (selectedItem === "PieceOfStar") {
      if (!targetCharacter.isAlive) {
        console.log(
          `${targetCharacter.name} est ressuscité avec un Morceau d'étoile ✨!`
        );
        targetCharacter.resurrect(20);
      } else {
        console.log(
          `${targetCharacter.name} utilise un Morceau d'étoile ✨ et récupère 50% de ses PV!`
        );
        targetCharacter.heal(50);
      }
      inventory.removeItem(selectedItem, 1);
    } else if (selectedItem === "HalfStar") {
      if (!targetCharacter.isAlive) {
        console.log(
          `${targetCharacter.name} est ressuscité pleinement avec une Demi-étoile 🌟!`
        );
        targetCharacter.resurrect(100);
      } else {
        console.log(
          `${targetCharacter.name} utilise une Demi-étoile 🌟 et récupère tous ses PV!`
        );
        const missingPercentage =
          ((targetCharacter.maxHealth - targetCharacter.currentHealth) /
            targetCharacter.maxHealth) *
          100;
        targetCharacter.heal(missingPercentage);
      }
      inventory.removeItem(selectedItem, 1);
    } else {
      console.log(`${targetCharacter.name} utilise ${selectedItem}!`);
      inventory.removeItem(selectedItem, 1);
    }

    if (inventory.getItems().size > 0) {
      const useAnother = new Menu("Use another item?", ["Yes", "No"]);
      useAnother.display();
      const useAnotherChoice = useAnother.getResponse();

      if (useAnotherChoice === "Yes") {
        await this.useInventoryItems(party, inventory);
      }
    }
  }

  /**
   * Delays the execution for a specified number of milliseconds.
   * @param ms - The number of milliseconds to delay.
   * @returns A promise that resolves after the specified delay.
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}