interface Config {
    type: string; // get/post
    url: string; // url路径
    data?: DataObj; // 入参 没有就不填
    dataType?: string; // 返参类型
    contentType?: string; // 请求头 默认application/json
    timeOut?: number | string; // 超时时间 默认6秒 单位秒
}
interface DataArr {
    [index: number]: object // 定义一个对象数组类型
}
interface DataObj {
    [index: string]: number | string | Array<string | number> // 定义入参类型
}
export function ajax(config: Config) {
    return new Promise((resolve: (value: string) => void, reject: (value: string) => void) => { // 定义返回值类型为字符型
        let data = config.data || {}, timeOut = Number(config.timeOut);
        config.type === config.type.toLocaleLowerCase()
        let urlData: string = Object.entries(data).map(([key, val]) => `${key}=${val}`).join("&")
        // entries 将对象转成可迭代类型数据 数组中包含键和值 {a:1,b:2} => [["a",1],["b",2]]
        // 箭头函数不带大括号相当于{return ***}
        let xhr = new XMLHttpRequest();
        if (config.type.toLocaleLowerCase() === "get" && urlData) {
            xhr.open(config.type, `${config.url}?${urlData}`, true);
        } else {
            xhr.open(config.type, config.url, true);
        }
        if (config.contentType) {
            xhr.setRequestHeader("Content-Type", config.contentType)
            xhr.send(urlData);
        } else {
            xhr.send(config.type === "get" ? null : JSON.stringify(data))
        }
        xhr.timeout = (timeOut || 6) * 1000;
        xhr.ontimeout = (event) => {
            alert("请求超时！");
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) { // ajax请求最后一步 一共四步
                if (xhr.status === 200) { // 状态码
                    resolve(xhr.responseText)
                } else {
                    reject(`${config.type.toLocaleUpperCase()} ${xhr.responseURL} ${xhr.status} (${xhr.statusText})`)
                    if (xhr.statusText) {
                        alert(xhr.status) // 有返回值 5++ 4++ 状态报错
                    } else {
                        alert("断网啦！") // 没有返回值即为用户或服务器断网了
                    }
                }
            }
        }
    })

}