<template>
    <div class="table filter">
        <p>列头右键快捷菜单</p>
        <!--{{filtersData}}-->
        <!--{{columns}}-->
        <vxe-grid
            class="grid"
            v-bind="$attrs"
            ref="filterTable"
            :border="border"
            :resizable="resizable"
            :showHeaderOverflow="showHeaderOverflow"
            :align="align"
            :sortConfig="sortConfig"
            :filterConfig="filterConfig"
            :editConfig="editConfig"
            :keepSource="keepSource"
            :pagerConfig="pagerConfig"
            :toolbarConfig="toolbarConfig"
            :loading="gridLoading"
            :columns="columns"
            :data="data"
            @page-change="handlePageChange"
            v-on="$listeners"
        >
            <template v-slot:toolbar_buttons>
                <vxe-button @click="align = 'left'">居左</vxe-button>
                <vxe-button @click="align = 'center'">居中</vxe-button>
                <vxe-button @click="align = 'right'">居右</vxe-button>
            </template>
            <template v-slot:display_columns>
                <div class="iconBoxs">
                    <div class="iconBox">
                        <i class="el-icon-view" @click="openTreeTransfer"></i>
                    </div>
                    <div class="iconBox">
                        <i class="el-icon-printer" @click="printEvent"></i>
                    </div>
                </div>
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
                        <!--输入的筛选类型-->
                        <div class="types">
                            <div class="filterIcon" v-if="!column.params.filterWayValue || column.params.filterWayValue == 'equal'">=</div>
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'startswith'">
                                <span class="sel">ab</span>c
                            </div>
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'contains'">
                                a<span class="sel">b</span>c
                            </div>
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'notcontains'"> d </div>
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'greater'"> > </div>
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'less'"> < </div>
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'between'"> |-| </div>
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'notequal'"> ≠ </div>
                            <div class="filterTypes">
                                <el-select v-model="column.params.filterWayValue" v-if="column.params.filterWay == 'str'" @change="clearFilter(column.property)">
                                    <el-option
                                            v-for="item in strTypeoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="column.params.filterWayValue" v-if="column.params.filterWay == 'num'" @change="clearFilter(column.property)">
                                    <el-option
                                            v-for="item in numTypeoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>

                        <div class="filterContent" v-if="column.params.filterWayValue == 'between'">
                            <el-input  class="filterOther" :placeholder="column.params.filterWayPhold || '请输入'" size="mini" clearable :style="{textAlign:column.align}" v-model="lessElements[column.property]" @change="lessChange($event,column.property)"></el-input>
                          —  <el-input class="filterOther" :placeholder="column.params.filterWayPhold || '请输入'" size="mini" clearable :style="{textAlign:column.align}" v-model="greatElements[column.property]" @change="greatChange($event,column.property)"></el-input>
                        </div>
                        <div class="filterContent" v-else>
                            <el-input :placeholder="column.params.filterWayPhold || '请输入'" size="mini" clearable :style="{textAlign:column.align}" v-model="filterElements[column.property]" @change="inputFilterChange($event,column.property)"></el-input>
                        </div>
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
                        <div class="types">
                            <div class="filterIcon" v-if="!column.params.filterWayValue || column.params.filterWayValue == 'equal'">=</div>
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'multiple'">&</div>
                            <div class="filterTypes">
                                <el-select v-model="column.params.filterWayValue"  @change="clearFilter(column.property)">
                                    <el-option
                                            v-for="item in selectTypeoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="filterContent">
                            <el-select
                                    v-if="!column.params.filterWayValue || column.params.filterWayValue == 'equal'"
                                    v-model="filterElements[column.property]"
                                    clearable
                                    @change="selectFilterChange($event,column.property,column.params.list)"
                                    :key="column.params + 1"
                                    :placeholder="column.params.filterWayPhold || '请选择'"
                            >
                                <el-option
                                        v-for="item in dicts[column.params.list]" :key="item.value" :value="item.value" :label="item.label">
                                </el-option>
                            </el-select>
                            <el-select
                                    v-if="column.params.filterWayValue == 'multiple'"
                                    v-model="filterElements[column.property]"
                                    clearable
                                    multiple
                                    collapse-tags
                                    @change="multSelectFilterChange($event,column.property,column.params.list)"
                                    :key="column.params + 2"
                                    :placeholder="column.params.filterWayPhold || '请选择'"
                            >
                                <el-option
                                        v-for="item in dicts[column.params.list]" :key="item.value" :value="item.value" :label="item.label">
                                </el-option>
                            </el-select>
                        </div>
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
                        <!--输入类型-->
                        <div class="types">
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'year'">Y</div>
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'month'">M</div>
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'monthrange'">M-M</div>
                            <div class="filterIcon" v-if="!column.params.filterWayValue || column.params.filterWayValue == 'date'">D</div>
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'dates'">&</div>
                            <div class="filterIcon" v-if="column.params.filterWayValue == 'daterange'">D-D</div>
                            <div class="filterTypes">
                                <el-select v-model="column.params.filterWayValue" v-if="column.params.filterWay == 'date'" @change="clearFilter(column.property)">
                                    <el-option
                                            v-for="item in dateTypeoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="filterContent">
                            <el-date-picker
                                    v-if="column.params.filterWayValue == 'year'
                                     || column.params.filterWayValue == 'month'
                                     || column.params.filterWayValue == 'date'
                                     || column.params.filterWayValue == 'dates'
                                     ||!column.params.filterWayValue"
                                    v-model="filterElements[column.property]"
                                    clearable
                                    :format="dateFormat[column.params.filterWayValue]"
                                    :value-format="dateFormat[column.params.filterWayValue]"
                                    :type="column.params.filterWayValue || 'date'"
                                    :placeholder="column.params.filterWayPhold || '请选择'"
                                    @change="inputFilterChange($event,column.property)"
                                    :key="column.params + 1"
                            >
                            </el-date-picker>
                            <el-date-picker
                                    v-if="column.params.filterWayValue == 'monthrange'
                                     || column.params.filterWayValue == 'daterange'"
                                    v-model="filterElements[column.property]"
                                    :type="column.params.filterWayValue"
                                    :format="dateFormat[column.params.filterWayValue]"
                                    :value-format="dateFormat[column.params.filterWayValue]"
                                    range-separator="至"
                                    start-placeholder="开始"
                                    end-placeholder="结束"
                                    @change="inputFilterChange($event,column.property)"
                                    :key="column.params + 2"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                </div>
            </template>
            <!--默认项-->
            <template v-slot:no_filter="{ column }">
                <div class="slotBox onlyTitle">
                    <p class="titleBox" v-contextmenu:contextmenu @click.stop="sortChange(column)">{{column.title}}
                        <span v-if="column.sortable" class="custom-sort custom-sort-nofilter" :class="{'is-order': column.order}">
                            <i class="vxe-sort--asc-btn vxe-icon--caret-top" :class="[column.order === 'asc' ? 'sort--active' : '']"></i>
                            <i class="vxe-sort--desc-btn vxe-icon--caret-bottom" :class="[column.order === 'desc'? 'sort--active' : '']"></i>
                        </span>
                    </p>
                </div>
            </template>

            <!--翻译-->
            <template v-slot:trans_default="{ column, row }">
                {{row.sex | filtersArr(column.params.list)}}
            </template>

            <!--操作列-->
            <template v-slot:operate="{ row }">
                <div class="operate">
                    <span @click="saveRowEvent(row)" v-if="$refs.filterTable.isActiveByRow(row)">保 存</span>
                    <span @click="editRowEvent(row)" v-else>编 辑</span>
                    <span @click="removeRowEvent(row)">删 除</span>
                </div>
            </template>
        </vxe-grid>
        <!--右键弹出框-->
        <v-contextmenu ref="contextmenu" @contextmenu="handleContextmenu">
            <v-contextmenu-item :disabled="JSON.stringify(filtersData) == '{}'" @click="cancelFilter">清空所有筛选条件</v-contextmenu-item>
            <v-contextmenu-submenu @submenu-show="handleSubmenuShow" title="固定">
                <v-contextmenu-item :disabled="fixed=='left'" @click="leftFix">左固定</v-contextmenu-item>
                <v-contextmenu-item :disabled="fixed=='right'" @click="rightFix">右固定</v-contextmenu-item>
                <v-contextmenu-item :disabled="fixed=='null'" @click="cancelFix">取消固定</v-contextmenu-item>
            </v-contextmenu-submenu>
        </v-contextmenu>
        <!--穿梭树-->
        <el-dialog
                title="切换列的显示"
                :visible.sync="transferDialogVisible"
                :close-on-click-modal="false"
                width="50%">
            <!--// 使用树形穿梭框组件-->
            <tree-transfer :title="title" :from_data='fromData' :to_data='toData' node_key="id" pid="prentField" :defaultProps="{label:'title'}" @add-btn='add' @remove-btn='remove' :mode='mode' height='540px' filter openAll>
            </tree-transfer>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancleTreeTransfer">取 消</el-button>
                <el-button type="primary" @click="closeTreeTransfer">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import treeTransfer from 'el-tree-transfer' // 引入
    import {mapState} from "vuex"
    let that;
    export default {
        components:{ treeTransfer }, // 注册
        inheritAttrs: false,
        data () {
            return {
                //右键状态
                fixed:null,//右键当前列的固定状态
                gridLoading:false,
                // 表格配置
                ref:"filterTable",
                sortConfig:{showIcon: false},
                filterConfig:{showIcon: false,remote: true},
                pagerConfig: {
                    total: 0,
                    currentPage: 1,
                    pageSize: 10,
                    pageSizes: [10, 20, 50, 100, 200, 500]
                },
                // 列头数据
                columns:[],
                //表格数据
                data:[],
                gridPage:{
                    currentPage: 1,
                    pageSize: 10,
                    totalResult: 0
                },
                filterElements:{},//筛选值
                filtersData:{},//筛选的方式
                lessElements:[],//分段的筛选，最小值
                greatElements:[],//分段的筛选，最大值
                // 解决多维数据的参数获取问题
                // 筛选方法
                // 字符串筛选 filterWay:str;filterWayValue:contains(默认为包含)
                strTypeoptions:[ {
                    value: 'equal',
                    label: '等于'
                }, {
                    value: 'startswith',
                    label: '首部'
                },{
                    value: 'contains',
                    label: '包含'
                }, {
                    value: 'notcontains',
                    label: '不包含'
                }],
                // 数字筛选 filterWay:num;filterWayValue:equal(默认为等于)
                numTypeoptions:[ {
                    value: 'equal',
                    label: '等于'
                }, {
                    value: 'greater',
                    label: '大于'
                }, {
                    value: 'less',
                    label: '小于'
                },{
                    value: 'between',
                    label: '介于'
                },{
                    value: 'notequal',
                    label: '不等于'
                }],
                //下拉筛选 filterWay:select;filterWayValue:equal/multiple
                selectTypeoptions:[ {
                    value: 'equal',
                    label: '等于'
                }, {
                    value: 'multiple',
                    label: '多选'
                }],
                //时间筛选 filterWay:date;filterWayValue:date(默认为年月日)
                dateTypeoptions:[ {
                    value: 'year',
                    label: '年'
                }, {
                    value: 'month',
                    label: '年月'
                }, {
                    value: 'monthrange',
                    label: '月份范围'
                },{
                    value: 'date',
                    label: '年月日'
                },{
                    value: 'daterange',
                    label: '日期范围'
                },{
                    value: 'dates',
                    label: '多个日期'
                }],
                //数据格式化
                dateFormat:{
                    date:"yyyy-MM-dd",
                    dates:"yyyy-MM-dd",
                    year:"yyyy",
                    month:"yyyy-MM",
                    monthrange:"yyyy-MM",
                    daterange:"yyyy-MM-dd",
                },
                // 穿梭树
                mode: "transfer", // transfer addressList
                title:['未显示列','显示列'],
                fromData:[],//未显示列
                toData:[],//显示列
                fromDataTemp:null,//未显示列暂存
                toDataTemp:null,//显示列暂存
                addObj:null,//新选中的列头数据
                removeObj:null,//新隐藏的列头数据
                // 弹框
                transferDialogVisible:false,
            }
        },
        props:{
            border:{
                type: Boolean,
                default:true
            },
            resizable:{
                type: Boolean,
                default:true
            },
            showHeaderOverflow:{
                type: Boolean,
                default:true
            },
            autoResize:{
                type: Boolean,
                default:true
            },
            keepSource:{
                type: Boolean,
                default:true
            },
            align:{
                type: String,
                default:'left'
            },
            editConfig:{
                type: Object,
                default:() => {
                    return {
                        trigger: 'manual',
                        mode: 'row',
                        showStatus: true,
                        icon: 'fa fa-file-text-o'
                    }
                }
            },
            toolbarConfig:{
                type: Object,
                default:() => {
                    return {
                        slots: {
                            buttons: 'toolbar_buttons',
                            tools:"display_columns"
                        }
                    }
                }
            },
            tableColumns:{
                type: Array,
                default:() => {
                    return []
                }
            },
            tableDatas:{
                type: Array,
                default:() => {
                    return []
                }
            },
        },
        computed:{
            ...mapState({
                dicts: (state) => state.dicts
            })
        },
        watch:{
            tableColumns:{
                handler(newVal, oldVal) {
                    this.columns = JSON.parse(JSON.stringify(this.tableColumns));
                    this.getColumn();
                    console.log("tableColumns",this.tableColumns)
                },
                deep: true
            },
            tableDatas:{
                handler(newVal, oldVal) {
                    this.data = this.tableDatas;
                    this.gridLoading = false;
                    console.log("tableDatas",this.tableDatas)
                },
                deep: true
            },
        },
        mounted(){
            this.$nextTick(()=>{
                this.gridLoading=false;
            })
        },
        filters: {
            filtersArr: function (value,list) {
                let data = that.dicts[list].find(item =>{
                    return item.value == value
                })
                return data.label
            }
        },
        created(){
            that = this;
            this.gridLoading=true;
            this.getPage();
            console.log("create")
        },
        methods:{
            getColumn(){
                this.formatColumn(this.columns);
                debugger
                console.log("后",this.columns)
                // 显示列头情况
                if(this.toolbarConfig&&this.toolbarConfig.slots&&this.toolbarConfig.slots.tools&&this.toolbarConfig.slots.tools == "display_columns"){
                    console.log("column",this.columns)
                    this.toData = this.formatTransferShow(JSON.parse(JSON.stringify(this.columns)));
                    console.log("column",this.fromData)
                    this.fromData = this.formatTransferHide(JSON.parse(JSON.stringify(this.columns)));
                    console.log("column",this.toData)
                }
            },
            formatColumn(columns){
                console.log("前",columns)

                // 在不赋值的情况下，空对象下的属性可以响应。如果需要对筛选回显，需要$set或者将filterElements的值循环赋上
                // let filterElements = {};
                // 获取表格数据，给筛选框加值
                columns.map(item =>{
                    if(item.children){
                        this.formatColumn(item.children)
                    }else{
                        // 筛选情况
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
                        // 编辑情况
                        if(item.editRender){
                            if(item.editRender.options){
                                item.editRender.options = this.dicts[item.editRender.options];
                                console.log("item",item.editRender.options)
                            }
                        }
                    }
                })

                // this.filterElements={...filterElements}
            },
            formatTransferShow(columns){
                // 分离显示列
                for (var i = columns.length - 1; i >= 0; i--) {
                    let item = columns[i];
                    if((item.visible === undefined || item.visible === true)&&item.children&&item.children.length > 0){
                        this.formatTransferShow(item.children);
                    }
                    if(item.visible === false ||((item.visible === undefined || item.visible === true) &&item.children && item.children.length == 0)){
                        columns.splice(i,1);
                    }
                }
                return columns;
            },
            formatTransferHide(columns){
                // 分离未显示列
                for (var i = columns.length - 1; i >= 0; i--) {
                    let item = columns[i];
                    if((item.visible === undefined || item.visible === true) && item.children&&item.children.length > 0){
                        this.formatTransferHide(item.children);
                    }

                    if((item.visible === undefined || item.visible === true) &&(!item.children || item.children.length == 0)  ){
                        columns.splice(i,1);
                    }
                }
                return columns;
            },
            updateColumns(columns,showColumns){
                // 设置columns
                for (var i = columns.length - 1; i >= 0; i--) {
                    let item = columns[i];
                    if(item.children){
                        this.updateColumns(item.children,showColumns);
                    }else{
                        if(item.field){
                            if( showColumns.indexOf(item.field) > -1 ){
                                item.visible = true;
                            }else{
                                item.visible = false;
                            }
                        }
                    }
                }
                return columns;
            },
            getPage(){

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
                this.columns.map(item =>{
                    item.filters = null;
                })
                this.filterElements = {};
                this.filtersData = {};
                xTable.clearFilter();
                this.gridLoading = true;
                this.$emit("tableRefresh",{filtersData:this.filtersData,gridPage:this.gridPage})
                // xTable.updateData()
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
            // 拼接筛选数据
            joinFilter(){
                let filtersData = {};
                const xTable = this.$refs.filterTable;
                for(let key in this.filterElements){
                    const column = xTable.getColumnByField(key);
                    // 空值或空数组不向后台传
                    if(this.filterElements[key] && this.filterElements[key].length != 0){
                        filtersData[key] = {};
                        filtersData[key].value = this.filterElements[key];
                        if(column.params.filterWay == 'str' || column.params.filterWay == 'num' || column.params.filterWay == 'select'){
                            filtersData[key].type = column.params.filterWayValue || 'equal'
                        }else if(column.params.filterWay == 'date'){
                            filtersData[key].type = column.params.filterWayValue || 'date'
                        }
                    }
                }
                this.filtersData = filtersData;
                this.gridLoading = true;
                this.$emit("tableRefresh",{filtersData:this.filtersData,gridPage:this.gridPage})
                // xTable.updateData();
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
                this.joinFilter();
            },
            // 输入框分段筛选
            inputRangeFilterChange(v,field,type){
                // {min:v,max:v}
                const xTable = this.$refs.filterTable;
                const column = xTable.getColumnByField(field);

                    if(!column.filters){
                        column.filters = [{}];
                    }

                    const option = column.filters[0];

                    // 第一种方法
                // option.value?option.value:option.value = {};
                // this.filterElements[field]?this.filterElements[field]:this.filterElements[field] = {};
                // this.$set(this.filterElements[field],type,v);
                // 第二种方法
                    option.value?option.value:option.value = {min:null,max:null};
                    option.value[type] = v;
                    option.checked = true;

                    this.$set(this.filterElements,field,option.value);
                    console.log(option.value)

                    // 如果最大最小都为空，清除筛选
               if(!option.value["min"]&&!option.value["max"]){
                   column.filters = undefined;
                   this.$set(this.filterElements,field,"");
               }
                this.joinFilter();
            },
            //输入框范围的最小值
            lessChange(v,field){
                this.inputRangeFilterChange(v,field,"min");
            },
            //输入框范围的最大值
            greatChange(v,field) {
                this.inputRangeFilterChange(v, field, "max");
            },
            // 切换类型，清空筛选
            clearFilter(field){
                this.$set(this.filterElements,field,"");
                const xTable = this.$refs.filterTable;
                const column = xTable.getColumnByField(field);
                    column.filters = undefined;
            },
            // 下拉会触发
            selectFilterChange(v,field,list){
                const xTable = this.$refs.filterTable;
                const column = xTable.getColumnByField(field);

                if(!column.filters){
                    column.filters = [{}];
                }
                let data = [];
                that.dicts[list].map(item =>{
                    if(item.value == v){
                        item.checked = true
                    }else{
                        item.checked = false
                    };
                    data.push(item);
                })
                xTable.setFilter(column, data);
                this.joinFilter();
            },
            // 多选下拉会触发
            multSelectFilterChange(v,field,list){
                const xTable = this.$refs.filterTable;
                const column = xTable.getColumnByField(field);

                if(!column.filters){
                    column.filters = [{}];
                }
                let data = [];
                that.dicts[list].map(item =>{
                    if(v.indexOf(item.value) > -1){
                        item.checked = true
                    }else{
                        item.checked = false
                    };
                    data.push(item);
                })

                xTable.setFilter(column, data);
                this.joinFilter();
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
                alert("静态数据模拟");
                this.gridPage.currentPage = currentPage;
                this.gridPage.pageSize = pageSize;
                this.$emit("tableRefresh",{filtersData:this.filtersData,gridPage:this.gridPage})
                // let data = [
                //     { id: 10011, name: 'Test11', nickname: 'T11', role: 'Develop', sex: '00900', age: '80',birthday:'2021-02-11', address: 'Shenzhen' },
                //     { id: 10012, name: 'Test12', nickname: 'T12', role: 'Designer', sex: '00901', age: '90',birthday:'2021-02-10', address: 'Shenzhen' },
                //     { id: 10013, name: 'Test13', nickname: 'T13', role: 'Test', sex: '00900', age: '5',birthday:'2021-02-21', address: 'Shenzhen' },
                //     { id: 10014, name: 'Test14', nickname: 'T14', role: 'Develop', sex: '00900', age: '80',birthday:'2021-02-11', address: 'Shenzhen' },
                // ];
                // this.$set(this,"data",data);

            },
            // 编辑触发
            editRowEvent (row) {
                this.$refs.filterTable.setActiveRow(row)
                console.log("编辑",row)
            },
            saveRowEvent () {
                this.$refs.filterTable.clearActived().then(() => {
                    this.gridLoading = true
                    setTimeout(() => {
                        this.gridLoading = false
                        this.$XModal.message({ message: '保存成功！', status: 'success' })
                    }, 300)
                })
                console.log("保存");
            },
            removeRowEvent (row) {
                console.log("删除",row)
                this.$XModal.confirm('您确定要删除该数据?').then(type => {
                    if (type === 'confirm') {
                        this.$refs.filterTable.remove(row)
                    }
                })
            },
            // 动态显示列头
            openTreeTransfer(){
                this.transferDialogVisible = true;
                this.fromDataTemp = JSON.stringify(this.fromData);
                this.toDataTemp =  JSON.stringify(this.toData);
            },
            cancleTreeTransfer(){
                this.transferDialogVisible = false;
                this.fromData = JSON.parse(this.fromDataTemp);
                this.toData = JSON.parse(this.toDataTemp);
                this.addObj = null;
                this.removeObj = null;
                this.fromDataTemp = "";
                this.toDataTemp = "";
            },
            closeTreeTransfer(){
                this.transferDialogVisible = false;
                if(this.toDataTemp != JSON.stringify(this.toData)){
                    this.fromDataTemp = "";
                    this.toDataTemp = "";

                    const xTable = this.$refs.filterTable;
                    let column;
                    if(this.addObj){
                        let addKey = this.addObj.keys;
                        let addLen = this.addObj.keys.length;
                        // 遍历obj,将obj内的field转换成visible:true;
                        for(let i = 0;i < addLen ;i++){
                            column = xTable.getColumnByField(addKey[i]);
                            column?column.visible = true:"";
                        }
                    }
                    if(this.removeObj){
                        let removeKey = this.removeObj.keys;
                        let removeLen = this.removeObj.keys.length;
                        // 遍历obj,将obj内的field转换成visible:false;
                        for(let i = 0;i < removeLen ;i++){
                            column = xTable.getColumnByField(removeKey[i]);
                            column?column.visible = false:"";
                        }
                    }
                    xTable.refreshColumn();
                    // debugger
                    // 如果field在visibleColumn里，设置false.否则设置true.
                    let show = [];
                    let showColumn = xTable.getTableColumn().visibleColumn;
                    for(let i = 0; i < showColumn.length;i++){
                        if(showColumn[i].property){
                            show.push(showColumn[i].property);
                        }
                    }
                    let columns = this.updateColumns(this.columns,show);

                    this.$emit("updateColumn",columns);
                }
                this.addObj = null;
                this.removeObj = null;
            },
            // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
            // changeMode() {
            //     if (this.mode == "transfer") {
            //         this.mode = "addressList";
            //     } else {
            //         this.mode = "transfer";
            //     }
            // },
            // 监听穿梭框组件添加
            add(fromData,toData,obj){
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
                console.log("fromData:", fromData);
                console.log("toData:", toData);
                console.log("addobj:", obj);
                this.addObj = obj;

            },
            // 监听穿梭框组件移除
            remove(fromData,toData,obj){
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
                console.log("fromData:", fromData);
                console.log("toData:", toData);
                console.log("obj:", obj);
                this.removeObj = obj;

            },
            // 打印
            printEvent(){
                this.$refs.filterTable.print()
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
        padding:2px 10px;
        margin: 0;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        display: flex;
        align-items: center;
    }
    .table .custom-sort{
        height: 20px;
    }
    .grid .slotBox{
        position: absolute;
        top: 0;
        left:0;
        bottom:0;
        width: calc(100% - 1px );
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
    }
    .grid .onlyTitle{
        justify-content: center;
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
    .grid .el-select .el-input__inner{
        height: 28px;
        line-height: 28px;
        text-align: left;
    }
    .grid .el-date-editor .el-input__inner,.grid .el-date-editor--monthrange,.grid .el-date-editor--daterange{
        height: 28px;
        line-height: 28px;
        text-align: left;
    }
    .grid .el-date-editor .el-range-separator{
        display: inline-flex;
        align-items: center;
    }
    .grid .el-select .el-input .el-input__icon,.grid .el-date-editor .el-input__icon{
        line-height: 28px;
        display: inline-flex;
        align-items: center;
    }
    .grid .el-date-editor.el-input,.grid .el-date-editor.el-input__inner{
        width: 100%;
    }
    .grid .vxe-table .vxe-header--column{
        padding: 0!important;
    }
    .grid .vxe-table .vxe-header--column.col--ellipsis{
        height: 62px;
    }
    .grid .vxe-table .vxe-header--column.col--ellipsis.col--group{
        height: 30px;
    }
    .el-input.filterOther{
        /*position: absolute;*/
        /*bottom:34px;*/
        /*left:38px;*/
        /*width:calc(100% - 42px);*/
        width: calc(50% - 11px);
        color: #bbb;
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
    .iconBoxs{
        display: flex;
    }
    .iconBox{
        width: 34px;
        height: 34px;
        margin-left:10px;
        border-radius: 50%;
        border:1px solid #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .iconBox:hover{
        border:1px solid #409eff;
        color:#409eff;
    }
    .iconBox i{
        font-size: 20px;
    }
    .operate{
        font-size: 12px;
        color:#333;
        display: flex;
    }
    .operate span{
        flex:0 0 50%;
        text-align: center;
    }
    .operate span:hover{
        text-decoration: underline;
        color:#409eff;
    }
    .filterContent{
        width: calc(100% - 34px);
    }
    .types{
        position: relative;
        width: 34px;
        height: 100%;
        float: left;
    }
    .filterIcon{
        width: 30px;
        margin-right: 4px;
        text-align: center;
        line-height: 28px;
        font-size: 12px;
    }
    .filterIcon .sel{
        background: #aaa;
        color:#fff;
    }
    .filterTypes{
        position: absolute;
        opacity: 0.5;
        opacity: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .v-contextmenu .v-contextmenu-item.v-contextmenu-item--disabled{
        background: #ffffff;
    }
</style>


























