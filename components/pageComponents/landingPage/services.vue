<template>
	<div id="OurServices">
		<div class="OurServicesList">
			<ul>
				<li>
					<div class="servicesList-item">
						<div class="imglog">
							<i class="iconfont hot">&#xe651;</i>
						</div>
						<div class="text">
							<p v-for="i in logText3">{{i}}</p>
						</div>
					</div>
					
				</li>
				<li>
					<div class="servicesList-item">
						<div class="imglog">
							<i class="iconfont hot">&#xe64f;</i>
						</div>
						<div class="text">
							<p v-for="i in logText2">{{i}}</p>
						</div>
					</div>
					
				</li>
				<li>
					<div class="servicesList-item">
						<div class="imglog">
							<i class="iconfont hot">&#xe64e;</i>
						</div>
						<div class="text">
							<p v-for="i in logText4">{{i}}</p>
						</div>
					</div>
					
				</li>
				<li>
					<div class="servicesList-item">
						<div class="imglog">
							<i class="iconfont hot" >&#xe650;</i>
						</div>
						<div class="text">
							<p v-for="i in logText1">{{i}}</p>
						</div>
					</div>
					
				</li>
			</ul>
		</div>
		<div class="bg">
			<div class="log-bg">
				<img class="icon" src="https://cloud.localpanda.com/static/content/wave-center-right.svg" />
			</div>
			
		</div>
	</div>

</template>

<script>
	if (process.BROWSER_BUILD) {
	  require('~/assets/font/iconfont.js')
	}
	export default {
		name: "services",
		data() {
			return {
				
						
				logText1:["Real Locals","All guides are experts in the local area"],
			
				logText2:["Flat Rate","We don't hide extra fees or charge per-person"],
			
				logText3:["Hand Picked Guides",'All our guides are carefully selected for their expertise and glowing customer reviews'],
			
				
				logText4:["Private & Customizable","No groups, no tourist traps. You'll only do what you want at your own pace"],
				
				
			}
		},
		components: {},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">	
</style>
<style lang="scss" scoped>
	//@import '~/assets/scss/base/_setting.scss';
	
	#OurServices{
		.OurServicesList{
			width: 1170px;
			margin:60px auto 0;
			position: relative;
			z-index:100;
			ul{
				display:flex;
				box-sizing: content-box;
				-webkit-display:flex;
				-moz-display:flex;
				-o-display:flex;
				-ms-display:flex;
				li{
					-webkit-flex-shrink:0;
					-moz-flex-shrink:0;
					-o-flex-shink:0;
					-ms-flex-shink:0;
					width: 270px;
					margin-right:30px;
					&:first-child{
						
						i{
							font-size: 48px!important;
						}
						
					}
					&:nth-child(2){
						
						i{
							font-size: 46px!important;
						}
					}
					&:last-child{
						
						margin-right: 0;
					}
					
					.servicesList-item{
						margin: 25px 0 12px;
						.imglog{
							width: 86px;
							height: 86px;
							background-color: #faf9f8;
							border-radius: 50%;
							margin: 0 auto;
							text-align: center;
							line-height: 86px;
							i{
								font-size: 40px;
								&.hot{
									background-image: -webkit-linear-gradient(135deg,#009efd,#1bbc9d);
								-webkit-text-fill-color: transparent;
								-webkit-background-clip: text;
								
								
								background-image: -moz-linear-gradient(135deg,#009efd,#1bbc9d);
								-moz-text-fill-color: transparent;
								-moz-background-clip: text;
								
								background-image: -moz-linear-gradient(135deg,#009efd,#1bbc9d);
								-ms-text-fill-color: transparent;
								-ms-background-clip: text;
								
								background-image: -o-linear-gradient(135deg,#009efd,#1bbc9d);
								-o-text-fill-color: transparent;
								-o-background-clip: text;
								}
								
							}
						}
						.text{
							text-align: center;
							margin-top: 24px;
							
							p{
								&:last-child{
									width: 236px;
									margin: 12px auto 0;
									font-size: 16px;
								}
								&:first-child{
									font-size: 18px;
									font-weight: bold;
								}
								
								color: #353a3f;
							}
						}
					}
				}
			}
		}
		.bg{
			.log-bg{
				.icon{
					width: 100%;
					margin: 0;
					position: absolute;
					left: 0;
					top: -124px;
					
				}
			}
			height: 576px;
			background:url("https://cloud.localpanda.com/static/headerPhotos/LP_background.jpg") no-repeat;
			position: relative;
			background-size: cover;
			background-position: center;
		}
		
	}
	
</style>