
import { Character } from "./Character";

/**
 * Represents a Barbarian character in the RPG game.
 * Inherits from the Character class.
 */
export class Barbarian extends Character {
  constructor(name: string) {
    const maxHealth = 150;
    const attack = 25;
    const defense = 15;
    const speed = 10;
    super(name, maxHealth, attack, defense, speed);
  }

  /**
   * Performs a rage attack on an enemy, doing 50% of the physical attack
   * @param enemy - The enemy to attack
   */
  public rageAttack(enemy: Character): void {
    const damage = Math.floor((this.attack - enemy.defense) * 1.3);
    enemy.takeDamage(damage);
    this.currentHealth -= this.maxHealth * 0.2;
    console.log(
      `${this.name} performs a rage attack on ${enemy.name} inflicting for ${damage} damage!`
    );
    console.log(`${this.name} loses 20% of their health!`);
  }

  public getAdditionalActions(): string[] {
    return ["Rage attack"];
  }

  public handleAdditionalAction(
    action: string,
    participants: Character[]
  ): void {
    if (action === "Rage attack") {
      const enemies = participants.filter(
        (c) => c.constructor.name === "Monster" && c.isAlive
      );
      if (enemies.length === 0) {
        console.log("No enemy available for rage attack.");
        return;
      }
      const target = enemies[Math.floor(Math.random() * enemies.length)];
      this.rageAttack(target);
    }
  }
}