<template>
    <div class="hello">
        <h1 @click="msg=changeMsg()">{{ msg }}</h1>
        <newTitle :value="msg" />
        <el-button>这回有样式了吗</el-button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// @Component 修饰符注明了此类为一个 Vue 组件
import newTitle from "./newTitle.vue";
@Component({
    name: "hello",
    components: {
        newTitle
    }
})
export default class Hello extends Vue {
    // 初始数据可以直接声明为实例的属性
    msg: String = "我是父组件传来的值";
    // 组件方法也可以直接声明为实例的方法
    changeMsg(): String {
        return "我是改变过的msg";
    }
}
</script>

