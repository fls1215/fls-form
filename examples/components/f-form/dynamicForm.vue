<template>
  <div>
    <p>表单数据：{{formData}}</p>
    <p>表单配置：{{lists}}</p>
    <el-form ref="list" :model="formData" label-width="140px">
      <el-row :gutter="10">
        <form-col
                v-for="list in lists"
                :key="list.id"
                v-bind="list"
                v-model = "formData[list.prop]"
        ></form-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
    import formCol from "./dynamicFormCol"
    export default {
        name: "dynamicForm",
        components:{
            formCol
        },
        data(){
            return {
                lists:[
                    {
                        id:"1",
                        label:"文本框",
                        placeholder:"请输入文本",
                        prop:"input1",
                        spanNum:8,
                        type:"101",
                        otherChar:false,
                        // disabled:true
                    },
                    {
                        id:"2",
                        label:"整数框",
                        placeholder:"请输入整数",
                        prop:"input2",
                        spanNum:8,
                        type:"102",
                        // disabled:false
                    },
                    {
                        id:"3",
                        label:"两位小数框",
                        placeholder:"请输入两位以内小数",
                        prop:"input3",
                        spanNum:16,
                        type:"103",
                        clearable:true
                    },
                    {
                        id:"4",
                        label:"数字加字母大小写框",
                        placeholder:"请输入数字或字母",
                        prop:"input4",
                        type:"104",
                        maxlength:10
                    },
                    {
                        id:"5",
                        label:"密码框",
                        placeholder:"密码框",
                        prop:"input5",
                        type:"105",
                        maxlength:6,
                        minlength:4,
                        onlyNumber:1,
                        onlyLetter:1,
                        specialType:2,
                        showPassword:true,
                        required:true
                    },
                    {
                        id:"6",
                        label:"邮箱",
                        placeholder:"请输入邮箱地址",
                        prop:"input6",
                        type:"106",
                        otherChar:false
                    },
                    {
                        id:"7",
                        label:"身份证",
                        placeholder:"请输入身份证号",
                        prop:"input7",
                        type:"107",
                    },
                    {
                        id:"8",
                        label:"手机或电话号码",
                        placeholder:"请输入手机或电话号码",
                        prop:"input8",
                        type:"108",
                    },
                    {
                        id:"9",
                        label:"上传",
                        prop:"input9",
                        spanNum:24,
                        type:"109",
                        action:"https://jsonplaceholder.typicode.com/posts/",
                        multiple:true,
                        data:{},
                        showFileList:true,
                        drag:false,
                        accept:"image/*",
                        listType:"picture-card",
                        limit:3,
                    },
                    {
                        id:"21",
                        label:"下拉框",
                        placeholder:"请选择",
                        prop:"input21",
                        type:"201",
                        clearable:true,
                        multiple:true,
                        list:[{
                            value: '选项1',
                            label: '黄金糕'
                        }, {
                            value: '选项2',
                            label: '双皮奶'
                        }, {
                            value: '选项3',
                            label: '蚵仔煎'
                        }, {
                            value: '选项4',
                            label: '龙须面'
                        }, {
                            value: '选项5',
                            label: '北京烤鸭'
                        }],
                    },
                    {
                        id:"31",
                        label:"单选",
                        prop:"input31",
                        type:"301",
                        list:[
                            {id:1,value:"框1"},
                            {id:2,value:"框2"},
                            {id:3,value:"框3"}
                        ]
                    },
                    {
                        id:"41",
                        label:"复选",
                        prop:"input41",
                        type:"401",
                        list:[
                            {id:1,value:"框1"},
                            {id:2,value:"框2",disabled:true},
                            {id:3,value:"框3"}
                        ]
                    },
                    {
                        id:"51",
                        label:"文本域",
                        prop:"input51",
                        type:"501",
                        rows:2
                    },
                ],
                formData:{
                    input1:"5",
                    input2:null,
                    input3:"",
                    input4:"",
                    input5:"",
                    input6:"",
                    input7:"",
                    input8:"",
                    input9:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                    input21:"",
                    input31:2,
                    input41:[],
                },
            }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>