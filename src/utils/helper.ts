export function removeDuplicatesByKey<T>(array: T[], key: string): T[] {
  const unique: T[] = [];
  const map = new Map();

  for (const item of array) {
    if (!map.has(item[key])) {
      map.set(item[key], true);
      unique.push(item);
    }
  }

  return unique;
}

export function createMap<T, R, K extends keyof T>(
  array: T[],
  key: K,
  makeValue: (item: T) => R,
): {
  [prop: string]: R;
} {
  const map: { [prop: string]: R } = {} as { [prop: string]: R };

  array.forEach((item) => {
    map[item[key] as string] = makeValue(item);
  });

  return map;
}
