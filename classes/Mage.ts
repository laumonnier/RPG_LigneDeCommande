import { Character } from "./Character";

/**
 * Represents a Mage character in the RPG game.
 * Inherits from the Character class.
 */
export class Mage extends Character {
  mana: number;

  /**
   * Creates a new Mage with name and mana
   * @param name - The name of the Mage
   * @param maxMana - The maximum mana of the Mage
   */
  constructor(name: string, maxMana: number) {
    const maxHealth = 100;
    const attack = 5;
    const defense = 5;
    const speed = 15;
    super(name, maxHealth, attack, defense, speed);
    this.mana = maxMana;
  }

  /**
   * Performs a magical attack on an enemy, consuming mana
   * @param enemy - The enemy to attack
   * @param magicPower - The power of the magic attack
   */
  castSpell(enemy: Character, magicPower: number): void {
    if (this.mana >= magicPower) {
      enemy.takeDamage(magicPower);
      this.mana -= magicPower;
      console.log(`${this.name} casts a spell of ${magicPower} damage!`);
    } else {
      console.log(`${this.name} doesn't have enough mana to cast that spell!`);
    }
  }

  public getAdditionalActions(): string[] {
    return ["Magic attack"];
  }

  public handleAdditionalAction(
    action: string,
    participants: Character[]
  ): void {
    if (action === "Magic attack") {
      const enemies = participants.filter(
        (c) => c.constructor.name === "Monster" && c.isAlive
      );
      if (enemies.length === 0) {
        console.log("No enemy available.");
        return;
      }
      const target = enemies[0];
      const input = prompt(
        `Enter the power of the spell for ${this.name} (Mana available: ${this.mana}):`
      );
      const magicPower = Number(input);
      if (isNaN(magicPower) || magicPower <= 0) {
        console.log("Invalid power, magic attack cancelled.");
      } else {
        this.castSpell(target, magicPower);
      }
    }
  }
}