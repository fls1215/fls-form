<template>
    <div>
        <el-row>
            <el-col :span="4">
                {{money}}
                money: <input-money v-model="money"></input-money>
            </el-col>
        </el-row>
        <dy-form></dy-form>
    </div>

</template>

<script>
    import inputMoney from "./f-form/f-input-money"
    import dyForm from "./f-form/dynamicForm"
    export default {
        name: "demo",
        components:{inputMoney,dyForm},
        data(){
            return {
                money:null
            }
        }
    }
</script>

<style scoped>

</style>