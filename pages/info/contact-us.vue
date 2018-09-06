 <template> 
    <div class="page__container contact_us">
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
					<input name=""  :class="{borderflase:nameError}" @focus="nameF" v-model="name" placeholder="Your Name" />
				</div>
				<div class="fillItem">
					<b>MAIL</b>
					<input :class="{borderflase:emailError}" @focus="emailF" v-model="email" placeholder="Your Mail" />
				</div>
				<div class="fillItem">
					<b>MESSAGE</b>
					<textarea :class="{borderflase:textareaError}" @focus="textF" v-model="textarea" placeholder="Your Message" />
				</div>
				<div class="submit">
					<span class="btn_send" @click="submit">Send Us a Message</span>
				</div>
			</div>
			<div class="reachout">
				<h3>Reach out</h3>
				<p>We provide destination tours and activities. Contact us with any questions you have!  </p>
                <dl>
                    <dt>General Enquiries</dt>
                    <dd>
                        <div class="info_list"><span class="iconfont">&#xe662;</span>+86 (21) 8018-2090<br>+1 (888) 930-8849 (US toll free)</div>
                        <div class="info_list"><span class="iconfont">&#xe60e;</span>service@localpanda.com</div>
                    </dd>
                </dl>
                <dl>
                    <dt>Address</dt>
                    <dd>
                        <div class="info_list"><span class="iconfont">&#xe610;</span>762 Tianshan Rd, 6F F-Town, Changning District, Shanghai, China</div>
                    </dd>
                </dl>

                <div class="media">
                    <h3>Social Media</h3>
                    <p>Follow us on the web!</p>
                    <div class="media_list">
                        <a href="https://www.instagram.com/localpandaguides/" target="_blank">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-instagram"></use>
                            </svg>
                        </a>
                        <a href="https://twitter.com/LocalPandaGuide" target="_blank">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-twitter1"></use>
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/LocalPandaGuides/?fref=ts" target="_blank">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-facebook"></use>
                            </svg>
                        </a>
                        <a href="http://www.linkedin.com/company/local-panda/" target="_blank">
                            <svg class="icon1" aria-hidden="true">
                                <use xlink:href="#icon-linkedin"></use>
                            </svg>
                        </a>
                    </div>
                </div>
                
			</div>
        	
        	
        </div>
        
        <Foot></Foot>

        <Alert :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
    </div>
</template>

<script>
import Vue from 'vue'
import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
import Foot from '~/components/FooterCommon/FooterCommon';
import { regExp } from '~/assets/js/plugin/utils'
import Alert from '~/components/Prompt/Alert'

export default {
    name: 'about-us',
    data(){
    	return {
            logIn:'',
    		name: '',
            email: '',
            textarea: '',
            nameError: false,
            emailError: false,
            textareaError: false,
            isShowAlert: false,//弹框返回状态
            alertMessage: "",//弹框内容
            alertTitle:'',
            isclick:false
    	}
    },
    components: {
    	HeaderCommon,
    	Foot,
        Alert
    },
    head() {
        let title = 'Contact-Us - Localpanda.com';
        let description = 'Contact us: Custom Tour Requests, booking & service questions, China travel agency services'
        let keywords ='Contact Us, Customize Your Trip'
        return {
            title: title,
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
        };
	},
    methods: {
    	getIsShowAlert(val) {
				this.isShowAlert = val;
			},
			submit() {
				
				const that = this
				if(that.name==''|| regExp.isNub(that.name)||regExp.isCode(that.name)) {
					that.nameError = true
				} else if(!regExp.isEmail(that.email)) {
					that.emailError = true
				} else if(that.textarea == "") {
					that.textareaError = true
				} else {
					if(window.localStorage.getItem("userid")){
						var obj = {
							userId:window.localStorage.getItem("userid"),
							objectType:"GENERAL",
							userName: that.name,
							emailAddress: that.email,
							message: that.textarea,
							"utcOffset": new Date().getTimezoneOffset() / 60 * -1
							
						}
					}else{
						var obj = {
							objectType:"GENERAL",
							userName: that.name,
							emailAddress: that.email,
							message: that.textarea,
							"utcOffset": new Date().getTimezoneOffset() / 60 * -1
							
						}
					}
					if(that.isclick==false){
						that.isclick=true
						that.axios.put("https://api.localpanda.com/api/user/feedback", JSON.stringify(obj), {
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						}).then(function(response) {
							that.isclick=false
							if(response.data.succeed){
								that.isShowAlert=true
								that.alertTitle="Submission completed!"
								that.alertMessage="Thank you for your feedback.We will get back to you within 1 day."
								that.name=""
								that.email=""
								that.textarea=""
							}else{
								that.isShowAlert=true
								that.alertMessage="Failed!"
								that.name=""
								that.email=""
								that.textarea=""
							}
							
						}, function(response) {
	
						})
					}
						
					
				}
			},
			nameF() {
				this.nameError = false
			},
			emailF() {
				this.emailError = false
			},
			textF() {
				this.textareaError = false
			}
    },
    mounted: function() {
       this.logIn = window.localStorage.getItem("logstate");
        
    }
}
</script>
<style lang="scss">
    //@import '~/assets/scss/_main.scss';
    //@import '~/assets/font/iconfont.css';
    @import '~assets/scss/G-ui/base.scss';
    //@import '~/assets/scss/base/_setting.scss';
    .contact_us{
        #header {
			.init{
				li{
					&:nth-child(0){
						display: none;
					}
					&:nth-child(1){
						display: none;
					}
					&:nth-child(3){
						display: none;
					}
					
				}
			}
			
			.search{ 
				display: none!important;
			}
			
		}
		.footerInfo{
			li:nth-child(5){
				display: none!important;
			}
		}
    }
