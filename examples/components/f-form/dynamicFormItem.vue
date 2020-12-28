<template>
    <el-form-item :label="label">
        <el-input v-bind="$attrs" v-on="$listeners"></el-input>
      </el-form-item>  
</template>
<script>
    export default{
        inheritAttrs :false,
        props:{
            label:{
                type:String,
                default:""
            }
        },

    }
</script>
<style scoped>

</style>