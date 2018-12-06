<template>
	<div class="banner">
		
		<div v-swiper:mySwiper="swiperOptionBannerPc">
	    <div class="swiper-wrapper">

				
				<div class="swiper-slide">
	        <a href="/product/phone/details/">
						<div class="imgBanner" :style="{background:'url(https://cloud.localpanda.com/pandaphone/phonebanner.jpg)'}">
							<div class="ADpandaPhone" @click.stop="showPandaPhone">
								<!-- <img v-lazy="'https://cloud.localpanda.com/pandaphone/ad_detail.jpg'" width="100%" alt=""> -->
								<div class="pandaPhone_box">
									<h2>Unlock China with the Panda Phone</h2>
									<p>All-in-one Rental Mobile Travel Assistant</p>
									<ul>
										<li><i class="iconfont">&#xe654;</i>Smart Phone with Mainland China Number</li>
										<li><i class="iconfont">&#xe654;</i>Travel & Emergency Help at Your Fingertips  </li>
										<li><i class="iconfont">&#xe654;</i>4G Wireless Data, Unlimited Calling & Texts</li>
										<li><i class="iconfont">&#xe654;</i>VPN - Access Blocked Websites Like Google</li>
									</ul>
									<p class="p2">Rental starting at $10</p>
								</div>
							</div>
						</div>
					</a>
	      </div>

				<div class="swiper-slide">
	        <a href="/travel/customize/step1">
						<div class="imgBanner" :style="{background:'url(https://cloud.localpanda.com/static/homePage/banner3.jpg)'}">
							<p class="banner_tit_s">With Local Panda</p>
							<h3>BY YOU. / FOR YOU.</h3>
							<p>Choose your cities, match your dates, design your own bespoke journey</p>
							<span class="banner_btn">Build Your Adventure</span>
						</div>
					</a>
	      </div>
				<!-- <div class="swiper-slide">
	        <a href="/activity/details/11201">
						<div class="imgBanner" :style="{background:'url(https://cloud.localpanda.com/static/homePage/banner4.jpg)'}">
							<p class="banner_tit_s">Looking for adventure on a budget?</p>
							<h3 class="txtUppercase">Small group cultural experiences</h3>
							<p>Explore Shanghai’s Yu Garden and experience an authentic Chinese tea ceremony with a local guide</p>
							<span class="banner_btn">Book Now</span>
						</div>
					</a>
	      </div> -->

	      <div class="swiper-slide">
	        <a href="/activity/list/Beijing">
						<div class="imgBanner" :style="{background:'url(https://cloud.localpanda.com/static/homePage/banner1.jpg)'}">
							<span class="banner_tag">Beijing Tours</span>
						</div>
						<div class="text">
							<p>Guides, Tours, and Activities</p>
							<p>It's your China adventure, led by locals</p>
						</div>
						
					</a>
	      </div>
				<div class="swiper-slide">
	        <a href="/activity/list/Shanghai">
						<div class="imgBanner" :style="{background:'url(https://cloud.localpanda.com/static/homePage/banner2.jpg)'}">
							<span class="banner_tag">Shanghai Tours</span>
						</div>
						<div class="text">
							<p>Guides, Tours, and Activities</p>
							<p>It's your China adventure, led by locals</p>
						</div>
						
					</a>
	      </div>
				
	    </div>
	    <div class="swiper-pagination"></div>
			<div class="swiper-button-prev swiper-button-white"></div><!--左箭头-->
    	<div class="swiper-button-next swiper-button-white"></div><!--右箭头-->
	  </div>
		
	</div>

