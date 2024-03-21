import { cache } from "swr/_internal";
export default function ClearCacheSWRPartialKey(partialKeys) {
  const isArr = Array.isArray(partialKeys);
  const partialKeysArr = isArr ? partialKeys : [partialKeys];
  for (const key of cache.keys()) {
    partialKeysArr.forEach((partialKey) => {
      if (key.includes(partialKey)) {
        cache.delete(key);
      }
    });
  }
}