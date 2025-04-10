export class Menu {
    private options: string[];
    private question: string;
  
    constructor(question: string, options: string[]) {
      this.question = question;
      this.options = options;
    }
  
    public display(): void {
      console.log(this.question);
      this.options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
      });
    }
  
    public getResponse(): string {
      let response: string | null;
      do {
        response = prompt(this.question);
        if (response) {
          const trimmedResponse = response.trim();
          const selectedOption = parseInt(trimmedResponse, 10);
          if (selectedOption >= 1 && selectedOption <= this.options.length) {
            return this.options[selectedOption - 1];
          } else {
            console.log("Invalid choice, please try again.");
          }
        } else {
          console.log("No response provided, please try again.");
        }
      } while (true);
    }
  }