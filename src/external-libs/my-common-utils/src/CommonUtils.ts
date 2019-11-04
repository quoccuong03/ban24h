export class CommonUtils {

    public static wait(timeMili: number): Promise<void> {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve()
            }, timeMili)
        })

    };
}
