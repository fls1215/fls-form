<template>
    <el-form-item :label="label" :prop="prop" :rules="rules">
        <!--type	类别	类型	属性-->
        <!--101	   input	文本	可编辑-->
        <!--102    input	纯数字	可见-->
        <!--103	   input	数字加小数点，默认保留两位	占全行-->
        <!--104	   input	数字加字母大小写-->
        <!--105	   input	密码-->
        <!--106	   input	邮件-->
        <!--107	   input	身份证-->
        <!--108	   input	电话-->
        <!--109	   input	上传-->
        <!--201	   下拉框	单选-->
        <!--202	   下拉框	多选-->
        <!--203	   下拉框	级联-->
        <!--204	   下拉框	日期框-->
        <!--205	   下拉框	月份框-->
        <!--206	   下拉框	时间框-->
        <!--207	   下拉框	日期段框-->
        <!--208	   下拉框	日期段时间框-->
        <!--301	   单选框	单选框-->
        <!--401	   复选框	复选框-->
        <!--501	   文本域	文本域-->
        <!--601	   树	树-->

        <!--:disabled="disabled"-->
        <!--:readonly="readonly"-->
        <!--:clearable="clearable"-->
        <!--:maxlength="maxlength"-->
        <!--:minlength="minlength"-->

        <!--文本框-->
        <el-input
                type="text"
                v-if="$attrs.type == '101'"
                v-bind="$attrs"
                v-on="$listeners"
        ></el-input>

        <!--整数框-->
        <number-input
                type="text"
                v-if="$attrs.type == '102'"
                v-bind="$attrs"
                v-on="$listeners"
        ></number-input>

        <!--两位小数框-->
        <money-input
                type="text"
                v-if="$attrs.type == '103'"
                v-bind="$attrs"
                v-on="$listeners"
        ></money-input>

        <!--数字加字母大小写-->
        <letter-number-input
                type="text"
                v-if="$attrs.type == '104'"
                v-bind="$attrs"
                v-on="$listeners"
        ></letter-number-input>

        <!--密码框-->
        <password-input
                type="password"
                v-if="$attrs.type == '105'"
                v-bind="$attrs"
                v-on="$listeners"
        ></password-input>
        
        <!--邮箱-->
        <el-input
                type="email"
                v-if="$attrs.type == '106'"
                v-bind="$attrs"
                v-on="$listeners"
        ></el-input>

        <!--身份证号-->
        <el-input
                type="text"
                v-if="$attrs.type == '107'"
                v-bind="$attrs"
                v-on="$listeners"
        ></el-input>

        <!--电话号-->
        <el-input
                type="text"
                v-if="$attrs.type == '108'"
                v-bind="$attrs"
                v-on="$listeners"
        ></el-input>

        <!-- 上传 -->
        <upload
            type="file"
            v-if="$attrs.type == '109'"
            v-bind="$attrs"
            v-on="$listeners"
        ></upload>

        <!-- 下拉框 -->
        <el-select
                v-if="$attrs.type == '201'"
                v-bind="$attrs"
                v-on="$listeners"
        >
            <el-option
                    v-for="item in $attrs.list"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <!-- 单选组 -->
        <el-radio-group
        v-if="$attrs.type == '301'"
        v-bind="$attrs"
        v-on="$listeners"
         >
            <el-radio v-for="item in $attrs.list" :label="item.id" :key="item.id" :disabled="item.disabled">{{item.value}}</el-radio>
         </el-radio-group>
        <!--复选组-->
        <el-checkbox-group
                v-if="$attrs.type == '401'"
                v-bind="$attrs"
                v-on="$listeners"
        >
            <el-checkbox v-for="item in $attrs.list" :label="item.id" :key="item.id" :disabled="item.disabled">{{item.value}}</el-checkbox>
        </el-checkbox-group>

        <!--文本域-->
        <el-input
                v-if="$attrs.type == '501'"
                v-bind="$attrs"
                v-on="$listeners"
                type="textarea"
                :rows="$attrs.rows">
        </el-input>

      </el-form-item>
