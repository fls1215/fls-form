<template>
    <div class="grid filter">
        默认全文搜索
        <vxe-grid v-bind="gridOptions">
            <template v-slot:toolbar_buttons>
                <vxe-button @click="gridOptions.align = 'left'">居左</vxe-button>
                <vxe-button @click="gridOptions.align = 'center'">居中</vxe-button>
                <vxe-button @click="gridOptions.align = 'right'">居右</vxe-button>
            </template>

            <template v-slot:input_default="{ column }">
                <div class="slotBox">
                    <p class="titleBox">{{column.title}}</p>
                    <div class="filterBox">
                        <el-input placeholder="搜索" size="mini" clearable :style="{textAlign:column.align}" v-model="filterElements[column.property]" @change="inputFilterChange($event,column.property)"></el-input>
                    </div>
                </div>
            </template>
            <template v-slot:select_default="{ column }">
                <div class="slotBox">
                    <p class="titleBox">{{column.title}}</p>
                    <div class="filterBox">
                        <el-select
                                v-model="filterElements[column.property]"
                                clearable
                                @change="selectFilterChange($event,column.property)"
                        >
                            <el-option
                                    v-for="item in genderArr" :key="item.value" :value="item.value" :label="item.label">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </template>
            <template v-slot:select_multiple="{ column }">
                <div class="slotBox">
                    <p class="titleBox">{{column.title}}</p>
                    <div class="filterBox">
                        <el-select
                                v-model="filterElements[column.property]"
                                clearable
                                multiple
                                collapse-tags
                                @change="multSelectFilterChange($event,column.property)"
                        >
                            <el-option
                                    v-for="item in addrArr" :key="item.value" :value="item.value" :label="item.label">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </template>
            <template v-slot:date_default="{ column }">
                <div class="slotBox">
                    <p class="titleBox">{{column.title}}</p>
                    <div class="filterBox">
                        <el-date-picker
                                v-model="filterElements[column.property]"
                                clearable
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="选择日期"
                                @change="inputFilterChange($event,column.property)"
                        >
                        </el-date-picker>
                    </div>
                </div>
            </template>

            <!--翻译-->

            <template v-slot:trans_default="{ row }">
                {{row.sex | filtersArr}}
            </template>
        </vxe-grid>
    </div>
</template>

