<template>
    <div class="f-upload">
        <el-upload
        v-bind="$attrs"
        :file-list="fileList"
        :on-change="handleChange"
        >
            <i slot="default" class="el-icon-plus" v-if="$attrs.limit - this.fileList.length > 0"></i>
            <div slot="file" slot-scope="{file}">
            <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
                <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
                >
                <i class="el-icon-zoom-in"></i>
                </span>
                <span
                v-if="!$attrs.disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
                >
                <i class="el-icon-download"></i>
                </span>
                <span
                v-if="!$attrs.disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
                >
                <i class="el-icon-delete"></i>
                </span>
            </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
      props:{
          fileList:{
              type: Array,
              default () {
                  return []
              }
          }
      },
    methods: {
        handleChange(response, file){
            console.log(response,file);
            this.$emit('fileList', file);
        },
      handleRemove(file) {
        console.log(file);
        console.log(this.fileList);
        let index = this.fileList.findIndex(item =>item.uid == file.uid);
        this.fileList.splice(index,1);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      }
    }
  }
</script>
<style>
    .f-upload .el-upload-list--picture-card .el-upload-list__item,.f-upload .el-upload--picture-card{
        width: 50px;
        height: 50px;
        line-height: 50px;
    }
    .f-upload .el-upload--picture-card i{
        line-height: 48px;
    }
    .f-upload .el-upload-list--picture-card .el-upload-list__item>div{
        height: 48px;
    }
    .f-upload .el-upload-list--picture-card .el-upload-list__item-actions span{
        font-size: 12px;
    }
    .f-upload .el-upload-list--picture-card .el-upload-list__item-actions span+span{
        margin-left: 5px;
    }
</style>