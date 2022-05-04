/**
 * This module provides utility methods for saving to and retrieving from the local storage
 */

export class LocalStorageHelper {
    static save(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key: string) {
        const val = localStorage.getItem(key);
        if (val) return JSON.parse(val);

        return undefined;
    }

    static delete(key: string) {
        localStorage.removeItem(key);
    }
}
