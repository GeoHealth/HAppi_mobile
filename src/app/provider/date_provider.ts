export class DateProvider {
  public static getCurrentISODateAsString(): string {
    return new Date().toISOString();
  }
}
