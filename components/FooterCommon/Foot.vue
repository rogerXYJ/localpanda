<template>
	<div id="footer">
		<div class="footerInfo">
			<ul class='clearfix'>
				<li>
					<div class="item">
						<h3>CITIES</h3>
						<div class="city clearfix">
							<div>
								<a href="/activity/list/Shanghai">Shanghai</a>
								<a href="/activity/list/Beijing">Beijing</a>
								<a href="/activity/list/Chengdu">Chengdu</a>
								
							</div>
							<div>
								<a href="/activity/list/Xian">Xi'an</a>
								<a href="/activity/list/Guilin">Guilin</a>
							</div>
						</div>
					</div>
				</li>
				<li>
					<h3>COMPANY</h3>
					<div class="company">
						<a href="/info/about-us">About Us</a>
						<a>Contact Us</a>
					</div>
					
				</li>
				<li>
					<h3>NEED HELP</h3>
					<div class="need-help">
						<a>Legal</a>
						<a>Terms of Use</a>
						<a>Privacy Policy</a>
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
					</div>
					
				</li>
			</ul>
		</div>
		<div class="cooperation ">
			<span class="cooperation-text">© 2017–2018 Local Panda. Made in Shanghai,China</span>
			
			<svg class="icon1" aria-hidden="true">
			    <use xlink:href="#icon-logo_"></use>
			</svg>
			
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
</template>

<script>
	if (process.BROWSER_BUILD) {
	  require('~/assets/font/iconfont.js')
	}
	export default {
		props:["showBook","logIn"],
		name: 'footercommon',
		data() {
			return {
				
				
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
    	width: 514px; 
       height: 50px;
    	vertical-align: middle;
       fill: currentColor;
       overflow: hidden;
       border-radius: 5px;
       
    }
    .icon2{
    	width: 26px; height: 26px;
       vertical-align:middle;
       fill: currentColor;
       
       overflow: hidden;
    }
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
    					margin-left:18%;
    					
    					&:first-child{
    						margin-left: 0;
    					}
    					&:last-child{
    						width: auto;
    						float:right
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
							&:hover{
								color: #1bbc9d;
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
    
    
</style>