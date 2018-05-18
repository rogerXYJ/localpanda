 <template>
    <div class="wxMobilePay">
        <div class="loading_box">
            <span class="loading"></span>The transaction is being confirmed …
        </div>
    </div>
</template>

<script>


export default {
    name: 'wxMobilePay',
    data () {
		var query = this.$route.query;
        return {
			query: query
        }
        
    },
    methods: {
        change_select(e){
            
        }
    },
    mounted: function() {
        var query = this.query;
        //var jumpUrl = 'https://www.localpanda.cn/payment/mobile/success?email='+query.email+'&orderId=' + query.orderId + '&amount=' + query.amount+'&succeed=true&payType=CNY';

        //查询订单
        this.axios.get("/api/payment/wechat/status?orderId="+query.orderId+'&flag=1',{
            headers: {
                'Content-Type': 'application/json;'
            }
        }).then(function(response) {
            if(response.status==200){
                var succeed = false,
                    msg = '';
                if(response.data.succeed){
                    succeed = true;
                }else{
                    msg = 'fail';
                }
                location.href = "https://www.localpanda.com/payment/mobile/success?email="+query.email+"&orderId=" + query.orderId + '&amount=' + query.amount+"&succeed="+succeed+'&symbol='+query.symbol+'&msg='+msg;
            }else{
                alert('Please try to refresh the page!');
            }
        }, function(response) {
            alert('Please try to refresh the page!');
        })
                

    }
}
</script>
<style lang="scss">
@import "~assets/scss/_main.scss";
html{ font-size:50px;}
.loading_box{ text-align: center; margin-top: 30px; font-size: 15px; line-height: 20px;
    .loading{ display: inline-block; width: 20px; height:20px; background: url('https://resource.localpanda.cn/static/icon/loading.gif') center center no-repeat; background-size: 100%; vertical-align: top; margin-right: 6px;}
}

</style>

