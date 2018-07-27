<template>
	<div id="banner">
		
		<div v-swiper:swiper="swiperOptionBannerPc">
			<div class="swiper-wrapper" :class="{showbanner:showbanner}">
				<div class="swiper-slide" :key="index" v-for="(slide, index) in bannerPhotos">
					<img :src="slide.url"  />
				</div>
			</div>
			
		</div>
		<div class="swiper-button-prev swiper-button-white"></div>
    	<div class="swiper-button-next swiper-button-white"></div>
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
  props: ["bannerPhotos"],
  name: "banner",
  data() {
    return {
      swiperOptionBannerPc: {
        lazy: true,
        autoplay: true,
        delay: 3000,
        autoplayDisableOnInteraction: false,
        speed: 1000,
        loop: true,
        slidesPerView: 3,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        setWrapperSize: true,
		    initialSlide: 0,
      },
      showbanner:false
    };
  },
  components: {},
  methods: {
    
  },
  mounted: function() {
    this.showbanner = true;
  }
};
</script>
<style lang="scss" scoped>
#banner {
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .swiper-slide{
    max-width:33vw;
  }
  
}
</style>