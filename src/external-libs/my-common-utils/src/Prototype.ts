declare global {
    interface String {
        hashCode(): number
        format: (...arguments) => string
        replaceAll: (find: string, replace: string) => string
    }

    interface Array<T> {
        insert: (index, item: T) => void
        pushArray: (arr: [T] | T[]) => void
    }
}

export function initPrototype() {
//     //region string prototype:ex: s.format("this is {0} test {1} text", "chen vao o 0", "theo vao 1");
    String.prototype.format = function () {
        let content = this;
        for (let i = 0; i < arguments.length; i++) {
            let replacement = '{' + i + '}';
            content = content.replaceAll(replacement, arguments[i])
        }
        return content as string
    };
    String.prototype.replaceAll = function (find, replace) {
        let str = this;
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace)
    };
    String.prototype.hashCode = function () {
        let hash = 0;
        if (this.length === 0) return hash;
        for (let i = 0; i < this.length; i++) {
            let char = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };
//endregion

//region array prototypes
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item)
    };
    Array.prototype.pushArray = function (arr: [any] | any[]) {
        this.push.apply(this, arr)
    };
//endregion
}
