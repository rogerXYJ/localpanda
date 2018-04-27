<template>
	<div class="banner">
		
		<div v-swiper:mySwiper="swiperOptionBannerPc">
	    <div class="swiper-wrapper">
	      <div class="swiper-slide" v-for="(slide,index) in swiperSlides" :key="index">
	        <a :href="slide.link">
				<div class="imgBanner" :style="{background:'url('+slide.url+')'}">
					
					<span>{{slide.loc}}</span>
				</div>
				
			</a>
	      </div>
	    </div>
	    <div class="swiper-pagination"></div>
	  </div>
		<div class="text">
			<p>Guides, Tours, and Activities</p>
			<p>It's your China adventure, led by locals</p>
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
					lazy: true,
					autoplay: {
						 disableOnInteraction: false,
					},
					speed:1000,
					loop:true,
					pagination: {
						el:'.swiper-pagination',
						clickable :true,
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
	@import "~assets/scss/base/_setting.scss";
	.banner {
		
		
		
		position: relative;
		.imgBanner{
			width:100%;
			height:500px;
			
			background-size: cover!important;
			background-position:center!important;
			text-align: center;	
			span{
				position: absolute;
				right: 20px;
				bottom:25px;
				
				color: #fff;
				font-size: 18px;
				
				
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
	}
	
</style>