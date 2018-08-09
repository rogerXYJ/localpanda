<template>
	<div class="chinaTour">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="banner">
			<div class="mask"></div>
			<h3>China Travel</h3>
			<div class="china_description">China is an amazing country, one that should be on every traveler’s must visit list. Few countries possess the wide variety of experiences you will find in the Middle Kingdom. As China travel experts, we provide destination tours and activities in China by streamlining booking and delivering real, memorable experiences, led by local guides.</div>
		</div>
		<div class="chinaTour_details page__container">
			<div class="nav" :class="{meauFix:showMeau}" id="nav">
				<ul class="clearfix">
					<li @click="goAnchor('top_destinations')">Top Destinations</li>
					<li @click="goAnchor('customize')">Customize My Trip</li>
					<li @click="goAnchor('firstTimer')">First-timer Trips</li>
					<li @click="goAnchor('activity')">Signature Trips</li>
					<li @click="goAnchor('oneActivity')">Family Vacations</li>
				</ul>
			</div>
			<div class="top_destinations" id="top_destinations">
				<h3>China Top Destinations</h3>
				<div class="map_cont clearfix">
					<div class="description">
						<h4>Hot Destinations</h4>
						<ul>
							<li v-for="(item,index) in mapList"  v-lazy:background-image="item.imgUrl" @mouseover="showMap(index),getInfo(index)" @mouseleave="hiddenMap(index)">
								<div class="mask"></div>
								<div class="description_cont">{{item.cont}}</div>
							</li>
							
						</ul>
					</div>
					<div class="map">
						<div class="mapitem" v-for="(item,index) in mapPosition" @click="getInfo(index)" @mouseover="showMap(index)" @mouseleave="hiddenMap(index)">
							
							<div class="position" :style="item.position">
								<div class="position_img" v-if="item.isMap" :class="{animated:item.isMap}"><img  v-lazy="item.imgUrl" /></div>
								<div class="mapCont" v-if="item.isMap">{{item.cont}}</div>
								<div class="hover"></div>
								
							</div>
							
						</div>
						<ChinaTour v-show="showInfo" :info="info" @back="setBack"></ChinaTour>
					</div>
				</div>
			</div>
		</div>
		<div class="customize" id="customize">
			<div class="customizeTrip page__container">
				<h3>First Time to China? Have No Ideas?</h3>
				<ul>
					<li v-for="item in customizeData">
						<div class="customize-item">
							<div class="imglog">
								<i class="iconfont hot" v-html="item.icon"></i>
							</div>
							<div class="des">
								<h5>{{item.title}}</h5>
								<p>{{item.des}}</p>
							</div>
						</div>

					</li>
				</ul>
				<div class="customizeBtn">
					<a href="/travel/customize/step1">Customize My Trip</a>
				</div>
			</div>

		</div>
		<div class="activity page__container">
			<div class="activityItem" :id="index==0?'firstTimer':'activity'" v-for="(item,index) in twoActivity">
				<h3>{{item.title}}</h3>
				<div class="introduced">
					<p v-for="a in item.des">{{a}}</p>
				</div>
				<div class="highlights">
					<ul>
						<li v-for="b in item.highLights">
							
							{{b}}
						</li>
					</ul>
				</div>
				<div class="acitivityList">
					<ul>
						<li v-for="(c,index) in item.activites">
							<div class="topActivity" v-if="index==0">
								<div class="top">
									<h5>{{item.dd}}</h5>
									<div class="cont">
										<a :href="c.linkUrl" target="_blank">
										<div class="activityInfo clearfix">
											
											<div class="activityPhoto"><img  v-lazy="c.activityPhoto"></div>
											<div class="activityMeg">
												<h4 class="activityTitle">{{c.title}}</h4>
												<div class="activityDuration">
													<b>{{c.duration}}</b>
													<em>|</em>
													<i>Customizable</i>
												</div>
												<div class="startFrom">
													<label>Starting from:</label>
													<span>{{c.startingFrom}}</span>
												</div>
												<div class="price">
													<b>{{c.nowPrice}} <span>{{c.oldPrice}}</span></b>
													<p>Per Person</p>
												</div>
												<div class="cities">
													<b>Cities:</b> {{c.Cities}}
												</div>
											</div>
											<div class="megRight">
												<div class="tags">
													<span v-for="(d,index) in c.tags">{{d}}</span>
												</div>
												<div class="des">{{c.des}}</div>
											</div>
										</div>
										<div class="traffic clearfix">
											<div class="trafficType">
												<div v-for="(e,index) in c.traffic" :class="{none:!e.isShow}"><i class="iconfont" v-html="e.icon"></i>
													<br/>{{e.des}}
												</div>
											</div>
											<div class="btn bag">View Details</div>
										</div>
										</a>
									</div>

								</div>
							</div>
							<div class="cont" v-else>
								<a :href="c.linkUrl" target="_blank">
								<div class="activityInfo clearfix">
									<div class="activityPhoto"><img  v-lazy="c.activityPhoto"></div>
									<div class="activityMeg">
										<h4 class="activityTitle">{{c.title}}</h4>
										<div class="activityDuration">
											<b>{{c.duration}}</b>
											<em>|</em>
											<i>Customizable</i>
										</div>
										<div class="startFrom">
											<label>Starting from:</label>
											<span>{{c.startingFrom}}</span>
										</div>
										<div class="price">
											<b>{{c.nowPrice}} <span>{{c.oldPrice}}</span></b>
											<p>Per Person</p>
										</div>
										<div class="cities">
											<b>Cities:</b> {{c.Cities}}
										</div>
									</div>
									<div class="megRight">
										<div class="tags">
											<span v-for="(d,index) in c.tags">{{d}}</span>
										</div>
										<div class="des">{{c.des}}</div>
									</div>
								</div>
								<div class="traffic clearfix">
									<div class="trafficType">
										<div v-for="(e,index) in c.traffic" :class="{none:!e.isShow}"><i class="iconfont" v-html="e.icon"></i>
											<br/>{{e.des}}
										</div>
									</div>
									<div class="btn">View Details</div>
								</div>
								</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="visitor" id="visitor">
			<div class="visitor-cont page__container">
				<h3>This is what guests are saying about our service</h3>
				<ul class="clearfix">
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Claudia.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Claudia Flores </b>
							<em>Mexico City, Mexico</em>
							<p>Local Panda had an incredible amount of attention and patience throughout my trip. I had a great tour that went way beyond my expectations.  The sites and smells of everywhere we visited around Shanghai were fantastic as well. My guide, Jamie, was nice, intelligent, great English, everything you want in a tour guide. Thanks again!!!</p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Selvarani.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Selvarani Saravanamuthu</b>
							<em> Seattle, Washington</em>
							<p>I have to say a huge thank you to Local Panda for putting together this memorable trip. The tours have been par excellence, and I can't be happy enough about it. Local Panda have provided us with a wonderful and memorable experience we will cherish forever. I will not hesitate to recommend Local Panda to my friends when they plan their trip to China.   </p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Cynthia.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Cynthia Huang</b>
							<em>Los Angeles, California</em>
							<p>Local Panda Exceeded our </br>expectations in every way. Our guide Rebecca was a Hangzhou native whose local knowledge of the city was beyond anything we could have hoped for. The personalized service sets Local Panda apart. If you want to see something, or do something off of the beaten path, they will go above and beyond to accommodate you." </p>
						</div>
					</li>
				</ul>

			</div>
		</div>
		<div class="activity page__container" id="oneActivity">
			<div class="activityItem" v-for="(item,index) in oneActivity">
				<h3>{{item.title}}</h3>
				<div class="introduced">
					<p v-for="a in item.des">{{a}}</p>
				</div>
				<div class="highlights">
					<ul>
						<li v-for="b in item.highLights">{{b}}</li>
					</ul>
				</div>
				<div class="acitivityList">
					<ul>
						<li v-for="(c,index) in item.activites">
							<div class="topActivity" v-if="index==0">
								<div class="top">
									<h5>{{item.dd}}</h5>
									<div class="cont">
										<a :href="c.linkUrl" target="_blank">
										<div class="activityInfo clearfix">
											<div class="activityPhoto"><img  v-lazy="c.activityPhoto"></div>
											<div class="activityMeg">
												<h4 class="activityTitle">{{c.title}}</h4>
												<div class="activityDuration">
													<b>{{c.duration}}</b>
													<em>|</em>
													<i>Customizable</i>
												</div>
												<div class="startFrom">
													<label>Starting from:</label>
													<span>{{c.startingFrom}}</span>
												</div>
												<div class="price">
													<b>{{c.nowPrice}} <span>{{c.oldPrice}}</span></b>
													<p>Per Person</p>
												</div>
												<div class="cities">
													<b>Cities:</b> {{c.Cities}}
												</div>
											</div>
											<div class="megRight">
												<div class="tags">
													<span v-for="(d,index) in c.tags">{{d}}</span>
												</div>
												<div class="des">{{c.des}}</div>
											</div>
										</div>
										<div class="traffic clearfix">
											<div class="trafficType">
												<div v-for="(e,index) in c.traffic" :class="{none:!e.isShow}"><i class="iconfont" v-html="e.icon"></i>
													<br/>{{e.des}}
												</div>
											</div>
											<div class="btn bag">View Details</div>
										</div>
										</a>
									</div>

								</div>
							</div>
							<div class="cont" v-else>
								<a :href="c.linkUrl" target="_blank">
								<div class="activityInfo clearfix">
									<div class="activityPhoto"><img  v-lazy="c.activityPhoto"></div>
									<div class="activityMeg">
										<h4 class="activityTitle">{{c.title}}</h4>
										<div class="activityDuration">
											<b>{{c.duration}}</b>
											<em>|</em>
											<i>Customizable</i>
										</div>
										<div class="startFrom">
											<label>Starting from:</label>
											<span>{{c.startingFrom}}</span>
										</div>
										<div class="price">
											<b>{{c.nowPrice}} <span>{{c.oldPrice}}</span></b>
											<p>Per Person</p>
										</div>
										<div class="cities">
											<b>Cities:</b> {{c.Cities}}
										</div>
									</div>
									<div class="megRight">
										<div class="tags">
											<span v-for="(d,index) in c.tags">{{d}}</span>
										</div>
										<div class="des">{{c.des}}</div>
									</div>
								</div>
								<div class="traffic clearfix">
									<div class="trafficType">
										<div v-for="(e,index) in c.traffic" :class="{none:!e.isShow}"><i class="iconfont" v-html="e.icon"></i>
											<br/>{{e.des}}
										</div>
									</div>
									<div class="btn">View Details</div>
								</div>
								</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<Foot></Foot>
		<FooterCommon></FooterCommon>
	</div>
