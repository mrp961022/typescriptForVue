interface Config {
    type: string;
    url: string;
    data?: string;
    dataType: string;
}
export function ajax(config: Config) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(config.type, config.url, true);
        xhr.send(config.data);
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