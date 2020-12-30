<template>
    <div>
        {{formData}}
        <!--type	类别	类型	属性-->
        <!--101	input	文本	可编辑-->
        <!--102	input	纯数字	可见-->
        <!--103	input	数字加小数点，默认保留两位	占全行-->
        <!--104	input	数字加字母大小写-->
        <!--105	input	密码-->
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
        <el-form ref="list" :model="formData" label-width="80px">
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
                :prop="list.prop"
                :type="list.type"
                :placeholder = "list.placeholder"
                :disabled = "list.disabled"
                :hidden = "list.hidden"
                :readonly="list.readonly"
                :clearable="list.clearable"
                :maxlength="list.maxlength"
                :minlength="list.minlength"
                v-model = "formData[list.prop]"
                @input="handleInput($event, list.prop)"
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
                        label:"活动名称",
                        placeholder:"请输入活动名称",
                        prop:"input1",
                        type:"101",
                    },
                    {
                        id:"2",
                        label:"活动人数",
                        placeholder:"请输入活动人数",
                        prop:"input2",
                        type:"102",
                    },
                    {
                        id:"3",
                        label:"活动金额",
                        placeholder:"请输入活动金额",
                        prop:"input3",
                        type:"103",
                    }
                ],
                formData:{
                    input1:"5",
                    input2:null,
                    input3:""
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