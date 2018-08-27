<template>
	<div class="footerAll">
		<div id="footer">
			<div class="footerInfo">
				<ul class='clearfix'>
					<li>
						<div class="item">
							<h3>CITIES</h3>
							<div class="city clearfix">
								<a href="/activity/list/Shanghai">Activities in Shanghai</a>
								<a href="/activity/list/Beijing">Activities in Beijing</a>
								<a href="/activity/list/Chengdu">Activities in Chengdu</a>
								<a href="/activity/list/Xian">Activities in Xi'an</a>
								<a href="/activity/list/Guilin">Activities in Guilin</a>
							</div>
						</div>
					</li>
					<li>
						<h3>COMPANY</h3>
						<div class="company">
							<a href="/info/about-us">About Us</a>
							<a href="/info/contact-us">Contact Us</a>
						</div>
						
					</li>
					<li>
						<h3>NEED HELP</h3>
						<div class="need-help">
							<a href="/info/service-terms">Service Terms</a>
							<a href="/info/privacy-policy">Privacy Policy</a>
							<a class="run_stop">Legal</a>
							<a class="run_stop">Terms of Use</a>
							
						</div>
						
					</li>
					<li>
						<h3>PAYMENTS</h3>
						<div class="payments">
							
							<span>
								<svg class="icon" aria-hidden="true">
										<use xlink:href="#icon-mastercard"></use>
								</svg>
							</span>
							<span>
								<svg class="icon" aria-hidden="true">
										<use xlink:href="#icon-americanexpress"></use>
								</svg>
							</span>
							
							<span>
								<svg class="icon" aria-hidden="true">
										<use xlink:href="#icon-paypal"></use>
								</svg>
							</span>
							<span>
								<svg class="icon" aria-hidden="true">
										<use xlink:href="#icon-visa"></use>
								</svg>
							</span>
							<br>
							<span class="footer_weixin">
								<svg class="icon" aria-hidden="true">
										<use xlink:href="#icon-weixin"></use>
								</svg>
							</span>
						</div>
						
					</li>
					<li>
						<h3>CURRENCY</h3>
						<div class='selectCurrency'>
							<select class="selectCurrey" v-model="currency">
								<option v-for="(item,index) in exchange" :value="item.code">{{item.code}} ( {{item.symbol}} )</option>
							</select>
							<i class="iconfont selectCurrencyIcon">&#xe60f;</i>
						</div>

						<!-- <a class="footer_customize" href="/travel/customize/step1">Customize Your Trip</a> -->
					</li>
				</ul>
			</div>
			<div class="cooperation clearfix">
				<svg class="icon1" aria-hidden="true">
						<use xlink:href="#icon-logo_"></use>
				</svg>
				<span class="cooperation-text">
					<em>© 2017–2018 Local Panda. Made in Shanghai,China <a href="http://www.miibeian.gov.cn">沪ICP备18014541号</a></em>
					<em></em> 
				</span>
				
				
				
				<div class="cooperationIcon">
					<a class="wechat">
						<svg class="icon2" aria-hidden="true"  @mouseenter="showChat=true" @mouseleave='showChat=false'>
								<use xlink:href="#icon-wechat1"></use>
						</svg>
						<div class="wechatCode" v-if='showChat'  @mouseenter="showChat=true" @mouseleave='showChat=false'>
							<img src="https://cloud.localpanda.com/static/icon/LPwechat.jpg"  alt=""/>
						</div>
					</a>
					<a href="https://www.facebook.com/LocalPandaGuides/?fref=ts">
						<svg class="icon2" aria-hidden="true">
								<use xlink:href="#icon-facebook"></use>
						</svg>
					</a>
					<a href="https://twitter.com/LocalPandaGuide">
						<svg class="icon2" aria-hidden="true">
								<use xlink:href="#icon-twitter1"></use>
						</svg>
					</a>
					<a href="https://api.whatsapp.com/send?phone=8616620183842">
						<svg class="icon2" aria-hidden="true">
								<use xlink:href="#icon-whatsapp"></use>
						</svg>
					</a>
					<a href="https://www.instagram.com/localpandaguides/">
						<svg class="icon2" aria-hidden="true">
								<use xlink:href="#icon-instagram"></use>
						</svg>
					</a>
					<a href="http://www.linkedin.com/company/local-panda/">
						<svg class="icon2" aria-hidden="true">
								<use xlink:href="#icon-linkedin"></use>
						</svg>
					</a>
				</div>
			</div>
		</div>

		

	</div>
</template>

<script>


