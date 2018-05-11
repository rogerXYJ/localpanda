 <template>
    <div class="mobilePay">
        <div class="pay_header"><span class="iconfont">&#xe629;</span></div>
        <div class="pay-with">Pay with</div>
        <div class="change_type">
            <select class="change_select" @change="change_select" v-model="payType">
                <option value="USD">Order Total: ${{usdPrice}}</option>
                <option value="CNY">Order Total: ¥{{cnyPrice}}</option>
            </select>
        </div>

        <ul class="pay_list">
            <li v-show="payType=='USD'">
                <span class="iconfont goicon">&#xe620;</span><span class="iconfont caricon">&#xe60a;</span>Credit or Debit Card
            </li>
            <li v-show="payType=='CNY'">
                <span class="iconfont goicon">&#xe620;</span><span class="iconfont wxicon">&#xe66c;</span>Credit or Debit Card
            </li>
        </ul>

        <p>You ordered as a guest. To view your order details, you can click "My Bookings" on the top bar then type in the reservee's email address and name you entered before to access that information.</p>


    </div>
</template>

<script>


export default {
    name: 'mobilePay',
    head() {
        return {
            script: [{
                    src: 'https://checkout.stripe.com/checkout.js',
                    type: 'text/javascript'
                }
            ]
        }
    },
    async asyncData({
        apiBasePath
    }) {
        return {
            apiBasePath: apiBasePath
        }
    },
    data () {
		var query = this.$route.query;
        return {
			query: query,
            payType:'USD',
            cnyPrice:'',
            usdPrice:'',

            stripeHandler: "",
        }
        
    },
    methods: {
        change_select(e){
            this.payType = e.target.value;
        },
        pay() {
            let that = this;

            ga('gtag_UA_107010673_1.send', {
                hitType: 'event',
                eventCategory: 'Button',
                eventAction: 'Click',
                eventLabel: 'activity_pay',

            });
            that.stripeHandler.open({
                name: 'Local panda', // 收款方或商家名称，比如 Beansmile
                description: "", // 待支付商品的描述
                amount: that.opctions.amount * 100, // 支付金额，单位是“分”
                locale: 'en_US',
                closed: function() {

                }
            })
        },
        getToken() {
            let that = this
            that.stripeHandler = StripeCheckout.configure({
                key: payCode,
                image: 'https://resource.localpanda.cn/static/icon/logo.png', // 显示在支付对话框的图片，可自己指定
                alipay: true, // 启用支付宝支付
                token: function(token) { // 用户填写完资料并且 Stripe 校验成功后的回调函数
                    // 此时应该提交 token.id 到后台，比如 http://example.com/orders/1?stripeToken={token.id}
                    that.loadingStatus = true;
                    let obj = {
                        amount: that.opctions.amount * 100,
                        currency: "USD",
                        objectId: that.orderId,
                        token: token.id,
                        email: token.email,
                        tokenType: token.type,
                        objectType: "ACTIVITY"

                    }

                    Vue.axios.post(that.apiBasePath + "payment/pay/stripe", JSON.stringify(obj), {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    }).then(function(response) {
                        var thisData = response.data;
                        var msg = '';
                        //成功
                        if(response.status==200){
                            var pageTracker = _gat._getTracker("UA-107010673-1");
                            pageTracker._addTrans(that.orderId, "", that.opctions.amount, "", "", "", "", "");
                            pageTracker._addItem(that.orderId, that.opctions.activityId, "", "", that.opctions.amount, "1");
                            pageTracker._trackTrans();

                            if(!thisData.succeed && thisData.errorMessage && !/Exception/.test(thisData.errorMessage)) {
                                msg = thisData.errorMessage;
                            }

                        }
                        //跳转
                        window.location.href = "https://www.localpanda.com/payment/mobile/success?email="+that.email+"&orderId=" + that.orderId + '&amount=' + that.opctions.amount+'&succeed='+thisData.succeed+'&msg='+msg
                        //
                    }, function(response) {
                        //请求失败跳转
                        window.location.href = "https://www.localpanda.com/payment/mobile/success?email="+that.email+"&orderId=" + that.orderId + '&amount=' + that.opctions.amount+'&succeed=false'
                    })
                }
            })
        }
    },
    mounted: function() {
        var mobilePayInfo = {
            currency:'CNY',
            cnyPrice:'630',
            usdPrice:'100'
        }
        localStorage.setItem('mobilePayInfo',JSON.stringify(mobilePayInfo));
        
        var payInfo = JSON.parse(localStorage.getItem('mobilePayInfo'));
        this.payType = payInfo.currency;
        this.cnyPrice = payInfo.cnyPrice;
        this.usdPrice = payInfo.usdPrice;

        //支付
        this.getToken();
        

        console.log(this.apiBasePath);
    }
}
</script>
<style lang="scss">
@import "~assets/scss/_main.scss";
@import "~/assets/font/iconfont.css";
    
html{ font-size:50px;}

.mobilePay{
    
    padding:0 0.4rem;
    .pay_header{
        padding:0.2rem 0;
        span{
            font-size: 0.66rem;
        }
    }
    .pay-with {
        font-size: 0.6rem;
        line-height: 42px;
        color: #353a3f;
    }
    .change_type{
        .change_select{
            margin-top: 0.4rem;
            border: #ccc solid 1px;
            width: 100%;
            height: 0.86rem;
            line-height: 0.86rem;
            padding: 0 0.2rem;
            color: #353a3f;
            background: #fff;
            box-sizing: border-box;
            font-size: 0.32rem;
        }
    }
    .pay_list{
        margin-top: 0.5rem;
        li{
            height: 0.88rem;
            line-height: 0.88rem;
            .iconfont{
                margin-right: 0.2rem;
                float: left;
                
            }
            .goicon{
                font-size: 0.36rem;
                color: #ddd;
                margin-right: 0;
                float: right;
                line-height: 0.88rem;
            }
            .wxicon{
                width: 0.6rem; 
                height: 0.46rem;
                display: inline-block;
                background-color: #0eb20a;
                color: #fff;
                font-size: 0.3rem;
                line-height: 0.46rem;
                 text-align: center;
                 border-radius:4px;
                 margin-top: 0.21rem;
            }
            .caricon{
                width: 0.6rem; 
                height: 0.46rem;
                display: inline-block;
                color: #ddd;
                font-size: 0.6rem;
                line-height: 0.46rem;
                margin-top: 0.21rem;

            }
            font-size: 0.36rem;
            color: #353a3f;
        }
    }
    p{
        color: #353a3f;
        font-size: 0.26rem;
        line-height: 0.36rem;
        margin-top: 0.6rem;
    }
    
}

</style>

