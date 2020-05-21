<template>
    <div class="hello">
        <h1 @click="msg=changeMsg()">{{ msg }}</h1>
        <newTitle :value="msg" />
        <el-button @click="pushBefore">这回有样式了吗</el-button>
        <el-table border header-row-class-name="df-header-row" :data="data" height="500">
            <el-table-column
                v-for="(item,index) in column"
                :key="index"
                :prop="item.value"
                :label="item.label"
            ></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// @Component 修饰符注明了此类为一个 Vue 组件
import newTitle from "./newTitle.vue";
import { ajax } from "../assets/js/ajaxUrl";
@Component({
    name: "hello",
    components: {
        newTitle
    }
})
export default class Hello extends Vue {
    // 初始数据可以直接声明为实例的属性
    msg: string = "我是父组件传来的值";
    data: Array<Object> = []; // 定义数组时需要定义数组内容的格式
    isSearch: Boolean = false;
    allData: Object | undefined;
    column: Array<Object> = [
        { value: "name", label: "姓名" },
        { value: "age", label: "年龄" },
        { value: "sex", label: "性别" },
        { value: "num", label: "学号" },
        { value: "class", label: "年级" }
    ];
    // 生命周期直接写就行
    mounted() {
        // ajax({
        //     type: "get",
        //     url: "http://a.itying.com/api/productlist",
        //     data:{name:1,age:2,books:['王','赵']},
        //     contentType: "application/x-www-form-urlencoded;charset=UTF-8"  // post要加请求头 如果后端要的 application/json 可不转
        // })
        //     .then(response => {
        //         console.log(JSON.parse(response));
        //     })
        //     .catch(reject => {
        //         console.error(reject);
        //     });
        // return;
        this.pushBefore();
        let dom: any = document.querySelector(".hello .el-table__body-wrapper"); // 注意不论在哪里，一定要定义类型，如果是dom就定义为any
        dom.addEventListener("scroll", () => {
            const scrollDistance =
                dom.scrollHeight - dom.scrollTop - dom.clientHeight;
            if (scrollDistance > 0) {
                this.isSearch = true; // 防止重新查询第一页时出现查询两次的问题
            }
            if (scrollDistance == 0 && this.isSearch) {
                this.query();
            }
        });
    }
    // 组件方法也可以直接声明为实例的方法
    changeMsg(): string {
        // 返回值类型要在方法后面声明
        return "我是改变过的msg";
    }
    // 鼠标点击事件
    pushBefore(): void {
        // void就是没有return返回值
        this.isSearch = false;
        this.searchData(true);
    }
    searchData(isSearchFise: boolean) {
        if (isSearchFise) {
            this.data = [];
        }
        ajax({
            type: "get",
            url: "static/json/county.json" // url接口
        })
            .then(response => {
                let data = JSON.parse(response).data;
                if (isSearchFise) {
                    this.data = data;
                } else {
                    this.data = this.data.concat(data);
                }
            })
            .catch(reject => {
                console.error(reject);
            });
    }
    query(): void {
        this.searchData(false);
    }
}
</script>

