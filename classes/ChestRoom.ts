import { Room } from "./Room";
import { Character } from "./Character";
import { Inventory } from "./Inventory";

/**
 * Represents a Chest Room in the RPG game.
 * Implements the Room interface.
 */
export class ChestRoom implements Room {
  /**
   * Allows a party of adventurers to enter the Chest Room.
   * The room may contain a trap or rewards.
   * @param party - The list of adventurers entering the room.
   * @param inventory - The inventory to store obtained items.
   */
  async enter(party: Character[], inventory: Inventory): Promise<void> {
    const isTrap = Math.random() < 0.3;
    const target = party.find((p) => !p.isKO());
    if (!target) return;

    if (isTrap) {
      const damage = Math.floor(target.maxHealth * 0.2);
      target.takeDamage(damage);
      console.log(`💥 Trap! ${target.name} loses ${damage} HP.`);
    } else {
      const loots = inventory.getRandomRewardItems(2);
      loots.forEach((item) => inventory.addItem(item));
      console.log(`🧰 Chest opened! You obtained: ${loots.join(", ")}`);
    }
  }
}