<!--<template>-->
    <!--<el-form-item-->
            <!--:label="list.titleName"-->
            <!--:class="{'row3 textareaItem':(list.itemType==4||list.itemType==10)}"-->
            <!--:prop="list.valueId"-->
            <!--:id="list.valueId"-->
            <!--v-if="isShow"-->
            <!--:ref="refName?refName:''"-->
    <!--&gt;-->
        <!--&lt;!&ndash; 输入框 &ndash;&gt;-->
        <!--<el-input-->
                <!--v-if="list.itemType==1||list.itemType==2||list.itemType==3||list.itemType==17"-->
                <!--:id="list.itemId"-->
                <!--v-model.trim="model"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--:disabled ="list.read"-->
                <!--@change="changeValue"-->
                <!--clearable-->
        <!--/>-->
        <!--&lt;!&ndash;前端引用 树型结构&ndash;&gt;-->
        <!--<bsp-dicts-cascader-->
                <!--v-else-if ="list.itemType==23"-->
                <!--v-model="model"-->
                <!--:id="list.itemId"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--:cascader-value.sync="model"-->
                <!--:options-list.sync="options"-->
                <!--:disabled ="list.read"-->
                <!--@selectChange="changeValue()">-->
        <!--</bsp-dicts-cascader>-->
        <!--&lt;!&ndash; 多选框 &ndash;&gt;-->
        <!--<bsp-dicts-checkbox-->
                <!--:id="list.itemId"-->
                <!--v-model="model"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--:checkbox-value.sync="model"-->
                <!--v-else-if="list.itemType==6&&list.inputType=='4'"-->
                <!--@change="changeValue"-->
                <!--:disabled ="list.read"-->
                <!--:dic-num="list.codeSetId"-->
        <!--&gt;-->

        <!--</bsp-dicts-checkbox>-->
        <!--&lt;!&ndash;<el-checkbox-group-->
          <!--v-model="model"-->
          <!--v-else-if="list.itemType==6&&list.inputType=='4'"-->
          <!--@change="changeValue"-->
        <!--&gt;-->
          <!--<el-checkbox label="复选框 A" />-->
          <!--<el-checkbox label="复选框 B" />-->
          <!--<el-checkbox label="复选框 C" />-->
        <!--</el-checkbox-group>&ndash;&gt;-->

        <!--&lt;!&ndash; 单选框 &ndash;&gt;-->
        <!--<bsp-dicts-radio-->
                <!--:id="list.itemId"-->
                <!--v-model="model"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--:disabled ="list.read"-->
                <!--:radio-value.sync="model"-->
                <!--v-else-if="list.itemType==6&&list.inputType=='2'"-->
                <!--@change="changeValue"-->
                <!--:dic-num="list.codeSetId"-->
        <!--&gt;-->

        <!--</bsp-dicts-radio>-->
        <!--&lt;!&ndash; <el-radio-group-->
           <!--:id="list.itemId"-->
           <!--v-model="model"-->
           <!--v-else-if="list.itemType==6&&list.inputType=='2'"-->
           <!--change="changeValue"-->
         <!--&gt;-->
           <!--<el-radio :label="3">-->
             <!--男-->
           <!--</el-radio>-->
           <!--<el-radio :label="6">-->
             <!--女-->
           <!--</el-radio>-->
         <!--</el-radio-group>&ndash;&gt;-->
        <!--&lt;!&ndash; 下拉框 多选&ndash;&gt;-->
        <!--<bsp-dicts-select-->
                <!--:disabled ="list.read"-->
                <!--:id="list.itemId"-->
                <!--@selectChange = 'changeValue'-->
                <!--v-model="model"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--:select.sync="model"-->
                <!--v-else-if="list.itemType==6 &&list.inputType=='5'"-->
                <!--:dic-num="list.codeSetId"-->
                <!--:select-value.sync="model"-->
                <!--filterable-->
                <!--:multiple="true"-->
                <!--:revice-sondata="list.itemId"-->
                <!--:id-type.sync="list.itemId"-->
        <!--/>-->
        <!--&lt;!&ndash; 下拉框 单选 &ndash;&gt;-->
        <!--<bsp-dicts-select-->
                <!--:id="list.itemId"-->
                <!--:disabled ="list.read"-->
                <!--@selectChange = 'changeValue'-->
                <!--v-model="model"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--:select.sync="model"-->
                <!--v-else-if="list.itemType==6 &&(!list.inputType||list.inputType=='1')"-->
                <!--:dic-num="list.codeSetId"-->
                <!--:select-value.sync="model"-->
                <!--filterable-->
                <!--:multiple="false"-->
                <!--:revice-sondata="list.itemId"-->
                <!--:id-type.sync="list.itemId"-->
                <!--clearable-->
        <!--/>-->
        <!--&lt;!&ndash; 联级树型结构&ndash;&gt;-->
        <!--<bsp-dicts-cascader-->
                <!--:id="list.itemId"-->
                <!--:disabled ="list.read"-->
                <!--v-model="model"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--:cascader-value.sync="model"-->
                <!--v-else-if="list.itemType==6&&list.inputType=='3'"-->
                <!--@selectChange="changeValue"-->
                <!--:dic-num="list.codeSetId"-->
        <!--&gt;-->
        <!--</bsp-dicts-cascader>-->
        <!--&lt;!&ndash; 引用类型&ndash;&gt;-->
        <!--<bsp-dicts-ref-->
                <!--:id="list.itemId"-->
                <!--:disabled ="list.read"-->
                <!--v-model="model"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--v-else-if ="list.itemType== 15"-->
                <!--:select-value.sync="model"-->
                <!--:data-url = "list.refUrl"-->
                <!--@selectChange="changeValue"-->
        <!--&gt;-->
        <!--</bsp-dicts-ref>-->
        <!--&lt;!&ndash; 时间日期 yyyy-MM-dd HH:mm,yyyy-MM-dd HH:mm:ss&ndash;&gt;-->
        <!--<el-date-picker-->
                <!--v-model="model"-->
                <!--:disabled ="list.read"-->
                <!--v-else-if="list.itemType==12||list.itemType==13||list.itemType==20"-->
                <!--:id="list.itemId"-->
                <!--editable="false"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--type="datetime"-->
                <!--value-format="yyyy-MM-dd HH:mm:ss"-->
                <!--placeholder="选择日期时间"-->
                <!--default-time="12:00:00"-->
                <!--@change="changeValue"-->
        <!--/>-->
        <!--&lt;!&ndash; 日期 yyyy-MM,yyyy-MM-dd&ndash;&gt;-->
        <!--<el-date-picker-->
                <!--v-else-if="list.itemType==5"-->
                <!--:disabled ="list.read"-->
                <!--v-model="model"-->
                <!--:id="list.itemId"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--type="date"-->
                <!--value-format="yyyy-MM-dd"-->
                <!--placeholder="选择日期"-->
                <!--@change="changeValue"-->
        <!--/>-->
        <!--<el-date-picker-->
                <!--v-else-if="list.itemType==7"-->
                <!--:disabled ="list.read"-->
                <!--v-model="model"-->
                <!--:id="list.itemId"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--type="month"-->
                <!--value-format="yyyy-MM"-->
                <!--placeholder="选择日期"-->
                <!--@change="changeValue"-->
        <!--/>-->
        <!--&lt;!&ndash; 文本域&ndash;&gt;-->
        <!--<el-input-->
                <!--v-model="model"-->
                <!--:disabled ="list.read"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--v-else-if="list.itemType==4||list.itemType==10"-->
                <!--:id="list.itemId"-->
                <!--resize="none"-->
                <!--type="textarea"-->
                <!--placeholder="请输入内容"-->
                <!--@change="changeValue"-->
        <!--/>-->
        <!--&lt;!&ndash; 空行&ndash;&gt;-->
        <!--<el-input-->
                <!--v-model="model"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--v-else-if="list.itemType==1000"-->
                <!--:id="list.itemId"-->
                <!--:disabled ="list.read"-->
                <!--resize="none"-->
                <!--placeholder="请输入内容"-->
                <!--@change="changeValue"-->
        <!--/>-->
        <!--&lt;!&ndash; 密码&ndash;&gt;-->
        <!--<el-input-->
                <!--v-model="model"-->
                <!--:disabled ="list.read"-->
                <!--v-bind="{...$attrs}"-->
                <!--v-on="{...$listeners}"-->
                <!--v-else-if="list.itemType==16"-->
                <!--:id="list.itemId"-->
                <!--type="password"-->
                <!--autosize-->
                <!--placeholder="请输入"-->
                <!--@change="changeValue"-->
        <!--/>-->
        <!--&lt;!&ndash; 附件&ndash;&gt;-->
        <!--<el-upload-->
                <!--v-else-if="list.itemType==14||list.itemType==11"-->
                <!--class="upload-demo"-->
                <!--action="/api/file"-->
                <!--:on-preview="handlePreview"-->
                <!--:on-remove="handleRemove"-->
                <!--:before-upload="beforeUpload"-->
                <!--:before-remove="beforeRemove"-->
                <!--:limit="2"-->
                <!--:on-exceed="handleExceed"-->
                <!--:on-change="handleChange"-->
                <!--:on-success="handleSuccess"-->
                <!--:file-list="fileList"-->
                <!--:disabled ="list.read"-->
        <!--&gt;-->
      <!--<span><img-->
              <!--src="@/assets/img/form/uploadBtn.png"-->
              <!--alt=""-->
      <!--&gt;</span>-->
        <!--</el-upload>-->
    <!--</el-form-item>-->
