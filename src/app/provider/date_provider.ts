export class DateProvider {
  public static getCurrentDateAsString(): string {
    return new Date().toISOString();
  }
}
