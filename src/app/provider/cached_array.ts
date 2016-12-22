export class CachedArray<T> {
  private is_dirty: boolean;
  private values: T[];

  constructor() {
    this.is_dirty = true;
  }

  invalidateCache(): void {
    this.is_dirty = true;
  }

  getCache(cacheBuilder: () => T[]): T[] {
    if (this.is_dirty) {
      this.values = cacheBuilder();
      this.is_dirty = false;
    }
    return this.values;
  }

  isDirty(): boolean {
    return this.is_dirty;
  }
}
