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
## 操作步骤
### 创建vue项目 vue init webpack **** 然后根据需要enter
### 安装需要的依赖 cnpm i typescript ts-loader@^3.5.0 --save-dev
### 修改项目配置 增加ts-loader build/webpack.base.conf.js
``` bash
// resolve
extensions: ['.js', '.vue', '.json', '.ts']
// module>rules
{
    test: /\.(tsx|ts)?$/, // tsloader
    loader: 'ts-loader',
    exclude: /node_modules/,
    options: {
        appendTsSuffixTo: [/\.vue$/],
    }
}
```
### 在src根目录新增vue-shims.d.ts 内容如下
### **.d.ts文件是ts语法的忽略项 有些静态引入的js可以在这里设置
``` bash
declare module "*.vue" {
    import Vue from "vue"
    export default Vue
}
```
### 项目根目录创建typescript的配置文件tsconfig.json 可以在根目录使用tsc --init生成 配置内容我不太懂
``` bash
{
  "compilerOptions": {
    "strict": true,
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es5",
    // "outDir": "./", // 导出目录
    "allowSyntheticDefaultImports": true,
    "declaration": false,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowJs": true,
    "lib": [
      "es2017",
      "es2016",
      "dom"
    ]
  },
  "include": [ // 设置哪部分代码需要进行ts转义
    "src/**/*"
  ]
}

```
### main.js => main.ts 修改build/webpack.base.conf.js中的entry中的main.js => main.ts
### 修改App.vue <script lang="ts">
### 修改main.ts中App组件的引入带上.vue
### 安装vue官方推荐插件 vue-class-component cnpm i vue-class-component --save
### 项目根目录增加一个postcss.config.js文件 ts默认不支持css样式引入 需要这个文件
``` bash
module.exports = {
    plugins: {
        'autoprefixer': {
            browsers: 'last 5 version'
        }
    }
}
```
### 修改vue文件 详见HelloWord.vue
``` bash
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";  // vue推出的一种转为typescript的依赖
// @Component 修饰符注明了此类为一个 Vue 组件 装饰器
import newTitle from "./newTitle.vue";
@Component({
    // name props watch components
    name: "hello",
    components: {
        newTitle
    }
})
export default class Hello extends Vue {
  // 变量 方法 生命周期 计算属性
}
<script>
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
var(let) nowDate:date = new Date();

# 变量赋值 只能赋值定义的类型数据
nowDate = 1 //错误
nowDate = new Date('2020-01-01') //正确

# 如果变量是dom元素 需要定义为any类型
let dom: any = document.querySelector(".hello .el-table__body-wrapper");

# 声明方法 需要定义入参及返回值的类型，如果没有返回值类型就是void
function eat(type:string):string{
    return type+'meat'
}

```

### typescript的各种数据类型

#### 布尔类型 (boolean)

#### 数值类型 (number)

#### 字符串类型 (string)

#### JavaScript里的各种类型等等……

#### typescript声明类型需要小写 声明数组类型要大写

#### 元组类型 (tuple) 数组的一种 可以设置多种类型的数组

``` bash 
let flag: boolean = true;  // typescript 声明变量需要定义类型 且类型不能改变
flag = false  // 正确
// falg = 1  // 错误
let a: number = 123;
a = 123.2
let str: string = "this is ts"
str = "yes,it is ts"
```
#### 数组类型
``` bash
let arr: Array<number> = [1, 2, 3]  // 定义变量需要指定类型
let arr1: Array<number | string> = [1, 2, 3, "3"] // 可以指定多个类型
let arr2: string[] = ["1", "2"] // 另一种方式定义类型
```

#### 元组类型（数组一种）
``` bash
let arr3: [string, number, boolean] = ["1", 2, true] // 可以指定数组中每个值的类型
```

#### 枚举类型 主要用于定义标识符
``` bash
enum Flag { success = 1, error = -1 }
let f = Flag.success;
let l = Flag.error;
enum Color { red, blue, orange } // 没有赋值默认为索引值 如果其中有一个为数字的话 后面的元素在他基础上递增
let clr = Color.blue;
```

