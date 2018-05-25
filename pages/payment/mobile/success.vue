<template>
	<div class="result">
  <div class="pay_result">
    <h4>Confirmation</h4>
    <div class="pay_tip" v-show="success">
      <span class="iconfont icon_success">&#xe61e;</span>
      <span class="tip_text">Booking success!</span>
    </div>
    <div class="pay_tip" v-show="!success">
      <span class="iconfont icon_error">&#xe606;</span>
      <span class="tip_text">Oops! Something went wrong.</span>
    </div>

    <p class="order_info">Order ID: {{orderId}}</p>
    <!-- <p class="order_info" v-show="success">Time of transaction: 2017-12-20 09:32:51</p> -->
    <p class="order_info">Payment amount: <span>{{symbol=='$'?currency+symbol:symbol}}{{amount}}</span></p>

    <p class="order_contact" v-show="success">Our staff will confirm with you as soon as possible. We will reply you within one business day. You can know the details furthur by look at your order details.You can also email service@localpanda.com or call us at +86 (21) 8018-2090/ +1 (888) 930-8849 (US toll free).</p>
    <p class="order_contact" v-show="!success"><span v-show="msg">Your payment did not go through. Here is the error that you can reference:{{msg}}</span><br><br>
      If you want to proceed with payment, click “Try again.” If your payment problems continue, we suggest you try using another card or talk to our online assistant at the bottom right of the webpage to get payment help. You can also email service@localpanda.com or call us at +86 (21) 8081-2090/+1 (888) 9390-8839 (US toll free).</p>

    <p class="order_contact c_666" v-if="showTipTxt && success">You ordered as a guest. You can click this button to view your order details.</p>
    <p class="order_contact c_666" v-else-if="success">Click this button and view your order details.</p>
	<div class="btn">
		 <a class="btn_href" :href="getJumpUrl(logIn)" v-if="success && email">View My Order</a>
	    <a class="btn_href" href="/" v-else-if="!email">Back to home</a>
	    <a class="btn_href" :href="tryUrl" v-else>Try again</a>
	</div>
   
    
    </div>
    <footMobile></footMobile>
  </div>
</template>

<script>
	if (process.browser) {
	  require('~/assets/js/pages/talk.js');
	 require('~/assets/js/plugin/flexible.js')
	}
	import footMobile from "~/components/footMobile"
export default {

		name: 'payResult',
		data() {
      var query = this.$route.query;
      
			return {
				orderId: query.orderId,
				amount: query.amount,
				logIn: '',
				date: "",
        userId: '',
        email: query.email,
        success: query.succeed=='true'?true:false,
        msg: query.msg,
        showTipTxt: false,
        symbol: query.symbol ? query.symbol : '$',
        currency: query.currency ? query.currency : '',
        tryUrl:''
			}
		},
		components: {
			footMobile
		},
		methods: {
			getJumpUrl(isLogin){
        if(isLogin){
          return '/user/myBookings';
        }
        return '/user/myBookings?email='+this.email+'&orderid='+this.orderId;
      },
      getTryUrl(){
        var ua = window.navigator.userAgent.toLowerCase();
        this.isWx = (ua.match(/MicroMessenger/i) == 'micromessenger') ? true : false;

        var tryHref = 'https://www.localpanda.'+(this.symbol=='¥'?'cn':'com')+'/activity/payment/mobile/?objectId='+this.orderId+'&login='+(this.logIn?this.logIn:0);

        if(this.isWx && this.symbol=='¥'){
          tryHref = 'https://www.localpanda.cn/wx/getcode?link='+encodeURIComponent(tryHref);
        }
      
        return tryHref;
      }
		},
		mounted: function() {
			this.logIn=window.localStorage.getItem("logstate")
      this.userId=window.localStorage.getItem("userid")
      if(!this.logIn){
				this.showTipTxt = true;
      }
      
      //设置try again的url
      this.tryUrl = this.getTryUrl();
		}
	}

</script>

<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
  .pay_result{
    padding: 0.533333rem 0.586666rem;
    h4{ 
      font-size:0.8rem;
      font-weight: bold;
      margin-bottom: 1.2rem;
    }
    .pay_tip{
      margin-bottom: 0.666666rem;
      .iconfont{
        font-size: 0.266666rem;
        color: #fff;
        display: inline-block;
        width:0.586666rem;
        height: 0.586666rem;
        line-height: 0.586666rem;
        text-align: center;
        border-radius: 50%;
        vertical-align: top;
        margin-right:0.266666rem;
      }
      .icon_success{
        background-color: #1bbc9d;
      }
      .icon_error{
        background-color: #e14f3f;
      }
      .tip_text{ 
        color: #353a3f;
        font-size: 0.453333rem;
        line-height: 0.586666rem;
        font-weight: bold;
      }
    }

    .order_info{
      font-size: 0.373333rem;
      color: #353a3f;
      line-height: 0.613333rem;
      span{
        color: #1bbc9d;
      }
    }
    .order_contact{
      color: #878e95;
      font-size:0.293333rem;
      margin-top: 0.666666rem;
      line-height:0.48rem;
    }
    .c_666{
      color: #666;
    }
	.btn{
		
		position: fixed; 
		left: 0;
		padding:0.4rem 6%;
		width: calc(100% - 12%);
		background: #FFF;
		bottom: 0;
		line-height: 2.666666rem;
		z-index: 2;
	}
    .btn_href{
    	
      width: 100%;
      display: block;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      color: #fff;
      font-size: 0.373333rem;
      border-radius:0.6rem;
      background: -webkit-linear-gradient(left, #1bbc9d , #009efc); /* Safari 5.1 - 6.0 */
      background: linear-gradient(to right, #1bbc9d , #009efc); /* 标准的语法 */
    }
    
  }
  
 #launcher{  bottom: 60px!important;}
  

</style>