</style>
<style lang="scss" scoped>
  
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
    	background: url("https://cloud.localpanda.com/static/headerPhotos/ContactUs.jpg") no-repeat;
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
    .about__container{
        padding-top: 140px;
        padding-bottom: 200px;
        width:1170px;
        margin: 0 auto;
        .fillIn{
            float: left;
            width: 760px;
            padding-right: 130px;
            border-right:#ebebeb solid 1px;
            h3{
                font-size:18px;
                color:#353a3f;
                font-weight: bold;
                text-align: left;
            }
            p{
                font-size:18px;
                margin-top: 20px;
                color: #353a3f;
            }
            .fillItem{
                margin-top: 25px;
                b{
                    color: #878e95;
                    font-weight: bold;
                    margin-bottom: 15px;
                    display: block;
                    font-size:12px;
                }
                
                input,textarea{
                    width: 100%;
                    height: 48px;
                    line-height: 48px;
                    border:#ddd solid 1px;
                    padding: 0 15px;
                    display: block;
                    font-size:16px;
                }
                textarea{ 
                    padding: 10px 15px;
                    height: 200px;
                    line-height: 22px;
                    
                    color: #353a3f;
                    resize:none;
                }
                .borderflase {
                    border: 1px solid red!important;
                }
            }
            .submit{
                margin-top: 50px;
                .btn_send{
                    cursor: pointer;
                    display: inline-block;
                    padding: 0 24px;
                    height: 46px;
                    line-height: 46px;
                    text-align: center;
                    color: #fff;
                    font-size: 16px;
                    border-radius:23px;
                    font-weight: bold;
                    background: -webkit-linear-gradient(left, #1bbc9d , #009efc); /* Safari 5.1 - 6.0 */
                    background: linear-gradient(to right, #1bbc9d , #009efc); /* 标准的语法 */
                    
                    &:hover{
                        background: -webkit-linear-gradient(left,#009efc, #1bbc9d); /* Safari 5.1 - 6.0 */
                        background: linear-gradient(to right , #009efc, #1bbc9d); /* 标准的语法 */
                    }
                }
            }
            
            
        }
        .reachout{
            width:275px;
            float: right;
            h3{
                text-align: left;
                font-size:18px;
                color:#353a3f;
                font-weight: bold;
            }
            p{
                font-size:18px;
                color:#353a3f;
                margin-top: 25px;
                line-height: 28px;
            }
            dt{
                font-size:12px;
                color: #878e95;
                font-weight: bold;
                text-transform: uppercase;
                margin-top: 25px;
                margin-bottom: 12px;
            }
            dd{
                color: #353a3f;
                font-size:18px;
                .info_list{
                    padding-left: 25px;
                    position: relative;
                    margin-top: 8px;
                    line-height: 24px;
                    span{
                        float: left;
                        margin-left: -25px;
                        font-size: 16px;
                        color: #878e95;
                    }
                }
            }
            .media{
                border-top:#ebebeb solid 1px;
                margin-top: 40px;
                padding-top: 40px;
                h3{
                   font-size: 18px;
                   color: #353a3f; 
                   font-weight: bold;
                }
                p{
                    font-size: 18px;
                    color: #353a3f;
                }
                .media_list{
                    margin-top: 20px;
                    svg{
                        float: left;
                        width:24px;
                        height: 24px;
                        margin-right: 25px;
                    }
                }
            }
        }
    }
    
</style>

