<template>
    <div>
        <ContendEdit ref="contendEdit" :selectDataList="selectDataList" :messageDescStr.sync="messageDescStr"/>

    </div>
</template>

<script>
    import ContendEdit from "./richText3"
    export default {
        name: "richText3F",
        data(){
            return {
                messageDescStr: "sss" + "[FORM_NAME]", // 来个默认值
                selectDataList: { // 下拉框的值
                    "FORM_NAME": "表单名称",
                    "STAFF_SCOPE": "表单范围",
                    "START_TIME": "填报时间"
                }
            }
        },
        components: {
            ContendEdit
        },
    }
</script>

<style scoped>

</style>