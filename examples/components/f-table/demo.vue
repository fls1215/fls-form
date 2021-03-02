<template>
    <div>
       <p> 封装表格使用示例 </p>
        筛选查询条件：{{filtersData}}
        <!--:pagerConfig="{enabled:false}" 不显示分页-->
        <!--toolbarConfig传入按钮和工具插槽
        tools:'display_columns'的情况下，设置
            :meterConfig="true" 动态表头
            :printConfig="true" 打印
            :exportConfig="true" 导出
        -->

        <filter-table
                class="demo"
                ref="demoTable"
                v-loading="demoLoading"
            :tableColumns.sync="tableColumns"
            :tableDatas.sync="tableDatas"
            @tableRefresh="tableRefresh"
            @updateColumn="updateColumn"
            @checkbox-all="selectAllEvent"
            @checkbox-change="selectChangeEvent"
            :pagerConfig="pagerConfig"
            :toolbarConfig="{ slots: { buttons: 'toolbar_buttons', tools:'display_columns'}}"
            :meterConfig="true"
            :printConfig="true"
            :exportConfig="true"
            height="600"
        >
            <!--自定义按钮-->
            <template  v-slot:toolbar>
                <vxe-button @click="getSelectEvent">获取选中</vxe-button>
                <!--<vxe-button @click="exportXlsx">导出</vxe-button>-->
            </template >
            <!--自定义列-->
            <template  v-slot:role="{column,row}">
                {{column}}---{{row}}
                <el-button size="mini">保存</el-button>
            </template >
            <template  v-slot:age="{row}">
                我是自定义列
            </template >
        </filter-table>
    </div>
</template>

