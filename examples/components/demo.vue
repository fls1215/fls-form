<template>
    <div>
        <el-row>
            <el-col :span="4">
                money: <input-money v-model="money"></input-money>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import inputMoney from "./f-form/f-input-money"
    export default {
        name: "demo",
        components:{inputMoney},
        data(){
            return {
                money:""
            }
        }
    }
</script>

<style scoped>

</style>