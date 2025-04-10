import { Boss } from "./Boss";

/**
 * A factory class for creating monster instances.
 */
export class MonsterFactory {
  /**
   * Creates and returns a new Boss instance.
   * @returns A new Boss instance with the name "The Dark Overlord".
   */
  static getBoss(): Boss {
    return new Boss("The Dark Overlord");
  }
}