#### 任意类型any undefined null never
``` bash
let numAny: any = 1; // 任意类型可以随意赋值 主要用于获取dom节点
numAny = "2"
// let oBox: any = document.getElementById("box");
// oBox.style.color = "red"
// let num1: number
// console.log(num1) // 报错
let num1: undefined | number | null
// console.log(num1) // 正确
```

#### void 类型 没有任何类型 一般用于方法没有返回值
``` bash
function run(): void {
}
function eat(animal: string): string { // 方法需要定义返回值类型 如果没有就是void 入参也要定义类型
  return animal + " eat meat"
}
```
#### never 类型 表示从不会出现的值
``` bash
let aa: never; // 其他类型 基本用不上
// aa = 1; // 错误
aa = (() => {
  throw new Error("错误") //抛出一个异常
})()
```

#### ts中的函数 ts中方法传参的类型需要指定
#### 见上方 run 方法和 eat 方法  ts定义函数与es5基本相同 但需要指定入参及返回值类型
#### 匿名函数定义方式
``` bash
let run1 = function (type: string, toy: string): void {
}
run1("cat", "ball")
```

#### 方法可选参数 ? 可选 可以不用传指定参数
``` bash
let run2 = function (type: string, toy?: string): void {
}
run2("cat")
```

#### 默认参数 如果有默认参数 默认参数可以不用写
``` bash
let getInfo = function (name: string, age: number = 20) {
}
getInfo("老王")
```

#### 剩余参数 三点运算符 接收形参传过来的值 如果前面有形参 有几个就对应入参的几个 其他的放在数组中
``` bash
function sum(str: string, ...num: number[]): string {
  let sum: number = 0
  for (let i: number = 0; i < num.length; i++) {
    sum += num[i]
  }
  return str + sum
}

```
#### 函数重载 两个或者两个以上重名函数 但参数不一样 这时会出现函数重载的情况
#### ts实现类似java的变成的写法 用于限定入参
#### ts中的重载 参数不一样
``` bash
function run3(name: string): string;
function run3(age: number): number;
function run3(str: any): any {
  if (typeof str == "string") {
    return str
  } else {
    return str
  }
};
```

#### ts重载 参数一样
``` bash
function run4(name: string): string;
function run4(name: string, age: number): string;
function run4(name: any, age?: any): any {
  if (age) {
  } else {
  }
};
run4("王小二")
run4("王小二", 18)
// run4(111,222) // 错误写法
```

#### ts中的类
``` bash
class Person {
  name: string   // 前面省略public关键词
  constructor(name: string) {  // 构造函数 实例化时触发的方法 实例化时的入参
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name
  }
  run(): void {
  }
}

let p = new Person("张三")
```

#### ts中的继承  extends super关键字 ts中父类方法与子类方法一致 子类可拓展自己方法
#### ts类里的修饰符 三种修饰符
#### public  共有的 类里面 子类 类外面都可访问 默认为public
#### protected  保护类型 在类和子类中可以访问 类外部不能访问
#### private  私有类型 只能在类里可以访问 不能在子类或者类外访问

``` bash
class Person1 {
  protected name: string // 保护类型 不能再外部访问
  constructor(name: string) {
    this.name = name;
  }
  public eat(): string {  // 共有类型 可以在任何地方访问
    return this.run();
  }
  private run(): string { // 私有类型 只能在此类中使用
    return `${this.name}在运动`
  }
}

class Student extends Person1 { // extends 和 super初始化父类属性和方法
  constructor(name: string) {
    super(name);
  }
  study(): void {
  }
  // run(): string {
  //   return `${this.name}没在运动` // 若父类与子类有相同方法 会执行子类方法
  // }
}
let pa = new Person1("老李")
let p1 = new Student("李四")
// p1.study()
```

#### ts中的类  静态方法 静态方法想要访问属性需要将变量定义为静态属性
``` bash
class Person2 {
  name: string
  static age: number = 20 // 静态属性
  constructor(name: string) {
    this.name = name;
  }
  run(): void {
  }
  work(): void {
  }
  static print(): void {
  }
}
let p2 = new Person2("小赵")
```

