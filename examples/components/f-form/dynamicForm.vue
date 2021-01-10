<template>
    <div>
        {{formData}}
        <!--type	类别	类型	属性-->
        <!--101	input	文本	可编辑-->
        <!--102	input	纯数字	可见-->
        <!--103	input	数字加小数点，默认保留两位	占全行-->
        <!--104	input	数字加字母大小写-->
        <!--105	input	密码
                        // 密码位数最少minlength位，最多maxlength位
                        // onlyNumber,true表示允许全数字
                        //onlyLetter,true表示允许全字母
                        //needSpecial,true表示至少一位特殊字符
                        -->
        <!--106	input	邮件-->
        <!--107	input	身份证-->
        <!--108	input	电话-->
        <!--109	input	上传-->
        <!--201	下拉框	单选-->
        <!--202	下拉框	多选-->
        <!--203	下拉框	级联-->
        <!--204	下拉框	日期框-->
        <!--205	下拉框	月份框-->
        <!--206	下拉框	时间框-->
        <!--207	下拉框	日期段框-->
        <!--208	下拉框	日期段时间框-->
        <!--301	单选框	单选框-->
        <!--401	复选框	复选框-->
        <!--501	textarea	textarea-->
        <!--601	树	树-->
        <!--:rules="rules"-->
        <el-form ref="list" :model="formData" label-width="140px">
            <el-row :gutter="10">
                <!--/**-->
                <!--*@param label  表单项名 必写-->
                <!--*@param prop  表单字段 必写-->
                <!--*@param type  表单类型 必写-->
                <!--*@param hidden  隐藏-->
                <!--*@param disabled  禁用-->
                <!--*@param readonly  只读-->
                <!--*@param clearable  可清空-->
                <!--*@param maxlength  最多可输入100-->
                <!--*@param minlength  最少可输入0-->
                <!--*/-->
                <form-col
                    v-for="list in lists"
                    :key="list.id"
                    :label = "list.label"
                    :spanNum = "list.spanNum"
                    :prop="list.prop"
                    :type="list.type"
                    :placeholder = "list.placeholder"
                    :disabled = "list.disabled"
                    :hidden = "list.hidden"
                    :readonly="list.readonly"
                    :clearable="list.clearable"
                    :maxlength="list.maxlength"
                    :minlength="list.minlength"
                    :onlyNumber="list.onlyNumber"
                    :onlyLetter="list.onlyLetter"
                    :specialType="list.specialType"
                    :otherChar="list.otherChar"
                    :show-password="list.showPassword"
                    :required="list.required"
                    v-model = "formData[list.prop]"
                    @input="handleInput($event, list.prop)"


                    :action="list.action"
                    :multiple="list.multiple"
                    :data="list.data"
                    :showFileList="list.showFileList"
                    :drag="list.drag"
                    :accept="list.accept"
                    :listType="list.listType"
                    :fileList="formData.input9"
                    :limit="list.limit"


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
                        // readonly:true
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
                        required:true,
                        rules:[
                            // { required: true, message: '请填写密码', trigger: 'blur' },
                            // { min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: 'change' },
                        ]
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
                },
                rules:{
                    input5: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: 'change' },
                    ],
                }

            }
        },
        methods:{
            handleInput(val, key) {
                this.$emit('input', { ...this.formData, [key]: val });
            },
        }
    }
</script>

<style scoped>

</style>