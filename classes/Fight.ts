import { Character } from "./Character";
import { Monster } from "./Monster";
import { Menu } from "./Menu";
import { Inventory } from "./Inventory";
import { Mage } from "./Mage";
import { Thief } from "./Thief";

export type Adventurer = Character & {
  takeTurn: (participants: Character[]) => Promise<void>;
};

/**
 * The Fight class manages a complete battle between a team of adventurers and a team of monsters.
 */

/**
 * Represents a Fight between a party of adventurers and a group of monsters.
 */
export class Fight {
  private allParticipants: Character[] = [];

  /**
   * Initializes a new instance of the Fight class.
   * @param party - The list of adventurers participating in the fight.
   * @param enemies - The list of monsters participating in the fight.
   * @param inventory - The party's inventory.
   */
  constructor(
    private party: Character[],
    private enemies: Monster[],
    private inventory: Inventory
  ) {
    this.allParticipants = [...party, ...enemies];
    party
      .filter((c) => c instanceof Thief)
      .forEach((thief) => (thief as Thief).setInventory(inventory));
  }

  /**
   * Executes an attack from one character to another.
   * @param attacker - The character performing the attack.
   * @param defender - The character receiving the attack.
   */
  private attack(attacker: Character, defender: Character): void {
    if (!attacker || !defender || attacker.isKO() || defender.isKO()) return;
    console.log(`${attacker.name} attacks ${defender.name}!`);
    const damage = Math.max(1, attacker.attack - defender.defense);
    defender.takeDamage(damage);
    console.log(
      `${defender.name} takes ${damage} damage! (${defender.currentHealth}/${defender.maxHealth} HP)`
    );
    if (defender.isKO()) console.log(`${defender.name} is defeated!`);
  }

  /**
   * Starts the fight between the party and the enemies.
   * The fight continues until one side is completely defeated.
   * @returns A promise that resolves when the fight is over.
   */
  public async startFight(): Promise<void> {
    console.log(`The fight begins between the adventurers and the monsters!`);
    console.log("\nEnemies:");
    this.enemies.forEach((enemy, i) =>
      console.log(
        `${i + 1}. ${enemy.name} - HP: ${enemy.currentHealth}/${
          enemy.maxHealth
        }`
      )
    );
    let combatActive = true;
    while (combatActive) {
      for (const character of this.party.filter((c) => !c.isKO())) {
        await this.characterTurn(character);
        if (this.enemies.every((e) => e.isKO())) {
          combatActive = false;
          break;
        }
      }
      if (!combatActive) break;
      for (const enemy of this.enemies.filter((e) => !e.isKO())) {
        await this.enemyTurn(enemy);
        if (this.party.every((c) => c.isKO())) {
          combatActive = false;
          break;
        }
        await this.delay(500);
      }
      if (combatActive) {
        this.displayBattleStatus();
        await this.delay(1000);
      }
    }
    const partyAlive = this.party.some((m) => !m.isKO());
    console.log(
      `\nThe fight is over! ${
        partyAlive ? "The adventurers have won!" : "The monsters have won!"
      }`
    );
  }

  /**
   * Handles a party member's turn with player input
   * @param character - The character whose turn it is
   */
  private async characterTurn(character: Character): Promise<void> {
    console.log(`\n${character.name}'s turn!`);
    const basicActions = ["Attack", "Use Item", "Skip Turn"];
    const specialActions =
      "getAdditionalActions" in character
        ? (character as any).getAdditionalActions()
        : [];
    const actions = [...basicActions];
    if (specialActions.length > 0) {
      actions.splice(1, 0, ...specialActions);
    }
    const actionMenu = new Menu(
      `Choose an action for ${character.name}:`,
      actions
    );
    actionMenu.display();
    const selectedAction = actionMenu.getResponse();
    if (selectedAction === "Attack") {
      await this.handleAttack(character);
    } else if (selectedAction === "Use Item") {
      await this.handleUseItem(character);
    } else if (selectedAction === "Skip Turn") {
      console.log(`${character.name} skips their turn.`);
    } else if (
      specialActions.includes(selectedAction) &&
      "handleAdditionalAction" in character
    ) {
      (character as any).handleAdditionalAction(
        selectedAction,
        this.allParticipants
      );
    }
  }

  /**
   * Handles a regular attack action
   * @param character - The character performing the attack
   */
  private async handleAttack(character: Character): Promise<void> {
    const aliveEnemies = this.enemies.filter((e) => !e.isKO());
    if (aliveEnemies.length === 0) {
      console.log("No enemies to attack!");
      return;
    }
    const targetOptions = aliveEnemies.map(
      (e) => `${e.name} (HP: ${e.currentHealth}/${e.maxHealth})`
    );
    const targetMenu = new Menu("Choose a target:", targetOptions);
    targetMenu.display();
    const response = targetMenu.getResponse();
    let targetEnemy = this.findTarget(response, aliveEnemies);
    if (!targetEnemy) return;
    this.attack(character, targetEnemy);
  }

