/**
 * Represents a character in the RPG game.
 */
export class Character {
    name: string;
    maxHealth: number;
    currentHealth: number;
    attack: number;
    defense: number;
    speed: number;
    isAlive: boolean;
  
    /**
     * Creates a new character with the specified attributes.
     * @param name - The name of the character.
     * @param maxHealth - The maximum health points of the character.
     * @param attack - The attack power of the character.
     * @param defense - The defense power of the character.
     * @param speed - The speed of the character.
     */
    constructor(
      name: string,
      maxHealth: number,
      attack: number,
      defense: number,
      speed: number
    ) {
      this.name = name;
      this.maxHealth = maxHealth;
      this.currentHealth = maxHealth;
      this.attack = attack;
      this.defense = defense;
      this.speed = speed;
      this.isAlive = true;
    }
  
    /**
     * Inflicts damage to the character, reducing its current health.
     * If the damage reduces the health to zero, the character is marked as dead.
     * @param amount - The amount of damage to inflict.
     */
    takeDamage(amount: number): void {
      this.currentHealth = Math.max(0, this.currentHealth - amount);
  
      if (this.currentHealth === 0) {
        this.isAlive = false;
        console.log(`${this.name} is dead!`);
      }
    }
  
    /**
     * Heals the character by a percentage of its maximum health.
     * Healing is only possible if the character is alive.
     * @param percentage - The percentage of max health to heal.
     */
    heal(percentage: number): void {
      if (!this.isAlive) return;
      const healAmount = Math.round(this.maxHealth * (percentage / 100));
      this.currentHealth = Math.min(
        this.currentHealth + healAmount,
        this.maxHealth
      );
      console.log(`${this.name} recovers ${healAmount} health points!`);
    }
  
    /**
     * Resurrects the character with a percentage of its maximum health.
     * Resurrecting is only possible if the character is dead.
     * @param percentage - The percentage of max health to restore upon resurrection.
     */
    resurrect(percentage: number): void {
      if (this.isAlive) return;
      const healAmount = Math.floor(this.maxHealth * (percentage / 100));
      this.currentHealth = Math.min(healAmount, this.maxHealth);
      this.isAlive = true;
      console.log(
        `${this.name} is resurrected with ${this.currentHealth} health points!`
      );
    }
  
    /**
     * Checks if the character is dead.
     * @returns True if the character is dead, otherwise false.
     */
    isKO(): boolean {
      return !this.isAlive;
    }
  }