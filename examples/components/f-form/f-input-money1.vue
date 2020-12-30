
<template>
    <el-input
            :value="value"
            @input="updateValue"
    >
    </el-input>
</template>

<script>
    export default {
        name: "input-money",
        props:{
            value: {
                type: String,
                default:""
            },
        },
        methods:{
            updateValue:function (e) {
                // 限制两位小数数字
                let val = e;

                val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
                val === ""?val = "0":"";
                val = val.replace(/\.{2,}/g,"."); //清除多余的小数点
                val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
                if(val.indexOf(".")< 0){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    val= parseFloat(val);
                }else if(val.indexOf(".")> 1 && val[0] === "0"){//控制0X.XX
                    val= parseFloat(val);
                }else if(val.indexOf(".") === 0 ){//控制.XX
                    val= parseFloat("0"+val);
                }
                // 给输入框赋值
                e = ""+val;
                this.$emit('input', e);
                return  e;
            }
        }
    }
</script>

<style scoped>

</style>
