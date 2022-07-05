export {};

declare global {
    interface Array<T> {
        /**
         * 数组分组
         *
         * Example 1:
         * let arr = [{name: 'aaa', age: 18}, {name: 'aaa', age: 65}, {name: 'bbb', age: 65}, {name: 'bbb', age: 18}];
         * let map = Commons.groupBy((obj) => obj.age, arr);
         *
         * Example 2:
         * let map = Commons.groupBy((obj) => obj.age >= 60 ? 'old' : 'young' , arr);
         * */
        groupBy<U>(by: (obj: T) => U): Map<U, Array<T>>;

        /**
         * 数组去重
         * Example 1:
         * let arr = [{name: 'aaa', age: 18}, {name: 'aaa', age: 65}, {name: 'bbb', age: 65}, {name: 'bbb', age: 18}];
         * let distinct = Commons.distinct(arr.map(a => a.name));
         *
         * Example 2:
         * let arr = [1, 2, 2, 3, 4, 5, 5]
         * let distinct = Commons.distinct(arr);
         * */
        distinct<T>(): T[];

        /**
         * 不推荐使用这种方式
         * 根据条件去重数组 (不符合条件的根据数组顺序添加)
         * Example 1:
         * let arr = [{name: 'aaa', age: 18}, {name: 'aaa', age: 65}, {name: 'bbb', age: 65}, {name: 'bbb', age: 18}];
         * let distinct = Commons.distinct(a => a.name, arr);
         *
         * */
        distinctBy<U>(by: (obj: T) => U): T[];

        /**
         * 获取对应下标的元素
         * 默认为0
         * 支持负数
         * */
        at<T>(index?: number): T;

        /**
         * 数组求和
         *
         * Example: 求和某个字段
         * let ageSum = arr.sum(a => a.age);
         *
         * 非number字段求和会NaN
         * */
        sum(by?: (obj: T) => number): number;

    }
}

if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function <U, T>(this: T[], by: (obj: T) => U): Map<U, Array<T>> {
        let map = new Map<U, T[]>();
        for (let i = 0; i < this.length; i++) {
            let k = by(this[i]);
            !map.has(k) && map.set(k, []);
            map.get(k).push(this[i]);
        }
        return map;
    }
}

if (!Array.prototype.distinct) {
    Array.prototype.distinct = function <T>(this: T[]): T[] {
        return [...new Set(this)];
    }
}

if (!Array.prototype.distinctBy) {
    Array.prototype.distinctBy = function <U, T>(this: T[], by: (obj: T) => U): T[] {
        let array = [];
        let set = new Set<U>();
        for (let i = 0; i < this.length; i++) {
            let k = by(this[i]);
            if (set.has(k)) continue;
            set.add(k);
            array.push(this[i]);
        }
        return array;
    }
}

if (!Array.prototype.at) {
    Array.prototype.at = function <T>(this: T[], index: number = 0): T {
        return index >= 0 ? this[index] : this[this.length + index];
    }
}

if (!Array.prototype.sum) {
    Array.prototype.sum = function <T>(this: T[], by: (obj: T) => number = (obj: T) => Number(obj)): number {
        return this.reduce((a, b) => {
            return a + by(b);
        }, 0)
    };
}


