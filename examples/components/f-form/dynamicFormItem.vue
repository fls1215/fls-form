<template>
    <el-form-item :label="label">
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
        <!--501	   textarea	textarea-->
        <!--601	   树	树-->

        <!--文本框-->
        <el-input
                tepe="text"
                v-if="$attrs.type == '101'&&!$attrs.hidden"
                v-bind="$attrs"
                :disabled="disabled"
                :readonly="readonly"
                :clearable="clearable"
                :maxlength="maxlength"
                :minlength="minlength"
                v-on="$listeners"
        ></el-input>

        <!--整数框-->
        <number-input
                type="number"
                v-if="$attrs.type == '102'&&!$attrs.hidden"
                v-bind="$attrs"
                :disabled="disabled"
                :readonly="readonly"
                :clearable="clearable"
                :maxlength="maxlength"
                :minlength="minlength"
                v-on="$listeners"
        ></number-input>

        <!--小数框-->
        <money-input
                type="money"
                v-if="$attrs.type == '103'&&!$attrs.hidden"
                v-bind="$attrs"
                :disabled="disabled"
                :readonly="readonly"
                :clearable="clearable"
                :maxlength="maxlength"
                :minlength="minlength"
                v-on="$listeners"
        ></money-input>
      </el-form-item>
</template>
<script>
import moneyInput from "./f-input-money1";
import numberInput from "./f-input-number";
    export default{
        inheritAttrs :false,
        props:{
            label:{
                type:String,
                default:""
            },
            disabled:{
                type:Boolean,
                default:false
            },
            readonly:{
                type:Boolean,
                default:false
            },
            clearable:{
                type:Boolean,
                default:true
            },
            maxlength:{
                type:Number,
                default:100
            },
            minlength:{
                type:Number,
                default:0
            }
        },
        components:{
            moneyInput,
            numberInput,
        }
    }
</script>
<style scoped>

</style>