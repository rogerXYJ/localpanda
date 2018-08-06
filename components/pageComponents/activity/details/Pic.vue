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
								<img v-lazy="i.url" />
							</div>					
						</div>
					</div>
				
					<div v-swiper:swiperThumbs="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(i,index) in photoList" :class="index==0?'imgActive':''">
								<img :src="i.url" />
							</div>
							
						</div>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
		name: "pic",
		data() {
			var self = this;
			return {
				alertPicActive: false,
				swiperOptionTop: {
					//initialSlide:4,
					navigation : {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},
					
					 lazy: {
						loadPrevNext: true,
					},
					on: {
						slideChangeTransitionStart: function(){
							var activeIndex = this.activeIndex;
							console.log(this.activeIndex)
							
							self.swiperThumbs.slideTo(activeIndex);
							//return
							var list = self.swiperThumbs.$el[0].getElementsByClassName('swiper-slide');
							for(var i=0;i<list.length;i++){
								if(i==this.activeIndex){
									list[i].className = 'swiper-slide swiper-slide-visible imgActive';
								}else{
									list[i].className = list[i].className.replace(/imgActive/,'');
								}
							}
						}
					}
							
				},
				swiperOptionThumbs: {
					lazy: {
						loadPrevNext: true,
					},
					//initialSlide :"2",
					watchSlidesProgress : true,
					watchSlidesVisibility : true,
					slidesPerView : 5,
					on:{
						tap: function(e){
							self.swiperTop.slideTo(this.clickedIndex);
							var list = this.$el[0].getElementsByClassName('swiper-slide');
							for(var i=0;i<list.length;i++){
								if(i==this.clickedIndex){
									list[i].className = 'swiper-slide swiper-slide-visible imgActive';
								}else{
									list[i].className = list[i].className.replace(/imgActive/,'');
								}
								
							}
						}
					}
						
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
			// that.$nextTick(function(){
			// 	const swiperTop = that.swiperTop;
			// 	const swiperThumbs = that.swiperThumbs;
			// 	// swiperTop.controller.control = swiperThumbs
			// 	// swiperThumbs.controller.control = swiperTop
			// })
			
				
		},
		props: ['alertPicStatus','photoList',"index"]
	}
</script>

<style lang="scss" scoped>
	//@import '~/assets/scss/base/_setting.scss';
	@import "~assets/scss/base/_animate.scss";
	.alertPicOuter {
		background: rgba(0, 0, 0, 0.8);
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
			//background: #7F828B;
			
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
					text-align: center;
					overflow: hidden;
			       img{
					    height: 92px;	
					    }
			       
			    }
			    .gallery-thumbs .imgActive {
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