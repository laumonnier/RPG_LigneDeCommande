import { Character } from "./Character";
import { Monster } from "./Monster";

/**
 * Represents a Boss character in the RPG game.
 * Inherits from the Monster class.
 */
export class Boss extends Monster {
  /**
   * Creates a new Boss instance.
   * @param name - The name of the boss.
   */
  constructor(name: string) {
    const maxHealth = 300;
    const attack = 25;
    const defense = 15;
    const speed = 15;
    super(name, maxHealth, attack, defense, speed);
  }

  /**
   * Performs an area attack on all adventurers.
   * @param adventurers - The list of adventurers to attack.
   */
  areaAttack(adventurers: Character[]): void {
    console.log(`${this.name} performs an area attack on all adventurers!`);
    const livingAdventurers = adventurers.filter(
      (adventurer) => adventurer.isAlive
    );

    for (const adventurer of livingAdventurers) {
      const damage = Math.floor((this.attack - adventurer.defense) * 0.4);
      adventurer.takeDamage(damage);
      console.log(
        `${this.name} attacks ${adventurer.name} for ${damage} damage!`
      );
    }
  }

  /**
   * Performs an attack on an adventurer.
   * @param adventurers - The list of adventurers to attack.
   */
  override performAttack(adventurers: Character[]): void {
    if (Math.random() < 0.3) {
      this.areaAttack(adventurers);
    } else {
      super.performAttack(adventurers);
    }
  }
}