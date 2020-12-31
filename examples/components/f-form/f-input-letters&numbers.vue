<template>
    <el-input
            :value="value"
            @input="updateValue"
            v-bind="$attrs"
    >
    </el-input>
</template>

<script>
    export default {
        name: "input-number",
        props:{
            value: {
                type: String,
                default:""
            },
        },
        methods:{
            updateValue:function (e) {
                // 去掉非字母数字的字符,可以全数字或全字母
                e= e.replace(/[^0-9a-zA-Z]/g,"");
                console.log(e)
                this.$emit('input', e);
                return  e;
            }
        }
    }
</script>

<style scoped>

</style>
