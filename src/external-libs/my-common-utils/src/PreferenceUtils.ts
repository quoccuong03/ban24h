export class PreferenceUtils {
    static saveBooleanSetting(key: string, value: boolean) {
        return this.saveSeting(key, value ? "1" : "0")
    }

    static getBooleanSetting(key: string, defautValue = false): boolean {
        let str = localStorage.getItem(key);
        if (str) return str === "1";
        return defautValue;
    }

    static saveObject(key: string, value) {
        if (!value) {
            return localStorage.removeItem(key)
        }
        return localStorage.setItem(key, JSON.stringify(value))
    }

    static getObject(key: string) {
        let jsonStr = localStorage.getItem(key);
        if (jsonStr) {
            try {
                return JSON.parse(jsonStr)
            } catch (e) {
                console.log("====== getObject ERROR: ", e, jsonStr)
            }
        }
    }

    static saveSeting(key: string, value: any) {
        if (value === undefined || value === null) {
            return localStorage.removeItem(key)
        }
        return localStorage.setItem(key, String(value))
    }

    static getStringSetting(key: string): string {
        return localStorage.getItem(key)
    }

    static getNumberSetting(key: string, defaultValue = 0): number {
        let setting = localStorage.getItem(key);
        if (setting)
            return Number(setting);
        return defaultValue
    }

    static deleteKey(key: string) {
        return localStorage.removeItem(key)
    }


    //region Save list object ==========
    static getList<T>(key: string): T[] {
        return this.getObject(key)
    }


    static pushToList(key: string, item: any) {
        let list = this.getList(key) || [];
        list.push(item);
        this.saveObject(key, list)
    }

    //endregion
}

