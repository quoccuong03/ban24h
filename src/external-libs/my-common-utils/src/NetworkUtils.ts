export class NetworkUtils {
    /**
     * mặc định sẽ cache và lấy ở local cho lần 2 nếu đã cache
     * timeSecondCache: vd 3 day = 3*24*60*60
     * Chú ý là async function
     * Return Promise: <String> là nội dung của file ở URL
     * */
    // static async getStringFromUrlAndCache(url: string, isOnlyGetOnline: boolean = false,
    //                                       cacheSetting: { dir: string, fileName?: string, timeSecondCache?: number } = {dir: RNFetchBlob.fs.dirs.DocumentDir})
    //     : Promise<{ isFromOnline?: boolean, responseStr?: string }> {
    //     let isGetFromOffline = false;
    //     let hashCode = url.hashCode();
    //     let filePathCache = cacheSetting.dir + "/" + (cacheSetting.fileName ? cacheSetting.fileName : hashCode);
    //     let isFileCacheExits = false;
    //     if (!isOnlyGetOnline) {
    //         isFileCacheExits = await FileUtils.exists(filePathCache);
    //         let timeSecondCache = cacheSetting.timeSecondCache;
    //         if (timeSecondCache != null && timeSecondCache > 0) {
    //             let lastSecondCache = await PreferenceUtils.getNumberSetting(String(hashCode), 0);
    //             if (DataTypeUtils.getCurrentTimeSeconds() - lastSecondCache > timeSecondCache)
    //                 isGetFromOffline = isFileCacheExits;
    //         } else
    //             isGetFromOffline = isFileCacheExits;
    //         if (isGetFromOffline) {
    //             return {isFromOnline: false, responseStr: await FileUtils.readFile(filePathCache)};
    //         }
    //     }
    //     let responseStr = await this.excuteHttpGetString(url);
    //     if (!isEmpty(responseStr)) { // noinspection JSIgnoredPromiseFromCall
    //         FileUtils.writeFile(filePathCache, responseStr);
    //     }
    //     return {isFromOnline: true, responseStr: responseStr};
    // }

    static async excuteHttpGET(url): Promise<any> {
        let response = await fetch(url);
        if (response.ok) {
            console.log("excuteHttpGetString Success", url);
            return response.json();
        } else
            console.warn("excuteHttpGetString Error", url);
        throw new Error("excuteHttpGetString Error Status: " + response.status)
    }

    static async excuteHttpGetString(url): Promise<string> {
        let response = await fetch(url);
        if (response.ok) {
            console.log("excuteHttpGetString Success", url);
            return response.text();
        } else
            console.warn("excuteHttpGetString Error", url);
        throw new Error("excuteHttpGetString Error Status: " + response.status)
    }
}
