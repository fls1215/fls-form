<template>
    <div>
        <div id="edit" class="richText" contenteditable="true">

        </div>
        <div class="selectBox" :style="{top:`${screenY+20}px`,left:`${screenX}px`}" contenteditable="false">
            <ul class="selectLists">
                <li class="selectList"  v-for="item in defaultDatas" :key="item.id" @click="inputText(item.name)" >{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
let lastEditRange ;
    export default {
        name: "richText",
        data(){
            return {
                // 下拉框的位置
                screenX:0,
                screenY:0,
                // 下拉框的默认数据
                defaultDatas:[
                    {id:1,name:"姓名"},
                    {id:2,name:"性别"},
                    {id:3,name:"身份证号"},
                    {id:4,name:"入职时间"},
                    {id:5,name:"职位"},
                ],//默认出来的数据
                filterDatas:[
                    {id:6,name:"工商银行"},
                    {id:7,name:"工资往来"},
                    {id:8,name:"工资条"},
                    {id:9,name:"工资所属月份"},
                ],//筛选 工 出来的数据
                isfilter:false,//当前输入要不要搜索
                lastBracket:0,//记录前一个“[”的位置
            }
        },
        mounted(){
            const that = this;
            // let lastEditRange;//最后光标对象(鼠标选中的范围)
            let screenX;//鼠标位置x
            let screenY;//鼠标位置y
            let focusOffset;//鼠标定位index
            // 鼠标事件
            document.getElementById('edit').onclick = function(e) {
                // 获取选定对象
                var selection = getSelection()

                console.log("%c",'color:red',e)
                console.log("%c",'color:red',selection)
                console.log("%c",'color:red',lastEditRange);

                screenX = e.screenX;
                screenY = e.screenY;
                // 设置最后光标对象
                lastEditRange = selection.getRangeAt(0)
                focusOffset = selection.focusOffset;
                // that.getSelectionCoordinate();
            }
            // 编辑框按键弹起事件
            document.getElementById('edit').onkeyup = function(e) {

                // 获取选定对象
                var selection = getSelection();
                // 设置最后光标对象
                lastEditRange = selection.getRangeAt(0)
                // 如果输入的值是"[",展示下拉
                if(e.key == "["){
                    // 获取坐标
                    that.getSelectionCoordinate();
                    // 开启搜索标志，记住开始位置，再输入字会启用实时搜索
                    this.isfilter = true;
                    this.lastBracket = selection.focusOffset;
                }

                console.log(e)
                console.log(selection)
                console.log(lastEditRange);


            }
        },
        methods:{
            // 插入文本
            inputText(myValue){
                myValue = myValue+"]";
                let myField = document.getElementById('edit');
                let selection = window.getSelection();
                let range = window.getSelection().getRangeAt(0);
                let node = document.createTextNode(myValue);
                range.insertNode(node);

                // 选取加入的内容
                // selection.removeAllRanges()
                // selection.addRange(lastEditRange);
                // 设置光标
                selection.collapse(node, myValue.length);
                // 去掉下拉框
                this.screenX = 0;
                this.screenY = 0;
            },
            // 获取坐标
            getSelectionCoordinate(){
               let win = window;
                var doc = win.document;
                var sel = doc.selection, range, rects, rect;
                var x = 0, y = 0;

                if (sel) {
                    if (sel.type != "Control") {
                        range = sel.createRange();
                        range.collapse(true);
                        x = range.boundingLeft;
                        y = range.boundingTop;
                    }
                } else if (win.getSelection) {
                    sel = win.getSelection();
                    if (sel.rangeCount) {
                        range = sel.getRangeAt(0).cloneRange();
                        if (range.getClientRects) {
                            range.collapse(true);
                            rects = range.getClientRects();
                            if (rects.length > 0) {
                                rect = rects[0];
                            }
                            // 光标在行首时，rect为undefined
                            if(rect){
                                x = rect.left;
                                y = rect.top;
                            }
                        }
                        // Fall back to inserting a temporary element
                        if ((x == 0 && y == 0) || rect === undefined) {
                            var span = doc.createElement("span");
                            if (span.getClientRects) {
                                // Ensure span has dimensions and position by
                                // adding a zero-width space character
                                span.appendChild( doc.createTextNode("\u200b") );
                                range.insertNode(span);
                                rect = span.getClientRects()[0];
                                x = rect.left;
                                y = rect.top;
                                var spanParent = span.parentNode;
                                spanParent.removeChild(span);

                                // Glue any broken text nodes back together
                                spanParent.normalize();
                            }
                        }
                    }
                }
                console.log({ left: x, top: y })
                // return { left: x, top: y };
                this.screenX = x;
                this.screenY = y;
            }
        }
    }
</script>

<style scoped>

.richText{
    width: 50%;
    height: 400px;
    margin: 20px auto;
    font-size: 14px;
    border:1px dotted #a1a1a1;
    padding:10px;
}
.richText:focus{
    border:1px dashed #a1a1a1;
    outline: none;
}
.selectBox{
    position: fixed;
    border:1px solid #e3e3e3;
    width: 200px;
    background: #fff;
    user-select: none;
}
    .selectLists{
        margin: 0;
        padding: 0;
        list-style: normal;
    }
    .selectList{
        margin: 0;
        padding: 0 10px;
        list-style: none;
        font-size: 12px;
        line-height: 22px;
        border-bottom: 1px solid #e3e3e3;
        cursor: pointer;
    }
    .selectList:hover{
        background: antiquewhite;
    }

</style>