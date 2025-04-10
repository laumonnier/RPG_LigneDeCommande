
/**
 * Manages the game
 */
export class GameManager {
    /**
     * Clears the terminal screen
     */
    public static clearTerminal(): void {
      console.log("\x1b[2J\x1b[H");
    }
  
    /**
     * Prints a centered title
     * @param title - The title to print
     */
    public static printCenteredTitle(title: string): void {
      const terminalWidth = process.stdout.columns || 80;
      const padding = Math.floor((terminalWidth - title.length) / 2);
      const paddingStr = " ".repeat(Math.max(0, padding));
      console.log(`${paddingStr}${title}`);
    }
  
      /**
       * Prints a centered text
       * @param text - The text to print
       */
      public static printCenteredText(text: string): void {
          const terminalWidth = process.stdout.columns || 80;
          const lines = text.split('\n');
          lines.forEach(line => {
              const lineWidth = line.length;
              const padding = Math.floor((terminalWidth - lineWidth) / 2);
              const paddingStr = ' '.repeat(Math.max(0, padding));
              console.log(`${paddingStr}${line}`);
          });
      }
  
      /**
       * Prints a line of equals
       */
      public static printEqualsLine(): void {
          console.log("=".repeat(process.stdout.columns || 80));
      }
  }