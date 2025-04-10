import { Character } from "./Character";
import { Inventory } from "./Inventory";

/**
 * Represents a Thief character in the RPG game.
 * Inherits from the Character class.
 */
export class Thief extends Character {
  private gameInventory: Inventory | null = null;

  /**
   * Creates a new Thief with name and max health
   * @param name - The name of the Thief
   * @param maxHealth - The maximum health of the Thief
   */
  constructor(name: string) {
    const maxHealth = 120;
    const attack = 15;
    const defense = 10;
    const speed = 30;
    super(name, maxHealth, attack, defense, speed);
  }

  /**
   * Sets the game inventory for the thief to use
   * @param inventory - The game inventory
   */
  public setInventory(inventory: Inventory): void {
    this.gameInventory = inventory;
  }

  /**
   * Attempts to steal an object
   */
  public stealObject(): void {
    const stealStat = Math.random() * 100;
    let stolenObject: string | null = null;

    if (stealStat < 40) {
      stolenObject = "nothing";
    } else if (stealStat < 70) {
      stolenObject = "Potion";
    } else if (stealStat < 85) {
      stolenObject = "PieceOfStar";
    } else if (stealStat < 95) {
      stolenObject = "Ether";
    } else {
      stolenObject = "HalfStar";
    }

    console.log(
      `${this.name} tries to steal an object and gets ${stolenObject}!`
    );

    if (stolenObject !== "nothing" && this.gameInventory) {
      this.gameInventory.addItem(stolenObject, 1);
      console.log(
        `Inventory updated: Added ${stolenObject} to the party inventory.`
      );
    }
  }

  public getAdditionalActions(): string[] {
    return ["Steal an object"];
  }

  public handleAdditionalAction(
    action: string,
    participants: Character[]
  ): void {
    if (action === "Steal an object") {
      this.stealObject();
    }
  }
}