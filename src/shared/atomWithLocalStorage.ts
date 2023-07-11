import { atom, PrimitiveAtom, SetStateAction } from 'jotai';

type Storage<Value> = {
  getItem: (key: string) => Value;
  setItem: (key: string, newValue: Value) => void;
};

const defaultStorage = <Value>() => {
  const foo: Storage<Value> = {
    getItem: key => {
      const storedValue = localStorage.getItem(key);
      if (storedValue === null) {
        throw new Error('no value stored');
      }
      return JSON.parse(storedValue);
    },
    setItem: (key, newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return foo;
};

export function atomWithLocalStorage<Value>(
  key: string,
  initialValue: Value
): PrimitiveAtom<Value> {
  const storage = defaultStorage<Value>();

  const getInitialValue = () => {
    try {
      return storage.getItem(key);
    } catch {
      return initialValue;
    }
  };

  const fooBaa = getInitialValue();
  console.debug('stuart', `setting inital value for ${key}`, fooBaa);
  const baseAtom = atom(fooBaa);

  baseAtom.onMount = setAtom => {
    Promise.resolve(getInitialValue()).then(setAtom);
  };

  const anAtom = atom(
    get => get(baseAtom),
    (get, set, update: SetStateAction<Value>) => {
      const newValue =
        typeof update === 'function'
          ? (update as (prev: Value) => Value)(get(baseAtom))
          : update;
      set(baseAtom, newValue);
      storage.setItem(key, newValue);
    }
  );

  return anAtom;
}