#### 多态 父类定义一个方法不去实现 让他的子类去实现 每一个子类有不同的表现
#### 多态也是继承的一种表现 属于继承
``` bash
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  eat(): void {
  }
}
class Dog extends Animal {  // 子类1
  constructor(name: string) {
    super(name)
  }
  eat(): string {  // 重写父类的方法
    return this.name + "吃肉"
  }
}
class Cat extends Animal {   // 子类2
  constructor(name: string) {
    super(name)
  }
  eat(): string {  // 重写父类的方法
    return this.name + "吃老鼠"
  }
}
```

#### 抽象方法 只能放在抽象类中 不能被直接实例化
#### 抽象类和抽象方法定义标准  例 Animal 要求子类必须包含 eat 方法
#### 父类不包含抽象类的实现 具体在子类中实现

``` bash
abstract class Animal1 {
  name: string
  constructor(name: string) {
    this.name = name;
  }
  abstract eat(): any;
}
class Dog1 extends Animal1 {
  // 抽象类子类必须实现抽象类中的抽象方法
  constructor(name: string) {
    super(name)
  }
  eat() {
    return `${this.name}吃肉`
  }
}
class Cat1 extends Animal1 {
  constructor(name: string) {
    super(name)
  }
  eat() {
    return `${this.name}吃老鼠`
  }
}
// let dog1 = new Dog1("小黑")
let cat1 = new Cat1("小黄")
```

#### ts中的接口 接口是一种程序规范 对属性、函数、类的行为进行约束
``` bash
function printLabel(label: string): void { // 约束传入参数必须是一个并且为字符串类型
}
```
#### 对传入参数json的约束
``` bash
function printLabel1(labelInfo: { label: string }): void { // 约束传入参数必须是对象 对象内必须有leabel字符串
}
printLabel1({ label: "11111" })
```

#### 属性接口 对方法入参批量约束 限制入参的格式
``` bash
interface FullName {
  firstName: string;
  lastName: string;
  age?: number; // 可选属性 可以不传
}
function outName(fullName: FullName): void { // 要求传入对象 必须有firstName lastName 且必须为string类型
}
function cnStrudnt(fullName: FullName): void {
}
outName({ firstName: "布鲁斯", lastName: "李" })
cnStrudnt({ firstName: "王", lastName: "小二" })
```

#### ts封装ajax  不支持ie6
``` bash
interface Config {
  type: string;
  url: string;
  data?: string;
  dataType: string;
}
function ajax(config: Config) {
  let xhr = new XMLHttpRequest();
  xhr.open(config.type, config.url, true);
  xhr.send(config.data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (config.dataType == "json") {
      } else {
      }

    }
  }
}
ajax({
  type: "get",
  url: "http://a.itying.com/api/productlist", // url接口
  data: "",
  dataType: "json"
})
```

#### 函数类型接口 对方法传入参数及返回值进行约束
#### 加密的函数类型接口
``` bash
interface encrypt {
  (key: string, value: string): string; // 声明入参为 key 和 value 的字符串 返回值为字符串的约束
}
let md5: encrypt = function (key: string, value: string): string { // 必须有key value且为字符串 返回值必须为字符串
  return `${key}${value}`
}
let sha1: encrypt = function (key: string, value: string): string {
  return `${value}${key}`
}
```

#### 可索引接口 对数组对象的约束 不常用
``` bash
// let arr4: number[] = [1, 2, 3]
// let arr5: Array<number> = [1, 2, 3]
interface UserArr {
  [index: number]: number
}
interface UserObj {
  [index: string]: number | string
}
let arr4: UserArr = [1, 2, 3] // 数组约束
let obj: UserObj = { name: "王", age: 20 } // 对象约束
```

#### 类类型接口 对类的约束 和抽象类相似
``` bash
interface DongWu {
  name: string; // 属性
  eat(str: string): void; // 方法 必须有 但是可以不用写入参
}

class Dog2 implements DongWu {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat(str: string): void {
  }
}
class Cat2 implements DongWu {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
  }
}
let d = new Dog2("小黑")
d.eat("肉")
let c = new Cat2("小花")
c.eat()
```

