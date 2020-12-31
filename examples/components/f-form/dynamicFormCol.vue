<template>
    <el-col v-if="!hidden" :span="spanNum" >
        <f-form-item v-bind="$attrs" v-on="$listeners"></f-form-item>
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
        hidden:{
            type:Boolean,
            default:false
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
