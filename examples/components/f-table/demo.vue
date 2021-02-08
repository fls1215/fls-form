<template>
    <div>
       <p> 封装表格使用示例 </p>
        {{filtersData}}
        <filter-table
                class="demo"
                ref="demoTable"
                v-loading="demoLoading"
            :tableColumns.sync="tableColumns"
            :tableDatas.sync="tableDatas"
            @tableRefresh="tableRefresh"
        ></filter-table>
    </div>
</template>

<script>
    import filterTable from "./grid"
    export default {
        name: "demo.vue",
        components:{filterTable},
        data(){
            return {
                bg:"red",
                tableColumns:[],
                tableDatas:[],
                filtersData:{},
                demoLoading:true,
            }
        },
        created(){
            this.getColumn();
            this.getData();
        },
        methods:{
            // 获取表头
            getColumn(){
                let column;
                // 单表头
                column = [
                    { type: 'seq', width: 50, title:'序号',disabled: true,fixed:"left" },
                    { field: 'name',id:"name",prentField:0,width: 400, title: 'name',align:"right",filter:true,filterType:"input",sortable:true,fixed:"left",editRender: { name: '$input' },params:{
                            filterWay:'str',
                            filterWayValue:'contains'
                        } },
                    { field: 'sex',id:"sex",prentField:0,width: 400, title: 'sex',filter:true,filterType:"select", slots: {
                            default:"trans_default",
                        },sortable:true,editRender: { name: '$select',options:this.genderArr}},
                    { field: 'age',id:"age",prentField:0,width: 400, title: 'age',align:"right",filter:true,filterType:"input",sortable:true,editRender: { name: '$input' },params:{filterWay:'num',filterWayValue:'equal'} },
                    { field: 'birthday',id:"birthday",prentField:0,width: 400, title: 'birthday',filter:true,filterType:"date", showOverflow: true,sortable:true, params:{
                            filterWay:'date',
                            filterWayValue:'date'
                        }},
                    { field: 'address',id:"address",prentField:0,width: 400, title: 'Address', showOverflow: true,filter:true,filterType:"select_mult",sortable:true },
                    { field: 'role',id:"role",prentField:0,width: 400, title: 'role',sortable:true,visible:false},
                    { title: '操作',id:"operate",prentField:0, width: 200,disabled: true,slots: { default: 'operate' },fixed:"right" }
                ];
                // // 多表头
                // column = [
                //     { type: 'seq', width: 50, title:'序号',disabled: true,fixed:"left" },
                //     {
                //         field: 'name',
                //         width: 400,
                //         id:'name',
                //         prentField:0,
                //         title: 'name',
                //         align: "right",
                //         filter: true,
                //         filterType: "input",
                //         sortable: true,
                //         fixed: "left",
                //         params:{
                //             filterWay:'str',
                //             filterWayValue:'contains'
                //         }
                //     },
                //     { field: 'age',id:"age",prentField:0,width: 400, title: 'age',align:"right",filter:true,filterType:"input",sortable:true,editRender: { name: '$input' },params:{filterWay:'num',filterWayValue:'equal'} },
                //     {
                //         id:'base',
                //         prentField:0,
                //         title: '基本信息',
                //         children: [
                //             {
                //                 field: 'sex', width: 400,id:'sex',
                //                 prentField:"base", title: 'sex', filter: true, filterType: "select", slots: {
                //                     default: "trans_default",
                //                 }, sortable: true
                //             },
                //             {
                //                 field: 'birthday',
                //                 width: 400,
                //                 id:'birthday',
                //                 prentField:"base",
                //                 title: 'birthday',
                //                 filter:true,
                //                 filterType:"date",
                //                 showOverflow: true,
                //                 sortable: true,
                //                 params:{
                //                     filterWay:'date',
                //                     filterWayValue:'date'
                //                 }
                //             },
                //         ]
                //     },
                //     { field: 'address',width: 400, id:'address',
                //         prentField:0,title: 'Address', showOverflow: true,filter:true,filterType:"select_mult",sortable:true },
                //     { field: 'role',width: 400, id:'role',
                //         prentField:0,title: 'role',sortable:true,visible:false},
                //     { title: '操作', width: 200,disabled: true,id:'operate',
                //         prentField:0, slots: { default: 'operate' },fixed:"right" }
                // ];
                setTimeout(() => {
                    this.$set(this,"tableColumns",column);
                    this.demoLoading = false;
                },500)
            },
            // 获取数据
            getData(){
                // 模拟请求数据
                var list = []
                for(var index = 0; index < 10; index++){
                    list.push({
                        id: index,
                        name: 'test' + Math.floor(Math.random()*90+10),
                        role: 'developer',
                        age:Math.floor(Math.random()*90+10),
                        sex: index % 2 ===0 ? '00901' : '00900',
                        birthday: '2019-05-01',
                        address: 'ShenZhen'+ Math.floor(Math.random()*10+1)
                    })
                }
                setTimeout(() => {
                    this.$set(this,"tableDatas",list);
                },500)
            },
            //获取请求筛选数据
            tableRefresh(filter,page){
                const that= this;
                console.log(filter,page)
                // 模拟请求数据
                var list = []
                for(var index = 0; index < 10; index++){
                    list.push({
                        id: index,
                        name: 'test' + Math.floor(Math.random()*90+10),
                        role: 'developer',
                        age:Math.floor(Math.random()*90+10),
                        sex: index % 2 ===0 ? '00901' : '00900',
                        birthday: '2019-05-01',
                        address: 'ShenZhen'+ Math.floor(Math.random()*10+1)
                    })
                }
                alert("请求结果为随机模拟")
                setTimeout(() => {
                    that.$set(this,"tableDatas",list);
                },500)
            }
        }
    }
</script>

<style>
.demo{
    height:calc(100% - 100px)
}
</style>