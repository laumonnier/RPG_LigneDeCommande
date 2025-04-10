import { Adventurer } from "./Adventurer";
import { Character } from "./Character";

/**
 * Represents a Warrior character in the RPG game.
 * Inherits from the Character class.
 */
export class Warrior extends Adventurer {
  constructor(name: string) {
    const maxHealth = 150;
    const attack = 20;
    const defense = 15;
    const speed = 10;
    super(name, maxHealth, attack, defense, speed);
  }

  public getAdditionalActions(): string[] {
    return [];
  }

  public handleAdditionalAction(
    action: string,
    participants: Character[]
  ): void {}
}