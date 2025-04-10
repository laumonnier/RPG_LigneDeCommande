import { Character } from "./Character";
import { Menu } from "./Menu";
import { inventory } from "./globalInventory";

/**
 * Abstract class for all adventurers.
 * It centralizes common behavior, including the use of objects
 * and the management of the game round.
 */
export abstract class Adventurer extends Character {
  /**
   * Generic implementation of the game trick.
   * Adventurers always have a simple attack and the option "Use an object".
   * Specific additional actions are defi=ned via getAdditionalActions().
   */
  public async takeTurn(participants: Character[]): Promise<void> {
    const baseActions = ["Simple attack", "Use an object"];
    const additionalActions = this.getAdditionalActions();
    const actions = [...baseActions, ...additionalActions];
    const actionMenu = new Menu(`Choose an action for ${this.name}:`, actions);
    actionMenu.display();
    const choice = actionMenu.getResponse();

    if (choice === "Simple attack") {
      const enemies = participants.filter(
        (c) => c.constructor.name === "Monster" && c.isAlive
      );
      if (enemies.length === 0) {
        console.log("No enemy available.");
        return;
      }
      const target = enemies[0];
      console.log(`${this.name} attacks ${target.name} with a simple attack!`);
      target.takeDamage(this.attack);
    } else if (choice === "Use an object") {
      await this.useObject(participants);
    } else {
      this.handleAdditionalAction(choice, participants);
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  /**
   * Common method to use an object.
   * Displays a menu of available objects and allows you to choose a target.
   */
  public async useObject(participants: Character[]): Promise<void> {
    const availableItems = Object.keys(inventory).filter(
      (item) => inventory[item] > 0
    );
    if (availableItems.length === 0) {
      console.log("No objects available in the inventory.");
      return;
    }
    const objectMenu = new Menu(`Choose an object to use:`, availableItems);
    objectMenu.display();
    const objectChoice = objectMenu.getResponse();

    const livingAdventurers = participants.filter(
      (c) => c.isAlive && c.constructor.name !== "Monster"
    );
    if (livingAdventurers.length === 0) {
      console.log("No valid target available.");
      return;
    }
    const targetMenu = new Menu(
      `Choose a target for the ${objectChoice}:`,
      livingAdventurers.map((c) => c.name)
    );
    targetMenu.display();
    const targetName = targetMenu.getResponse();
    const target = livingAdventurers.find((c) => c.name === targetName);
    if (!target) {
      console.log("Target not found.");
      return;
    }

    switch (objectChoice) {
      case "Potion":
        console.log(`${this.name} uses a Potion on ${target.name}.`);
        target.heal(50);
        break;
      case "PieceOfStar":
        if (!target.isAlive) {
          console.log(
            `${this.name} uses a PieceOfStar to resurrect ${target.name}.`
          );
          target.resurrect(20);
        } else {
          console.log(
            `${this.name} uses a PieceOfStar to heal ${target.name}.`
          );
          target.heal(50);
        }
        break;
      case "HalfStar":
        if (!target.isAlive) {
          console.log(
            `${this.name} uses a HalfStar to fully resurrect ${target.name}.`
          );
          target.resurrect(100);
        } else {
          console.log(
            `${this.name} uses a HalfStar to fully heal ${target.name}.`
          );
          const missingPercentage =
            ((target.maxHealth - target.currentHealth) / target.maxHealth) *
            100;
          target.heal(missingPercentage);
        }
        break;
      case "Ether":
        if ("mana" in target) {
          console.log(`${this.name} uses an Ether on ${target.name}.`);
          (target as any).mana += Math.floor((target as any).mana * 0.3);
          console.log(`${target.name} restores 30% of its mana!`);
        } else {
          console.log(`${target.name} does not have magic points to restore.`);
        }
        break;
      default:
        console.log("Invalid object.");
        return;
    }
    inventory.removeItem(objectChoice, 1);
  }

  /**
   *  Abstract method that must return a table of specific actions specific to the adventurer.
   */
  public abstract getAdditionalActions(): string[];

  /**
   * Abstract method to manage the specific action chosen.
   * @param action  The specific action chosen
   * @param participants  The list of participants in the battle.
   */
  public abstract handleAdditionalAction(
    action: string,
    participants: Character[]
  ): void;
}