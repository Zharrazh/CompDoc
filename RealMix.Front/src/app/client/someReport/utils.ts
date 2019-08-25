export const groupBy = <T>(array: T[], selector: (model: T) => string) => {
  const map = array.reduce((p, c) => {
    const key = selector(c);
    if (p.has(key)) {
      const array = p.get(key);
      if (array != null) array.push(c);
    } else {
      p.set(key, [c]);
    }
    return p;
  }, new Map<string, T[]>());
  return Array.from(map).map(([key, value]) => ({ name: key, items: value }));
};