#### 接口拓展 接口可以继承接口
``` bash
interface Animal2 {
  eat(): void;
}
interface Person3 extends Animal2 { // 注意不要和类或者其他接口重名
  work(): void;
}
class WorkMan {
  name: string
  constructor(name: string) {
    this.name = name;
  }
  harder(work: string): void {
  }
}
class WebWorker extends WorkMan implements Person3 { // 定义的类要有 eat 和 work 方法
  constructor(name: string) { // 可以类和接口一起继承
    super(name)
  }
  work(): void {
  }
  eat(): void {
  }
}
let wang = new WebWorker("小王")
wang.work()
wang.eat()
wang.harder("C++")
```

#### ts中的泛型 解决类、方法、接口可复用性
``` bash
function getData<T>(value: T): T { // 泛型的 T 可以选择任意大写字母
  return value
}
getData<number>(123) // 约束入参格式 
```

#### 泛型类
#### 最小推算法 同时支持字符串和数字两种类型 用过泛型来实现
``` bash
class MinClass<T>{
  public list: T[] = [];
  add(value: T): void {
    this.list.push(value)
  }
  min(): T {
    let minNum = this.list[0];
    for (let i: number = 1; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i]
      }
    }
    return minNum
  }
}
let numList = new MinClass()
// let numList1 = new MinClass<string>() // 如果指定类型则只能使用指定类型
numList.add(1)
numList.add("0")
numList.add("2")
numList.add(1)
```

#### 泛型接口
#### 第一种定义泛型接口
``` bash
interface Configfn {
  <T>(value1: T): T;
}
let setData: Configfn = function <T>(value: T): T {
  return value
}
// alert(setData<string>("张三")) // 指定入参格式
```

#### 第二种定义泛型
``` bash
interface Configfn1<T> {
  (value: T): T;
}
let setData1: Configfn1<string> = function (value: string): string {
  return value
}
```

#### 泛型类 把类作为参数来约束参数的泛型类
#### 定义一个user类 映射数据库字段
#### 定义一个MysqlDB的类 用于操作数据库
#### 把user类作为参数传入MysqlDB

``` bash
class MysqlDB<T>{
  add(info: T): boolean {
    return true;
  }
  update(info: T, id: number): boolean {
    return true
  }
}
class User {
  userName: string | undefined;
  passWord: string | undefined;
  constructor(userName: string, passWord: string) {
    this.userName = userName;
    this.passWord = passWord
  }
}
class ArticlaCate {
  title: string | undefined;
  desc: string | undefined;
  status: number | undefined;
  id: number | undefined;
  constructor(params: { title: string, desc: string, status?: number, id?: number }) {
    this.title = params.title;
    this.desc = params.desc;
    this.status = params.status;
    this.id = params.id;
  }
}
let user1 = new User("wang", "123456")
let userDB = new MysqlDB<User>() // 在这里对数据约束
// userDB.add(user1)

let aaa = new ArticlaCate({ title: "国内", desc: "国内新闻", status: 111 })
aaa.id = 111
let db = new MysqlDB<ArticlaCate>()  // 在这里对数据约束
// db.add(aaa)
db.update(aaa, 11)
```

#### ts封装统一操作 mysql mongodb mssql的底层库
#### 代码重用
``` bash
interface DBI<T> {
  add(info: T): boolean;
  update(info: T, id: number): boolean;
  delete(id: number): boolean;
  get(id: number): any[];
}
```

#### ts中的模块 把一些公共功能分离出去 使用 export 暴露 其他文件需要使用的时候 import 引入
``` bash
import { UserClass, UserModel } from "./model/user"
import { ArticleClass, ArticleModel } from "./model/atricle"
let u = new UserClass()
u.userName = "zhangsan"
u.passWord = "123456"
// UserModel.add(u)
// UserModel.get(11)

let article = new ArticleClass();
article.title = "中国"
article.desc = "中国地理"
article.id = 1232332
// ArticleModel.get(1232332)
```

#### ts中的命名空间  组织代码 避免命名空间
``` bash
import { A, B } from "./moduls/namespace"
let ADog = new A.Dog("狼狗")

let BDog = new B.Dog("大黄狗")
```

