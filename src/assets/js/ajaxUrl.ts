interface Config {
    type: string; // get/post
    url: string; // url路径
    data?: DataObj; // 入参 没有就不填
    dataType?: string; // 返参类型
    contentType?: string; // 请求头 默认application/json
}
interface DataArr {
    [index: number]: object // 定义一个对象数组类型
}
interface DataObj {
    [index: string]: number | string | Array<string | number> // 定义一个对象类型 参数为字符串数值或者数组类型
}
export function ajax(config: Config) {
    return new Promise((resolve: (value: string) => void, reject) => { // 定义返回值类型为字符型
        let data = config.data || {}
        let urlData: string = "";
        for (var i in data) {
            typeof data[i] == 'object' ? data[i] += '' : data[i]
            urlData += `${i}=${data[i]}&`
        }
        urlData = urlData.substr(0, urlData.length - 1) || urlData
        let xhr = new XMLHttpRequest();
        if (config.type.toLocaleLowerCase() == 'get') {
            xhr.open(config.type, `${config.url}${urlData ? "?" + urlData : ""}`, true);
        } else {
            xhr.open(config.type, `${config.url}`, true);
        }
        if (config.contentType) {
            xhr.setRequestHeader('Content-Type', config.contentType)
        }
        xhr.send(urlData);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(xhr.responseText)
                } else {
                    reject(`${config.type.toUpperCase()} ${xhr.responseURL} ${xhr.status} (${xhr.statusText})`)
                }
            }
        }
    })

}