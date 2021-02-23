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
| 601  | 树       | 树                         |

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

