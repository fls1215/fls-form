const vpassword = (maxlength,minlength,onlyNumber,onlyLetter,needSpecial)=>{
    <!-- 如果密码长度小于minlength（不会大于maxlength，因为maxlength本身已经控制了最大长） -->
    if(){

    }
}
var checkAge = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('年龄不能为空'));
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value < 18) {
          callback(new Error('必须年满18岁'));
        } else {
          callback();
        }
      }
    }, 1000);
  };