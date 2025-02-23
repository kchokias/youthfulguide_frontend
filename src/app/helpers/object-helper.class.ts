export class ObjectHelper {
  public static only(object: any, keys: string[]) {
    const newObject: any = {};

    for (let i = 0; i < keys.length; i++) {
      const key: string = keys[i];
      if (!object.hasOwnProperty(key)) {
        continue;
      }
      newObject[key] = object[key];
    }

    return newObject;
  }

  public static except(object: any, keys: any[]) {
    const newObject: any = {};

    for (let key in object) {
      if (!object.hasOwnProperty(key)) {
        continue;
      }
      if (keys.indexOf(key) > -1) {
        continue;
      }
      newObject[key] = object[key];
    }

    return newObject;
  }

  public static nonUndefined(object: any) {
    const newObject: any = {};

    for (let key in object) {
      if (!object.hasOwnProperty(key) || object[key] === undefined) {
        continue;
      }
      newObject[key] = object[key];
    }

    return newObject;
  }

  public static nonUndefinedKeys(object: any) {
    const keys: string[] = [];

    for (let key in object) {
      if (!object.hasOwnProperty(key) || object[key] === undefined) {
        continue;
      }
      keys.push(key);
    }

    return keys;
  }

  public static deepCopy(sourceObject: any, targetObject: any = null): object {
    if (targetObject === null) {
      targetObject = {};
    }
    return Object.assign(targetObject, JSON.parse(JSON.stringify(sourceObject)));
  }
}