<script>
    let that;
    export default {
        data () {
            return {
                gridOptions: {
                    ref:"filterTable",
                    border: true,
                    resizable: true,
                    showHeaderOverflow: true,
                    showOverflow: false,
                    height: 300,
                    align: 'left',
                    toolbarConfig: {
                        slots: {
                            buttons: 'toolbar_buttons'
                        }
                    },
                    columns: [
                        { type: 'seq', width: 50 },
                        { field: 'name', title: 'name',align:"right",filter:true,filterType:"input" },
                        { field: 'sex', title: 'sex',filter:true,filterType:"select", slots: {
                                default:"trans_default",
                            }},
                        { field: 'birthday', title: 'birthday',filter:true,filterType:"date", showOverflow: true},
                        { field: 'address', title: 'Address', showOverflow: true,filter:true,filterType:"select_mult" },
                        { field: 'role', title: 'role'}
                    ],
                    data: [
                        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '00900', age: 0,birthday:'2021-02-01', address: 'Shenzhen' },
                        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '00901', age: 22,birthday:'2021-02-11', address: 'Guangzhou' },
                        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '00900', age: 100,birthday:'2021-02-22', address: 'Shanghai' },
                        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '00901', age: 70,birthday:'2021-02-11', address: 'Shenzhen' },
                        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '00901', age: 10,birthday:'2021-02-08', address: 'Shanghai' },
                        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '00901', age: 90,birthday:'2021-02-10', address: 'Shenzhen' },
                        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '00900', age: 5,birthday:'2021-02-21', address: 'Shenzhen' },
                        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '00900', age: 80,birthday:'2021-02-11', address: 'Shenzhen' }
                    ]
                },
                filterElements:{},
                genderArr:[
                    {value:"00900",label:"Man"},
                    {value:"00901",label:"Women"},
                ],
                addrArr:[
                    {value:"Shenzhen",label:"Shenzhen"},
                    {value:"Guangzhou",label:"Guangzhou"},
                    {value:"Shanghai",label:"Shanghai"},
                ],
                // filterArray:{filters: [{operator: "like", column: "cusName", value: "2"}]}
            }
        },
        filters: {
            filtersArr: function (value) {
                let data = that.genderArr.find(item =>{
                    return item.value == value
                })

                return data.label
            }
        },
        created(){
            that = this;
            let filterElements = {};
            // 获取表格数据，给筛选框加值
            this.gridOptions.columns.map(item =>{
                if(item.filter){
                    // 如果写了filter为true,但没给我传filterType,默认filter为false。
                    item.slots?item.slots:item.slots={};
                    switch (item.filterType){
                        case "input":
                            item.slots.header = "input_default";
                            break;
                        case "select":
                            item.slots.header = "select_default";
                            break;
                        case "select_mult":
                            item.slots.header = "select_multiple";
                            break;
                        case "date":
                            item.slots.header = "date_default";
                            break;
                        default:
                            item.filter = false;
                            break;
                    }
                    if(item.filter){
                        filterElements[item.field]="";
                    }
                }
            })
            this.filterElements={...filterElements}
        },
        methods:{
            inputFilterChange(v,field){

                const xTable = this.$refs.filterTable;
                const column = xTable.getColumnByField(field);
                if(v){
                    if(!column.filters){
                        column.filters = [{}];
                    }

                    const option = column.filters[0];
                    // 文档写的是data,但我多次尝试，均为暂无数据，改成value可以了
                    // option.data = v;
                    option.value = v;
                    option.checked = true;
                }else{
                    column.filters = undefined;
                }

                xTable.updateData()
            },
            selectFilterChange(v,field){
                const xTable = this.$refs.filterTable;
                const column = xTable.getColumnByField(field);

                if(!column.filters){
                    column.filters = [{}];
                }
                let data = [];
                that.genderArr.map(item =>{
                    if(item.value == v){
                        item.checked = true
                    }else{
                        item.checked = false
                    };
                    data.push(item);
                })
                xTable.setFilter(column, data);

                xTable.updateData()
            },
            multSelectFilterChange(v,field){
                const xTable = this.$refs.filterTable;
                const column = xTable.getColumnByField(field);

                if(!column.filters){
                    column.filters = [{}];
                }
                let data = [];
                that.addrArr.map(item =>{
                    if(v.indexOf(item.value) > -1){
                        item.checked = true
                    }else{
                        item.checked = false
                    };
                    data.push(item);
                })

                xTable.setFilter(column, data);

                xTable.updateData()
            }
        }
    }

</script>

<style>
    .filterBox{
        border-top:1px solid #ddd;
        padding: 4px;
        background: #ffffff;
    }
    .titleBox{
        padding:5px 10px;
        margin: 0;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .grid .slotBox{
        position: absolute;
        top: 0;
        left:0;
        width: calc(100% - 1px );
    }
    .grid .vxe-cell--title{
        width: 100%;
    }
    .grid .el-select,.grid .el-date-editor{
        width: 100%;
    }
    .grid .el-input .el-input__inner{
        text-align: inherit;
    }
    .grid .el-select .el-input__inner,.grid .el-date-editor .el-input__inner{
        height: 28px;
        line-height: 28px;
        text-align: left;
    }
    .grid .el-select .el-input .el-input__icon,.grid .el-date-editor .el-input__icon{
        line-height: 28px;
    }
    .grid .el-date-editor.el-input,.grid .el-date-editor.el-input__inner{
        width: 100%;
    }
    .grid .vxe-table .vxe-header--column{
        padding: 0!important;
    }
    .grid .vxe-table .vxe-header--column.col--ellipsis{
        height: 68px;
    }
</style>
