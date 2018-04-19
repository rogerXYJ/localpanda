<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <cmsAside :activeTitle="activeTitle"></cmsAside>

    <div class="cms-main" v-show="showPage">
      <h3 class="text_c">新增关键词</h3>

      <el-form ref="addForm" :model="addForm" label-width="150px" :rules="addFormRules" :show-message="true">
        <el-form-item label="模  版：" required>
          <span>{{templateName}}</span>
        </el-form-item>
        <el-form-item label="关键词：" required prop="keywords">
          <el-input v-model="addForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="目的地：" required prop="destination">
          <el-select v-model="addForm.destination" placeholder="请选择目的地">
            <el-option label="Shanghai" value="Shanghai"></el-option>
            <el-option label="Beijing" value="Beijing"></el-option>
            <el-option label="Chengdu" value="Chengdu"></el-option>
            <el-option label="Xi'an" value="Xi'an"></el-option>
            <el-option label="Guilin" value="Guilin"></el-option>
          </el-select>
        </el-form-item>

        <div class="hr"></div>

        <el-form-item label="标   题：" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>

        <el-form-item label="描   述：" prop="description" v-show="addFormRules.description">
          <el-input v-model="addForm.description" type="textarea" :autosize="{ minRows: 6, maxRows: 6 }"></el-input>
        </el-form-item>

        <el-form-item label="头图图片：" prop="file" v-show="addFormRules.file">
          <input type="file" @change="changeImg" accept="image/*"><br>
          <img width="50%" :src="addForm.photo.url" alt="">
        </el-form-item>

        <el-form-item label="图片描述：" v-show="addFormRules.imgAlt">
          <el-input v-model="addForm.photo.content"></el-input>
        </el-form-item>


        <div class="hr"></div>

        <el-form-item label="导向产品标题：" prop="productTitle" v-show="addFormRules.productTitle">
          <el-input v-model="addForm.productTitle"></el-input>
          <p class="c_999">如：View all food activities</p>
        </el-form-item>

        <el-form-item label="导向产品URL：" prop="productUrl" v-show="addFormRules.productUrl">
          <el-input v-model="addForm.productUrl"></el-input>
          <p class="c_999">如：https://www.localpanda.com/activity/list/Shanghai?opctions=Food</p>
        </el-form-item>

        <el-form-item label="推荐产品：" prop="productIds" v-show="addFormRules.productIds">
          <el-input v-model="addForm.productIds"></el-input>
          <p class="c_999">如：11111,11112,11113</p>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">新增关键词</el-button>
        </el-form-item>

      </el-form>
      
      
      

    </div>

    

    

  </div>
</template>

<script>
import cmsAside from '~/components/cms/public/cmsAside.vue';
import {urlData} from '~/assets/js/cms/main';

// var tplRules = {
//   keywords: { required: true, message: '请输入关键词', trigger:'blur'},
//   destination: { required: true, message: '请选择目的地', trigger:'blur'},
//   title: { required: true, message: '请输入标题', trigger:'blur'},
//   describe: { required: true, message: '请输入描述', trigger: 'blur'},
//   img: { required: true, message: '请选择头图', trigger: 'blur'},
//   imgAlt: { required: true, message: '请选择头图', trigger: 'blur'},
//   productTitle: { required: true, message: '请输入导向产品标题', trigger: 'blur'},
//   productUrl: { required: true, message: '请输入导向产品URL', trigger: 'blur'},
//   productIds: { required: true, message: '请输入推荐产品', trigger: 'blur'}
// };

//设置模版和必填项
  

