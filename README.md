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

#### 字符串类型 (Array)

#### JavaScript里的各种类型等等……

#### 元组类型 (tuple) 数组的一种 可以设置多种类型的数组

``` bash
let arr: [number, number] = [1, 'ss']; // 对应的左边几个，右边就几个 
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
let aaa:any || let aaa:string|number // 尽量使用第二种 声明一个为字符串或者数值型的变量 如果变量是dom元素使用第一种方式声明变量
```

#### 入参的约束 属性接口 interface

##### 传入普通对象 附可选属性

``` bash 
interface FullName{
  firstName:string; // 注意分号结束  不是对象
  secondName:string;
  age?: number; // 可选属性 可以写 也可以不写
}
function printLabel(name:FullName){
  // 必须传入对象，对象必须有firstname，secondname
  console.log(name.firstName+'--'+name.secondName)
}

let obj = { firstName: '张', secondName: '三', age: 20 }
printLabel(obj) // 正确

let newObj = { firstName: '张', age: 20  }
printLabel(obj) // 错误 缺少 secondName

```

##### 加密的函数类型

``` bash 

interface encrypt {
  (key: number, value: number): number; // 约束一个方法 传入两个number，返回一个number
}

var md5: encrypt = function (key: number, value: number): number {
  // 定义encrypt约束时 传入必须两个number 返回值必须写，必须为number
  alert(key + value)
  return key + value;
}

md5('name', 'zhangsan')

```

##### 可索引接口  对数组对象约束 不常用

``` bash 

interface userArray {
  [index: number]: number;
}
var Array1: userArray = ['21', '22'] // 约束为userArray类型，索引为数值型，值为number
console.log(Array1)
var obj1: userArray = { 1: 'name', 2: 'age' } // 对象为这种类型时 索引为数值，值为number
console.log(obj1)

```

##### 类类型  接口 对类的约束  和抽象类有点相似 常用

``` bash 

interface Animal {
  name: number;
  eat(str: number): void;
}

class Dog implements Animal {
  public name: number;
  constructor(name: number) {
    this.name = name;
  };
  eat(food:string) {
    console.log(this.name + '吃' + food)
  }
}

var d = new Dog('大黄')
d.eat('肉');

```

##### 接口的拓展 接口可以继承接口  implements 继承

``` bash

interface Anmial {
  eat(): void;
}
interface Person extends Anmial {
  work(workValue:number): void;
}

class Web implements Person {
  name: number;
  constructor(name: number) {
    this.name = name;
  }
  eat() {
    console.log(this.name+'吃馒头')
   };
  work(workValue:number) { // 如果接口有参数可以不写，但是如果接口没有参数不能写参数
    console.log(this.name+"在"+workValue)
  }
}

var w=new Web('小磊')

w.work('写代码')

```

#### typescript 中的泛型 (可以创建可重用的接口方法 可以支持多种数据类型)

##### 泛型方法

``` bash 

function getData<T>(value: T): T { // T表示泛型  具体什么类型调用方法决定
  return value;
}

getData<number>(123) // 定义类型为number 只能传入number

```

##### 泛型类

``` bash 

class MinClass {
  public list: number[] = [];
  add(num: number) { // 只能传入number类型
    this.list.push(num)
  }
  min(): number {
    var minNum = this.list[0];
    for (var i = 1; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i]
      }
    }
    return minNum;
  }
}

var m = new MinClass();
m.add(21)
m.add(23)
m.add(2)
m.add(34)
alert(m.min())

```

> 类的泛型

``` bash 

class MinClass<T>{
  public list: T[] = [];
  add(num: T): void { // 只能传入number类型
    this.list.push(num)
  }
  min(): T {
    var minNum = this.list[0];
    for (var i = 1; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i]
      }
    }
    return minNum;
  }
}

var m = new MinClass<number>();  // 实例化类，并且指定类的泛型number 也可写成<number|number>可以为number或number泛型

m.add(21)
m.add(23)
m.add(2)
m.add(34)
alert(m.min())

```

##### 泛型接口
> 第一种
``` bash
interface configFn {
  <T>(value1: T): T;// 定义一个函数接口
}
var setData: configFn = function <T>(a: T) {
  return a;
}

alert(setData<string>('老王'))
```
> 第二种
``` bash 
interface configFn<T> {
  (value1: T): T;// 定义一个函数接口
}
function getData<T>(a: T) {
  return a;
}

var myGetData: configFn<string> = getData;

myGetData(111) // 错误
myGetData('111') // 正确
```
##### 把类作为参数的泛型类