</template>

<script>
	import Vue from 'vue'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import Foot from '~/components/FooterCommon/Foot';
	import ChinaTour from '~/components/pageComponents/travel/chinaTour';
	//import Foot from '~/components/FooterCommon/Foot';
	
	export default {
		name: 'chinaTour',
		data() {
			return {
				info:'',
				showInfo:false,
				showMeau:false,
				mapPosition:[
					{
						cont:"Great Wall",
						imgUrl:"https://cloud.localpanda.com/content/landingpage/chinatour/Location.png",
						isMap:false,
						position:{
							top:"286px",
							right:"194px"
						},
						word:"great_wall"
					},
					{
						cont:'Forbidden City',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Location.png',
						isMap:false,
						position:{
							top:"300px",
							right:"200px"
						},
						word:"forbidden_city"
					},
					{
						cont:'Bund',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Location.png',
						isMap:false,
						position:{bottom:"299px",right:"105px"},
						word:"bund"
					},
					{
						cont:'Terracotta Warriors',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Location.png',
						isMap:false,
						position:{
							top:"409px",
							right:"296px"
						},
						word:"terracotta_warriors"
					},
					{
						cont:'Panda',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Location.png',
						isMap:false,
						position:{top:"470px",right:"373px"},
						word:"giant_pandas"
					},
					{
						cont:'Leshan Giant Buddha',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Location.png',
						isMap:false,
						position:{top:"490px",right:"375px"},
						word:"leshan_giant_buddha"
					},
					{
						cont:'Jiuzhaigou',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Location.png',
						isMap:false,
						position:{top:"432px",right:"366px"},
						word:"jiuzhaigou"
					},
					{
						cont:'Guilin and Yangshuo',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Location.png',
						isMap:false,
						position:{bottom:"167px",right:"269px"},
						word:"guilin_and_yangshuo"
					},
					
					{
						cont:'Water Towns',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Location.png',
						isMap:false,
						position:{bottom:"300px",right:"125px"},
						word:"water_town"
						
					},
					{
						cont:'Hangzhou West Lake',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Location.png',
						isMap:false,
						position:{bottom:"279px",right:"127px"},
						word:"west_lake"
					},
					{
						cont:"Yellow Mountain",
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Location.png',
						isMap:false,
						position:{bottom:"275px",right:"155px"},
						word:"yellow_mountain"
						
					},
					{
						cont:"Zhangjiajie",
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Location.png',
						isMap:false,
						position:{top:"501px",right:"265px"},
						word:"zhangjiajie"
						
					},
					{
						cont:"Tibet",
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Location.png',
						isMap:false,
						position:{
							bottom:"268px",
							left:"202px"
						},
						word:"tibet"
						
					}
				
				
				],
				mapList:[
					{
						cont:"Great Wall",
						imgUrl:"https://cloud.localpanda.com/content/landingpage/chinatour/GreatWall.jpg",
						word:"great_wall"
						
					},
					{
						cont:'Forbidden City',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/ForbiddenCity.jpg',
						word:"forbidden_city"
					},
					{
						cont:'Bund',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/TheBund.jpg',
						word:"bund"
					},
					{
						cont:'Terracotta Warriors',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/TerracottaWarriors.jpg',
						word:"terracotta_warriors"
					},
					
					{
						cont:'Panda',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/GiantPandas.jpg',
						word:"giant_pandas"
					},
					{
						cont:'Leshan Giant Buddha',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/LeshanGiantBuddha.jpg',
						word:"leshan_giant_buddha"
					},
					{
						cont:'Jiuzhaigou',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Jiuzhaigou.jpg',
						word:"jiuzhaigou"
					},
					{
						cont:'Guilin and Yangshuo',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Yangshuo.jpg',
						word:"guilin_and_yangshuo"
					},
					
					{
						cont:'Water Towns',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/WaterTown.jpg',
						word:"water_town"
					},
					{
						cont:'Hangzhou West Lake',
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/WestLake.jpg',
						word:"west_lake"
					},
					{
						cont:"Yellow Mountain",
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/MountHuangshan.jpg',
						word:"yellow_mountain"
						
					},
					{
						cont:"Zhangjiajie",
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Zhangjiajie.jpg',
						word:"zhangjiajie"
						
					},
					{
						cont:"Tibet",
						imgUrl:'https://cloud.localpanda.com/content/landingpage/chinatour/Tibet.jpg',
						word:"tibet"
						
					}
				
				
				
				],
				logIn: '',
				customizeData: [
				{
						icon: "&#xe60d;",
						title: "When to Go",
						des: "Generally the comfortable seasons in major tourist areas are fall (September and October) and spring (April and May). It is recommended to avoid major Chinese public holidays, unless you want to join in some celebrations."
					},
					{
						icon: "&#xe650;",
						title: "Where to Go",
						des: "We have different itineraries to meet your various needs. Dive into Jiangnan water towns to absorb the ancient town atmosphere; visit Beijing and Xi'an to be a history fan; and hold pandas in Chengdu."
					},
					{
						icon: "&#xe674;",
						title: "How Long to Stay",
						des: "Knowing what you expect to see or do in China will help determine how long you should stay. We recommend at least 4 days. If you want to experience more or visit minority areas, you will need more time."
					},
					{
						icon: "&#xe64e;",
						title: "How to Plan a China Trip",
						des: "We understand that travel is a big decision and you will want some advice on your trip planning. If you have any questions, our professional travel consultants will always be happy to help you customize your trip."
					}

				],
				twoActivity: [{
						dd:'Summer Sales',
						title: "Immerse Yourself in China's Symbolic Sites",
						des: ["Beijing, Shanghai, Xi'an, Chengdu and Guilin are the top 5 destinations for those who have limited time and budget. Each of these cities has wonders and sights that will leave you in awe, such as the Temple of Heaven, Great Wall, Bund, Terra Cotta Warriors and Giant Pandas."
						],
						highLights: [
							"China's most iconic highlights e.g. Pandas, the bund; perfect for first-timers",
							"Experience the adventure without the stress of traveling in a foreign country",
							"Packaged deals (see product details for what's included)",
							"Flexible lengths (6, 8, 11 and 13 days)",
							"100% private and customizable (tailored to your needs; arrival/departure cities)"
						],
						activites: [{
								linkUrl:"/activity/details/11237",
								activityPhoto: "https://cloud.localpanda.com/activity/banners/11237_1106630623_U5366072.jpg",
								title: '"China Essentials: Wonders, Scenery, and Pandas" 13-Day Private Tour',
								duration: '13 Days & 12 Nights',
								nowPrice: "$1298.90",
								oldPrice: "$1532.70",
								startingFrom: "18% Off",
								Cities: "Beijing, Xi'an, Chengdu, Guilin and Shanghai",
								tags: [
									"Ancient Water Town", "Terracotta Warriors", "Leshan Giant Buddha", "Panda", "Bund", "Immersive Experience",
									"Guilin and Yangshuo", "Forbidden City"
								],
								des: "This 13-day suggested itinerary covers different elements of China: the history, heritage sites, landscape, culture, and adorable giant pandas. It makes an ideal tour for first-time ...",
								traffic: [{
										des: "Transfer",
										icon: "&#xe672;",
										isShow: true,
									},
									{
										des: "Guide",
										icon: "&#xe66e;",
										isShow: true,
									},
									{
										des: "Tickets",
										icon: "&#xe671;",
										isShow: true,
									},
									{
										des: "Meals",
										icon: "&#xe673;",
										isShow: true,
									},
									{
										des: "Flights",
										icon: "&#xe670;",
										isShow: true,
									},
									{
										des: "Bullet Train",
										icon: "&#xe66d;",
										isShow: true,
									},
									{
										des: "Hotel",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							},
							{
								linkUrl:"/activity/details/11238",
								activityPhoto: "https://cloud.localpanda.com/activity/banners/11238_1106630706.jpg",
								title: '"Classic Wonders" 11-Day Private Tour',
								duration: '11 Days & 10 Nights',
								nowPrice: "$1047.90",
								oldPrice: "$1173.65",
								startingFrom: "12% Off",
								Cities: "Beijing, Xi'an, Guilin/Yangshuo and Shanghai",
								tags: [
									"Bund", "Great Wall", "Guilin and Yangshuo", "Classic Tours", "Water town", "Terracotta Warriors", "Forbidden City"
								],
								des: "This 11-day suggested itinerary covers not only China's Golden Triangle cities – Beijing, Xi'an, and Shanghai – but also includes a classic wonder, Guilin, which keeps views of rural China as …",
								traffic: [{
										des: "Transfer",
										icon: "&#xe672;",
										isShow: true,
									},
									{
										des: "Guide",
										icon: "&#xe66e;",
										isShow: true,
									},
									{
										des: "Tickets",
										icon: "&#xe671;",
										isShow: true,
									},
									{
										des: "Meals",
										icon: "&#xe673;",
										isShow: true,
									},
									{
										des: "Flights",
										icon: "&#xe670;",
										isShow: true,
									},
									{
										des: "Bullet Train",
										icon: "&#xe66d;",
										isShow: true,
									},
									{
										des: "Hotel",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							},
							{
								linkUrl:'/activity/details/11239',
								activityPhoto: "https://cloud.localpanda.com/activity/banners/11239_1106630708.jpg",
								title: '"Ancient and Modern China" 8-Day Private Tour',
								duration: '8 Days & 7 Nights',
								nowPrice: "$757.00",
								oldPrice: "$847.84",
								startingFrom: "12% Off",
								Cities: "Beijing, Xi’an and Shanghai",
								tags: [
									"Bund", "Terracotta Warriors", "Most Symbolic Sites", "Great Wall", "Water town", "Forbidden City"
								],
								des: "This 8-day suggested itinerary covers major popular destinations in China and makes an ideal tour for first-time visitors. Enjoy five Chinese World Heritage sites in 8 days.",
								traffic: [{
										des: "Transfer",
										icon: "&#xe672;",
										isShow: true,
									},
									{
										des: "Guide",
										icon: "&#xe66e;",
										isShow: true,
									},
									{
										des: "Tickets",
										icon: "&#xe671;",
										isShow: true,
									},
									{
										des: "Meals",
										icon: "&#xe673;",
										isShow: true,
									},
									{
										des: "Flights",
										icon: "&#xe670;",
										isShow: true,
									},
									{
										des: "Bullet Train",
										icon: "&#xe66d;",
										isShow: false,
									},
									{
										des: "Hotel",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							},
							{
								linkUrl:'/activity/details/11240',
								activityPhoto: "https://cloud.localpanda.com/activity/banners/11240_1106630710.jpg",
								title: '"Highlights Explosion" 6-Day Private Tour',
								duration: '6 Days & 5 Nights',
								nowPrice: "$454.00",
								oldPrice: "$508.48",
								startingFrom: "12% Off",
								Cities: "Beijing and Shanghai",
								tags: [
									"Bund", "First Timer’s Choice", "Packaged Pricing", "Great Wall", "Water town", "Forbidden City"
								],
								des: "This 6-day suggested itinerary covers China's capital city – Beijing, and a metropolitan city- Shanghai, as well as another beautiful Jiangnan city. It is a good reference for first-time …",
								traffic: [{
										des: "Transfer",
										icon: "&#xe672;",
										isShow: true,
									},
									{
										des: "Guide",
										icon: "&#xe66e;",
										isShow: true,
									},
									{
										des: "Tickets",
										icon: "&#xe671;",
										isShow: true,
									},
									{
										des: "Meals",
										icon: "&#xe673;",
										isShow: true,
									},
									{
										des: "Flights",
										icon: "&#xe670;",
										isShow: true,
									},
									{
										des: "Bullet Train",
										icon: "&#xe66d;",
										isShow: false,
									},
									{
										des: "Hotel",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							}

						],
					},
					{
						dd:'Best Seller',
						title: "See China's Stunning Landscapes",
						des: ["If you want to get off the beaten track and really immerse yourself in everything that China has to offer, then these trips are for you. To really appreciate China, you often have to look past it's biggest cities, and experience some of the most breathtaking landscapes in the world, such as Zhangjiajie “Avatar Mountains,” Tibet, Yellow Mountain, and Yangtze River Delta Water Towns. With the best of China's cities and nature to experience, you'll fly home with a head full of knowledge, a heart full of unique experiences, and a memory full of unforgettable moments."],
						highLights: [
							"Amazing natural landscapes and cultural wonders",
							"Breathtakingly beautiful sites - a stunning, unforgettable experience guaranteed",
							"Go beyond the touristy destinations to really immerse yourself in China (moderately challenging)",
							"Packaged deals (see product details for inclusions)",
							"Flexible lengths ( 8, 11 and 13 days)",
							"100% private and customizable (tailored to your needs; arrival/departure cities)"
						],
						activites: [{
								linkUrl:'/activity/details/11241',
								activityPhoto:"https://cloud.localpanda.com/activity/banners/11241_1106630829.jpg",
								title: '"China Scenery and Floating Mountains" 11-Day Private Tour',
								duration: '11 Days & 10 Nights',
								nowPrice: "$1384.90",
								oldPrice: "$1551.09",
								startingFrom: "12% Off",
								Cities: "Beijing, Xi'an, Zhangjiajie and Shanghai",
								tags: [
									"Floating Mountains", "Great Wall", "Grand Canyon Glass Bridge", "Watertowns", "Avatar Movie Scene", "Terracotta Warriors",
									"Guilin and Yangshuo", "Forbidden City"
								],
								des: "Pandora is far, but Zhangjiajie is near. Movie Avatar makes the floating Hallelujah Mountain famous, so Zhangjiajie becomes popular among westerners in recent years.",
								traffic: [{
										des: "Transfer",
										icon: "&#xe672;",
										isShow: true,
									},
									{
										des: "Guide",
										icon: "&#xe66e;",
										isShow: true,
									},
									{
										des: "Tickets",
										icon: "&#xe671;",
										isShow: true,
									},
									{
										des: "Meals",
										icon: "&#xe673;",
										isShow: true,
									},
									{
										des: "Flight",
										icon: "&#xe670;",
										isShow: true,
									},
									{
										des: "Bullet Train",
										icon: "&#xe66d;",
										isShow: true,
									},
									{
										des: "Hotel",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							},
							{
								linkUrl:'/activity/details/11251',
								activityPhoto: "https://cloud.localpanda.com/activity/banners/11251_1106699508_U5848932.jpg",
								title: '"Beautiful China and Holy Tibet" 13-Day Private Tour',
								duration: '13-Day Private Tour',
								nowPrice: "$1895.90",
								oldPrice: "$2123.41",
								startingFrom: "12% Off",
								Cities: "Beijing, Xi'an, Tibet, Chengdu and Shanghai",
								tags: [
									"Water town", "Great Wall", "Natural Beaty", "Moderately Challenging", "Tibet", "Leshan Giant Buddha", "Panda", "Terracotta Warriors"
								],
								des: "This 11-day suggested itinerary covers not only China's Golden Triangle cities – Beijing, Xi'an, and Shanghai – but also includes a classic wonder, Guilin, which keeps views of rural China as …",
								traffic: [{
										des: "Transfer",
										icon: "&#xe672;",
										isShow: true,
									},
									{
										des: "Guide",
										icon: "&#xe66e;",
										isShow: true,
									},
									{
										des: "Tickets",
										icon: "&#xe671;",
										isShow: true,
									},
									{
										des: "Meals",
										icon: "&#xe673;",
										isShow: true,
									},
									{
										des: "Flight",
										icon: "&#xe670;",
										isShow: true,
									},
									{
										des: "Bullet Train",
										icon: "&#xe66d;",
										isShow: true,
									},
									{
										des: "Hotel",
										icon: "&#xe66f;",
										isShow: true,
									},

								]
							},
							{
								linkUrl:'/activity/details/11242',
								activityPhoto: "https://cloud.localpanda.com/activity/banners/11242_1106630830.jpg",
								title: '"Riches of China and Yangtze River Delta" 13-Day Private Tour',
								duration: '13 Days & 12 Nights',
								nowPrice: "$1394.00",
								oldPrice: "$1561.28",
								startingFrom: "12% Off",
								Cities: "Beijing, Xi'an, Tibet, Chengdu and Shanghai",
								tags: [
									"Natural Beauty", "Bund", "Terracotta Warriors", "West Lake", "Culture Wonders", "Guilin/Yangshuo", "Great Wall"
								],
								des: "This 13-day suggested itinerary covers not only China's Golden Triangle cities – Beijing, Xi'an, and Shanghai – but also includes a classic wonder, Guilin, which keeps views of rural China as …",
								traffic: [{
										des: "Transfer",
										icon: "&#xe672;",
										isShow: true,
									},
									{
										des: "Guide",
										icon: "&#xe66e;",
										isShow: true,
									},
									{
										des: "Tickets",
										icon: "&#xe671;",
										isShow: true,
									},
									{
										des: "Meals",
										icon: "&#xe673;",
										isShow: true,
									},
									{
										des: "Flight",
										icon: "&#xe670;",
										isShow: true,
									},
									{
										des: "Bullet Train",
										icon: "&#xe66d;",
										isShow: true,
									},
									{
										des: "Hotel",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							},
							{
								linkUrl:'/activity/details/11245',
								activityPhoto: "https://cloud.localpanda.com/activity/banners/11245_1106630831.jpg",
								title: '"Yangtze River Delta and Yellow Mountain" 8-Day Private Tour',
								duration: '8 Days & 7 Nights',
								nowPrice: "$696.90",
								oldPrice: "$780.53",
								startingFrom: "12% Off",
								Cities: "Shanghai, Suzhou, Hangzhou and Yellow Mountain",
								tags: [
									"Water town", "Yellow Mountain", "Hangzhou and West Lake", "Amazing Natural Scene", "Bund", "Venice of the East"
								],
								des: "This 8-day suggested itinerary covers the scenic spots in beautiful Jiangnan and Yellow Mountain. You will visit Jiangnan cities, including Shanghai,Suzhou and Hangzhou Yellow ject …",
								traffic: [{
										des: "Transfer",
										icon: "&#xe672;",
										isShow: true,
									},
									{
										des: "Guide",
										icon: "&#xe66e;",
										isShow: true,
									},
									{
										des: "Tickets",
										icon: "&#xe671;",
										isShow: true,
									},
									{
										des: "Meals",
										icon: "&#xe673;",
										isShow: true,
									},
									{
										des: "Flight",
										icon: "&#xe670;",
										isShow: true,
									},
									{
										des: "Bullet Train",
										icon: "&#xe66d;",
										isShow: true,
									},
									{
										des: "Hotel",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							}

						],

					}

				],
				oneActivity: [{
					dd:"Traveler's Choice",
					title: "Build Lasting Memories with Your Family",
					des: ["A great family trip is about more than visiting the famous sites. At local panda we believe that the unforgettable family bonding moments happen when you get hands-on and experience the culture directly as a family. That's why we've filled our family-friendly tours with unique cultural experiences that create genuine interactions with Chinese culture as well as one another. Whether it's learning how to make dumplings, painting a Peking opera mask, crafting Terra-cotta Warriors figurines, your trip will be loaded with local cultural activities and amazing experiences that are guaranteed to make your trip fun and special."],
					highLights: [
						"Trips suitable for all ages, both relaxing and full of new experiences",
						"Couple / family friendly",
						"Experience the adventure without the stress of traveling in a foreign country",
						"Packaged deals (see product details for inclusions)",
						"Flexible lengths (11 and 13 days)",
						"100% private and customizable (tailored to your needs; arrival/departure cities)"
					],
					activites: [{
							linkUrl:'/activity/details/11246',
							activityPhoto: "https://cloud.localpanda.com/activity/banners/11246_1106630921.jpg",
							title: '"The Pursuit of Happiness" 11-Day Private Tour',
							duration: '11 Days & 10 Nights',
							nowPrice: "$1147.90",
							oldPrice: "$1285.65",
							startingFrom: "12% Off",
							Cities: "Beijing, Xi'an, Guilin and Shanghai",
							tags: [
								"DIY Dumplings", "Guilin/Yangshuo", "Paint Opera Mask", "Roast Duck", "Terracotta Warriors", "Relaxing"
							],
							des: "Designed for a family with teenagers and young kids, this 11-day tour includes the most classic destinations and unique family-friendly activities in each city. The tour balances the …",
							traffic: [{
									des: "Transfer",
									icon: "&#xe672;",
									isShow: true,
								},
								{
									des: "Guide",
									icon: "&#xe66e;",
									isShow: true,
								},
								{
									des: "Tickets",
									icon: "&#xe671;",
									isShow: true,
								},
								{
									des: "Meals",
									icon: "&#xe673;",
									isShow: true,
								},
								{
									des: "Flight",
									icon: "&#xe670;",
									isShow: true,
								},
								{
									des: "Bullet Train",
									icon: "&#xe66d;",
									isShow: true,
								},
								{
									des: "Hotel",
									icon: "&#xe66f;",
									isShow: false,
								},

							]
						},
						{	
							linkUrl:'/activity/details/11247',
							activityPhoto: "https://cloud.localpanda.com/activity/banners/11247_1106630922.jpg",
							title: '"China Full Immersion" 13-Day Private Tour',
							duration: '13 Days & 12 Nights',
							nowPrice: "$1448.90",
							oldPrice: "$1622.77",
							startingFrom: "12% Off",
							Cities: "Beijing, Xi'an, Chengdu, Guilin/Yangshuo and Shanghai",
							tags: [
								"Bund", "Great Wall", "DIY Dumplings", "Make Warriors Figurines", "Deep Experience", "Guilin/Yangshuo","Panda","Roast Duck"
							],
							des: "This 13-day suggested itinerary covers different elements of China: the history, heritage sites, landscape, culture, and adorable giant pandas. It makes an ideal tour for first-time …",
							traffic: [{
									des: "Transfer",
									icon: "&#xe672;",
									isShow: true,
								},
								{
									des: "Guide",
									icon: "&#xe66e;",
									isShow: true,
								},
								{
									des: "Tickets",
									icon: "&#xe671;",
									isShow: true,
								},
								{
									des: "Meals",
									icon: "&#xe673;",
									isShow: true,
								},
								{
									des: "Flight",
									icon: "&#xe670;",
									isShow: true,
								},
								{
									des: "Bullet Train",
									icon: "&#xe66d;",
									isShow: true,
								},
								{
									des: "Hotel",
									icon: "&#xe66f;",
									isShow: false,
								},

							]
						},
					]
				}, 
				]
			}
		},
		components: {
			HeaderCommon,
			FooterCommon,
			Foot,
			ChinaTour
		},
		head(){
			let title="Our Private China Trips | Local Panda";
			let keywords="china tours, china trips, china travel, china package tours, china vacation, china holiday packages, China travel agencies";
			let description="Local Panda has expertly designed the best private, packaged trips and personalized vacations, including all of China's top locations like Beijing, shanghai, Xi'an, Hangzhou, Chengdu, Tibet, guilin, yellow mountain, and more!";
			return {
				title: title,
				meta: [{
						hid: "keywords",
						name: "keywords",
						content: keywords
					},
					{
						hid: "description",
						name: "description",
						content: description
					}
				]
			}
			
		},
		methods: {
			showMap(index){
				this.mapPosition[index].isMap=true
				
			},
			hiddenMap(index){
				this.mapPosition[index].isMap=false
			},
			scorllBar(){
				var top_destinations=document.getElementById("top_destinations");
				var top=top_destinations.offsetTop;
				if(window.scrollY >top){
					this.showMeau=true
				}else{
					this.showMeau=false
				}
			},
			setBack(val){
				this.info=val.info
				this.showInfo=val.show
			},
			getInfo(index){
				this.mapPosition[index].isMap=true
				let that=this
				that.showInfo=true
				console.log(that.mapList[index].word)
				that.axios.get("https://api.localpanda.com/api/content/landingpage/chinatour/"+that.mapList[index].word).then(function(res){
					console.log(res)
					that.info=res.data
				},function(res){})
			},
			goAnchor(selector) {
				var anchor = document.getElementById(selector)
				var t=document.getElementById("nav").offsetHeight;
				
				document.documentElement.scrollTop =anchor.offsetTop-t-50
				document.body.scrollTop =anchor.offsetTop-t-50
			},
			
		},
		watch:{
//			showInfo:function(val,oldVal){
//				if(val){
//				 document.getElementsByTagName("body")[0].style.overflowY="hidden"	
//				}else{
//					document.getElementsByTagName("body")[0].style.overflowY="inherit"	
//				}
//			}
		},
		mounted: function() {
			window.addEventListener("scroll", this.scorllBar);
			
			
			
			this.logIn = window.localStorage.getItem("logstate");

		}
	}
</script>
<style lang="scss">
	//@import '~/assets/scss/_main.scss';
	//@import '~/assets/font/iconfont.css';
.chinaTour{
	div::-webkit-scrollbar { width: 8px; }
	div::-webkit-scrollbar-track { background-color: #eeeeee;  border-radius: 4px; }
	div::-webkit-scrollbar-thumb { border-radius: 4px;  background-color: #f4b33f; }
}
</style>
<style lang="scss" scoped>
	//@import '~/assets/scss/base/_setting.scss';
	
	.animated {
		-webkit-animation-duration: 1s;
		animation-duration: 1s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		-webkit-animation-name: signIn;
		animation-name: signIn;
	}
	
	@-webkit-keyframes signIn {
		from {
			-webkit-transform: scale3d(2, 2, 2);
			transform: scale3d(2, 2, 2);
			opacity: 0.2;
		}
		50% {
			opacity: 1;
			-webkit-transform: scale3d(1, 1, 1);
			transform: scale3d(1, 1, 1);
		}
	}
	
	@keyframes signIn {
		from {
			-webkit-transform: scale3d(2, 2, 2);
			transform: scale3d(2, 2, 2);
			opacity: 0.2;
		}
		50% {
			opacity: 1;
			-webkit-transform: scale3d(1, 1, 1);
			transform: scale3d(1, 1, 1);
		}
	}
	
	.meauFix{
		position: fixed;
		background: #fff!important;
		width: 1170px!important;
		animation: fadein 0.3s ease-in-out forwards;
		transform: translateY(-100%);
		top: 0;
		padding-top: 18px;
		z-index: 40;
	}
	@keyframes fadein{
		0%{
			transform: translateY(-100%);
		}
		100%{
			transform: translateY(0);
		}
	}	
	
	.page__container {
		width: 1170px;
		margin: 0 auto;
	}
	.mask {
			position: absolute;
			left: 0;
			top: 0;
			min-width: 100%;
			min-height: 100%;
			background: rgba(0, 0, 0, 0.3);
		}
		.description_cont{
			position: relative;
			z-index: 20;
		}
	
	.chinaTour {
		.banner {
			height: 500px;
			background: url("https://cloud.localpanda.com/content/landingpage/chinatour/Banner.jpg") no-repeat;
			background-size: cover;
			background-position: center;
			position: relative;
			
			h3 {
				padding-top: 50px;
				font-size: 86px;
				color: #fff;
				font-family: "pacifico";
				position: relative;
				z-index: 2;
				text-align: center;
			}
			.china_description {
				width: 992px;
				background-color: rgba(0, 0, 0, .2);
				font-size: 20px;
				margin: 0 auto;
				position: relative;
				z-index: 2;
				color: #fff;
				padding: 20px;
			}
		}
		.chinaTour_details {
			padding: 50px 0 40px;
			.nav {
				border-bottom: 1px solid #dde0e0;
				width: 100%;
				ul {
					li {
						float: left;
						padding: 0 30px 18px;
						font-size: 20px;
						color: #878e95;
						cursor: pointer;
						&:hover {
							color: #1bbc9d;
						}
					}
				}
			}
			.top_destinations {
				margin-top: 40px;
				h3 {
					font-size: 26px;
					font-weight: bold;
				}
				.map_cont {
					margin-top: 26px;
					height: 753px;
					.description {
						width: 334px;
						background: #faf9f8;
						float: left;
						height: 705px;
						padding: 24px;
						overflow-y: auto;
						h4 {
							font-size: 18px;
						}
						ul {
							margin-top: 12px;
							li {
								width: 326px;
								height: 70px;
								margin-bottom: 6px;
								cursor: pointer;
								text-align: center;
								color: #fff;
								font-size: 16px;
								font-weight: bold;
								line-height: 70px;
								transition: .3s transform;
								position:relative;
								&:hover {
									transform: scaleX(1.09);
								}
							}
						}
					}
					.map {
						background: url("https://cloud.localpanda.com/content/landingpage/chinatour/Map.jpg") no-repeat;
						background-size: cover;
						background-position: center;
						float: right;
						width: 788px;
						height: 753px;
						position: relative;
						.mapitem{
							
							
							.position{
								.hover{
									width:20px;
									height: 20px;
									position: absolute;
									left: 50%;
									top: 50%;
									transform: translate(-10px,-10px);
									cursor: pointer;
								}
								
								position: absolute;
								width: 8px;
								height: 8px;
								border-radius: 50%;
								background:#fe483e;
								.position_img{
									position: absolute;
									top: -66px;
									left: -26px;
								}
								.mapCont{
									position: absolute;
									bottom: -35px;
									left:50%;
									transform:translateX(-50%);
									font-size: 20px;
									white-space:nowrap;
									
								}
							}
						}
						
						
					}
				}
			}
		}
		.customize {
			background: #faf9f8;
			.customizeTrip {
				padding: 40px 0;
				h3 {
					font-size: 26px;
					font-weight: bold;
				}
				ul {
					padding-top: 58px;
					display: flex;
					box-sizing: content-box;
					li {
						flex-shrink: 0;
						width: 270px;
						margin-right: 30px;
						.customize-item {
							.imglog {
								width: 80px;
								height: 80px;
								background-color: #faf9f8;
								margin: 0 auto;
								text-align: center;
								line-height: 80px;
								position: relative;
								&:before {
									position: absolute;
									content: "";
									display: block;
									width: 80px;
									height: 40px;
									padding: 2px;
									padding-bottom: 0;
									box-sizing: border-box;
									border-top-left-radius: 40px;
									border-top-right-radius: 40px;
									background: -webkit-gradient( linear, left top, right top, color-stop(0, #faf9f8), color-stop(1, #faf9f8)), -webkit-gradient( linear, left top, right top, color-stop(0, #009efd), color-stop(1, #1bbc9d));
									background-clip: content-box, padding-box;
								}
								&:after {
									top: 40px;
									position: absolute;
									content: "";
									display: block;
									width: 80px;
									height: 40px;
									padding: 2px;
									padding-top: 0;
									box-sizing: border-box;
									border-bottom-left-radius: 40px;
									border-bottom-right-radius: 40px;
									background: -webkit-gradient( linear, left top, right top, color-stop(0, #faf9f8), color-stop(1, #faf9f8)), -webkit-gradient( linear, left top, right top, color-stop(0, #009efd), color-stop(1, #1bbc9d));
									background-clip: content-box, padding-box;
								}
								i {
									position: relative;
									z-index: 2;
									font-size: 40px;
									&.hot {
										background-image: -webkit-linear-gradient(135deg, #009efd, #1bbc9d);
										-webkit-text-fill-color: transparent;
										-webkit-background-clip: text;
									}
								}
							}
							.des {
								margin-top: 24px;
								h5 {
									font-size: 24px;
									font-weight: bold;
									text-align: center;
								}
								p {
									font-size: 16px;
									width: 250px;
									text-align: center;
									line-height: 20px;
									margin: 20px auto 0;
								}
							}
						}
						&:first-child {
							.customize-item {
								.des {
									p {
										width: 270px;
									}
								}
							}
						}
					}
				}
				.customizeBtn {
					width: 422px;
					height: 48px;
					margin: 34px auto 0;
					background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%), linear-gradient( #1bbc9d, #1bbc9d);
					background-blend-mode: normal, normal;
					border-radius: 23px;
					line-height: 48px;
					a {
						display: block;
						color: #fff;
						text-align: center;
						font-size: 18px;
						font-weight: bold;
					}
				}
			}
		}
		.activity {
			padding-bottom: 40px;
			.activityItem {
				margin-top: 40px;
			}
			h3 {
				font-size: 26px;
				font-weight: bold;
			}
			.introduced {
				margin-top: 6px;
				p {
					font-size: 16px;
				}
			}
			.highlights {
				padding: 20px;
				background: #faf9f8;
				border-radius: 6px;
				margin-top: 20px;
				ul {
					li {
						font-size: 16px;
						color: #1bbc9d;
						line-height: 21px;
						position: relative;
						padding-left: 12px;
						&:after {
							content: "";
							position: absolute;
							width: 4px;
							height: 4px;
							background: #1bbc9d;
							left: 0;
							top: 8px;
							border-radius: 50%;
						}
					}
				}
			}
			.cont {
				background: #fff;
				border-radius: 6px;
				padding: 12px;
				background-color: #ffffff;
				box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
			}
			/** 公共list **/
			.activityInfo {
				padding-bottom: 16px;
				position: relative;
				.activityPhoto {
					float: left;
					width: 274px;
					height: 183px;
					img {
						width: 100%;
						height: 100%;
						border-radius: 6px;
					}
				}
				.activityMeg {
					float: left;
					margin-left: 16px;
					h4 {
						font-size: 16px;
						font-weight: bold;
					}
					;
					.activityDuration {
						margin-top: 14px;
						font-size: 14px;
						b {
							color: #ee7000;
						}
						em {
							margin: 0 9px;
							color: #ebebeb;
							display: inline-block;
						}
						i {
							color: #878e95;
							font-style: normal;
							font-weight: bold;
						}
					}
					.startFrom {
						margin-top: 14px;
						label {
							color: #878e95;
							font-size: 14px;
						}
						span {
							padding: 5px 10px;
							background: #1bbc9d;
							border-radius: 13px;
							font-size: 12px;
							color: #fff;
							display: inline-block;
							margin-left: 23px;
						}
					}
					.price {
						margin-top: 10px;
						b {
							font-size: 26px;
							color: #52b589;
							span {
								font-size: 12px;
								color: #353a3f;
								font-weight: normal;
								text-decoration: line-through;
							}
						}
						p {
							font-size: 14px;
							color: #878e95;
						}
					}
					.cities {
						margin-top: 20px;
						b {
							font-size: 14px;
						}
						font-size:14px;
					}
				}
				.megRight {
					position: absolute;
					width: 550px;
					top:24px;
					right: 0;
					.tags {
						text-align: right;
						span {
							padding: 5px 10px;
							border-radius: 13px;
							border: solid 1px #99a1a8;
							display: inline-block;
							margin-left: 8px;
							margin-top: 8px;
							&:first-child {
								margin-left: 0;
							}
						}
					}
					.des {
						font-size: 14px;
						color: #878e95;
						width: 390px;
						margin-top: 34px;
						float: right;
						padding-right: 18px;
					}
				}
			}
			.traffic {
				position: relative;
				.trafficType {
					padding-top: 16px;
					border-top: 1px solid #ebebeb;
					div {
						text-align: center;
						display: inline-block;
						margin-left: 30px;
						i {
							font-size: 20px;
							margin-top: 6px;
						}
					}
					.none{
						color: #dde0e0;
					}
				}
				.btn {
					width: 241px;
					height: 38px;
					text-align: center;
					line-height: 38px;
					border-radius: 20px;
					background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%);
					color: #fff;
					font-size: 16px;
					font-weight: bold;
					position: absolute;
					top: 16px;
					right: 0;
				}
				.bag {
					background: #fe483e!important;
				}
			}
			.acitivityList {
				ul {
					li {
						margin-top: 23px;
						.topActivity {
							background: #fe483e;
							border-radius: 6px;
							padding: 3px;
							.top {
								h5 {
									height: 48px;
									line-height: 48px;
									font-size: 16px;
									padding-left: 11px;
									color: #fff;
								}
							}
						}
					}
				}
			}
		}
		.visitor {
			background: #faf9f8;
			padding: 40px 0;
			.visitor-cont {
				h3 {
					font-size: 26px;
					font-weight: bold;
				}
				ul {
					margin-top: 54px;
					li {
						width: 30%;
						float: left;
						margin-right: 5%;
						&:last-child {
							margin-right: 0;
						}
						.visitor-headPic {
							width: 146px;
							height: 146px;
							margin: 0 auto;
							img {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						.visitor-message {
							b {
								display: block;
								font-size: 20px;
								margin-top: 24px;
							}
							em {
								display: block;
								font-size: 16px;
								font-weight: bold;
								margin: 4px 0 12px;
							}
							p {
								font-size: 16px;
							}
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>