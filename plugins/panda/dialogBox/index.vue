<style lang="scss" scoped>
//样式类型，pc.scss 和 mobile.scss
@import "./pc.scss";
</style>


<template>
  <div class="dialog_box">
    <!-- 半透明背景 -->
    <div class="dialog_bg" v-show="showDialog" @click="bgClick"></div>
    <!-- 弹窗模块 -->
    <div class="dialog" :class="{'dialogMaxH':maxHeight}" v-show="showDialog" :style="{width:(/px/.test(width)?width:width+'px')}">
      <!-- 头部信息 -->
      <div class="dialog_header" v-if="title">{{title}}</div>
      <!-- 弹窗内容 -->
      <div class="dialog_content">
        <slot></slot>
      </div>
      <!-- 弹窗底部 -->
      <div class="dialog_footer" v-if="confirmShow || cancelShow">
        <span class="dialog_confirm" v-if="confirmShow" @click="confirm">{{confirmText?confirmText:'Confirm'}}</span>
        <span class="dialog_cancel" v-if="cancelShow" @click="cancel">{{cancelText?cancelText:'Cancel'}}</span>
      </div>
      <!-- 关闭按钮 -->
      <div class="dialog_close iconfont" @click="close" v-if="!hideClose">&#xe606;</div>
    </div>
  </div>
</template>

<script>
	export default {
    name: "dialogBox",
    props:{
      title: String,
      confirmShow: String,
      confirmText: String,
      cancelShow: String,
      cancelText: String,
      value: Boolean,
      width: String,
      modalClose: String,
      hideClose: Boolean
    },
		data() {
			return {
        showDialog:this.value?this.value:false,
        maxHeight:false
			}
    },
    computed:{
      
    },
		methods: {
      confirm(){
        var self = this;
        this.$emit('confirmCallback');
      },
      cancel(){
        var self = this;
        this.$emit('cancelCallback');
      },
      close(){
        this.showDialog = false;
        this.$emit('cancelCallback');
      },
      bgClick(){
        if(this.modalClose){
          this.close();
        }
      },
      setTop(){
        var self = this;
        this.$nextTick(function(){
          var $dialog = self.$el.childNodes[1];
          var dialogH = $dialog.clientHeight,
            winH = window.innerHeight,
            top = document.documentElement.scrollTop || document.body.scrollTop;
          if(dialogH>winH){
            self.maxHeight = true;
            $dialog.style.top = top+10+'px';
          }
        });
      }
		},
		mounted(){
      var self = this;
    },
    watch:{
      showDialog:function(val){
        
        this.$emit('input',val);
        if(val){
          this.setTop();
        }
      },
      value:function(val){
        this.showDialog = val;
      }
    }
	}
</script>
