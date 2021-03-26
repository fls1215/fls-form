<template>
    <div class="editContentCtn">
        <div id="messageDesc" contenteditable="true" v-html="parseContendMsg"
             @keyup = "contenteditableKeyUp"
             @keydown = "contenteditableKeyDown"
             @blur = "contendEditBlur"
             @click="contendEditClick"
        >
            <!-- 撒打算 <span class="keyWord" contenteditable="false" node="1">我的表单</span> &nbsp; -->
        </div>
        <div v-if="showContentEdit" class="selectCtnBgCover" @click="selectCtnBgCoverClick"></div>
        <ContendEditSelectList
                v-if="showContentEdit"
                :left="left"
                :top="top"
                :selectDataList="selectDataList"
                :selectItemIndex="selectItemIndex"
                @itemClick="itemClick"/>
    </div>
</template>

<script>
    import ContendEditSelectList from "./contendEditSelectList"

    let lastSelection = ""
    let lastEditRange = "" // 光标最后位置

    export default {
        props: {
            messageDescStr: {
                type: String,
                default: ""
            },
            selectDataList: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        name: "edit-by-contenteditable",
        data () {
            return {
                left: "0",
                top:"0",
                showContentEdit: false,
                selectItemIndex: 0, // # 所在的index
                selectList: ["FORM_NAME", "STAFF_SCOPE", "START_TIME"],
                insertChildIndex: 0 // 光标插入位置
            }
        },
        methods: {
            // 点击空白的背景
            selectCtnBgCoverClick () {
                this.showContentEdit = false
                this.insertChildIndex = 0
                this.selectItemIndex = 0
                //// let result = this.getMessageDesc()
                // this.$nextTick(() => {
                //     let obj = document.getElementById("messageDesc")
                //     for (let i = 0; i < obj.childNodes.length; i++) {
                //         let str = obj.childNodes[i].textContent
                //         if (str.indexOf("#") >= 0) {
                //             obj.childNodes[i].textContent = str.replace("#", "")
                //         }
                //     }
                //     // this.$emit('update:messageDescStr', result)
                // })
            },
            contendEditClick () {
                this.setLastEditRange()
            },
            setLastEditRange () {
                let selection = window.getSelection ? window.getSelection() : document.selection
                let range = selection.createRange ? selection.createRange() : selection.getRangeAt(0)
                lastSelection = selection
                lastEditRange = range
                console.log("selection",selection)
                console.log("range",range)
            },
            itemClick (str) {
                // 取到节点
                let p = document.querySelector(".active");
                let field = p.querySelector('.field');
                field.setAttribute("node", str);
                field.innerHTML = this.selectDataList[str];






                // 清除active状态
                document.querySelector(".active").classList.remove("active");
                this.showContentEdit = false;

                // let obj = document.getElementById("messageDesc")
                // obj.focus() // 解决ff不获取焦点无法定位问题
                // let innerDivText = obj.childNodes[this.insertChildIndex + 2] // 1 是移动到插入节点的最后  2是移动到插入节点的下一个节点后面，相当于在插入节点后面的空格插入光标
                // if (innerDivText.length > 0) {
                //     lastSelection.collapse(innerDivText, 1)
                // } else {
                //     lastSelection.collapse(innerDivText, 0)
                // }

                // let result = this.getMessageDesc();
                // this.selectItemIndex = 0
                // this.$nextTick(() => {
                //     this.$emit("update:messageDescStr", result)
                // })

                // if (lastSelection.rangeCount > 0) {
                //     let range = lastSelection.getRangeAt(0) // 获取选择范围
                //     range.deleteContents() // 删除选中的内容
                //     range.insertNode(node) // 设置选择范围的内容为插入的内容
                //     lastSelection.removeAllRanges() // 移出所有选区
                // }
                // this.showContentEdit = false;
                let result = this.getMessageDesc();
                this.selectItemIndex = 0
                this.$nextTick(() => {
                    this.$emit("update:messageDescStr", result)
                    if (lastEditRange) {
                        setTimeout(() => {
                            let obj = document.getElementById("messageDesc")
                            obj.focus() // 解决ff不获取焦点无法定位问题

                            let innerDivText = obj.childNodes[this.insertChildIndex + 1]
                            if (innerDivText.length > 0) {
                                lastSelection.collapse(innerDivText, 1)
                            } else {
                                lastSelection.collapse(innerDivText, 0)
                            }
                        }, 10)
                    }
                })
            },
            contendEditBlur () {
                // this.showContentEdit = false
            },
            insertNodeAtCursor (node) {
                let range, html
                if (window.getSelection && window.getSelection().getRangeAt) {
                    range = window.getSelection().getRangeAt(0)
                    window.getSelection().removeAllRanges()
                    range.insertNode(node)
                } else if (document.selection && document.selection.createRange) {
                    range = document.selection.createRange()
                    html = (node.nodeType === 3) ? node.data : node.outerHTML
                    range.pasteHTML(html)
                }
            },
            contenteditableKeyUp (e) {
                if (e.keyCode === 8 || e.keyCode === 46) { // 删除的时候 也的重置光标
                    this.$nextTick(() => {
                        this.setLastEditRange()
                    })
                }
                if (e.keyCode === 37 || e.keyCode === 39) {
                    this.setLastEditRange()
                }
                // let parentNode = getSelection().anchorNode.parentElement
                // let classKeyWord = parentNode.className
                if (e.keyCode === 219) { // 输入[
                    let obj = document.querySelector("#messageDesc");
                    // 获取坐标
                    this.getSelectionCoordinate();

                    // 插入新属性的p,"["span
                    let activeP = document.createElement('p');
                    activeP.className = 'active';
                    activeP.innerHTML = '<span class="begin">[ </span>';
                    activeP.innerHTML += '<span class="field keyWord" node=""></span>';
                    let selection = window.getSelection();
                    let range = window.getSelection().getRangeAt(0);
                    range.deleteContents();
                    range.insertNode(activeP);
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);

                    // 清除active前的[
                    let p = document.querySelector(".active");
                    let begin = p.previousSibling;
                    begin.nodeValue = " ";
                    let emptyNode = document.createTextNode(" ] ")
                    this.insertAfter(emptyNode, p.nextSibling);

                    // let contentStr = obj.textContent;
                    // let index = contentStr.indexOf("#")
                    // let subStr = contentStr.substring(0, index + 1)
                    // let positionLeft = 0
                    // for (let i = 0; i < subStr.length; i++) {
                    //     let ii = subStr.charAt(i)
                    //     if (ii.trim().length === 0 || /[0-9a-zA-Z]/.test(ii)) {
                    //         positionLeft += 4
                    //     } else {
                    //         positionLeft += 14
                    //     }
                    // }
                    // let realWidth = obj.getBoundingClientRect().width
                    // positionLeft = positionLeft % realWidth // 换行的情况下
                    // positionLeft += "px"
                    // // let positionLeft = index * 14 + 'px'
                    // this.left = positionLeft

                    this.showContentEdit = true;
                    // 获取 active 的childNode
                    for (let i = 0; i < obj.childNodes.length; i++) {
                        if (obj.childNodes[i].classList&&obj.childNodes[i].className.indexOf("active") >= 0) {
                            this.insertChildIndex = i
                            break
                        }
                    }
                }
            },
            // keydown 的时候 就把光标往后移动一位 移动到span后面的node里面
            contenteditableKeyDown (e) {
                // 移动光标 跟上面的点击 每次都要获取最新的光标位置
                let parentNode = getSelection().anchorNode.parentElement
                let classKeyWord = parentNode.className
                if (classKeyWord === "keyWord") {
                    if ((e.keyCode !== 37 && e.keyCode !== 38 && e.keyCode !== 39 && e.keyCode !== 40)) {
                        let obj = document.getElementById("messageDesc")
                        let position = 0
                        for (let j = 0; j < obj.childNodes.length; j++) {
                            if (obj.childNodes[j] === lastEditRange.endContainer.parentNode) {
                                position = j + 1
                            }
                        }
                        if (getSelection().focusOffset === parentNode.textContent.trim().length && e.keyCode !== 8) { // span标签尾部输入 code18是删除 就直接删除
                            this.$nextTick(() => {
                                let sel = null
                                if (document.selection) { // IE9以下
                                    sel = document.selection
                                    sel.createRange().pasteHTML()
                                } else {
                                    sel = window.getSelection()
                                }
                                if (obj.childNodes.length - 1 <= position) { // 在最后 而且最后还没其他node节点 那么就在最后插入一个空格节点
                                    obj.innerHTML = obj.innerHTML + "&nbsp;"
                                }
                                let textContent = obj.childNodes[position].textContent
                                if (obj.childNodes[position]) {
                                    if (obj.childNodes[position].nodeType === 1) { // span节点
                                        let emptyNode = document.createTextNode(" ")
                                        obj.insertBefore(emptyNode, obj.childNodes[position])
                                    } else if (textContent.charAt(0) !== " ") { // 后面的文本节点开头不是空格  就加个空格
                                        obj.childNodes[position].textContent = " " + textContent
                                    }
                                }
                                obj.focus() // 解决ff不获取焦点无法定位问题
                                let innerDivText = obj.childNodes[position] // 1 是移动到插入节点的最后  2是移动到插入节点的下一个节点后面，相当于在插入节点后面的空格插入光标
                                if (innerDivText.length > 0) {
                                    sel.collapse(innerDivText, 1)
                                } else {
                                    sel.collapse(innerDivText, 0)
                                }
                            })
                        } else {
                            parentNode.parentNode.removeChild(parentNode)
                        }
                    }
                }
            },
            // 获取消息内容的字符串
            getMessageDesc () {
                let str = ""
                let nodes = document.querySelector("#messageDesc").childNodes;
                for (let node of nodes) {
                    if (node.nodeType === 3) {
                        str += node.nodeValue.trim()
                    } else {
                        // str += node.attributes.node.value.trim()
                        str += node.innerHTML;
                    }
                }
                debugger
                return str
            },
            // 解析消息内容的字符串
            parseMessageDesc () {
                let str = this.messageDescStr
                debugger
                let result = ""
                if (str.length > 0 && str.indexOf("[") < 0) { // 纯文本
                    result = str
                    return result
                }
                // let subStr = ""
                // while (str.indexOf("[") >= 0) {
                //     let startIndex = str.indexOf("[")
                //     let endIndex = str.indexOf("]")
                //     if (str.indexOf("[") === 0) {
                //         let code = str.substring(startIndex + 1, endIndex)
                //         result += "&nbsp;<span class=\"keyWord\" node=\"" + code + "\">" + this.selectDataList[code] + "</span>&nbsp;"
                //         str = str.substring(endIndex + 1)
                //     } else {
                //         subStr = str.substring(0, startIndex)
                //         result += subStr
                //         str = str.substring(startIndex)
                //     }
                // }
                console.log("result + str",result + str)
                return str
            },
            // 下拉框的键盘事件
            documentKeyMethod (e) {
                // keyCode 38上 40 下
                if (this.showContentEdit) {
                    if (e.keyCode === 38 || e.keyCode === 40) {
                        let index = this.selectItemIndex
                        if (e.keyCode === 38) { // 上键
                            this.selectItemIndex = (index - 1) <= 0 ? 1 : index - 1
                        } else if (e.keyCode === 40) { // 到底之后 重新开始
                            this.selectItemIndex = (index + 1) > 3 ? (index + 1) % 3 : index + 1
                        }
                    } else if (e.keyCode === 13) { // 回车
                        this.itemClick(this.selectList[this.selectItemIndex - 1])
                    }
                }
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
                this.left = x;
                this.top = y+20;
            },
            insertAfter(newelement,targetelement) {
                var parentelement = targetelement.parentNode;

                if (parentelement.lastChild == targetelement) {
                    parentelement.appendChild(newelement);
                }
                else {
                    parentelement.insertBefore(newelement,targetelement.nextSilbing);
                }
            }
        },
        components: {
            ContendEditSelectList
        },
        computed: {
            parseContendMsg: function () {
                let str = this.parseMessageDesc()
                return str
            }
        },
        watch: {
            selectItemIndex (n) {
                if (n !== 0) {
                    document.getElementById("messageDesc").blur()
                }
            }
        },
        created () { // 全局监听键盘事件
            document.addEventListener("keydown", this.documentKeyMethod)
        },
        beforeDestroy () { // 组件销毁之前 把全局的事件解除了
            document.removeEventListener("keydown", this.documentKeyMethod)
        }
    }
</script>
<style lang="scss">
    .editContentCtn{
        // 不设置字体的话 空格的宽度会很宽
        font-family: 'Avenir', 'Helvetica', 'Arial', 'sans-serif';
        position: relative;
        padding: 0 8px;
        border-radius: 2px;
        border: 1px solid #d0d0d0;
        line-height: 32px;
        font-size: 14px;
        // 得加上这个 不然点击下拉li的时候 有bug
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;

        .selectCtnBgCover{
            position: fixed;
            width: 100%;
            height: 100%;
            opacity: 0;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 2
        }
        #messageDesc {
            outline: none!important;

            .keyWord{
                color: #6790DA;
            }
        }
        p{
            display: inline;
        }

    }
</style>
