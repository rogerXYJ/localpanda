<template>
	<div id="menu">
			<div class="menu_list">
				<ul class="clearfix">
					<li v-if="highlights&&highlights.length>0" @click="goAnchor('heightLights')">What to Expect</li>
					<!--<li v-if="photoList.length>0" @click="goAnchor('photoList')">Moments in Travel</li>-->
					<li @click="goAnchor('journey')">Itinerary</li>
					<li v-if="(exclusions&&exclusions.length>0)||(inclusions&&inclusions.length>0)" @click="goAnchor('provide')">Inclusions & Exclusions</li>
					<li v-if="travelersReviews.entities&&travelersReviews.entities.length>0&&!ABtest || travelersReviews.entities&&travelersReviews.entities.length>0 && ABtest && userABtestID%2==0" @click="goAnchor('review')">Reviews</li>
					<!--<li v-if="exclusions" @click="goAnchor('exclusions')">Exclusions</li>-->
					<!--<li v-if="notice.length>0" @click="goAnchor('notice')">Additional Info</li>-->
					<!--<li v-if="picInfo.priceInstructions" @click="goAnchor('PriceNote')">Price Note</li>-->
					<li v-if="picInfo.refundInstructions" @click="goAnchor('CancellationPolicy')">Rescheduling & Cancellation</li>
					<li v-if="picInfo.details.length>0" @click="goAnchor('picDetails')">Price Details</li>
					<!--<li @click="goAnchor('notes')">Notes</li>-->
					
					<!--<li v-if="recommed.length>0"@click="goAnchor('recommend')">Similar Experiences</li>-->
				</ul>
			</div>
		</div>
</template>

<script>
		export default {
		props:[
		'inclusions',
		'highlights',
		'notice',
		'exclusions',
		'picInfo',
		'photoList',
		"recommed",
		"travelersReviews",
		"userABtestID",
		"ABtest"

		
		],
		name: "menuType",
		data() {
			return {
			}

		},
		components: {
			
		},
		methods: {
			goAnchor(selector) {
				console.log(this.exclusions)
				var anchor = document.getElementById(selector)
				document.body.scrollTop = anchor.offsetTop+document.getElementById("banner").offsetHeight+60-76
				document.documentElement.scrollTop =anchor.offsetTop+document.getElementById("banner").offsetHeight+60-76
			},
		},
		
	}	
</script>

<style lang="scss">
	#menu {
			position: relative;
			.menu_list {
				animation: fadein 0.3s ease-in-out forwards;
				transform: translateY(-100%);
				background: #fff!important;
				width: 100%;
				height: 76px;
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				position: fixed;
				top: 0;
				z-index: 999;
				ul {
					width: 1170px;
					position: fixed;
					left: 0;
					right: 0;
					top: 0;
					z-index: 99999;
					margin: 0 auto;
					li {
						float: left;
						line-height: 76px;
						font-size: 16px;
						margin-right: 24px;
						cursor: pointer;
						position:relative;
						&:hover{
							color: #1bbc9d;
							&:after{
								content: "";
								position: absolute;
								width: 100%;
								height: 3px;
								background:#1bbc9d;
								bottom:0;
								left: 0;
							}
						}
					}
					li:nth-last-child(1){
						margin-right: 0;
					}
				}
				@keyframes fadein{
					0%{
						transform: translateY(-100%);
					}
					100%{
						transform: translateY(0);
					}
				}
			}
		}
</style>