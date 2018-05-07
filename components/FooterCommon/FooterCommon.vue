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
							<!-- <a href="javascript:;" @click="showInquiry">Inquiry</a> -->
							<a class="run_stop">Legal</a>
							<a class="run_stop">Terms of Use</a>
							<a class="run_stop">Privacy Policy</a>
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
							<span class="footer_weixin">
								<svg class="icon" aria-hidden="true">
										<use xlink:href="#icon-weixin"></use>
								</svg>
							</span>
						</div>
						
					</li>
					<li>
						<a class="footer_customize" href="/travel/customize/step1">Customize Your Trip</a>
					</li>
				</ul>
			</div>
			<div class="cooperation ">
				<svg class="icon1" aria-hidden="true">
						<use xlink:href="#icon-logo_"></use>
				</svg>
				<span class="cooperation-text">© 2017–2018 Local Panda. Made in Shanghai,China</span>
				
				
				
				<div class="cooperationIcon">
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
		props:["showBook","logIn"],
		name: 'footercommon',
		data() {
			return {
				ContactStatus: false,
				objectType: 'CONSULTING'
				
			}
		},
		components:{
			
		},
		methods: {
			
		},
		mounted() {
			
			
		},
		
		created(){
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
    	vertical-align: middle;
       fill: currentColor;
       overflow: hidden;
			 border-radius: 5px;
			 margin-right: 20px;
       
    }
    .icon2{
    	width: 26px; height: 26px;
       vertical-align:middle;
       fill: currentColor;
       
       overflow: hidden;
    }
		.footerAll{
			border-top:#ebebeb solid 1px;
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
									width: 24%;
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
										margin-left: 6px;
										&:first-child{
											margin-left: 0;
										}
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
					padding-top: 54px;
					.cooperation-text{
						font-size: 18px;
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
					}
					
				}
			}
		}
    
    
</style>