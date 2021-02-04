<template>
    <div class="table filter">
        <vxe-grid
                class="grid"
                v-bind="gridOptions"
        >
            <template v-slot:toolbar_buttons>
                <vxe-button @click="gridOptions.align = 'left'">居左</vxe-button>
                <vxe-button @click="gridOptions.align = 'center'">居中</vxe-button>
                <vxe-button @click="gridOptions.align = 'right'">居右</vxe-button>
            </template>
            <template v-slot:display_columns>
                <vxe-button type="text" icon="vxe-icon--menu" class="tool-btn" @click="openTreeTransfer"></vxe-button>
            </template>
            <!--vxe-grid没有使用vxe-table-colgroup的例子，所以这里自行实现-->
            <!--输入筛选-->
            <template v-slot:input_default="{ column }">
                <div class="slotBox">
                    <p class="titleBox" v-contextmenu:contextmenu @click.stop="sortChange(column)">{{column.title}}
                        <span v-if="column.sortable" class="custom-sort" :class="{'is-order': column.order}">
                            <i class="vxe-sort--asc-btn vxe-icon--caret-top" :class="[column.order === 'asc' ? 'sort--active' : '']"></i>
                            <i class="vxe-sort--desc-btn vxe-icon--caret-bottom" :class="[column.order === 'desc'? 'sort--active' : '']"></i>
                        </span>
                    </p>
                    <div class="filterBox">
                        <el-input placeholder="搜索" size="mini" clearable :style="{textAlign:column.align}" v-model="filterElements[column.property]" @change="inputFilterChange($event,column.property)"></el-input>
                    </div>
                </div>
            </template>
            <!--下拉筛选-->
            <template v-slot:select_default="{ column }">
                <div class="slotBox">
                    <p class="titleBox" v-contextmenu:contextmenu @click.stop="sortChange(column)">{{column.title}}
                        <span v-if="column.sortable" class="custom-sort" :class="{'is-order': column.order}">
                            <i class="vxe-sort--asc-btn vxe-icon--caret-top" :class="[column.order === 'asc' ? 'sort--active' : '']"></i>
                            <i class="vxe-sort--desc-btn vxe-icon--caret-bottom" :class="[column.order === 'desc'? 'sort--active' : '']"></i>
                        </span>
                    </p>
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
            <!--多选下拉-->
            <template v-slot:select_multiple="{ column }">
                <div class="slotBox">
                    <p class="titleBox" v-contextmenu:contextmenu @click.stop="sortChange(column)">{{column.title}}
                        <span v-if="column.sortable" class="custom-sort" :class="{'is-order': column.order}">
                            <i class="vxe-sort--asc-btn vxe-icon--caret-top" :class="[column.order === 'asc' ? 'sort--active' : '']"></i>
                            <i class="vxe-sort--desc-btn vxe-icon--caret-bottom" :class="[column.order === 'desc'? 'sort--active' : '']"></i>
                        </span>
                    </p>
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
            <!--日期筛选-->
            <template v-slot:date_default="{ column }">
                <div class="slotBox">
                    <p class="titleBox" v-contextmenu:contextmenu @click.stop="sortChange(column)">{{column.title}}
                        <span v-if="column.sortable" class="custom-sort" :class="{'is-order': column.order}">
                            <i class="vxe-sort--asc-btn vxe-icon--caret-top" :class="[column.order === 'asc' ? 'sort--active' : '']"></i>
                            <i class="vxe-sort--desc-btn vxe-icon--caret-bottom" :class="[column.order === 'desc'? 'sort--active' : '']"></i>
                        </span>
                    </p>
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
            <!--默认项-->
            <template v-slot:no_filter="{ column }">
                <div class="slotBox">
                    <p class="titleBox" v-contextmenu:contextmenu @click.stop="sortChange(column)">{{column.title}}
                        <span v-if="column.sortable" class="custom-sort custom-sort-nofilter" :class="{'is-order': column.order}">
                            <i class="vxe-sort--asc-btn vxe-icon--caret-top" :class="[column.order === 'asc' ? 'sort--active' : '']"></i>
                            <i class="vxe-sort--desc-btn vxe-icon--caret-bottom" :class="[column.order === 'desc'? 'sort--active' : '']"></i>
                        </span>
                    </p>
                </div>
            </template>

            <!--翻译-->
            <template v-slot:trans_default="{ row }">
                {{row.sex | filtersArr}}
            </template>

        </vxe-grid>
        <vxe-pager
                border
                size="small"
                :loading="gridLoading"
                :current-page="gridPage.currentPage"
                :page-size="gridPage.pageSize"
                :total="gridPage.totalResult"
                :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                @page-change="handlePageChange">
        </vxe-pager>
        <!--右键弹出框-->
        <v-contextmenu ref="contextmenu" @contextmenu="handleContextmenu">
            <v-contextmenu-item :disabled="!hasFilter" @click="cancelFilter">清空所有筛选条件</v-contextmenu-item>
            <v-contextmenu-submenu @submenu-show="handleSubmenuShow" title="固定">
                <v-contextmenu-item :disabled="fixed=='left'" @click="leftFix">左固定</v-contextmenu-item>
                <v-contextmenu-item :disabled="fixed=='right'" @click="rightFix">右固定</v-contextmenu-item>
                <v-contextmenu-item :disabled="fixed=='null'" @click="cancelFix">取消固定</v-contextmenu-item>
            </v-contextmenu-submenu>
        </v-contextmenu>
        <!--穿梭树-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <!--// 使用树形穿梭框组件-->
            <tree-transfer :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" @add-btn='add' @remove-btn='remove' :mode='mode' height='540px' filter openAll>
            </tree-transfer>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import treeTransfer from 'el-tree-transfer' // 引入
    let that;
    export default {
        components:{ treeTransfer }, // 注册
        data () {
            return {
                //右键状态
                fixed:null,//右键当前列的固定状态
                gridLoading:false,
                gridOptions: {
                    ref:"filterTable",
                    border: true,
                    resizable: true,
                    showHeaderOverflow: true,
                    showOverflow: false,
                    autoResize:true,
                    align: 'left',
                    sortConfig:{showIcon: false},
                    toolbarConfig: {
                        slots: {
                            buttons: 'toolbar_buttons',
                            tools:"display_columns"
                        }
                    },
                    loading:this.gridLoading,
                    columns: [],
                    data: []
                },
                gridPage:{
                    currentPage: 1,
                    pageSize: 10,
                    totalResult: 0
                },
                filterElements:{},
                hasFilter:false,
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
                // 穿梭树
                mode: "transfer", // transfer addressList
                title:['源数据','目标数据'],
                fromData:[
                    {
                        id: "1",
                        pid: 0,
                        label: "一级 1",
                        children: [
                            {
                                id: "1-1",
                                pid: "1",
                                label: "二级 1-1",
                                disabled: true,
                                children: []
                            },
                            {
                                id: "1-2",
                                pid: "1",
                                label: "二级 1-2",
                                children: [
                                    {
                                        id: "1-2-1",
                                        pid: "1-2",
                                        children: [],
                                        label: "二级 1-2-1"
                                    },
                                    {
                                        id: "1-2-2",
                                        pid: "1-2",
                                        children: [],
                                        label: "二级 1-2-2"
                                    }
                                ]
                            }
                        ]
                    },
                ],
                toData:[],
                // 弹框
                dialogVisible:false,

            }
        },
        mounted(){
            console.log("filterElements",this.filterElements)
            this.$nextTick(()=>{
                this.gridLoading=false;
            })
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
            this.gridLoading=true;
            this.getColumn();
            this.getData();
            this.getPage();
            console.log("create")
        },
        methods:{
            getColumn(){
                let column = [
                    { type: 'seq', width: 50,fixed:"left" },
                    { field: 'name',width: 400, title: 'name',align:"right",filter:true,filterType:"input",sortable:true,fixed:"left" },
                    { field: 'sex',width: 400, title: 'sex',filter:true,filterType:"select", slots: {
                            default:"trans_default",
                        },sortable:true},
                    { field: 'birthday',width: 400, title: 'birthday',filter:true,filterType:"date", showOverflow: true,sortable:true},
                    { field: 'address',width: 400, title: 'Address', showOverflow: true,filter:true,filterType:"select_mult",sortable:true },
                    { field: 'role',width: 400, title: 'role',sortable:true,fixed:"right"}
                ];
                this.$set(this.gridOptions,"columns",column);
                // 在不赋值的情况下，空对象下的属性可以响应。如果需要对筛选回显，需要$set或者将filterElements的值循环赋上
                // let filterElements = {};
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
                                item.slots.header = "no_filter";
                                break;
                        }
                        // if(item.filter){
                        //     filterElements[item.field]="";
                        // }
                    }else{
                        // 如果没有筛选
                        item.slots?item.slots:item.slots={};
                        item.slots.header = "no_filter";
                    }
                })
                // this.filterElements={...filterElements}
            },
            getData(){
                let data = [
                    { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '00900', age: 0,birthday:'2021-02-01', address: 'Shenzhen' },
                    { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '00901', age: 22,birthday:'2021-02-11', address: 'Guangzhou' },
                    { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '00900', age: 100,birthday:'2021-02-22', address: 'Shanghai' },
                    { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '00901', age: 70,birthday:'2021-02-11', address: 'Shenzhen' },
                    { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '00901', age: 10,birthday:'2021-02-08', address: 'Shanghai' },
                    { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '00901', age: 90,birthday:'2021-02-10', address: 'Shenzhen' },
                    { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '00900', age: 5,birthday:'2021-02-21', address: 'Shenzhen' },
                    { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '00900', age: 80,birthday:'2021-02-11', address: 'Shenzhen' },
                    { id: 10009, name: 'Test9', nickname: 'T9', role: 'Designer', sex: '00901', age: 90,birthday:'2021-02-10', address: 'Shenzhen' },
                    { id: 10010, name: 'Test10', nickname: 'T10', role: 'Test', sex: '00900', age: 5,birthday:'2021-02-21', address: 'Shenzhen' },
                ];
                this.$set(this.gridOptions,"data",data);
            },
            getPage(){
                this.gridPage = {
                    currentPage: 1,
                    pageSize: 10,
                    totalResult: 14
                }
            },
            // 显示右键菜单
            handleContextmenu(vm){
                console.log(this.filterElements);
                console.log(vm.elm.textContent);
                // 只能获取到点击处的标签信息，取到文字，然后查找列信息
                this.field = vm.elm.innerText;
                const xTable = this.$refs.filterTable;
                const column = xTable.getColumnByField(this.field);
                this.fixed = column.fixed?column.fixed:"null";
            },
            // 显示子菜单
            handleSubmenuShow (vm, placement) {
                console.log(vm, placement)
            },
            // 取消全部筛选
            cancelFilter(){
                const xTable = this.$refs.filterTable;
                this.hasFilter = false;
                this.gridOptions.columns.map(item =>{
                    item.filters = null;
                })
                this.filterElements = {};
                xTable.clearFilter();
                xTable.updateData()
            },
            // 左固定
             leftFix () {
                 const xTable = this.$refs.filterTable;
                 const column = xTable.getColumnByField(this.field);
                 column.fixed = "left";
                 xTable.refreshColumn();
            },
            // 右固定
            rightFix () {
                const xTable = this.$refs.filterTable;
                const column = xTable.getColumnByField(this.field);
                column.fixed = "right";
                xTable.refreshColumn();
            },
            // 清除当前列固定
            cancelFix () {
                const xTable = this.$refs.filterTable;
                const column = xTable.getColumnByField(this.field);
                column.fixed = null;
                xTable.refreshColumn();
            },
            // 输入框回车触发
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
                this.hasFilter = true;
                debugger
                xTable.updateData()
            },
            // 下拉会触发
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
                this.hasFilter = true;
                xTable.updateData()
            },
            // 多选下拉会触发
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
                this.hasFilter = true;
                xTable.updateData()
            },
            // 排序操作会触发
            sortChange (column) {
                    if (column.order === 'desc') {
                        this.$refs.filterTable.clearSort()
                    } else if (column.order === 'asc') {
                        this.$refs.filterTable.sort(column.property, 'desc')
                    } else {
                        this.$refs.filterTable.sort(column.property, 'asc')
                    }
            },
            // 分页操作会触发
            handlePageChange ({ currentPage, pageSize }) {
                this.gridPage.currentPage = currentPage;
                this.gridPage.pageSize = pageSize;
                // this.getData()
                let data = [
                    { id: 10011, name: 'Test11', nickname: 'T11', role: 'Develop', sex: '00900', age: 80,birthday:'2021-02-11', address: 'Shenzhen' },
                    { id: 10012, name: 'Test12', nickname: 'T12', role: 'Designer', sex: '00901', age: 90,birthday:'2021-02-10', address: 'Shenzhen' },
                    { id: 10013, name: 'Test13', nickname: 'T13', role: 'Test', sex: '00900', age: 5,birthday:'2021-02-21', address: 'Shenzhen' },
                    { id: 10014, name: 'Test14', nickname: 'T14', role: 'Develop', sex: '00900', age: 80,birthday:'2021-02-11', address: 'Shenzhen' },
                ];
                this.$set(this.gridOptions,"data",data);
            },
            openTreeTransfer(){

            },
            // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
            changeMode() {
                if (this.mode == "transfer") {
                    this.mode = "addressList";
                } else {
                    this.mode = "transfer";
                }
            },
            // 监听穿梭框组件添加
            add(fromData,toData,obj){
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
                console.log("fromData:", fromData);
                console.log("toData:", toData);
                console.log("obj:", obj);
            },
            // 监听穿梭框组件移除
            remove(fromData,toData,obj){
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
                console.log("fromData:", fromData);
                console.log("toData:", toData);
                console.log("obj:", obj);
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
        bottom:0;
        width: calc(100% - 1px );
        display: flex;
        justify-content: center;
        flex-direction: column;
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

    .table .custom-sort {
        padding: 0px 12px 2px;
        position: relative;
    }
    .table .custom-sort.is-order {
        color: #409eff;
    }
    .table .custom-sort.custom-sort-nofilter{
        padding: 0px 12px 1px;
    }
    .table .home {
        margin-top: 150px;
    }
    .table .el-transfer-panel__header {
        text-align: left;
    }
</style>
