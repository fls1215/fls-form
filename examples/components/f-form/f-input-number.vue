
<template>
    <el-input
            :value="value"
            @input="updateValue"
    >
    </el-input>
</template>

<script>
    export default {
        name: "input-number",
        props:{
            value: {
                type: Number,
                default:null
            },
        },
        methods:{
            updateValue:function (e) {
               e = parseInt(e);
                this.$emit('input', e);
                return  e;
            }
        }
    }
</script>

<style scoped>

</style>
