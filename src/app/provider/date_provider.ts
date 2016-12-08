export class DateProvider {
  public static getCurrentISODateAsString(): string {
    return new Date().toISOString();
  }

  public static getCurrentLocaleDateAsString(): string {
    return new Date().toString();
  }

  public static getCurrentDate(): Date {
    return new Date;
  }
}
