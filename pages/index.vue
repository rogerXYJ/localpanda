 <template>
    <div class="indexst">
    <HeaderCommon :logIn="logIn" :isIndex="isIndex" :nowCurrency="currency" @headCurrency="headCurrencyFn"></HeaderCommon>
        <Banner ></Banner>
        <MustGo ></MustGo>
       
        <Activities :participants="participants" :activeList="initialState.activeList" :currency="currency"></Activities>
        <!-- <Guide :guidelist="initialState.guidelist" ></Guide> -->
        <OurServices ></OurServices>
      <Foot></Foot>
      <FooterCommon :nowCurrency="currency" @headCurrency="headCurrencyFn"></FooterCommon>
        
    </div>
</template>

<script>
import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
import FooterCommon from '~/components/FooterCommon/FooterCommon';
import Banner from '~/components/Banner/Banner';
import MustGo from '~/components/pageComponents/index/MustGo';
import Activities from '~/components/pageComponents/index/Activities';
import Guide from "~/components/pageComponents/index/Guide";
import OurServices from '~/components/pageComponents/index/OurServices';
import Foot from '~/components/FooterCommon/Foot';
import axios from 'axios';
export default {
    async asyncData ({ route, store, error, env, apiBasePath,req}) {
      // 服务端渲染部分 这部分操作还没有页面实例，只是初始化页面数据
      let data = {
        id:["10023","10033","10045","10030"],
        activityId:["11280","11285","11076","11105","11068","11198","11015","11243","11046"],
        guidelist:'',
        activeList:'',
        logIn:'',
        isIndex:true,
        apiBasePath:apiBasePath,
        currency : {code: "USD", symbol: "$", exchangeRate: 1},
        participants:0,
      }
      let briefRes = {};
      let batchRes = {};


      //获取页面cookie
			var userCookie = {};
			if(req){
				var cookie = req.headers.cookie;
				if(cookie){
					var cookieArr = cookie.split(';');
					for(var i=0;i<cookieArr.length;i++){
						var thisCookie = cookieArr[i].split('=');
						userCookie[thisCookie[0].trim()] = (thisCookie[1]||'').trim();
					}
				}
			};

			if(userCookie.currency){
				data.currency = JSON.parse(decodeURIComponent(userCookie.currency));
      }
      if(userCookie.participants){
        data.participants = JSON.parse(decodeURIComponent(userCookie.participants));
      }

      
      try {
       // briefRes = await axios.get(apiBasePath + 'guide/brief/' + data.id);
        batchRes = await axios.get(apiBasePath + 'product/activity/batch/' + data.activityId+'?currency='+data.currency.code);
      } catch (err) {
        if (err.response.status !== 404) {
          return error({ statusCode: 500, message: store.state.lang.text.an_error_occured })
        }
        return error({ statusCode: 404, message: store.state.lang.text.api_page_not_found })
      }
      data.initialState = {
        //guidelist: briefRes.data,
        activeList: batchRes.data
      };
      return data;
    },
    components: {
        HeaderCommon,
        FooterCommon,
        Banner,
        MustGo,
        Activities,
        Guide,
        OurServices,
        Foot
    },
    head(){
    	let title="Local Panda | The China Travel Experts. "
    	let keywords="Local Panda, China, China travel, China tour, China travel company, China travel guide, China tour package"
    	let description="China specialized travel platform, handpicked local guides, book private and personalized tours, trip planning assistance, hundreds of things to do and see in China, sightseeing day activities, car service and transportation"
    	return{
    		title:title,
    		meta: [{
						hid: "keywords",
						name: "keywords",
						content: keywords
					},
					{
						hid: "description",
						name: "description",
						content: description
					}
					
				]
    	}
    },
    methods: {
			headCurrencyFn(currency){
        this.currency = currency;
        
			}
    },
    watch:{
      currency:function(val){
        var self = this;
        //切换币种,重新拉去数据
        axios.get(this.apiBasePath + 'product/activity/batch/' + this.activityId+'?currency='+val.code).then(function(res){
          self.initialState.activeList = res.data;
        });
      }
    },
       
    mounted: function() {
    	this.logIn = window.localStorage.getItem("logstate");
    	console.log(this.activeList)
      document.documentElement.scrollTop=0
    //    if(window.name != "bencalie"){
    //      location.reload();
    //      window.name = "bencalie";
    //  }else{
    //      window.name = "";
    //  }
    var currency=JSON.parse(Cookie.get('currency'))?JSON.parse(Cookie.get('currency')):{code:'USD',symbol:'$'}
			if(this.currency!=currency){
				this.currency=currency
      }
      
    }
}
</script>
<style lang="scss">
   //@import '~/assets/scss/_main.scss';
   //@import '~/assets/font/iconfont.css';
</style>
<style lang="scss" scoped>
//@import '~/assets/scss/base/_setting.scss';
.indexst{
   
}
</style>
