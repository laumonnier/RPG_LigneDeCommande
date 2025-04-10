import { Character } from "./Character";
import { Menu } from "./Menu";

/**
 * Represents a Priest character in the RPG game.
 * Inherits from the Character class.
 */
export class Priest extends Character {
  /**
   * Creates a new Priest with name and max health
   * @param name - The name of the Priest
   * @param maxHealth - The maximum health of the Priest
   */
  constructor(name: string) {
    const maxHealth = 100;
    const attack = 10;
    const defense = 5;
    const speed = 15;
    super(name, maxHealth, attack, defense, speed);
  }

  /**
   * Performs a care action on an ally or himself, restore of care
   * @param care - The care action on a character
   * @param target - The adventurer on whom care is practiced
   */
  allowCare(target: Character): void {
    target.heal(25);
    console.log(`${this.name} restores 25% of health ${target.name}!`);
  }

  public getAdditionalActions(): string[] {
    return ["Cure"];
  }

  public handleAdditionalAction(
    action: string,
    participants: Character[]
  ): void {
    if (action === "Cure") {
      const cureOptions = ["Myself", "Ally"];
      const cureMenu = new Menu(
        `Do you want to cure yourself or an ally?`,
        cureOptions
      );
      cureMenu.display();
      const cureChoice = cureMenu.getResponse();
      if (cureChoice === "Myself") {
        this.allowCare(this);
      } else if (cureChoice === "Ally") {
        const livingAllies = participants.filter(
          (c) =>
            c.isAlive &&
            c.constructor.name !== "Monster" &&
            c.name !== this.name
        );
        if (livingAllies.length === 0) {
          console.log("No ally available. Healing self by default.");
          this.allowCare(this);
        } else {
          const allyMenu = new Menu(
            `Choose an ally to cure:`,
            livingAllies.map((c) => c.name)
          );
          allyMenu.display();
          const allyName = allyMenu.getResponse();
          const target = livingAllies.find((c) => c.name === allyName);
          if (!target) {
            console.log("Ally not found. Healing self by default.");
            this.allowCare(this);
          } else {
            this.allowCare(target);
          }
        }
      }
    }
  }
}