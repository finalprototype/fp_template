export type IKeyMirror = { [key: string]: string };

export const KeyMirror = (
  keys: string[],
  preserveInput = false
): IKeyMirror => keys.reduce(
  (mirror: IKeyMirror, key: string) => {
    const saneKey = preserveInput
      ? key
      : key
        .replace(/[^A-Z0-9]/ig, '_')
        .replace(/_{2,}/g, '_')
        .toUpperCase();
    mirror[saneKey] = saneKey;
    return mirror;
  },
  {}
);

export default KeyMirror;
