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
let arr: [Number, Number] = [1, 'ss']; // 对应的左边几个，右边就几个 
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

#### 入参的约束 属性接口 interface

##### 传入普通对象 附可选属性

``` bash 
interface FullName{
  firstName:String; // 注意分号结束  不是对象
  secondName:String;
  age?: Number; // 可选属性 可以写 也可以不写
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
  (key: Number, value: Number): Number; // 约束一个方法 传入两个Number，返回一个Number
}

var md5: encrypt = function (key: Number, value: Number): Number {
  // 定义encrypt约束时 传入必须两个Number 返回值必须写，必须为Number
  alert(key + value)
  return key + value;
}

md5('name', 'zhangsan')

```

##### 可索引接口  对数组对象约束 不常用

``` bash 

interface userArray {
  [index: Number]: Number;
}
var Array1: userArray = ['21', '22'] // 约束为userArray类型，索引为数值型，值为Number
console.log(Array1)
var obj1: userArray = { 1: 'name', 2: 'age' } // 对象为这种类型时 索引为数值，值为Number
console.log(obj1)

```

##### 类类型  接口 对类的约束  和抽象类有点相似 常用

``` bash 

interface Animal {
  name: Number;
  eat(str: Number): void;
}

class Dog implements Animal {
  public name: Number;
  constructor(name: Number) {
    this.name = name;
  };
  eat(food:String) {
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
  work(workValue:Number): void;
}

class Web implements Person {
  name: Number;
  constructor(name: Number) {
    this.name = name;
  }
  eat() {
    console.log(this.name+'吃馒头')
   };
  work(workValue:Number) { // 如果接口有参数可以不写，但是如果接口没有参数不能写参数
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

getData<Number>(123) // 定义类型为Number 只能传入Number

```

##### 泛型类

``` bash 

class MinClass {
  public list: Number[] = [];
  add(num: Number) { // 只能传入Number类型
    this.list.push(num)
  }
  min(): Number {
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
  add(num: T): void { // 只能传入Number类型
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

var m = new MinClass<Number>();  // 实例化类，并且指定类的泛型Number 也可写成<Number|Number>可以为Number或Number泛型

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

alert(setData<String>('老王'))
```
> 第二种
``` bash 
interface configFn<T> {
  (value1: T): T;// 定义一个函数接口
}
function getData<T>(a: T) {
  return a;
}

var myGetData: configFn<String> = getData;

myGetData(111) // 错误
myGetData('111') // 正确
```
##### 把类作为参数的泛型类

``` bash 
class ActiveCate {
  title: String | undefined; // 可以不赋值
  desc: String | undefined;
  status: Number | undefined;
}
class MySqlDB {
  book(info: ActiveCate): Boolean { // 可以用类作为参数来约束数据类型
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
  title: String | undefined;
  desc: String | undefined;
  status: Number | undefined;
  constructor(title: String, desc: String, status?: Number) {
    this.title = title;
    this.status = status;
    this.desc = desc
  }
}
class MySqlDB<T>{
  update(info: T, id: Number): Boolean {
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
  add(info: T): Boolean;
  update(info: T, id: Number): Boolean;
  delete(id: Number): Boolean;
  get(id: Number): any[];
}
```
> 定义一个mysql类

``` bash
class MySqlDB<T> implements DBI<T>{  // 要实现泛型接口 类也应该是泛型类
  constructor() {
    console.log('数据库建立连接')
  }
  add(info: T): Boolean {
    console.log(info)
    return true;
  };
  update(info: T, id: Number): Boolean {
    throw new Error("Method not implemented.");
  };
  delete(id: Number): Boolean {
    throw new Error("Method not implemented.");
  };
  get(id: Number): any[] {
    throw new Error("Method not implemented.");
  };
}
```
> 操作用户表

``` bash
class User {
  username: String | undefined;
  password: String | undefined;
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
var dburl:String="xxxxx";
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
    name: String;
    eat(): void;
  }

  export class Dog implements Animal { // 私有的，需要export暴露出来
    name: String;
    constructor(theName: String) {
      this.name = theName;
    }
    eat() {
      console.log(`${this.name}吃狗粮`);
    }
  }
  export class Cat implements Animal {
    name: String;
    constructor(theName: String) {
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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