</template>
<script>
import moneyInput from "./f-input-money1";
import numberInput from "./f-input-number";
import letterNumberInput from "./f-input-letters&numbers";
import passwordInput from "./f-input-password";
import upload from "./f-input-upload";

    export default{
        inheritAttrs :false,
        props:{
            label:{
                type:String,
                default:""
            },
            prop:{
                type:String,
                default:""
            },
        },
        components:{
            moneyInput,
            numberInput,
            letterNumberInput,
            passwordInput,
            upload
        },
        computed: {
            rules(){
                let {rules,required,maxlength,minlength,onlyNumber,onlyLetter,specialType,otherChar} = this.$attrs;
                rules?rules:rules = [];
                // 校验必填
                if(required){
                    rules.push({ required: true, message: '不能为空', trigger: 'blur' });
                }
                // 校验长度
                if(maxlength > 0||minlength > 0){
                    let min = minlength?minlength:0;
                    let max = maxlength?maxlength:Infinity;
                    rules.push({ min: min, max: max, message: '字符长度应在'+min+'-'+max+'个之间', trigger: 'change' });
                }

                // 校验字符
                // 可否纯数字(N), 1、必须有数字（如：强校验的密码框），2、只能有数字（如、数字密码框）
                // 可否纯字母（N），1、必须有字母（如：强校验的密码框），2、只能有字母（如、验证码框）
                // 特殊字符 （N), 1、必须有特殊字符（如：强校验的密码框），2、不能有特殊字符（如：需要字母数字组合的输入框）
                // 其他字符 （B), false不能有其他（如：密码框）true 可以有其他字符
                if(onlyNumber||onlyLetter||specialType||!otherChar){
                    let validator = this.vcharacter(onlyNumber,onlyLetter,specialType,otherChar);
                    rules.push({validator:validator, trigger: 'blur'})
                }

                // 邮箱校验
                if(this.$attrs.type === "106"){
                    rules.push({validator:this.emailValidator(), trigger: 'blur'})
                }

                // 身份证号校验
                if(this.$attrs.type === "107"){
                    rules.push({validator:this.idValidator(), trigger: 'blur'})
                }

                // 电话号校验
                if(this.$attrs.type === "108"){
                    rules.push({validator:this.phoneValidator(), trigger: 'blur'})
                }

                // console.log(rules)
                // 与数据中的rules合并
                // rules.push();
                return rules;
            }
        },
        methods:{
            // 字符校验
            vcharacter(onlyNumber,onlyLetter,specialType,otherChar){
 
                return (rule, value, callback) => {
                    let pattern;
                    let msg = "";
                    if(value){
                        // 数字
                        switch(onlyNumber) {
                            case 1:
                                pattern = /\d*/;
                                if(!pattern.test(value)){
                                    msg = '至少应含有1个数字';
                                }
                                break;
                            case 2:
                                pattern = /^\d{1,}$/;
                                if(!pattern.test(value)){
                                    msg = '应由数字组成';
                                }
                                break;
                            default:
                                msg = "";
                        } 
                        // 字母
                        switch(onlyLetter) {
                            case 1:
                                pattern = /[a-zA-Z]\w*/;
                                if(!pattern.test(value)){
                                    msg ='至少应含有1个字母';
                                }
                                break;
                            case 2:
                                pattern = /^\w{1,}$/;
                                if(!pattern.test(value)){
                                    msg ='应由字母组成';
                                }
                                break;
                            default:
                                msg?msg:msg = "";
                        } 
                        //特殊字符
                        switch(specialType) {
                            case 1:
                                pattern = /[\.`~!@#$%^&*_\-]/g; 
                                if(!pattern.test(value)){
                                    msg = '至少需包含一个特殊字符(`~!@#$%^&*_-.)';
                                }
                                break;
                            case 2:
                                pattern = /[\.`~!@#$%^&*_\-]/g;
                                if(pattern.test(value)){
                                    msg = '不能有特殊字符(`~!@#$%^&*_-.)';
                                }
                                break;
                            default:
                                msg?msg:msg = "";
                        }

                        if(!otherChar){
                            pattern = /[^0-9A-z\.`~!@#$%^&*_\-\u4e00-\u9fa5]/g;
                                if(pattern.test(value)){
                                    msg = '不能有字母、数字、汉字及特殊字符(`~!@#$%^&*_-.)以外的字符';
                                }
                        }
                        if(msg){
                            return callback(new Error(msg));
                        }else{
                            return callback();
                        }
                    }else{
                        return callback();
                    }
                };
            },
            // 邮箱校验
            emailValidator(){
                return (rule, value, callback) => {
                    let pattern;
                    let msg = "";
                    if(value){
                        pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/g;
                        if(!pattern.test(value)){
                            msg = '邮箱格式不正确';
                            return callback(new Error(msg));
                        }else{
                            return callback();
                        }
                    }else{
                        return callback();
                    }

                }
            },
            //身份证校验
            idValidator(){
                return (rule, value, callback) => {
                    let msg = "";
                    if(value){
                        const aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
                                21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",
                                34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
                                43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川"
                                ,52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",
                                64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
                        let iSum = 0;
                        let sBirthday = 0;

                        if(!/^\d{17}(\d|x)$/i.test(value)){
                            msg = "你输入的身份证长度或格式不正确";
                        } 
                        value=value.replace(/x$/i,"a");
                        if(aCity[parseInt(value.substr(0,2))]==null){
                            msg = "身份证号格式不正确";
                        } 
                        sBirthday=value.substr(6,4)+"-"+Number(value.substr(10,2))+"-"+Number(value.substr(12,2));
                        var d=new Date(sBirthday.replace(/-/g,"/")) ;
                        if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())){
                            msg = "身份证号格式不正确";
                        }
                        for(var i = 17;i>=0;i --){
                            iSum += (Math.pow(2,i) % 11) * parseInt(value.charAt(17 - i),11)
                        };
                        if(iSum%11!=1){
                            msg = "身份证号格式不正确";
                        } 
                        //aCity[parseInt(value.substr(0,2))]+","+sBirthday+","+(value.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别

                    }
                    
                    if(msg){
                        return callback(new Error(msg));
                    }else{
                        return callback();
                    }
                }
            },
            //手机号或电话号码校验
            phoneValidator(){
                return (rule, value, callback) => {
                    let pattern;
                    let msg = "";
                    if(value){
                        pattern = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/g;
                        if(!pattern.test(value)){
                            msg = '手机号或电话号码格式不正确';
                            return callback(new Error(msg));
                        }else{
                            return callback();
                        }
                    }else{
                        return callback();
                    }

                }
            },

        }
    }
</script>
<style scoped>

</style>