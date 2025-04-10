import { Character } from "./Character";
import { Inventory } from "./Inventory";

/**
 * Represents a Room in the RPG game.
 * Defines the contract for any room that adventurers can enter.
 */
export interface Room {
  /**
   * Allows a party of adventurers to enter the room.
   * The room may interact with the party and the inventory.
   * @param party - The list of adventurers entering the room.
   * @param inventory - The inventory to store or manage items.
   */
  enter(party: Character[], inventory: Inventory): Promise<void>;
}