<template>
    <div>
        <div @click="sayHello" title="点击alert父组件传来的字符">{{ msg }}</div>
        <p>{{getComputedMsg}}</p>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
    name: "newTitle",
    props: {
        value: {
            // 变量名
            type: String, // 类型
            required: true // 是否必填
        },
        age: Number
    }, // 父组件传过来的值
    watch: {
        // 监听父组件传来的变量
        value(val: string): void {
            // 入参和返回值都需要定义类型 void为没有返回值
            console.log(val);
        }
    }
})
export default class newTitle extends Vue {
    // 初始数据可以直接声明为实例的属性
    msg: string = "我是项目的title";
    // 组件方法也可以直接声明为实例的方法
    sayHello(): void {
        alert(this.$props.value);
    }
     // 计算属性 computed
    get getComputedMsg(): string {
        return "abc";
    }
}
</script>
