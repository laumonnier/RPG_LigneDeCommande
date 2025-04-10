import { Character } from "./Character";

/**
 * Represents a Paladin character in the RPG game.
 * Inherits from the Character class.
 */
export class Paladin extends Character {
  constructor(name: string) {
    const maxHealth = 150;
    const attack = 15;
    const defense = 20;
    const speed = 8;
    super(name, maxHealth, attack, defense, speed);
  }

  /**
   * Performs a holy attack on an enemy, doing 40% of the physical attack
   * @param enemy - The enemy to attack
   */
  holyAttack(enemy: Character): void {
    const damage = Math.floor((this.attack - enemy.defense) * 0.4);
    enemy.takeDamage(damage);
    console.log(`${this.name} performs a holy attack for ${damage} damage!`);
  }

  public getAdditionalActions(): string[] {
    return ["Holy attack"];
  }

  public handleAdditionalAction(
    action: string,
    participants: Character[]
  ): void {
    if (action === "Holy attack") {
      const enemies = participants.filter(
        (c) => c.constructor.name === "Monster" && c.isAlive
      );
      if (enemies.length === 0) {
        console.log("No enemy available for holy attack.");
        return;
      }
      const target = enemies[0];
      this.holyAttack(target);
    }
  }
}