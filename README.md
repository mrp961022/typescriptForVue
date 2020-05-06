# 简介 这是一个vue-cli结合typescript的项目，里面有详细的配置

>详细步骤请转接到这位大佬的简书：https://www.jianshu.com/p/fba9fd362858 欢迎star 

# vue-typescript

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 变量声明

### javascript

``` bash

# 定义变量
var(let) nowDate = new Date();

# 变量赋值 可以任意赋值
nowDate = 1  //正确

# 如果变量是dom元素
let dom = document.querySelector(".hello .el-table__body-wrapper");

# 声明方法
function eat(type){
    return type+'meat'
}

```

### typescript

``` bash

# 定义变量
var(let) nowDate:Date = new Date();

# 变量赋值 只能赋值定义的类型数据
nowDate = 1 //错误
nowDate = new Date('2020-01-01') //正确

# 如果变量是dom元素 需要定义为any类型
let dom: any = document.querySelector(".hello .el-table__body-wrapper");

# 声明方法 需要定义入参及返回值的类型，如果没有返回值类型就是void
function eat(type:String):String{
    return type+'meat'
}

```

### typescript的各种数据类型

#### 布尔类型 (Boolean)

#### 数值类型 (Number)

#### 字符串类型 (Array)

#### JavaScript里的各种类型等等……

#### 元组类型 (tuple) 数组的一种 可以设置多种类型的数组

``` bash
let arr: [number, string] = [1, 'ss']; // 对应的左边几个，右边就几个 
```

#### 枚举类型 (enum) 用于声明一种新的“数据类型”

``` bash
enum FlagName {
  success = 1,
  error = 4
}
var s: FlagName = FlagName.success
var f: FlagName = FlagName.error

```

#### null 和 undefined

#### void 类型 无类型 在方法没有返回值时使用

#### never 类型 其他类型 代表从不会出现的值

``` bash
var aaa: never;
aaa=123 // 错误 never类型数据不能被赋值
```

#### any 类型 任意类型 应用于dom元素 其他情况尽量不要使用

#### 声明多种类型的变量 (用于不确认类型时使用)

``` bash
let aaa:any || let aaa:String|Number // 尽量使用第二种 声明一个为字符串或者数值型的变量 如果变量是dom元素使用第一种方式声明变量
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
