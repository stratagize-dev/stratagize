class TwoWayMap<K, V> {
  private keyToValue: Map<K, V> = new Map();
  private valueToKey: Map<V, K> = new Map();

  // Add key-value pair to both maps
  set(key: K, value: V): void {
    this.keyToValue.set(key, value);
    this.valueToKey.set(value, key);
  }

  // Get value by key
  getByKey(key: K): V | undefined {
    return this.keyToValue.get(key);
  }

  // Get key by value
  getByValue(value: V): K | undefined {
    return this.valueToKey.get(value);
  }

  // Check if a key exists
  hasKey(key: K): boolean {
    return this.keyToValue.has(key);
  }

  // Check if a value exists
  hasValue(value: V): boolean {
    return this.valueToKey.has(value);
  }
}
