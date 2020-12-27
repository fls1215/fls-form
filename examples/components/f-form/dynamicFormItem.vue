<template>
    <el-form-item :label="label">
        <el-input v-model.trim="model" v-bind="$attrs" @change="changeValue"></el-input>
      </el-form-item>  
</template>
<script>
    export default{
        inheritAttrs :false,
        props:{
            model:{
                type:String,
                default:""
            },
            label:{
                type:String,
                default:""
            }
        },
        methods:{
            changeValue(){
                this.$emit('update:model',this.model);
            }
        }

    }
</script>
<style scoped>

</style>