export default {
  name: 'addKeyword',
  components: {
    cmsAside
  },
  data () {
    let urlQuery = this.$route.query;
    var tpl = urlQuery.tpl;
    var tplRules = {};
    if(tpl == 3){
      tplRules = {
        keywords: { required: true, message: '请输入关键词', trigger:'blur'},
        destination: { required: true, message: '请选择目的地', trigger:'blur'},
        title: { required: true, message: '请输入标题', trigger:'blur'},
        description: { required: false, message: '请输入描述', trigger: 'blur'},
        file: { required: true, message: '请选择头图', trigger: 'change,blur'},
        imgAlt: { required: false, message: '请选择头图', trigger: 'blur'},
        productTitle: { required: false, message: '请输入导向产品标题', trigger: 'blur'},
        productUrl: { required: false, message: '请输入导向产品URL', trigger: 'blur'}
      };
    }else if(tpl == 2){
      tplRules = {
        keywords: { required: true, message: '请输入关键词', trigger:'blur'},
        destination: { required: true, message: '请选择目的地', trigger:'blur'},
        title: { required: true, message: '请输入标题', trigger:'blur'},
        description: { required: true, message: '请输入描述', trigger: 'blur'},
        file: { required: false, message: '请选择头图', trigger: 'blur'},
        imgAlt: { required: false, message: '请选择头图', trigger: 'blur'},
        productTitle: { required: false, message: '请输入导向产品标题', trigger: 'blur'},
        productUrl: { required: false, message: '请输入导向产品URL', trigger: 'blur'},
        productIds: { required: false, message: '请输入推荐产品', trigger: 'blur'}
      };
    }else{
      //模版1校验项
      tplRules = {
        keywords: { required: true, message: '请输入关键词', trigger:'blur'},
        destination: { required: true, message: '请选择目的地', trigger:'blur'},
        title: { required: true, message: '请输入标题', trigger:'blur'},
        file: { required: true, message: '请选择头图', trigger: 'change,blur'},
        imgAlt: { required: false, message: '请选择头图', trigger: 'blur'}
      };
    }
    

    return {
      //页面配置
      title : 'LP管理-新增关键词',
      keywords: '新增关键词',
      description: '新增关键词',
      activeTitle: '1-1', //导航高亮位置
      showPage : false,
      dialogShow : false,
      dialogTip : '',

      pageId : urlQuery.id,
      
      addForm : {
        level : tpl,
        keywords : '',
        destination : '',
        valid : 1,

        title : '',
        description : '',
        file : '',
        content : '',
        photo : {
          photoId : '',
          url : '',
          content : ''
        },

        linkText : '',
        linkUrl : '',
        productIds : ''
        
      },

      addFormRules: tplRules

    }
  },
  computed:{
    templateName(){
      return ['外层模版','底层模版','其他/中层'][this.addForm.level-1];
    }
  },
  mounted(){
    var self = this;
    this.showPage = true;

    //请求编辑数据
    if(this.pageId){
      this.axios.get('https://api.localpanda.com/api/content/landingpage/info/'+this.pageId,{
        headers: {
          'Content-Type': 'multipart/form-data; charset=UTF-8'
        }
      }).then(function(response) {
        if(response.status == 200){
          self.addForm = response.data;

          //如果是编辑页面 头图可以不验证
          if(self.addFormRules.img.required){
            self.addFormRules.img.required = self.pageId?false:true;
          }
          
        }
          //window.location.href = "/travel/customize/done";
      }, function(response) {
        //this.isSubmiting = false;
      });
    }

  },
  methods:{
    changeImg(e){
      var self = this;
      
      self.addForm.file = e.target.files.item(0);

      console.log(self.addForm.file);
      //change后校验
      this.$refs.addForm.validateField('file');
    },
    submitForm(formName){
      var self = this;
      //校验
      this.$refs[formName].validate((valid) => {
        
        if (valid) {//成功
          var formData = this.addForm;
          delete formData.createTime;//删除属性
          console.log(formData);
          //新增请求
          var postUrl = 'https://api.localpanda.com/api/content/landingpage/info/commit',
            contentType = 'multipart/form-data; charset=UTF-8';
          
          //编辑请求
          if(self.pageId){
            postUrl = 'https://api.localpanda.com/api/content/landingpage/info/update';
            contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
          }

          this.axios.post(postUrl,formData,{
            headers: {
							'Content-Type': contentType
						}
          }).then(function(response) {
              
              //window.location.href = "/travel/customize/done";
          }, function(response) {
            //this.isSubmiting = false;
          })
          //https://api.localpanda.com/api/content/landingpage/info/commit
        } else {//失败
          //self.dialogShow = true;
          return false;
        }
      });
    }
  },
  head(){
    return {
      title: this.title,
      meta: [{
        name: "keywords",
        content: this.keywords
      },
      {
        name: "description",
        content: this.description
      }]
    }
  }
}

</script>

<style lang="scss">
  @import "~assets/scss/base/cms.scss";
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .el-form-item{
    margin-bottom: 30px;
  }
</style>
