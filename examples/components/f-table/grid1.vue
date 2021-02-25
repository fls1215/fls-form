<template>
    <vxe-grid v-bind="gridOptions"             @checkbox-all="selectAllEvent"
              @checkbox-change="selectChangeEvent">
        <template v-slot:toolbar_buttons>
            <vxe-button @click="gridOptions.align = 'left'">居左</vxe-button>
            <vxe-button @click="gridOptions.align = 'center'">居中</vxe-button>
            <vxe-button @click="gridOptions.align = 'right'">居右</vxe-button>
        </template>
        <template v-slot:input_default="{ column }">
            {{column.title}}
            <vxe-input placeholder="搜索" size="mini"></vxe-input>
        </template>
        <template v-slot:select_default="{ column }">
            {{column.title}}
            <vxe-select v-model="selectValue" placeholder="选择" size="mini" transfer>
                <vxe-option v-for="num in 10" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
            </vxe-select>


        </template>
    </vxe-grid>
</template>

<script>

    export default {
        data () {
            return {
                selectValue:null,
                gridOptions: {
                    border: true,
                    resizable: true,
                    showOverflow: true,
                    showFooter:true,
                    height: 300,
                    align: 'left',
                    toolbarConfig: {
                        slots: {
                            buttons: 'toolbar_buttons'
                        }
                    },
                    columns: [
                        { type: 'seq', width: 50 },
                        { type: 'checkbox',  width: 50,fixed:"left" },
                        { field: 'name', title: 'name', slots: {
                                header: 'input_default'
                            } },
                        { field: 'sex', title: 'sex', showHeaderOverflow: true , slots: {
                                header: 'select_default'
                            }},
                        { field: 'address', title: 'Address', showOverflow: true }
                    ],
                    data: [
                        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 0, address: 'Shenzhen' },
                        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 100, address: 'Shanghai' },
                        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 70, address: 'Shenzhen' },
                        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 10, address: 'Shanghai' },
                        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 90, address: 'Shenzhen' },
                        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 5, address: 'Shenzhen' },
                        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 80, address: 'Shenzhen' }
                    ]
                }
            }
        },
        methods:{
            selectAllEvent ({selection}) {
                debugger
                console.log(checked ? '所有勾选事件' : '所有取消事件', {selection}.length)
            },
            selectChangeEvent ({ checked, records }) {
                console.log(checked ? '勾选事件' : '取消事件', records)
            },
            // inputFilterChange(v,field){
            //     // let operator = "like";
            //     // let column = field;
            //     // let value = v;
            //     // let index = this.filterArray.filters.findIndex(item => column.field == field);
            //     // if(index == -1){
            //     //     this.filterArray.filters.push({operator: operator, column: column, value: value});
            //     // }else{
            //     //     this.filterArray.filters[index].value = value;
            //     //     this.$set(this.filterArray.filters[index],"value",value);
            //     // }
            //
            //     const xTable = this.$refs.filterTable;
            //     const column = xTable.getColumnByField(field);
            //
            //     if(!column.filters){
            //         column.filters = [{}];
            //     }
            //
            //     const option = column.filters[0];
            //     // 文档写的是data,但我多次尝试，均为暂无数据，改成value可以了
            //     // option.data = v;
            //     option.value = v;
            //     option.checked = true;
            //     // 搜出来暂无数据
            //     xTable.updateData()
            // },
        }
    }

</script>

<style scoped>

</style>