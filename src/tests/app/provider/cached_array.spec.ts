import {CachedArray} from "../../../app/provider/cached_array";
describe('CachedArray', () => {
  let cached_array: CachedArray<string>;

  let cache_builder = () => {
    let arr = [];
    arr.push('string1');
    arr.push('string2');
    arr.push('string3');
    return arr;
  };

  beforeEach(() => {
    cached_array = new CachedArray<string>();
  });

  it('starts with a dirty cache', () => {
    expect(cached_array.isDirty()).toBeTruthy();
  });

  describe('#invalidateCache', () => {
    it('set is_dirty to true', () => {
      cached_array.getCache(cache_builder);
      cached_array.invalidateCache();
      expect(cached_array.isDirty()).toBeTruthy();
    });
  });

  describe('#getCache', () => {
    it('returns the cache built from the received builder function when cache is dirty', () => {
      expect(cached_array.isDirty()).toBeTruthy();
      let received_array = cached_array.getCache(cache_builder);
      expect(received_array).toEqual(cache_builder());
    });

    it('set the dirty flag to false', () => {
      cached_array.getCache(cache_builder);
      expect(cached_array.isDirty()).toBeFalsy();
    });
  });
});
