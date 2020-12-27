<template>
    <el-col v-if="isShow" :span="spanNum" >
        <f-form-item v-bind="$attrs"></f-form-item>
    </el-col>
</template>
<script>
import fFormItem from "./dynamicFormItem"
export default{
    props:{
        spanNum:{
            type:Number,
            default:12
        },
        isShow:{
            type:Boolean,
            default:true
        }
    },
    components:{
        fFormItem
    },
    inheritAttrs :false,
}
</script>
 <style scoped>
 </style>