``` bash 
class ActiveCate {
  title: string | undefined; // 可以不赋值
  desc: string | undefined;
  status: number | undefined;
}
class MySqlDB {
  book(info: ActiveCate): boolean { // 可以用类作为参数来约束数据类型
    console.log(info)
    return true;
  }
}
var u = new ActiveCate();
u.title = "国内";
u.desc = "新闻";
u.status = 2;
var db = new MySqlDB();
db.book(u)

```
> 使用泛型

``` bash
class ActiveCate {
  title: string | undefined;
  desc: string | undefined;
  status: number | undefined;
  constructor(title: string, desc: string, status?: number) {
    this.title = title;
    this.status = status;
    this.desc = desc
  }
}
class MySqlDB<T>{
  update(info: T, id: number): boolean {
    console.log(info)
    console.log(id);
    return true;
  }
}
var a = new ActiveCate("分类", "新闻", 222)
var db = new MySqlDB<ActiveCate>();
db.update(a, 222);
```
##### 统一操作mysql的底层操作
##### 定义一个操作数据的库 支持mysql
##### 约束统一规范 代码重用

``` bash
interface DBI<T> {
  add(info: T): boolean;
  update(info: T, id: number): boolean;
  delete(id: number): boolean;
  get(id: number): any[];
}
```
> 定义一个mysql类

``` bash
class MySqlDB<T> implements DBI<T>{  // 要实现泛型接口 类也应该是泛型类
  constructor() {
    console.log('数据库建立连接')
  }
  add(info: T): boolean {
    console.log(info)
    return true;
  };
  update(info: T, id: number): boolean {
    throw new Error("Method not implemented.");
  };
  delete(id: number): boolean {
    throw new Error("Method not implemented.");
  };
  get(id: number): any[] {
    throw new Error("Method not implemented.");
  };
}
```
> 操作用户表

``` bash
class User {
  username: string | undefined;
  password: string | undefined;
}

var u = new User();
u.username = '张三'
u.password = 'fsadf'

var omysql = new MySqlDB<User>(); // 约束传入参数 
// omysql.add(u);
var mssql = new MsSqlDB<User>();
mssql.add(u);
console.log(mssql.get(4));
```

#### typescript 中的模块
#### 内部模块和外部模块

``` bash
import {getData} from './moduls/db'
getData()
```
> db.js
``` bash
var dburl:string="xxxxx";
export function getData(){ // 在浏览器中会报错，需要babelrc编译后使用，
    console.log('获取数据库的返回值')
    return [
        {title:111},
        {title:111},
        {title:111},
        {title:111}
    ]
}

```
#### 命名空间
#### 用于阻止代码 避免命名冲突
``` bash
namespace A {  // namespace 命名空间，避免命名冲突 
  interface Animal {
    name: string;
    eat(): void;
  }

  export class Dog implements Animal { // 私有的，需要export暴露出来
    name: string;
    constructor(theName: string) {
      this.name = theName;
    }
    eat() {
      console.log(`${this.name}吃狗粮`);
    }
  }
  export class Cat implements Animal {
    name: string;
    constructor(theName: string) {
      this.name = theName;
    }
    eat() {
      console.log(`${this.name}吃老鼠`);
    }
  }
}
import {B} from './moduls/spaceName'  // B的结构和A的结构是一样的
var d = new A.Dog('狼狗')
d.eat();
var e = new B.Dog('小狼狗')
e.eat();
```
#### 装饰器
#### 一种方法 一种特殊类型的声明 可以放在类、属性、方法中拓展类、属性、方法 可以修改类的行为
#### 使用方法 写在类、属性、方法前 用于修饰或拓展类、属性、方法
#### es7标准特性之一

##### 类装饰器
> 普通装饰器
``` bash
function logClass(params: any) { // 装饰器
  // console.log(params); // params 当前类
  params.prototype.apiUrl = 'xxx'  // 动态拓展的属性
  params.prototype.run = function () {
    console.log('我是一个run方法') // 拓展方法
  }
}
@logClass  // 装饰器写在那个类前 就是装饰那个类
class HttpClient {
  constructor() {

  }
  getData() {

  }
}
var http: any = new HttpClient();
console.log(http.apiUrl);
http.run();
```
> 装饰器工厂
``` bash
function logClass(params: string) { // 装饰器
  return function (target: any) {
    // console.log(target);  // 拓展的类
    // console.log(params);  // 传参
    target.prototype.apiUrl = params;

  }
}
@logClass('http://www.baidu.com')
class HttpClient {
  constructor() {

  }
  getData() {

  }
}

var http: any = new HttpClient();
console.log(http.apiUrl)
```
> 类装饰器重载构造函数
``` bash
function logClass(target: any) { // 装饰器
  console.log(target)
  return class extends target {
    apiUrl: any; // 类装饰器重载以前的类
    getData() {
      this.apiUrl = this.apiUrl + '---'
      console.log(this.apiUrl)
    }
  }
}
@logClass

class HttpClient {
  apiUrl: string | undefined;
  constructor() {
    this.apiUrl = '我是构造函数apiurl'
  }
  getData() {
    console.log(this.apiUrl)
  }
}

var a = new HttpClient;
a.getData();
```
##### 属性装饰器 接收两个参数 1.构造器函数 2.成员名称

