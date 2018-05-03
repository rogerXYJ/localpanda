 <template>
    <div class="page__container">
    	<HeaderCommon :logIn="logIn"></HeaderCommon>
        <div class="about-cover">
            <h2 >Contact Us</h2>
            <h3 >Need help? Let's talk!</h3>
        </div>
        <div class="about__container clearfix">
			<div class="fillIn">
				<h3>Get in touch with us</h3>
				<p>If you have any questions, suggestions, or just want to chat, feel free to contact us using the boxes below.We'll get back to you within 1 business day.</p>
				<div class="fillItem">
					<b>NAME</b>
					<input placeholder="Your Name" />
				</div>
				<div class="fillItem">
					<b>MAIL</b>
					<input placeholder="Your Mail" />
				</div>
				<div class="fillItem">
					<b>MESSAGE</b>
					<textarea placeholder="Your Message" />
				</div>
				<div class="submit">
					<button>Seed Us a Message</button>
				</div>
			</div>
			<div class="reachout">
				<h3>Reach out</h3>
				<p>We provide private tours specifically for you! Contact our guides today with your questions. </p>
			</div>
        	
        	
        </div>
        
        <Foot></Foot>
    </div>
</template>

<script>
import Vue from 'vue'
import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
//import FooterCommon from '~/components/FooterCommon/FooterCommon';
import Foot from '~/components/FooterCommon/Foot';
export default {
    name: 'about-us',
    data(){
    	return {
    		logIn:'',
    		isPlay:false,
    		
    	}
    },
    components: {
    	HeaderCommon,
    	Foot
    },
    methods: {
    	
    },
    mounted: function() {
       this.logIn = window.localStorage.getItem("logstate");
        
    }
}
</script>
<style lang="scss">
    @import '~assets/scss/_main.scss';
    @import '~/assets/font/iconfont.css';
    @import '~assets/scss/G-ui/base.scss';
</style>
<style lang="scss" scoped>
  @import "~assets/scss/base/_setting.scss";
    h2, h3{
        text-align: center;
    }
    h2{
        font-weight: bold;
    }
    p{
        font-size: 18px;
        line-height: 28px;
    }
    .about-cover{
    	width: 100%;
    	height: 260px;
    	position: relative;
    	background: url("https://resource.localpanda.cn/static/headerPhotos/ContactUs.jpg") no-repeat;
    	background-size: cover;
    	overflow: hidden;
    	background-position: center;
    	
    	h2{
    		
            font-size: 38px;
            text-shadow: 0 5px 10px rgba(0,0,0,.3);
            color: #ffffff;
            margin-top: 98px;
        }
        h3{
        	margin-top: 18px;
            font-size: 20px;
            text-shadow: 0 5px 10px rgba(0,0,0,.3);
            color: #ffffff;
            
        }
    }	
</style>
