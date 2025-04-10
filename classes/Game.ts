import { GameManager } from "./GameManager";
import { Menu } from "./Menu";
import { Warrior, Mage, Paladin, Barbarian, Priest, Thief } from "./index";
import { Character } from "./Character";
import { Inventory } from "./Inventory";
import { RoomManager } from "./RoomManager";

/**
 * Manages the game
 */
export class Game {
  /**
   * The classes of characters available to choose from
   */
  private characterClasses: string[] = [
    "Warrior",
    "Mage",
    "Paladin",
    "Barbarian",
    "Priest",
    "Thief",
  ];
  /**
   * The adventurers in the game
   */
  private adventurers: Character[] = [];
  /**
   * The classes of characters selected by the player
   */
  private selectedClasses: string[] = [];
  private inventory: Inventory;
  private roomManager: RoomManager;

  /**
   * The constructor
   */
  constructor() {
    this.inventory = new Inventory();
    this.inventory.addItem("Potion", 2);
    this.inventory.addItem("Ether", 1);
    this.inventory.addItem("Piece of Star", 1);
    this.roomManager = new RoomManager();
  }

  /**
   * Starts the game
   */
  public async startGame(): Promise<void> {
    this.displayWelcome();
    this.selectAdventurers();
    this.displayParty();
    await this.displayMenu();
  }

  /**
   * Displays the welcome message
   */
  private displayWelcome(): void {
    GameManager.clearTerminal();
    GameManager.printCenteredText(`
██     ██ ███████ ██       ██████  ██████  ███    ███ ███████     ████████  ██████      ████████ ██   ██ ███████     ██████  ██████   ██████  
██     ██ ██      ██      ██      ██    ██ ████  ████ ██             ██    ██    ██        ██    ██   ██ ██          ██   ██ ██   ██ ██       
██  █  ██ █████   ██      ██      ██    ██ ██ ████ ██ █████          ██    ██    ██        ██    ███████ █████       ██████  ██████  ██   ███ 
██ ███ ██ ██      ██      ██      ██    ██ ██  ██  ██ ██             ██    ██    ██        ██    ██   ██ ██          ██   ██ ██      ██    ██ 
 ███ ███  ███████ ███████  ██████  ██████  ██      ██ ███████        ██     ██████         ██    ██   ██ ███████     ██   ██ ██       ██████  
 `);
    GameManager.printEqualsLine();
    GameManager.printCenteredText(`
 ██████ ██   ██  ██████  ███████ ███████     ██████       █████  ██████  ██    ██ ███████ ███    ██ ████████ ██    ██ ██████  ███████ ██████  ███████ 
██      ██   ██ ██    ██ ██      ██               ██     ██   ██ ██   ██ ██    ██ ██      ████   ██    ██    ██    ██ ██   ██ ██      ██   ██ ██      
██      ███████ ██    ██ ███████ █████        █████      ███████ ██   ██ ██    ██ █████   ██ ██  ██    ██    ██    ██ ██████  █████   ██████  ███████ 
██      ██   ██ ██    ██      ██ ██               ██     ██   ██ ██   ██  ██  ██  ██      ██  ██ ██    ██    ██    ██ ██   ██ ██      ██   ██      ██ 
 ██████ ██   ██  ██████  ███████ ███████     ██████      ██   ██ ██████    ████   ███████ ██   ████    ██     ██████  ██   ██ ███████ ██   ██ ███████ 
 `);
  }

  /**
   * Selects the adventurers
   */
  private selectAdventurers(): void {
    for (let i = 1; i <= 3; i++) {
      GameManager.printEqualsLine();

      const availableClasses = this.characterClasses.filter(
        (cls) => !this.selectedClasses.includes(cls)
      );

      if (availableClasses.length === 0) {
        console.log("Error: No more character classes available!");
        break;
      }

      const classMenu = new Menu("Choose a class:", availableClasses);
      classMenu.display();
      const selectedClass = classMenu.getResponse();
      this.selectedClasses.push(selectedClass);

      const character = this.createCharacter(selectedClass);
      this.adventurers.push(character);
      GameManager.printEqualsLine();
      GameManager.printCenteredText(`${character.name} has joined your party!`);
    }
  }

  /**
   * Creates a character
   * @param selectedClass - The class of the character to create
   * @returns The created character
   */
  private createCharacter(selectedClass: string): Character {
    const name = `${selectedClass}`;

    switch (selectedClass) {
      case "Warrior":
        return new Warrior(name);
      case "Mage":
        return new Mage(name, 100);
      case "Paladin":
        return new Paladin(name);
      case "Barbarian":
        return new Barbarian(name);
      case "Priest":
        return new Priest(name);
      case "Thief":
        return new Thief(name);
      default:
        return new Warrior(name);
    }
  }