``` bash
function logClass(params: string) { // 类装饰器
  return function (target: any) {
    console.log(target);  // 拓展的类
    console.log(params);  // 传参
  }
}

// 属性装饰器
function logProperty(params: any) {
  return function (target: any, attr: any) {
    // console.log(target);
    target[attr] = params;
    // console.log(attr)
  }
}
@logClass('xxx')
class HttpClient {
  @logProperty('http://baidu.com')  // 装饰器写在那个属性前面就修饰谁
  public url: any | undefined;
  @logProperty('老王')
  public name: string | undefined;
  constructor() {

  }
  getData() {
    console.log(this.name)
  }
}

var a = new HttpClient();
a.getData();
```

##### 方法装饰器
##### 接收三个参数 1.原型对象 2.方法名称 3.方法描述
##### 拓展当前类的属性和方法

``` bash
function get(params:any){
  return function(target:any,methods:any,desc:any){
    console.log(target);
    console.log(methods);
    console.log(desc);
    target.apiUrl='xxx';
    target.run=function(){  // 扩展当前类的属性和方法
      console.log('run');
    }
  }
}

class HttpClient {
  public url: any | undefined;
  constructor() {

  }
  @get('http://www.baidu.com')
  getData() {
    console.log(this.url)
  }
}

var http: any = new HttpClient()
console.log(http.apiUrl)
http.run();
```
> 修改装饰器方法

``` bash
function get(params: any) {
  return function (target: any, methods: any, desc: any) {
    // 修改当前方法 把装饰器的方法传入参数改为string类型
    // 1.保存当前方法
    var oMthod = desc.value
    desc.value = function (...args: any[]) {
      args = args.map((value) => {
        return string(value)
      })
      oMthod.apply(this, args) // 对象冒充
    }
  }
}

class HttpClient {
  public url: any | undefined;
  constructor() {

  }
  @get('http://www.baidu.com')
  getData(...args: any[]) {
    console.log('我是getData的方法')
    console.log(args)
  }
}

var http: any = new HttpClient();
http.getData(111, 111, 222)
```
> 方法参数装饰器  不常用
``` bash
function logParams(params: any) {
  return function (target: any, methodName: any, paramsIndex: any) {
    target.apiUrl = params;
  }
}

class HttpClient {
  public url: any | undefined;
  constructor() {

  }
  getData(@logParams('xxxx') uuid: any) {  // 参数装饰器
    console.log('我是getData的方法')
  }
}
var http:any =new HttpClient();
http.getData(123456)
console.log(http.apiUrl)
```
#### 各种装饰器的执行顺序
#### 属性>>方法/参数>>方法>>类   如果有多个同类型装饰器，从后往前执行
``` bash
function logClass1(target: any) { // 装饰器
  return function (target: any) {
    console.log('类装饰器')
  }
}
function logClass2(target: any) { // 装饰器
  return function (target: any) {
    console.log('类装饰器')
  }
}
function logAttribute(params?: string) { // 装饰器
  return function (target: any, attrName: any) {
    console.log('属性装饰器')
  }
}
function logMthods(params?: string) { // 装饰器
  return function (target: any, attrName: any, desc: any) {
    console.log('方法装饰器')
  }
}
function logParams1(params?: string) { // 装饰器
  return function (target: any, attrName: any, desc: any) {
    console.log('方法参数装饰器1')
  }
}
function logParams2(params?: string) { // 装饰器
  return function (target: any, attrName: any, desc: any) {
    console.log('方法参数装饰器2')
  }
}
@logClass1('http://www.baidu.com')
@logClass2('xxx')
class HttpClient {
  @logAttribute()
  public apiUrl: string | undefined;
  constructor() {
  }
  @logMthods()
  getData(@logParams1() attr1: any, @logParams2() attr2: any) {

  }
}
var http: any = new HttpClient();
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
