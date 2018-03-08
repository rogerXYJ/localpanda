 <template>
    <div class="indexst">
    <HeaderCommon :logIn="logIn" :isIndex="isIndex"></HeaderCommon>
        <Banner ></Banner>
        <MustGo ></MustGo>
       
        <Activities :activeList="activeList" ></Activities>
         <Guide :guidelist="guidelist" ></Guide> 
        <OurServices ></OurServices>
      <FooterCommon></FooterCommon>
        
    </div>
</template>

<script>
import HeaderCommon from '../../components/HeaderCommon/HeaderCommon';
import FooterCommon from '../../components/FooterCommon/FooterCommon';
import Banner from '../../components/Banner/Banner';
import MustGo from './components/MustGo';
import Activities from './components/Activities'
import Guide from "./components/Guide"
import OurServices from './components/OurServices'
export default {
    name: 'app',
    data () {
        return {
          	id:["10023","10033","10045","10030"],
          	activityId:["11015","11032","11031","11037","11043","11036"],
          	guidelist:'',
          	activeList:'',
          	logIn:'',
          	deviceWidth:'',
          	isIndex:true
          	
        }
    },
    components: {
        HeaderCommon,
        FooterCommon,
        Banner,
        MustGo,
        Activities,
        Guide,
        OurServices
    },
    methods: {
        
    },
    created() {
            let deviceWidth = document.documentElement.clientWidth
            this.deviceWidth = deviceWidth
        },
       
    mounted: function() {
        let that=this
        that.axios.get('https://www.localpanda.com/api/guide/brief/'+that.id).then(function(response){
        		that.guidelist=response.data
        },function(response){})
        that.axios.get("https://www.localpanda.com/api/activity/batch/"+that.activityId).then(function(response){
        	console.log(response)
        		that.activeList=response.data
        },function(response){})
        that.logIn=window.localStorage.getItem("logstate")
        
    }
}
</script>
<style lang="sass">
   @import '../../assets/scss/_main.scss';
   @import '../../assets/font/iconfont.css';
</style>
<style lang="scss" scoped>
@import "../../assets/scss/base/_setting.scss";
.indexst{
   overflow-x:hidden;
}
</style>
