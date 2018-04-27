<script>
export default {
		name: "pic",
		data() {
			return {
				alertPicActive: "",
				 swiperOptionTop: {
			          spaceBetween: 10,
			          loop:this.photoList.length>=6?true:false,
			          loopedSlides: this.photoList.length>=6?this.photoList.length:null,
			          navigation: {
			            nextEl: '.swiper-button-next',
			            prevEl: '.swiper-button-prev'
					  }
					},
			        swiperOptionThumbs: {
			          spaceBetween: 10,
			          slidesPerView:"6",
			          touchRatio: 0.5,
			          loop:true,
			          loop:this.photoList.length>=6?true:false,
			          loopedSlides: this.photoList.length>=6?this.photoList.length:null,
			          
			           
			        }
			      
			}
		},
		methods: {
			next(){
				
			},
			cancle() {
				this.$emit('alert-call-back', false);
				this.alertPicActive = false;
			}
			

		},
		watch: {
			alertPicStatus: function(val, oldVal) {
				if(val) {
					this.alertPicActive = true;
				} else {
					this.alertPicActive = false;
				}
			}
		},
		mounted:function() {
			let that=this
			that.$nextTick(function(){
		        const swiperTop = that.swiperTop;
		        const swiperThumbs = that.swiperThumbs;
		        swiperTop.controller.control = swiperThumbs
        		swiperThumbs.controller.control = swiperTop
		      })
				
		},
		props: ['alertPicStatus','photoList']
	}
</script>
<template>
	<div id="pic" v-bind:class="['alertPicOuter',alertPicActive ? 'on' : 'off']">
		<div class="false" @click="cancle"><i class="iconfont">&#xe606;</i></div>
		
			 
			<div v-bind:class="{'boxshow animated zoomIn' : alertPicActive , 'boxshow animated zoomOut' : !alertPicActive}">
				<div class="conter">
					 <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
	        		<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
					<div v-swiper:swiperTop="swiperOptionTop" class="gallery-top" ref="swiperTop">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="i in photoList">
								<img :src="i.url" />
							</div>	
								
						</div>	
					</div>
				
					<div v-swiper:swiperThumbs="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="i in photoList">
								<img :src="i.url" />
							</div>
							
						</div>
					</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	@import "~assets/scss/base/_animate.scss";
	.alertPicOuter {
		background: rgba(0, 0, 0, 0.5);
		height: 100%;
		width: 100%;
		position: fixed;
		z-index: 999999999999999999;
		top: 0;
		left: 0;
		&.on {
			display: block;
		}
		&.off {
			display: none;
		}
		.conter{
			width: 860px;
			overflow: hidden;
			.swiper-button-next{
				right: -60px;
			}
			.swiper-button-prev{
				left: -60px;
			}
		}
		.boxshow {
			
			/*height: 4.4rem;*/
			background: #7F828B;
			
			position: absolute;
			height: 700px;
			left: 50%;
			top: 50%;
			margin: -350px 0 0 -430px;
				
			 .swiper-container {
			        width: 100%;
			        height: 300px;
			        margin-left: auto;
			        margin-right: auto;
			   }
			    .gallery-top {
			        height: 574px;
			        width: 100%;
			    	.swiper-slide{
			    		height: 574px;
			    		text-align: center;
					    overflow: hidden;
			    		img{
			    			height: 100%;
			    		}
			    	}
			    }
			    .gallery-thumbs {
			        height: 92px;
			        box-sizing: border-box;
			        margin-top: 26px;
			    }
			    .gallery-thumbs .swiper-slide {
			        height: 100%;
			        width: 138px;
			        opacity: 0.4; 
					overflow: hidden;  
			       img{
					    height: 92px;	
					    }
			       
			    }
			    .gallery-thumbs .swiper-slide-active {
			        opacity: 1;
			    }
			   
		}
		.false {
			&:hover {
				cursor: pointer;
			}
			i {
				font-size: 36px;
				color: #fff;
			}
			position: absolute;
			right: 40px;
			top: 31px;
		}
	}
</style>
<style lang="scss">

</style>