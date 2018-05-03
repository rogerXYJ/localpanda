<template>
  <div class="pay_result">
    <h4>Confirmation</h4>
    <div class="pay_tip" v-show="success">
      <span class="iconfont icon_success">&#xe61e;</span>
      <span class="tip_text">Booking success!</span>
    </div>
    <div class="pay_tip" v-show="!success">
      <span class="iconfont icon_error">&#xe606;</span>
      <span class="tip_text">Oops! Some went wrong.</span>
    </div>

    <p class="order_info">Order ID: {{orderId}}</p>
    <!-- <p class="order_info" v-show="success">Time of transaction: 2017-12-20 09:32:51</p> -->
    <p class="order_info">Payment amount: <span>${{amount}}</span></p>

    <p class="order_contact" v-show="success">Our staff will confirm with you as soon as possible. We will reply you within one business day. You can know the details furthur by look at your order details.You can also email service@localpanda.com or call us at +86 (21) 8018-2090/ +1 (888) 930-8849 (US toll free).</p>
    <p class="order_contact" v-show="!success"><span v-show="msg">Your payment did not go through. Here is the error that you can reference:{{msg}}</span><br><br>
      If you want to proceed with payment, click “Try again.” If your payment problems continue, we suggest you try using another card or talk to our online assistant at the bottom right of the webpage to get payment help. You can also email service@localpanda.com or call us at +86 (21) 8081-2090/+1 (888) 9390-8839 (US toll free).</p>

    <a class="btn_href" href="/" v-if="success">Back to home</a>
    <a class="btn_href" href="/activity/payment/mobile/" v-else>Try again</a>
  </div>
</template>

<script>

export default {

		name: 'payResult',
		data() {
      var query = this.$route.query;

      console.log(query);
			return {
				orderId: query.orderId,
				amount: query.amount,
				logIn: '',
				date: "",
        userId: '',
        success: query.succeed=='true'?true:false,
        msg: query.msg
			}
		},
		components: {
			
		},
		methods: {
			
		},
		mounted: function() {
			console.log();
		}
	}

</script>

<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';

  html{
    font-size: 50px;
  }
  body{ 
    font-size: 0.24rem;
  }
  .pay_result{
    padding: 0.4rem 0.44rem;
    h4{ 
      font-size: 0.6rem;
      font-weight: bold;
      margin-bottom: 0.9rem;
    }
    .pay_tip{
      margin-bottom: 0.5rem;
      .iconfont{
        font-size: 0.2rem;
        color: #fff;
        display: inline-block;
        width: 0.44rem;
        height: 0.44rem;
        line-height: 0.44rem;
        text-align: center;
        border-radius: 50%;
        vertical-align: top;
        margin-right: 0.2rem;
      }
      .icon_success{
        background-color: #1bbc9d;
      }
      .icon_error{
        background-color: #e14f3f;
      }
      .tip_text{ 
        color: #353a3f;
        font-size: 0.34rem;
        line-height: 0.44rem;
        font-weight: bold;
      }
    }

    .order_info{
      font-size: 0.28rem;
      color: #353a3f;
      line-height: 0.46rem;
      span{
        color: #1bbc9d;
      }
    }
    .order_contact{
      color: #878e95;
      font-size: 0.22rem;
      margin-top: 0.5rem;
      line-height: 0.36rem;
    }

    .btn_href{
      width: 88%;
      position: absolute; 
      left: 6%;
      bottom: 0.3rem;
      display: block;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      color: #fff;
      font-size: 0.28rem;
      border-radius:0.45rem;
      background: -webkit-linear-gradient(left, #1bbc9d , #009efc); /* Safari 5.1 - 6.0 */
      background: linear-gradient(to right, #1bbc9d , #009efc); /* 标准的语法 */
    }
    
  }
  

  

</style>