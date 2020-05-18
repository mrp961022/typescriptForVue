interface Config {
    type: string;
    url: string;
    data?: dataArr;
    dataType: string;
}
interface dataArr{
    [index:number]:object // 定义一个对象数组类型
}
export function ajax(config: Config) {
    return new Promise((resolve:(value:string)=>void, reject) => { // 定义返回值类型为字符型
        let xhr = new XMLHttpRequest();
        xhr.open(config.type, config.url, true);
        xhr.send()
        // console.log(config.data)
        xhr.onreadystatechange = function () {
            // if (xhr.readyState == 4 && xhr.status == 200) {
            //     // // console.log("成功")
            //     if (config.dataType == "json") {
            //         console.log(JSON.parse(xhr.responseText))
            //     } else {
            //         console.log(xhr.responseText)
            //     }

            // }
            if (xhr.status == 200 && xhr.readyState == 4) {
                resolve(xhr.responseText);
            }
        }
    })

}