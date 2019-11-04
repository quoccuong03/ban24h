import {isEmpty} from "./CommonFunction";

export class DataTypeUtils {

    //region interpolate: Phương pháp nội suy tính giá trị giữa 2 giá trị cho trước với đầu vào là giá trị trong [0-1]

    /**  input: giá trị giữa [0-1] => return giá trị trong [a, b] */
    static interpolateNumber(valueIn0_1: number, a: number, b: number) {
        return a * (1 - valueIn0_1) + b * valueIn0_1
    }

    //endregion

    // Returns minEqual <= value <= maxEqual
    static getRandomInt(minEqual, maxEqual) {
        return Math.floor(Math.random() * (maxEqual - minEqual + 1)) + minEqual;
    }

    /**
     * Result sample: 05:09
     */
    static convertTimeDisplayInPlay(second: number): string {
        let hrs = ~~(second / 3600);
        let mins = ~~((second % 3600) / 60);
        let secs = ~~second % 60;

        let ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret
    }

    static getCurrentTimeSeconds(): number {
        let d = new Date();
        return Math.floor(d.getTime() / 1000);
    }

    static getCurrentTimeMiliseconds(): number {
        let d = new Date();
        return d.getTime();
    }

    static htmlToString(htmlSource): string {
        if (htmlSource)
            return htmlSource.replace(/<(?:.|\n)*?>/gm, '').trim();
        return htmlSource;
    }

    static convertTiengVietKoDau(str: string){
        str = str.toLowerCase();
        //Conver thanh Tieng viet khong dau
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        return str;
    }

    static getCleanString(str: string) {
        if (isEmpty(str)) return str;

        str = str.toLowerCase();
        //Conver thanh Tieng viet khong dau
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Xoa cac ky tu dang biet
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
        str = str.replace(/’|（|）|？|，|…|。| |！|；/g, "");
        str = str.replace(/ + /g, ""); // Xoa khong trong o giua
        str = str.trim();
        return str;
    }

    //
    // /** Return [0 - 1]: 1 => equal*/
    // static getPercentSameOfTwoWord(str1: string, str2: string) {
    //     if (isEmpty(str1) || isEmpty(str2)) return 0;
    //     str1 = this.getCleanString(str1);
    //     str2 = this.getCleanString(str2);
    //     let maxLength = Math.max(str2.length, str1.length);
    //     let distance = this.getDistanceString(str1, str2);
    //     return 1 - distance / maxLength;
    // }
    //
    // /**Return số ký tự khác nhau của 2 chuỗi*/
    // static getDistanceString(a: string, b: string) {
    //     if (a.length === 0) return b.length;
    //     if (b.length === 0) return a.length;
    //
    //     let matrix = [];
    //
    //     // increment along the first column of each row
    //     let i;
    //     for (i = 0; i <= b.length; i++) {
    //         matrix[i] = [i];
    //     }
    //
    //     // increment each column in the first row
    //     let j;
    //     for (j = 0; j <= a.length; j++) {
    //         matrix[0][j] = j;
    //     }
    //
    //     // Fill in the rest of the matrix
    //     for (i = 1; i <= b.length; i++) {
    //         for (j = 1; j <= a.length; j++) {
    //             if (b.charAt(i - 1) === a.charAt(j - 1)) {
    //                 matrix[i][j] = matrix[i - 1][j - 1]
    //             } else {
    //                 matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
    //                     Math.min(matrix[i][j - 1] + 1, // insertion
    //                         matrix[i - 1][j] + 1)) // deletion
    //             }
    //         }
    //     }
    //
    //     return matrix[b.length][a.length];
    // }
}
