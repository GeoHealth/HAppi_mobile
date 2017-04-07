import {CachedArray} from "../../../app/provider/cached_array";

describe('CachedArray', () => {
  beforeEach(() => {
    this.cached_array = new CachedArray<string>();
    this.cache_builder = () => {
      let arr = [];
      arr.push('string1');
      arr.push('string2');
      arr.push('string3');
      return arr;
    };
  });

  afterEach(() => {
    this.cached_array = null;
    this.cache_builder = null;
  });

  it('starts with a dirty cache', () => {
    expect(this.cached_array.isDirty()).toBeTruthy();
  });

  describe('#invalidateCache', () => {
    it('set the dirty flag to true', () => {
      this.cached_array.getCache(this.cache_builder);
      this.cached_array.invalidateCache();
      expect(this.cached_array.isDirty()).toBeTruthy();
    });
  });

  describe('#getCache', () => {
    it('returns the cache built from the received builder function when cache is dirty', () => {
      expect(this.cached_array.isDirty()).toBeTruthy();
      let received_array = this.cached_array.getCache(this.cache_builder);
      expect(received_array).toEqual(this.cache_builder());
    });

    it('set the dirty flag to false', () => {
      this.cached_array.getCache(this.cache_builder);
      expect(this.cached_array.isDirty()).toBeFalsy();
    });
  });
});
