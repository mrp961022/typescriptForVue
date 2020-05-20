interface Config {
    type: string; // get/post
    url: string; // url路径
    data?: string; // 入参 没有就不填
    dataType?: string; // 返参类型
    contentType?: string; // 请求头 默认application/json
}
interface dataArr {
    [index: number]: object // 定义一个对象数组类型
}
export function ajax(config: Config) {
    return new Promise((resolve: (value: string) => void, reject) => { // 定义返回值类型为字符型
        let xhr = new XMLHttpRequest();
        if (config.type.toLocaleLowerCase() == 'get') {
            xhr.open(config.type, `${config.url}${config.data ? "?" + config.data : ""}`, true);
        } else {
            xhr.open(config.type, `${config.url}`, true);
        }
        if (config.contentType) {
            xhr.setRequestHeader('Content-Type', config.contentType)
        }
        xhr.send(config.data);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(xhr)
                }
            }
        }
    })

}