#### ts中的装饰器 类装饰器 属性装饰器 方法装饰器等等
#### 类装饰器
#### 普通装饰器 传入 params 当前类
``` bash
function logClass(params: any) {
  // params就是当前类 可以在这里拓展属性或者方法
   params.prototype.apiUrl = "xxxx" // 动态拓展的属性
   params.prototype.run = function (): void {
   }
}
@logClass       // 调用装饰器 在那个上面写就是装饰那个
class HttpClient {
 constructor() {
 }
getData(): void { }
}

// let http: any = new HttpClient();
```

#### 装饰器工厂 带参数的装饰器 应用比较多
``` bash
function logClass1(params: string) {
  return function (target: any) {
    target.prototype.apiUrl = params
  }
}
@logClass1("http://www.itying.com/api")
class HttpClient1 {
  constructor() {

  }
  getData(): void { }
}
let http1: any = new HttpClient1()
```

#### 类装饰器重载构造函数 每个属性 方法都要修改
``` bash
function logClass2(target: any) {
  return class extends target {
    apiUrl: string = "我是修改后的数据"
    getData() {
    }
  }
}
@logClass2
class HttpClient2 {
  public apiUrl: string | undefined
  constructor() {
    this.apiUrl = "我是构造函数里面的apiUrl"
  }
  getData(): void {
  }
}

let http2 = new HttpClient2();
// http2.getData()
```

#### 属性装饰器 接收两个参数 原型对象 当前属性名称
#### 类装饰器
``` bash
function logClass3(params: string) {
  return function (target: any) {
    target.prototype.apiUrl = params
  }
}
// 属性装饰器
function logProperty(parmas: any) {
  return function (target: any, attr: any) {
    // target 类
    // attr 装饰器装饰的属性 写在那个属性前面
    target[attr] = parmas;
  }
}
@logClass3("xxx")
class HttpClient3 {
  @logProperty('http://itying.com')
  public url: string | undefined
  constructor() {

  }
  getData(): void {
  }
}
let http3: any = new HttpClient3()
// 装饰器
function get(parmas: any) {
  return function (target: any, methodName: any, desc: any) {
    // target 方法的原型对象
    // cmethodName 方法的名称
    // desc 方法的属性描述 里面的value就是方法
    // target.apiUrl = "xxx"
    // target.run = function (): void {
    // }
    // 修改装饰器的方法 把装饰器方法传入所有参数改为string
    // 1.保存当前方法
    var oMethod = desc.value;
    // 替换当前方法
    // 修改当前方法 对象冒充
    desc.value = function (...args: any[]) {
      args = args.map((item) => {
        return String(item);
      })
      oMethod.apply(this, args) // 对象冒充
    }
  }
}
class HttpClient4 {
  public url: string | undefined
  constructor() {

  }
  @get('http://www.itying.com')
  getData(...args: any[]): void {
  }
}

var http4: any = new HttpClient4();
```

#### 方法参数装饰器 为类的原型添加一些元数据 用的比较少
``` bash
function logParams(params: any) {
  return function (target: any, paramsName: any, paramsIndex: any) {
    target.apiUrl = params
  }
}
class HttpClient5 {
  public url: string | undefined
  constructor() {

  }
  getData(@logParams('xxxx') uid: any): void {
  }
}

var http5: any = new HttpClient5();
```

#### 各种装饰器的执行顺序
#### 属性装饰器=>放啊发装饰器=>方法参数装饰器=>类装饰器
#### 如果有多个同类装饰器 从后往前执行 例 两个方法装饰器会先执行最后一个方法装饰器
``` bash
import { zsq } from './moduls/zsq'
@zsq.logClass1('http://www.itying.com')
@zsq.logClass2('xxxx')
class HttpClient6 {
  @zsq.logAttribute()
  public url: string | undefined
  constructor() {

  }
  @zsq.logMethods()
  getData(): void { }
  setData(@zsq.logParams1() attr1: any, @zsq.logParams2() attr2: any) { }
}
var http: any = new HttpClient6();
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