</template>
<script>
	import bus from '~/assets/js/pages/bus.js'
	if (process.browser){
	  	const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  		bus.use(VueAwesomeSwiper)
	  	require('swiper/dist/css/swiper.css')
	};
	export default {
		
		name: "banner",
		data() {
			return {
				swiperOptionBannerPc: {
					lazy: {
					    loadPrevNext: true,
					  },
					autoplay: {
						 disableOnInteraction: false,
						 delay: 6000,
					},
					speed:1000,
					loop:true,
					pagination: {
					el:'.swiper-pagination',
						clickable :true,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					effect : 'fade',
					paginationClickable :true,
					
					
				},
				deviceWidth:null,
				swiperSlides: [
					{
						url: "https://cloud.localpanda.com/static/homePage/banner1.jpg",
						link:'/activity/recommend/Beijing/Popular-and-Classic-Tours',
						loc:'Beijing Tours'
						
						
					},
					{
						url:"https://cloud.localpanda.com/static/homePage/banner2.jpg",
						link:'/activity/recommend/Shanghai/Popular-and-Classic-Tours',
						loc:'Shanghai Tours'
					}
					
				]
			}

		},
		components: {
			
		},
		methods: {
			
		},
		created(){
		
		}
	}
</script>
<style lang="scss">

.swiper-pagination-bullet-active {
		background:#fff;
		width: 10px;
		height: 10px;
		border:2px solid #1bbc9d!important;
		background:#fff!important;;
		
		
		
		}
		

	.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
		bottom: 20px!important;
	}

	.swiper-pagination-bullet{
			margin:0 2.5px!important;
			border:2px solid #fff;
			opacity: 1!important;
			width: 10px;
			height: 10px;
			background: transparent;
			
	}
	
</style>
<style lang="scss" scoped>
	//@import '~/assets/scss/base/_setting.scss';
	.banner {
		
		
		
		position: relative;
		.imgBanner{
			width:100%;
			height:500px;
			color: #fff;
			background-size: cover!important;
			background-position:center!important;
			text-align: center;	
			.banner_tag{
				position: absolute;
				right: 20px;
				bottom:25px;
				
				color: #fff;
				font-size: 18px;
				
				
			}

			.banner_tit_s{
				text-shadow:0 5px 10px rgba(0,0,0,0.5);
				padding-top: 130px;
				font-size:24px;
			}
			h3{
				font-size:50px;
				font-weight: bold;
				text-shadow:0 5px 10px rgba(0,0,0,0.5);
			}
			.txtUppercase{
				text-transform: uppercase;
			}
			p{
				font-size:24px;
				text-shadow:0 5px 10px rgba(0,0,0,0.5);
			}
			.banner_btn{
				display: inline-block;
				width: 268px;
				height: 56px;
				line-height: 56px;
				font-size:18px;
				margin-top: 60px;
				background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%), 
				linear-gradient(#1bbc9d, #1bbc9d);
				background-blend-mode: normal, normal;
				border-radius: 28px;
			}
		}

		
		.text{
			height:112px;
			width:830px;
			position: absolute;
			z-index:100;
			left:50%;
			top:50%;
			transform: translate(-50%,-50%);
			p{
				text-align: center;
				font-weight: bold;
				font-size: 50px;
				color:#fff;
				text-shadow :2.5px 2.5px 10px rgba(0,0,0,.3);
				&:last-child{
					padding-top: 0;
					font-size: 24px;
					margin-top: 10px;
					
					
				}
			}
		}

		.ADpandaPhone{
			position: relative;
			img{
				vertical-align: top;
			}
			.pandaPhone_box{
				width: 850px;
				margin: 0 auto;
				color: #fff;
				text-shadow:0 5px 10px rgba(0,0,0,0.3);
				// background-color: rgba(0, 0, 0, 0.3);
				padding-top: 125px;
				h2{
					
					font-size: 50px;
					font-weight: bold;
					text-align: center;
				}
				p{
					margin-top: 15px;
					font-size: 30px;
					text-align: center;
				}
				ul{
					margin-top: 10px;
					padding-left: 20px;
					overflow: hidden;
					li{
						font-size: 16px;
						width: 50%;
						float: left;
						margin-top: 10px;
						text-align: left;
						i{
							font-size: 12px;
							float: left;
							margin-top: 4px;
							margin-right: 10px;
						}
					}
				}
				.p2{
					font-size:26px;
					margin-top: 26px;
				}
			}
		}

	}
	
</style>