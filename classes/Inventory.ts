export class Inventory {
    private items: Map<string, number>;
  
    constructor(initialItems?: { [key: string]: number }) {
      this.items = new Map<string, number>();
      if (initialItems) {
        for (const [item, quantity] of Object.entries(initialItems)) {
          this.items.set(item, quantity);
        }
      }
    }
  
    /**
     * Adds an item to the inventory
     * @param itemName - The name of the item to add
     * @param quantity - The quantity of the item to add
     */
    public addItem(itemName: string, quantity: number = 1): void {
      const currentQuantity = this.items.get(itemName) || 0;
      this.items.set(itemName, currentQuantity + quantity);
    }
  
    /**
     * Removes an item from the inventory
     * @param itemName - The name of the item to remove
     * @param quantity - The quantity of the item to remove
     * @returns True if the item was removed, false if the quantity is insufficient
     */
    public removeItem(itemName: string, quantity: number = 1): boolean {
      const currentQuantity = this.items.get(itemName) || 0;
      if (currentQuantity < quantity) {
        return false;
      }
  
      if (currentQuantity === quantity) {
        this.items.delete(itemName);
      } else {
        this.items.set(itemName, currentQuantity - quantity);
      }
      return true;
    }
  
    /**
     * Gets the items in the inventory
     * @returns A map of the items in the inventory
     */
    public getItems(): Map<string, number> {
      return new Map(this.items);
    }
  
    /**
     * Checks if the inventory has an item
     * @param itemName - The name of the item to check
     * @returns True if the item is in the inventory, false otherwise
     */
    public hasItem(itemName: string): boolean {
      return this.items.has(itemName);
    }
  
    /**
     * Gets the quantity of an item in the inventory
     * @param itemName - The name of the item to get the quantity of
     * @returns The quantity of the item in the inventory
     */
    public getItemQuantity(itemName: string): number {
      return this.items.get(itemName) || 0;
    }
  
    /**
     * Generates random reward items
     * @param count - The number of random items to generate
     * @returns An array of random item names
     */
    public getRandomRewardItems(count: number): string[] {
      const availableItems = [
        "Potion",
        "Elixir",
        "Gold Coin",
        "Magic Scroll",
        "Sword",
        "Shield",
        "Armor",
        "Helmet",
        "Boots",
        "Ring",
        "Amulet",
        "Bow",
        "Arrow",
        "Dagger",
        "Staff",
        "Wand",
        "Herbs",
        "Gemstone",
        "Map",
        "Torch",
        "Rope",
        "Lantern",
      ];
      const rewards: string[] = [];
  
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * availableItems.length);
        rewards.push(availableItems[randomIndex]);
      }
  
      return rewards;
    }
  }