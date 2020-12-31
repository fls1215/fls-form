<template>
    <el-form-item :label="label" :prop="prop" :rules="rules">
        <!--type	类别	类型	属性-->
        <!--101	   input	文本	可编辑-->
        <!--102    input	纯数字	可见-->
        <!--103	   input	数字加小数点，默认保留两位	占全行-->
        <!--104	   input	数字加字母大小写-->
        <!--105	   input	密码-->
        <!--106	   input	邮件-->
        <!--107	   input	身份证-->
        <!--108	   input	电话-->
        <!--109	   input	上传-->
        <!--201	   下拉框	单选-->
        <!--202	   下拉框	多选-->
        <!--203	   下拉框	级联-->
        <!--204	   下拉框	日期框-->
        <!--205	   下拉框	月份框-->
        <!--206	   下拉框	时间框-->
        <!--207	   下拉框	日期段框-->
        <!--208	   下拉框	日期段时间框-->
        <!--301	   单选框	单选框-->
        <!--401	   复选框	复选框-->
        <!--501	   文本域	文本域-->
        <!--601	   树	树-->

        <!--:disabled="disabled"-->
        <!--:readonly="readonly"-->
        <!--:clearable="clearable"-->
        <!--:maxlength="maxlength"-->
        <!--:minlength="minlength"-->

        <!--文本框-->
        <el-input
                tepe="text"
                v-if="$attrs.type == '101'"
                v-bind="$attrs"
                v-on="$listeners"
        ></el-input>

        <!--整数框-->
        <number-input
                type="text"
                v-if="$attrs.type == '102'"
                v-bind="$attrs"
                v-on="$listeners"
        ></number-input>

        <!--两位小数框-->
        <money-input
                type="text"
                v-if="$attrs.type == '103'"
                v-bind="$attrs"
                v-on="$listeners"
        ></money-input>

        <!--数字加字母大小写-->
        <letter-number-input
                type="text"
                v-if="$attrs.type == '104'"
                v-bind="$attrs"
                v-on="$listeners"
        ></letter-number-input>

        <!--密码框-->
        <password-input
                type="password"
                v-if="$attrs.type == '105'"
                v-bind="$attrs"
                v-on="$listeners"
        ></password-input>
      </el-form-item>
</template>
<script>
import moneyInput from "./f-input-money1";
import numberInput from "./f-input-number";
import letterNumberInput from "./f-input-letters&numbers";
import passwordInput from "./f-input-password";
    export default{
        inheritAttrs :false,
        props:{
            label:{
                type:String,
                default:""
            },
            prop:{
                type:String,
                default:""
            },
        },
        components:{
            moneyInput,
            numberInput,
            letterNumberInput,
            passwordInput,
        },
        computed: {
            rules(){
                let {rules,maxlength,minlength,onlyNumber,onlyLetter,needSpecial} = this.$attrs;
                rules?rules:rules = [];
                // 根据表单类型，获取不同的校验规则
                // 密码框
                if(this.$attrs.type == "105"){
                    // 去校验文件校验，应该校验长度，和字母数字
                    
                }

                // 与数据中的rules合并
                // rules.push();
                return rules;
            }
        }
    }
</script>
<style scoped>

</style>