<!--</template>-->

<!--<script>-->
    <!--import bspDictsSelect from "@/components/bsp/bsp-dicts-select/bsp-dicts-select";-->
    <!--import bspDictsRef from "@/components/bsp/bsp-dicts-ref/bsp-dicts-ref";-->
    <!--import bspDictsRadio from "@/components/bsp/bsp-dicts-radio/bsp-dicts-radio";-->
    <!--import bspDictsCheckbox from "@/components/bsp/bsp-dicts-checkbox/bsp-dicts-checkbo";-->
    <!--import bspDictsCascader from "@/components/bsp/bsp-dicts-cascader/bsp-dicts-cascader";-->
    <!--import { init,codeList,codeToName,nameToCode,getCodeNames,getNameCodes} from "@/components/bsp/code/frontCode";-->
    <!--import ciicImgUpload from "@/components/ciic/ciic-img-upload/ciic-img-upload";-->
    <!--import { isvalidatemobile, cardid,validatenull,validatenumord,validatenum,validatename,validateEmail } from '@/util/validate';-->
    <!--let require = (rule, value, callback)=>{-->
        <!--let requireVal = rule.model;-->
        <!--if(requireVal instanceof Array){-->
            <!--if(!requireVal || requireVal==''|| requireVal.length<1){-->
                <!--callback(new Error("不能为空"));-->
            <!--}else {-->
                <!--callback();-->
            <!--}-->
        <!--}else {-->
            <!--if(!requireVal || requireVal==''){-->
                <!--callback(new Error("不能为空"));-->
            <!--}else {-->
                <!--callback();-->
            <!--}-->
        <!--}-->


    <!--};-->
    <!--let validateLength = (rule, value, callback)=>{-->
        <!--if(!rule.model){-->
            <!--callback();-->
            <!--return ;-->
        <!--}-->
        <!--let ruleLength = rule.model.length;-->
        <!--if( ruleLength > rule.maxLength){-->
            <!--callback(new Error("长度不能超过"+rule.maxLength))-->
        <!--}else {-->
            <!--callback();-->
        <!--}-->
    <!--};-->
    <!--let validateAge = (rule, value, callback)=>{-->
        <!--var ageValue = rule.model;-->
        <!--let reg=/^(?:[1-9][0-9]?|1[01][0-9]|150)$/;//年龄是1-150之间有效-->
        <!--if(ageValue){-->
            <!--if(ageValue == undefined){-->
                <!--callback([new Error('年龄输入不合法')]);-->
            <!--}else if(ageValue == ''){-->
                <!--callback(new Error("不能为空"));-->
            <!--}else {-->
                <!--if (ageValue && ageValue.length > 0) {-->
                    <!--if(!reg.test(ageValue)){-->
                        <!--callback([new Error('年龄输入不合法')]);-->
                    <!--}else{-->
                        <!--callback();-->
                    <!--}-->
                <!--} else if(ageValue.length == 0){-->
                    <!--callback();-->
                <!--}else {-->
                    <!--callback(new Error('年龄输入不合法'));-->
                <!--}-->

            <!--}-->
        <!--}else {-->
            <!--callback();-->
        <!--}-->
    <!--};-->
    <!--let validatePhone = (rule, value, callback) => {-->
        <!--var phoneVal = rule.model-->
        <!--// 值不能空，为空不校验-->
        <!--if(phoneVal){-->
            <!--console.log(isvalidatemobile(phoneVal))-->
            <!--if (isvalidatemobile(phoneVal)[0]) {-->
                <!--callback(new Error(isvalidatemobile(phoneVal)[1]));-->
            <!--} else {-->
                <!--callback();-->
            <!--}-->
        <!--}else {-->
            <!--callback();-->
        <!--}-->
    <!--};-->
    <!--let validateEnglish = (rule,value,callback)=>{-->
        <!--let engValue = rule.model;-->
        <!--let englishReg = new RegExp("^[a-zA-Z]+$");-->
        <!--if(engValue){-->
            <!--if(!englishReg.test(engValue)){-->
                <!--callback(new Error('请输入英文！'));-->
            <!--}else {-->
                <!--callback();-->
            <!--}-->
        <!--}else {-->
            <!--callback();-->
        <!--}-->
    <!--};-->
    <!--// 判断整数-->
    <!--let validateInt = (rule,value,callback)=>{-->
        <!--var intVal = rule.model;-->
        <!--if(intVal){-->
            <!--if (validatenum(intVal,2)) {-->
                <!--callback(new Error("请输入整数！"));-->
            <!--} else {-->
                <!--callback();-->
            <!--}-->
        <!--}else {-->
            <!--callback();-->
        <!--}-->

    <!--};-->
    <!--// 判断小数-->
    <!--let validateFloat = (rule,value,callback)=>{-->
        <!--// console.log(rule, value,"小数11.11");-->
        <!--var floatVal = rule.model;-->
        <!--if(floatVal){-->
            <!--if (validatenumord(floatVal,2)) {-->
                <!--callback(new Error("请输入数字！"));-->
            <!--} else {-->
                <!--callback();-->
            <!--}-->
        <!--}else {-->
            <!--callback();-->
        <!--}-->
    <!--};-->
    <!--// 身份证-->
    <!--let validateIdCard = (rule,value,callback)=>{-->
        <!--var idVal = rule.model;-->
        <!--if(idVal && rule.isValidate){-->
            <!--console.log(cardid(idVal)[0])-->
            <!--if (cardid(idVal)[0]) {-->
                <!--callback(new Error(cardid(idVal)[1]));-->
            <!--} else {-->
                <!--callback();-->
            <!--}-->
        <!--}else {-->
            <!--callback();-->
        <!--}-->
    <!--};-->
    <!--// 邮箱-->
    <!--let validateEmails = (rule,value,callback)=>{-->
        <!--var emailVal = rule.model;-->
        <!--if(emailVal){-->
            <!--if (!validateEmail(emailVal)) {-->
                <!--callback(new Error("请输入正确的邮箱地址！"));-->
            <!--} else {-->
                <!--callback();-->
            <!--}-->
        <!--}else {-->
            <!--callback();-->
        <!--}-->
    <!--};-->
    <!--export default {-->
        <!--name: "BspFormItem",-->
        <!--props:{-->
            <!--list:{-->
                <!--type: Object,-->
                <!--default: () =>{-->
                    <!--{}-->
                <!--}-->
            <!--},-->
            <!--model:{-->
                <!--type:String,-->
                <!--default:''-->
            <!--},-->
            <!--isShow:{-->
                <!--type:Boolean,-->
                <!--default:true-->
            <!--},-->
            <!--index:{-->
                <!--type:Number,-->
                <!--default:0-->
            <!--},-->
            <!--refName:{-->
                <!--type:String,-->
                <!--default:''-->
            <!--}-->
        <!--},-->
        <!--components:{-->
            <!--bspDictsSelect,-->
            <!--bspDictsRadio,-->
            <!--bspDictsCheckbox,-->
            <!--bspDictsCascader,-->
            <!--bspDictsRef,-->
        <!--},-->
        <!--computed: {-->

        <!--},-->
        <!--watch:{-->
            <!--ifs:function(newValue,oldeValue){-->
                <!--// console.log(this.ifs,'zi ssss');-->
            <!--},-->


        <!--},-->

        <!--data() {-->

            <!--return {-->
                <!--isValidate:false,-->
                <!--fileList: [],-->
                <!--options:[],-->
            <!--}-->
        <!--},-->
        <!--created(){-->
            <!--if(this.list.itemType==23){-->
                <!--init(this.list.refParams);-->
                <!--this.options = codeList-->
                <!--// console.info(this.$attrs, this.$listeners,"前端翻译");-->
            <!--}-->
            <!--this.isOrigin = this.$selectVali;-->
            <!--// console.log(this.isOrigin)-->
            <!--this.$rules[this.list.valueId] = this.filterVType(this.list.itemVType,this.list.itemType);-->
        <!--},-->
        <!--inject: ['$rules'],-->
        <!--updated(){-->
            <!--// console.log(this.list.valueId)-->
            <!--// this.$rules[this.list.valueId] = this.filterVType(this.list.itemVType);-->
            <!--this.$rules[this.list.valueId] = this.filterVType(this.list.itemVType,this.list.itemType);-->
            <!--//修改校验的值-->
            <!--this.$rules[this.list.valueId].forEach(i=>{-->
                <!--i.model = this.model;-->
            <!--});-->


        <!--},-->
        <!--methods:{-->
            <!--filterVType(vtype,itemType){-->
                <!--let rulesType = this.rulesType;-->
                <!--let vtypeArr;-->
                <!--let rules = [];-->
                <!--if(this.list.required){-->
                    <!--rules.push(rulesType('required',itemType));-->
                    <!--// console.log("rules",rules)-->
                <!--}-->
                <!--if(vtype){-->
                    <!--if(vtype.indexOf(';')>=0){-->
                        <!--vtypeArr = vtype.split(';');-->
                    <!--}else{-->
                        <!--vtypeArr = vtype;-->
                    <!--}-->
                    <!--if(typeof vtypeArr == 'object'){-->
                        <!--vtypeArr.forEach(function(type){-->
                            <!--let rulesTy = rulesType(type,itemType);-->
                            <!--if(rulesTy){-->
                                <!--rules.push(rulesTy)-->
                            <!--}-->

                        <!--})-->
                    <!--}else if(typeof vtypeArr == 'string'){-->
                        <!--let vtypeArrRules = rulesType(vtypeArr,itemType);-->
                        <!--if(vtypeArrRules){-->
                            <!--rules.push(vtypeArrRules);-->
                        <!--}-->
                    <!--}-->

                <!--}-->
                <!--return rules;-->

            <!--},-->
            <!--//根据字符串类型判断验证方式-->
            <!--rulesType(type,itemType){-->
                <!--if(type.indexOf(':')>=0){ //判断长度-->
                    <!--var maxLength = type.split(':')[1];-->
                    <!--return {validator: validateLength,maxLength,trigger: 'blur',model:this.model}-->
                <!--}else if(type.indexOf('age')>-1){-->
                    <!--return {validator: validateAge,trigger: 'blur',model:this.model}-->
                <!--}else if(type.indexOf('phone')>-1){-->
                    <!--return {validator: validatePhone,trigger: 'blur',model:this.model}-->
                <!--}else if(type.indexOf('english')>-1){-->
                    <!--return {validator: validateEnglish,trigger: 'blur',model:this.model}-->
                <!--}else if(type.indexOf('required')>-1){-->
                    <!--// 只有是输入框的时校验的触发事件是 blur 其他的 change-->
                    <!--if(itemType == 23 ||itemType ==6 || itemType ==15 || itemType ==12 || itemType == 13 || itemType == 20 || itemType == 5 || itemType ==7){-->
                        <!--return {validator: require,trigger: 'change',model:this.model}-->
                    <!--}else {-->
                        <!--return {validator: require,trigger: 'blur',model:this.model}-->
                    <!--}-->
                <!--}else if(type.indexOf('idCard')>-1){-->
                    <!--// 如果是身份证-->
                    <!--if(this.refName == 'idType'){-->
                        <!--return {validator: validateIdCard,trigger: 'blur',model:this.model,isValidate:true}-->
                    <!--}else{-->
                        <!--return {validator: validateIdCard,trigger: 'blur',model:this.model,isValidate:false}-->
                    <!--}-->

                <!--}else if(type.indexOf('int')>-1){-->
                    <!--return {validator: validateInt,trigger: 'blur',model:this.model}-->
                <!--}else if(type.indexOf('float')>-1){-->
                    <!--return {validator: validateFloat,trigger: 'blur',model:this.model}-->
                <!--}else if(type.indexOf('email')>-1){-->
                    <!--return {validator: validateEmails,trigger: 'blur',model:this.model}-->
                <!--}-->

            <!--},-->
            <!--handleRemove(file, fileList) {-->
                <!--// console.log(file, fileList);-->
            <!--},-->
            <!--handlePreview(file) {-->
                <!--// console.log(file);-->
            <!--},-->
            <!--beforeUpload(file){-->
                <!--// console.log(file);-->
<!--//          this.fileList = [];-->
<!--//          this.fileList = [{name: files[0].name, url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}];-->
<!--//          this.$refs.upload.clearFiles();-->
            <!--},-->
            <!--handleChange(file, fileList){-->
<!--//          this.fileList = fileList.slice(-1)-->
            <!--},-->
            <!--handleSuccess(response, file, fileList){-->
                <!--// console.log(fileList);-->
            <!--},-->
            <!--handleExceed(files, fileList) {-->
                <!--this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);-->
            <!--},-->
            <!--beforeRemove(file, fileList) {-->
                <!--return this.$confirm(`确定移除 ${ file.name }？`);-->
            <!--},-->
            <!--changeValue(){-->
                <!--//console.log("change:",this.model)-->
                <!--this.$emit('update:model',this.model);-->
                <!--// console.log(this.list.valueId);-->
                <!--//修改校验的值-->
                <!--this.$rules[this.list.valueId].forEach(i=>{-->
                    <!--i.model = this.model;-->
                <!--});-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->
<!--<style lang="scss" scoped>-->
    <!--.el-form-item__content,.el-input__icon{-->
        <!--display: inline-block;-->
    <!--}-->



<!--</style>-->
