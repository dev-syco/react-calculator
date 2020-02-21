export class Enum {
  static getKeys(E: any) {
    return Object.keys(E);
  }

  static getValues(E: any) {
    return Enum.getKeys(E).map(k => E[ k as any ]);
  }
}
