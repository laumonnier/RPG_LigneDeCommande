import { Room } from "./Room";
import { Character } from "./Character";
import { Fight } from "./Fight";
import { MonsterFactory } from "./MonsterFactory";
import { Inventory } from "./Inventory";

/**
 * Represents a Boss Room in the RPG game.
 * Implements the Room interface.
 */
export class BossRoom implements Room {
  /**
   * Allows a party of adventurers to enter the Boss Room.
   * Initiates a fight between the party and a boss.
   * @param party - The list of adventurers entering the room.
   * @param inventory - The inventory to use during the fight.
   */
  async enter(party: Character[], inventory: Inventory) {
    const boss = MonsterFactory.getBoss();

    const fight = new Fight(party, [boss], inventory);
    await fight.startFight();
  }
}