<script>
    import filterTable from "./grid"
    // 引入xlsx
    import XLSX from 'xlsx';
    import {mapState} from "vuex"

    export default {
        name: "demo.vue",
        components:{filterTable},
        data(){
            return {
                bg:"red",
                tableColumns:[],
                tableDatas:[],
                filtersData:{},
                pagerConfig:{
                    total: 500,
                    currentPage: 1,
                    pageSize: 100,
                    pageSizes: [10, 20, 50, 100, 200, 500]
                },
                demoLoading:true,
                exporting:false//正在导出
            }
        },
        computed:{
            ...mapState({
                dicts: (state) => state.dicts
            })
        },
        created(){
            this.getColumn();
            this.getData();
        },
        methods:{
            // exportEvent () {
            //     // 转换数据
            //     const table = this.$refs.demoTable.$refs.filterTable.$el.querySelector('.body--wrapper>.vxe-table--body')
            //     const book = XLSX.utils.book_new()
            //     const sheet = XLSX.utils.table_to_sheet(table)
            //     XLSX.utils.book_append_sheet(book, sheet)
            //     //输出
            //     XLSX.writeFile(book,"导出.xlsx");
            // },
            // 获取表头
            getColumn(){
                let column;
                // 单表头
                column = [
                    { type: 'seq', width: 50, title:'序号',fixed:"left" },
                    { type: 'checkbox',  width: 50,fixed:"left" },
                    {
                        field: 'name',
                        width: 400,
                        id:'name',
                        prentField:0,
                        title: 'name',
                        align: "right",
                        filter: true,
                        fixed: "left",
                        params:{
                            filterWay:'str',
                            filterWayValue:'contains',
                            filterWayPhold:'请输入姓名'
                        }
                    },
                    { field: 'age',id:"age",prentField:0,width: 400, title: 'age',align:"right",filter:true,sortable:true,editRender: { name: '$input' },params:{filterWay:'num',filterWayValue:'equal',filterWayPhold:'请输入年龄',slot:"age"} },
                    {
                        field: 'sex', width: 400,id:'sex',
                        prentField:"base", title: 'sex', filter: true,slots: {
                            default: "trans_default",
                        }, sortable: true,
                        editRender: { name: '$select',options:"genderArr"},
                        params:{
                            filterWay:'select',
                            filterWayValue:'equal',
                            filterWayPhold:'请选择性别',
                            list:"genderArr"
                        }
                    },
                    {
                        field: 'birthday',
                        width: 400,
                        id:'birthday',
                        prentField:"base",
                        title: 'birthday',
                        filter:true,
                        showOverflow: true,
                        sortable: true,
                        params:{
                            filterWay:'date',
                            filterWayValue:'date',
                            filterWayPhold:'请选择日期'
                        }
                    },
                    { field: 'address',width: 400, id:'address',
                        prentField:0,title: 'Address', showOverflow: true,filter:true,sortable:true, params:{
                            filterWay:'select',
                            filterWayValue:'equal',
                            filterWayPhold:'请选择地区',
                            list:"addrArr"
                        } },
                    { field: 'role',id:"role",prentField:0,width: 400, title: 'role',sortable:true,visible:false},
                    { title: '操作',id:"operate",prentField:0, width: 200,disabled: true,slots: { default: 'operate' },fixed:"right" }
                ];
                // 多表头
                // column = [
                //     { type: 'seq', width: 50, title:'序号',fixed:"left" },
                //     { type: 'checkbox',  width: 50,fixed:"left" },
                //     {
                //         field: 'name',
                //         width: 400,
                //         id:'name',
                //         prentField:0,
                //         title: 'name',
                //         align: "right",
                //         filter: true,
                //         sortable: true,
                //         fixed: "left",
                //         params:{
                //             filterWay:'str',
                //             filterWayValue:'contains',
                //             filterWayPhold:'请输入姓名'
                //         }
                //     },
                //     { field: 'age',id:"age",prentField:0,width: 400, title: 'age',align:"right",filter:true,sortable:true,editRender: { name: '$input' },params:{filterWay:'num',filterWayValue:'equal',filterWayPhold:'请输入年龄',slot:"age"} },
                //     {
                //         id:'base',
                //         prentField:0,
                //         title: '基本信息',
                //         children: [
                //             {
                //                 field: 'sex', width: 400,id:'sex',
                //                 prentField:"base", title: 'sex', filter: true,  slots: {
                //                     default: "trans_default",
                //                 }, sortable: true,
                //                 editRender: { name: '$select',options:"genderArr"},
                //                 params:{
                //                     filterWay:'select',
                //                     filterWayValue:'equal',
                //                     filterWayPhold:'请选择性别',
                //                     list:"genderArr" //翻译和筛选的代码集
                //                 }
                //             },
                //             {
                //                 field: 'birthday',
                //                 width: 400,
                //                 id:'birthday',
                //                 prentField:"base",
                //                 title: 'birthday',
                //                 filter:true,
                //                 showOverflow: true,
                //                 sortable: true,
                //                 params:{
                //                     filterWay:'date',
                //                     filterWayValue:'date',
                //                     filterWayPhold:'请选择日期'
                //                 }
                //             },
                //         ]
                //     },
                //     { field: 'address',width: 400, id:'address',
                //         prentField:0,title: 'Address', showOverflow: true,filter:true,sortable:true, params:{
                //             filterWay:'select',
                //             filterWayValue:'equal',
                //             filterWayPhold:'请选择地区',
                //             list:"addrArr"
                //         } },
                //     { field: 'role',width: 400, id:'role',
                //         prentField:0,title: 'role',sortable:true,visible:false,params:{slot:"role"}},
                //     { title: '操作', width: 200,disabled: true,
                //         prentField:0, slots: { default: 'operate' },fixed:"right" }
                // ];
                setTimeout(() => {
                    this.$set(this,"tableColumns",column);
                    this.demoLoading = false;
                },500)
            },
            // 获取数据
           getData(){
               // return new Promise((resolve, reject)=> {
                   // 模拟请求数据
                   var list = [];
                   for (var index = 0; index < this.pagerConfig.pageSize; index++) {
                       list.push({
                           id: index,
                           name: 'test' + Math.floor(Math.random() * 90 + 10),
                           role: 'developer',
                           age: index,
                           sex: index % 2 === 0 ? '00901' : '00900',
                           birthday: '2019-05-01',
                           address: 'ShenZhen' + Math.floor(Math.random() * 10 + 1)
                       })
                   }

                   setTimeout(() => {
                       // if(!this.exporting){
                       this.$set(this, "tableDatas", list);
                       // }else{
                       //     resolve(list)
                       // }
                   }, 500)
               // })
            },
            //获取请求筛选数据/分页
            tableRefresh(filter,cal){
                const that= this;
                this.filtersData = filter;
                // console.log(filter,page);
                // 模拟请求数据
                var list = [];

                for(var index = 0; index < filter.gridPage.pageSize; index++){
                    list.push({
                        id: index + filter.gridPage.pageSize * (filter.gridPage.currentPage - 1 ) + 1,
                        name: index + filter.gridPage.pageSize * (filter.gridPage.currentPage - 1 ) + 1,
                        role: 'developer',
                        age:Math.floor(Math.random()*90+10),
                        sex: index % 2 ===0 ? '00901' : '00900',
                        birthday: '2019-05-01',
                        address: 'ShenZhen'+ Math.floor(Math.random()*10+1)
                    })
                }
                // alert("请求结果为随机模拟")
                setTimeout(() => {
                   if(cal){
                       cal(list);
                    }else{
                       that.$set(this,"tableDatas",list);
                   }
                },50)
            },
            updateColumn(columns){
                console.log(columns);
            },
            selectAllEvent ({checked, records,selection}) {
                console.log(checked ? '所有勾选事件' : '所有取消事件', records)
            },
            selectChangeEvent ({ checked, records }) {
                console.log(checked ? '勾选事件' : '取消事件', records)
            },
            getSelectEvent () {
                let selectRecords = this.$refs.demoTable.$refs.filterTable.getCheckboxRecords()
                console.log(selectRecords)
                this.$XModal.alert(selectRecords.length)
            },
            // 导出
            // async exportXlsx(){
            //     this.exporting = true;
            //     //创建book
            //     var wb = XLSX.utils.book_new();
            //     //表头
            //     var columns={};
            //     let fields = [];
            //     let exportColumns = [];
            //     let exportLists = {};
            //     this.tableColumns.forEach(item =>{
            //         if(item.field){
            //             columns[item.field] = item.title;
            //             fields.push(item.field)
            //         }
            //         // 如果有需要翻译的列，传入列名字及对应的的list,循环data时处理数据
            //         if(item.params&&item.params.list){
            //             exportColumns.push(item.field);
            //             exportLists[item.field]=item.params.list;
            //         }
            //     })
            //
            //     // 从第一页开始请求数据，循环页数
            //     // 假设有3列
            //     let pageTotal = Math.ceil(this.pagerConfig.total/this.pagerConfig.pageSize);
            //     for(let i = 0;i < pageTotal;i++){
            //         let data = await this.getData(i).then((item) =>{return item});
            //         // 去掉不想导出的列
            //         data.map(item =>{
            //             delete item.id;
            //             delete item._XID;
            //             // 遍历item的key,如果存在于exportColumns，则按字典翻译值
            //             for(let key in item){
            //                 if(exportColumns.includes(key) ){
            //                     let list = exportLists[key];
            //                     this.dicts[list].some(item2 =>{
            //                         if(item2.value == item[key]){
            //                             item[key] = item2.label
            //                             return true;
            //                         }
            //                     })
            //
            //                 }
            //             }
            //         })
            //
            //         //json转sheet
            //         // 首次插入
            //         if(i == 0){
            //             const newData = [columns, ...data];
            //             var ws = XLSX.utils.json_to_sheet(newData, {header:fields, skipHeader:true});
            //         }else{
            //             // 循环插入
            //             XLSX.utils.sheet_add_json(ws, data, {header: fields, skipHeader: true, origin: -1});
            //         }
            //     }
            //
            //     //设置列宽
            //     ws['!cols'] = [];
            //     for(let key in columns){
            //         ws['!cols'].push({width: 15})
            //     }
            //
            //     var timestamp = (new Date()).getDate();
            //     //sheet写入book
            //     XLSX.utils.book_append_sheet(wb, ws, "file");
            //     //输出
            //     XLSX.writeFile(wb,"导出"+timestamp+".xlsx");
            //     this.exporting = false;
            // }

        }
    }
</script>

<style>
.demo{
    height:calc(100% - 100px)
}
    .tips{

    }
</style>