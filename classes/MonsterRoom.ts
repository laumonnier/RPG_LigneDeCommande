import { Character } from "./Character";
import { Fight } from "./Fight";
import { Room } from "./Room";
import { Monster } from "./Monster";
import { Inventory } from "./Inventory";
import { Thief } from "./Thief";

/**
 * Represents a Monster Room in the RPG game.
 * Implements the Room interface.
 */
export class MonsterRoom implements Room {
  /**
   * Allows a party of adventurers to enter the Monster Room.
   * Initiates a fight between the party and randomly generated monsters.
   * @param party - The list of adventurers entering the room.
   * @param inventory - The inventory to use during the fight.
   */
  async enter(party: Character[], inventory: Inventory) {
    const enemies = this.generateRandomMonsters(3);
    for (const character of party) {
      if (character instanceof Thief) {
        character.setInventory(inventory);
      }
    }
    const fight = new Fight(party, enemies, inventory);
    await fight.startFight();
  }

  /**
   * Generates a specified number of random monsters.
   * @param count - The number of monsters to generate.
   * @returns An array of randomly generated Monster instances.
   */
  private generateRandomMonsters(count: number): Monster[] {
    const monsterNames = ["Goblin", "Orc", "Troll", "Vampire", "Zombie"];
    const monsters: Monster[] = [];

    for (let i = 0; i < count; i++) {
      const name =
        monsterNames[Math.floor(Math.random() * monsterNames.length)];
      const maxHealth = Math.floor(Math.random() * 50) + 30;
      const attack = Math.floor(Math.random() * 10) + 5;
      const defense = Math.floor(Math.random() * 5) + 1;
      const speed = Math.floor(Math.random() * 3) + 1;

      monsters.push(new Monster(name, maxHealth, attack, defense, speed));
    }

    return monsters;
  }
}