  /**
   * Displays the party
   */
  private displayParty(): void {
    GameManager.clearTerminal();
    GameManager.printEqualsLine();
    GameManager.printCenteredTitle("Your Adventure Begins!");
    GameManager.printEqualsLine();

    console.log("Your party:");
    this.adventurers.forEach((character) => {
      console.log(
        `- ${character.name}: Health ${character.currentHealth}/${character.maxHealth}, Attack ${character.attack}, Defense ${character.defense}, Speed ${character.speed}`
      );
    });
  }

  /**
   * Displays the menu
   */
  private async displayMenu(): Promise<void> {
    const menu = new Menu("Please select an option :", [
      "View Party Status",
      "Use Inventory",
      "Start Dungeon",
      "Exit Game",
    ]);

    GameManager.clearTerminal();
    GameManager.printEqualsLine();
    GameManager.printCenteredText(`
███    ███  █████  ██ ███    ██     ███    ███ ███████ ███    ██ ██    ██ 
████  ████ ██   ██ ██ ████   ██     ████  ████ ██      ████   ██ ██    ██ 
██ ████ ██ ███████ ██ ██ ██  ██     ██ ████ ██ █████   ██ ██  ██ ██    ██ 
██  ██  ██ ██   ██ ██ ██  ██ ██     ██  ██  ██ ██      ██  ██ ██ ██    ██ 
██      ██ ██   ██ ██ ██   ████     ██      ██ ███████ ██   ████  ██████  
    `);
    GameManager.printEqualsLine();
    menu.display();
    GameManager.printEqualsLine();
    const choice = menu.getResponse();

    switch (choice) {
      case "View Party Status":
        this.viewPartyStatus();
        await this.displayMenu();
        break;
      case "Use Inventory":
        this.useInventory();
        await this.displayMenu();
        break;
      case "Start Dungeon":
        await this.startDungeon();
        await this.displayMenu();
        break;
      case "Exit Game":
        this.exitGame();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        await this.displayMenu();
    }
  }

  /**
   * Displays the party status
   */
  private viewPartyStatus(): void {
    GameManager.clearTerminal();
    GameManager.printCenteredTitle("Party Status");
    GameManager.printEqualsLine();

    console.log("Your party:");
    this.adventurers.forEach((character) => {
      console.log(
        `- ${character.name}: Health ${character.currentHealth}/${character.maxHealth}, Attack ${character.attack}, Defense ${character.defense}, Speed ${character.speed}`
      );
    });
    GameManager.printEqualsLine();
    GameManager.printCenteredText("Press any key to continue...");
    prompt("");
  }

  /**
   * Uses the inventory
   */
  private useInventory(): void {
    GameManager.clearTerminal();
    GameManager.printCenteredTitle("Inventory");
    GameManager.printEqualsLine();

    const items = this.inventory.getItems();
    if (items.size === 0) {
      GameManager.printCenteredText("Your inventory is empty!");
    } else {
      GameManager.printCenteredText("Your items:");
      for (const [item, quantity] of items) {
        GameManager.printCenteredText(`${item} x${quantity}`);
      }
    }

    GameManager.printEqualsLine();
    GameManager.printCenteredText("Press any key to continue...");
    prompt("");
  }

  /**
   * Starts the dungeon
   */
  private async startDungeon(): Promise<void> {
    GameManager.clearTerminal();
    GameManager.printCenteredTitle("Entering the Dungeon");
    GameManager.printEqualsLine();

    console.log("Preparing to enter the dungeon...");
    await this.delay(1000);

    console.log("\nYour party:");
    this.adventurers.forEach((character) => {
      console.log(
        `- ${character.name}: Health ${character.currentHealth}/${character.maxHealth}`
      );
    });

    console.log("\nYour inventory:");
    this.inventory.getItems().forEach((quantity, item) => {
      console.log(`- ${item} x${quantity}`);
    });

    GameManager.printEqualsLine();
    console.log("Starting the dungeon exploration...");
    await this.delay(1000);

    await this.roomManager.explore(this.adventurers, this.inventory);

    GameManager.printEqualsLine();
    GameManager.printCenteredText("Press any key to continue...");
    prompt("");
  }

  /**
   * Exits the game
   */
  private exitGame(): void {
    console.log("Exiting game...");
    process.exit(0);
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