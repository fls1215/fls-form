# fls-form

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 动态表单
## 二次封装Element的form
## 包含输入框、选择框、单选框、复选框、文本域和上传。封装了两位小数框、密码框、邮件框、身份证框和电话框，内置校验。
### 表单配置例子
lists:[
                    {
                        id:"1",
                        label:"文本框",
                        placeholder:"请输入文本",
                        prop:"input1",
                        spanNum:8,
                        type:"101",
                        otherChar:false,
                        // disabled:true
                    },
                    {
                        id:"2",
                        label:"整数框",
                        placeholder:"请输入整数",
                        prop:"input2",
                        spanNum:8,
                        type:"102",
                        // disabled:false
                    },
                    {
                        id:"3",
                        label:"两位小数框",
                        placeholder:"请输入两位以内小数",
                        prop:"input3",
                        spanNum:16,
                        type:"103",
                        clearable:true
                    },
                    {
                        id:"4",
                        label:"数字加字母大小写框",
                        placeholder:"请输入数字或字母",
                        prop:"input4",
                        type:"104",
                        maxlength:10
                    },
                    {
                        id:"5",
                        label:"密码框",
                        placeholder:"密码框",
                        prop:"input5",
                        type:"105",
                        maxlength:6,
                        minlength:4,
                        onlyNumber:1,
                        onlyLetter:1,
                        specialType:2,
                        showPassword:true,
                        required:true
                    },
                    {
                        id:"6",
                        label:"邮箱",
                        placeholder:"请输入邮箱地址",
                        prop:"input6",
                        type:"106",
                        otherChar:false
                    },
                    {
                        id:"7",
                        label:"身份证",
                        placeholder:"请输入身份证号",
                        prop:"input7",
                        type:"107",
                    },
                    {
                        id:"8",
                        label:"手机或电话号码",
                        placeholder:"请输入手机或电话号码",
                        prop:"input8",
                        type:"108",
                    },
                    {
                        id:"9",
                        label:"上传",
                        prop:"input9",
                        spanNum:24,
                        type:"109",
                        action:"https://jsonplaceholder.typicode.com/posts/",
                        multiple:true,
                        data:{},
                        showFileList:true,
                        drag:false,
                        accept:"image/*",
                        listType:"picture-card",
                        limit:3,
                    },
                    {
                        id:"21",
                        label:"下拉框",
                        placeholder:"请选择",
                        prop:"input21",
                        type:"201",
                        clearable:true,
                        multiple:true,
                        list:[{
                            value: '选项1',
                            label: '黄金糕'
                        }, {
                            value: '选项2',
                            label: '双皮奶'
                        }, {
                            value: '选项3',
                            label: '蚵仔煎'
                        }, {
                            value: '选项4',
                            label: '龙须面'
                        }, {
                            value: '选项5',
                            label: '北京烤鸭'
                        }],
                    },
                    {
                        id:"31",
                        label:"单选",
                        prop:"input31",
                        type:"301",
                        list:[
                            {id:1,value:"框1"},
                            {id:2,value:"框2"},
                            {id:3,value:"框3"}
                        ]
                    },
                    {
                        id:"41",
                        label:"复选",
                        prop:"input41",
                        type:"401",
                        list:[
                            {id:1,value:"框1"},
                            {id:2,value:"框2",disabled:true},
                            {id:3,value:"框3"}
                        ]
                    },
                    {
                        id:"51",
                        label:"文本域",
                        prop:"input51",
                        type:"501",
                        rows:2
                    },
                ],
### 表单数据例子
 formData:{
                    input1:"5",
                    input2:null,
                    input3:"",
                    input4:"",
                    input5:"",
                    input6:"",
                    input7:"",
                    input8:"",
                    input9:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                    input21:"",
                    input31:2,
                    input41:[],
                },
                
[![ybTkM4.png](https://s3.ax1x.com/2021/02/23/ybTkM4.png)](https://imgchr.com/i/ybTkM4)

| type | 类别     | 类型                       |
| ---- | -------- | -------------------------- |
| 101  | input    | 文本                       |
| 102  | input    | 纯数字                     |
| 103  | input    | 数字加小数点，默认保留两位 |
| 104  | input    | 数字加字母大小写           |
| 105  | input    | 密码                       |
| 106  | input    | 邮件                       |
| 107  | input    | 身份证                     |
| 108  | input    | 电话                       |
| 109  | input    | 上传                       |
| 201  | 下拉框   | 单选                       |
| 202  | 下拉框   | 多选                       |
| 203  | 下拉框   | 级联                       |
| 204  | 下拉框   | 日期框                     |
| 205  | 下拉框   | 月份框                     |
| 206  | 下拉框   | 时间框                     |
| 207  | 下拉框   | 日期段框                   |
| 208  | 下拉框   | 日期段时间框               |
| 301  | 单选框   | 单选框                     |
| 401  | 复选框   | 复选框                     |
| 501  | textarea | textarea                   |

| 必含属性 |          |
| -------- | -------- |
| id       |          |
| label    | 表单项名 |
| prop     | 表单字段 |
| type     | 表单类型 |

| 公共属性    | 类型     | 可选值                                                       |
| ----------- | -------- | ------------------------------------------------------------ |
| spanNum     | number   | element栅格系统，占24个格子中的几格，12为二等分，8为三等分，6为4等分。 |
| otherChar   | boolean  | 是否允许输入数字、字母、specialType之外的字符                |
| maxlength   | number   | 数字类型,最大长度                                            |
| minlength   | number   | 数字类型,最小长度                                            |
| onlyNumber  | number   | 可否纯数字(N), 1、必须有数字（如：强校验的密码框），2、只能有数字（如、数字密码框） |
| onlyLetter  | number   | 可否纯字母（N），1、必须有字母（如：强校验的密码框），2、只能有字母（如、验证码框） |
| specialType | number   | 特殊字符 （N), 1、必须有特殊字符（如：强校验的密码框），2、不能有特殊字符（如：需要字母数字组合的输入框） |
| list        | 数组对象 | 下拉框的选择项                                               |

# 动态表格
| 动态表格 |              |              |
| -------- | ------------ | ------------ |
| 属性     | tableColumns | 表格列头数据 |
| 属性     | tableDatas   | 表格数据     |
| 属性     | filtersData  | 筛选配置数据 |
| 方法     | tableRefresh | 刷新方法     |
| 方法     | updateColumn | 表头更新方法 |

