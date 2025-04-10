import { Character } from "./Character";

/**
 * Represents a Monster character in the RPG game.
 * Inherits from the Character class.
 */
export class Monster extends Character {
  /**
   * Creates a new Monster instance.
   * @param name - The name of the monster.
   * @param maxHealth - The maximum health points of the monster.
   * @param attack - The attack power of the monster.
   * @param defense - The defense power of the monster.
   * @param speed - The speed of the monster.
   */
  constructor(
    name: string,
    maxHealth: number,
    attack: number,
    defense: number,
    speed: number
  ) {
    super(name, maxHealth, attack, defense, speed);
  }

  /**
   * Selects a target from the list of adventurers.
   * @param adventurers - The list of adventurers to select from.
   * @returns The selected target.
   */
  selectTarget(adventurers: Character[]): Character {
    const livingAdventurers = adventurers.filter(
      (adventurer) => adventurer.isAlive
    );
    if (livingAdventurers.length === 0) {
      throw new Error("No living adventurers to attack");
    }
    if (livingAdventurers.length === 1) {
      return livingAdventurers[0];
    }
    if (Math.random() < 0.2) {
      return livingAdventurers.reduce(
        (lowest, current) =>
          current.currentHealth < lowest.currentHealth ? current : lowest,
        livingAdventurers[0]
      );
    } else {
      const randomIndex = Math.floor(Math.random() * livingAdventurers.length);
      return livingAdventurers[randomIndex];
    }
  }

  /**
   * Attacks an enemy character.
   * @param enemy - The enemy character to attack.
   */
  attackEnemy(enemy: Character): void {
    const damage = Math.max(1, this.attack - enemy.defense);
    enemy.takeDamage(damage);
    console.log(`${this.name} attacks ${enemy.name} for ${damage} damage!`);
  }

  /**
   * Performs an attack on an enemy character.
   * @param adventurers - The list of adventurers to select from.
   */
  public async performAttackAsync(adventurers: Character[]): Promise<void> {
    const target = this.selectTarget(adventurers);
    this.performAttackAsync(adventurers);
  }
}