  private findTarget(
    response: string,
    targets: Character[]
  ): Character | undefined {
    const index = parseInt(response) - 1;
    if (!isNaN(index) && index >= 0 && index < targets.length) {
      return targets[index];
    }
    const nameMatch = response.match(/^([^(]+)/);
    if (nameMatch) {
      const name = nameMatch[1].trim();
      return targets.find((t) => t.name === name);
    }
    console.log("Could not determine target precisely, using first target.");
    return targets[0];
  }

  /**
   * Handles using an item
   * @param character - The character using the item
   */
  private async handleUseItem(character: Character): Promise<void> {
    const items = this.inventory.getItems();
    if (items.size === 0) {
      console.log("You have no items to use!");
      return;
    }
    const itemsArray = Array.from(items.keys());
    const itemOptions = itemsArray.map(
      (item) => `${item} (x${items.get(item)})`
    );
    const itemMenu = new Menu("Choose an item to use:", itemOptions);
    itemMenu.display();
    const itemResponse = itemMenu.getResponse();
    const selectedItem = this.findSelectedItem(itemResponse, itemsArray);
    if (!selectedItem) {
      console.log("Invalid item selection.");
      return;
    }
    if (selectedItem.includes("Potion")) {
      await this.useHealingItem(selectedItem);
    } else if (selectedItem.includes("Ether")) {
      this.useManaItem(character, selectedItem);
    } else {
      console.log(`${character.name} uses ${selectedItem}!`);
    }
    this.inventory.removeItem(selectedItem, 1);
  }

  private findSelectedItem(
    response: string,
    items: string[]
  ): string | undefined {
    const index = parseInt(response) - 1;
    if (!isNaN(index) && index >= 0 && index < items.length) {
      return items[index];
    }
    const itemMatch = response.match(/^([^(]+)/);
    if (itemMatch) {
      const itemName = itemMatch[1].trim();
      return items.find((item) => item === itemName || item.includes(itemName));
    }
    return undefined;
  }

  private async useHealingItem(item: string): Promise<void> {
    const targetOptions = this.party.map(
      (m) => `${m.name} (HP: ${m.currentHealth}/${m.maxHealth})`
    );
    const targetMenu = new Menu("Choose who to heal:", targetOptions);
    targetMenu.display();
    const targetResponse = targetMenu.getResponse();
    const targetCharacter = this.findTarget(targetResponse, this.party);
    if (!targetCharacter) {
      console.log("Invalid target selection, healing canceled.");
      return;
    }
    const healAmount = 30;
    targetCharacter.heal(healAmount);
    console.log(
      `${targetCharacter.name} uses ${item} and recovers ${healAmount} HP!`
    );
  }

  private useManaItem(character: Character, item: string): void {
    if (character instanceof Mage) {
      const manaAmount = 20;
      character.mana += manaAmount;
      console.log(
        `${character.name} uses ${item} and recovers ${manaAmount} mana!`
      );
    } else {
      console.log(`${character.name} uses ${item}, but it has no effect!`);
    }
  }

  /**
   * Handles an enemy's turn
   * @param enemy - The enemy whose turn it is
   */
  private async enemyTurn(enemy: Monster): Promise<void> {
    const aliveMembers = this.party.filter((m) => !m.isKO());
    if (aliveMembers.length === 0) return;
    const target =
      aliveMembers[Math.floor(Math.random() * aliveMembers.length)];
    this.attack(enemy, target);
  }

  /**
   * Displays the current status of combatants
   */
  private displayBattleStatus(): void {
    console.log("\n--- Battle Status ---");
    console.log("Party:");
    this.party.forEach((member) => {
      if (!member.isKO()) {
        let status = `${member.name}: HP ${member.currentHealth}/${member.maxHealth}`;
        if (member instanceof Mage) status += `, Mana ${member.mana}`;
        console.log(status);
      } else {
        console.log(`${member.name}: KO`);
      }
    });
    console.log("\nEnemies:");
    this.enemies
      .filter((e) => !e.isKO())
      .forEach((enemy) => {
        console.log(
          `${enemy.name}: HP ${enemy.currentHealth}/${enemy.maxHealth}`
        );
      });
  }

  /**
   * Delays the execution for a specified number of milliseconds.
   * @param ms - The number of milliseconds to delay.
   * @returns A promise that resolves after the specified delay.
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}