import { fail } from 'assert';

	if (process.BROWSER_BUILD) {
	  require('~/assets/font/iconfont.js')
	}
	export default {
		props:["showBook","logIn",'nowCurrency'],
		name: 'footercommon',
		data() {
			return {
				ContactStatus: false,
				objectType: 'CONSULTING',
				showChat:false,
				//币种
				currency:'USD',
				exchange:'',
				
			}
		},
		components:{
			
		},
		methods: {
			
		},
		mounted() {
			
			//获取币种列表
			var that = this;
			window.currencyCallbackFooter = function(data){
				that.exchange = data;
			}

			//读取币种
			var nowCurrency = JSON.parse(Cookie.get('currency'));
			if(nowCurrency){
				this.currency = nowCurrency.code;
			}
			
		},
		
		watch:{
			nowCurrency:function(val){
				this.currency= val.code;
			},
			currency:function(val){
				var thisCurrency = '',
					exchange = this.exchange;
				for(var i=0;i<exchange.length;i++){
					var thisData = exchange[i];
					if(thisData.code==val){
						thisCurrency = thisData;
					}
				}

				if(thisCurrency){
					Cookie.set('currency',JSON.stringify({
						code: thisCurrency.code,
						symbol: thisCurrency.symbol
					}),{path:'/','expires':30});

					this.$emit('headCurrency',thisCurrency);
				}
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon {
      width: 42px; height: 26px;
		vertical-align: middle;
	   fill: currentColor;
	   overflow: hidden;
	   border-radius: 5px;
    }
    .icon1{
    	width: 140px; 
       height: 50px;
       fill: currentColor;
       overflow: hidden;
		 border-radius: 5px;
		 margin-right: 20px;
		 float: left;
       
    }
    .icon2{
    	width: 26px; height: 26px;
       vertical-align:middle;
       fill: currentColor;
       
       overflow: hidden;
    }
		.footerAll{
			border-top:#ebebeb solid 1px;
			background: #fff;
			#footer{
				width: 1170px;
				margin: 0 auto;
				padding:80px 0 55px;
				
				.footerInfo{
						padding-bottom: 54px;
						border-bottom: 1px solid #ebebeb;
						ul{
							
							li{
								
								float:left;
								width: 17%;
								box-sizing: border-box;
								padding-right: 20px;
								
								&:nth-child(1),&:nth-child(4){
									width: 22%;
								}
								&:first-child{
									margin-left: 0;
								}
								.footer_customize{
									display: inline-block;
									width: 250px;
									height: 68px;
									line-height: 64px;
									border-radius: 34px;
									border: #1bbc9d solid 2px;
									text-align: center;
									&:hover{
										-webkit-transform: translateX(0px);
										transform: translateX(0px);
									}
								}
								h3{
									font-size: 16px;
									font-weight: bold;
									margin-bottom: 30px;
								}
								a{
									display: block;
									font-size: 16px;
									line-height: 26px;
									-webkit-transition:all 0.3s linear 0s;  //all表示所有属性都会执行动画，如果只让宽度运动就写width；
									transition:all 0.3s linear 0s; 
									&:hover{
										color: #1bbc9d;
										-webkit-transform: translateX(10px);
										transform: translateX(10px);
									}
									
								}
								.selectCurrency{
									width: 256px;
									border: 1px solid #dde0e0;
									height: 48px;
									border-radius: 3px;
									position: relative;
									select{
										//清除select的边框样式
									border: none;
									//清除select聚焦时候的边框颜色
									outline: none;
									//将select的宽高等于div的宽高
									width: 100%;
									height: 46px;
									line-height: 46px;
									//隐藏select的下拉图标
									appearance: none;
									-webkit-appearance: none;
									-moz-appearance: none;
									//通过padding-left的值让文字居中
									padding-left: 17px;
									font-size: 18px;
									background: none;
									}
									i{
										position:absolute;
										right: 17px;
										top: 50%;
										transform: translateY(-50%);
										font-size: 12px;
									}
								}
								.run_stop{
									color: #878E95;
									&:hover{
										-webkit-transform: translateX(0px);
										transform: translateX(0px);
										color: #878E95;
									}
								}
								.city{
									div{
										float: left;
										
										&:last-child{
											margin-left: 40px;
										}
									}
									
								}
								.payments{
									span{
										margin-right: 6px;
										margin-bottom: 5px;
										display: inline-block;
									}
									.footer_weixin{
										background-color: #0eb20a;
										width: 42px;
										height: 26px;
										display: inline-block;
										border-radius: 5px;
										text-align: center;
										svg{
											color: #fff;
											width: 22px;
										}
									}
								}
								
							}
						}
				}
				.cooperation{
					padding-top:44px;
					
					.cooperation-text{
						.icon1{ }
						em{
							display: block;
						}
						float: left;
						margin-top: 15px;
						font-size: 16px;
						display: inline-block;
						a{ margin-left: 20px; font-size: 14px;}
					}
					.cooperationIcon{
						float: right;
						line-height: 47px;
						a{
							display:inline-block;
							margin-right:14px;
							&:last-child{
								margin-right: 0;
							}
						}
						.wechat{
							position:relative;
							.wechatCode{
								position:absolute;
								width: 98px;
								height: 98px;
								padding: 16px;
								top:-108px;
								left: -34px;
								z-index:2;
								background:#fff;
								box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
								border-radius: 5px;
								img{
									width: 100%;
									height: 100%;
								}
							}
						}
					}
					
				}
			}
		}
    
    
</style>