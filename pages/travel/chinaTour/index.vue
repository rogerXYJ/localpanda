<template>
	<div class="chinaTour">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="banner">
			<div class="mask"></div>
			<h3>China Travel</h3>
			<div class="china_description">China is an amazing country, one that should be on every traveler’s must visit list. Few countries possess the wide variety of experiences you will find in the Middle Kingdom. As China travel experts, we provide destination tours and activities in China by streamlining booking and delivering real, memorable experiences, led by local guides.</div>
		</div>
		<div class="chinaTour_details page__container">
			<div class="nav">
				<ul class="clearfix">
					<li>Top Destinations</li>
					<li>First Timer Trips</li>
					<li>Landmarks Tours</li>
					<li>Family Vacations</li>
				</ul>
			</div>
			<div class="top_destinations">
				<h3>China Top Destinations</h3>
				<div class="map_cont clearfix">
					<div class="description">
						<h4>Hot Destination</h4>
						<ul>
							<li v-for="(item,index) in mapList" :style="{backgroundImage:'url(' + item.imgUrl + ')'}">
								<div class="mask"></div>
								<div class="description_cont">{{item.cont}}</div>
							</li>
							
						</ul>
					</div>
					<div class="map">
						<div class="position" :style="{ top: mapStyle.top }"></div>
						<div class="position_img"><img src="https://resource.localpanda.cn/content/landingpage/chinatour/Location.jpg" /></div>
						<div class="mapCont">{{mapCont}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="customize">
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
					<a href="/travel/customize/step1">Customize My Tirp</a>
				</div>
			</div>

		</div>
		<div class="activity page__container">
			<div class="activityItem" v-for="(item,index) in twoActivity">
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
									<h5>Summer Sales</h5>
									<div class="cont">
										<div class="activityInfo clearfix">
											<div class="activityPhoto"><img :src="c.activityPhoto"></div>
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
													<p>Per Person on twin sharing</p>
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
									</div>

								</div>
							</div>
							<div class="cont" v-else>
								<div class="activityInfo clearfix">
									<div class="activityPhoto"><img :src="c.activityPhoto"></div>
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
											<p>Per Person on twin sharing</p>
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
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="visitor">
			<div class="visitor-cont page__container">
				<h3>This is what guests are saying about our service</h3>
				<ul class="clearfix">
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://resource.localpanda.cn/static/content/reviews/Claudia.jpg'" />
						</div>
						<div class="visitor-message">
							<b>Claudia Flores </b>
							<em>Mexico City, Mexico</em>
							<p>Local Panda had an incredible amount of attention and patience throughout my trip. I had a great tour that went way beyond my expectations. The sites and smells of everywhere we visited around Shanghai were fantastic as well. My guide, Jamie, was nice, intelligent, great English, everything you want in a tour guide. Thanks again!!!</p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://resource.localpanda.cn/static/content/reviews/Selvarani.jpg'" />
						</div>
						<div class="visitor-message">
							<b>Selvarani Saravanamuthu</b>
							<em> Seattle, Washington</em>
							<p>I have to say a huge thank you to Local Panda for putting together this memorable trip. The tours have been par excellence, and I can't be happy enough about it. Local Panda have provided us with a wonderful and memorable experience we will cherish forever. I will not hesitate to recommend Local Panda to my friends when they plan their trip to China. </p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://resource.localpanda.cn/static/content/reviews/Cynthia.jpg'" />
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
		<div class="activity page__container">
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
									<h5>Summer Sales</h5>
									<div class="cont">
										<div class="activityInfo clearfix">
											<div class="activityPhoto"><img :src="c.activityPhoto"></div>
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
													<p>Per Person on twin sharing</p>
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
									</div>

								</div>
							</div>
							<div class="cont" v-else>
								<div class="activityInfo clearfix">
									<div class="activityPhoto"><img :src="c.activityPhoto"></div>
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
											<p>Per Person on twin sharing</p>
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
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<FooterCommon></FooterCommon>
	</div>
</template>

<script>
	import Vue from 'vue'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	//import Foot from '~/components/FooterCommon/Foot';
	
	export default {
		name: 'chinaTour',
		data() {
			return {
				mapCont:'',
				mapStyle:{
					top:'',
					left:'',
				},
				mapList:[
					{
						cont:"Great Wall",
						imgUrl:"https://resource.localpanda.cn/content/landingpage/chinatour/TheGreatWall.jpg",
						style:{
							top:'288px',
							right:'184px',
						}
						
					},
					{
						cont:'Forbidden City',
						imgUrl:'https://resource.localpanda.cn/content/landingpage/chinatour/TheForbiddenCity.jpg'
					},
					{
						cont:'Terracotta Warriors',
						imgUrl:'https://resource.localpanda.cn/content/landingpage/chinatour/TerracottaWarriors.jpg'
					},
					{
						cont:'Panda',
						imgUrl:'https://resource.localpanda.cn/content/landingpage/chinatour/Panda.jpg'
					},
					{
						cont:'Leshan Giant Buddha',
						imgUrl:'https://resource.localpanda.cn/content/landingpage/chinatour/LeshanGiantBuddha.jpg'
					},
					{
						cont:'Jiuzhaigou',
						imgUrl:'https://resource.localpanda.cn/content/landingpage/chinatour/Jiuzhaigou.jpg'
					},
					{
						cont:'Guilin and Yangshuo',
						imgUrl:'https://resource.localpanda.cn/content/landingpage/chinatour/Guilin_Yangshuo.jpg'
					},
					{
						cont:'Bund',
						imgUrl:'https://resource.localpanda.cn/content/landingpage/chinatour/TheBund.jpg'
					},
					{
						cont:'Water Town',
						imgUrl:'https://resource.localpanda.cn/content/landingpage/chinatour/WaterTown.jpg'
					},
					{
						cont:'Hangzhou West Lake',
						imgUrl:'https://resource.localpanda.cn/content/landingpage/chinatour/Hangzhou_WestLake.jpg'
					},
					{
						cont:"Yellow Mountain",
						imgUrl:'https://resource.localpanda.cn/content/landingpage/chinatour/MountHuangshan.jpg'
						
					},
					{
						cont:"Zhangjiajie",
						imgUrl:'https://resource.localpanda.cn/content/landingpage/chinatour/Zhangjiajie.jpg'
						
					},
					{
						cont:"Tibet",
						imgUrl:'https://resource.localpanda.cn/content/landingpage/chinatour/Tibet.jpg'
						
					}
				
				
				
				],
				logIn: '',
				customizeData: [{
						icon: "&#xe60d;",
						title: "When to Go",
						des: "Generally the comfortable seasons in major tourist areas are fall(September and October) and spring(April and May). It is recommended to avoid major Chinese public holidays, unless you want to join in some celebrations."
					},
					{
						icon: "&#xe650;",
						title: "Where to go",
						des: "We have different itineraries to meet your various needs. Dive into Jiangnan water towns to absorb the ancient town atmosphere; visit Beijing and Xi’an to be a history fan; and hold pandas in Chengdu."
					},
					{
						icon: "&#xe674;",
						title: "How long to stay",
						des: "Knowing what you expect to see or do in China will help determine how long you should stay. We recommend at least 4 days. If you want to experience more or visit minority areas, you will need more time."
					},
					{
						icon: "&#xe64e;",
						title: "How to Plan a China Trip",
						des: "We understand that travel is a big decision and you will want some advice on your trip planning. If you have any questions, our professional travel consultants will always be happy to help you customize your trip."
					}

				],
				twoActivity: [{
						title: "Immerse in China’s Most Symbolic Sites",
						des: ["Beijing, Shanghai, Xi’an, Chengdu and Guilin are the most popular cities among those who come visit China.",
							"The gorgeous Temple of Heaven, the Great Wall, Terra Cotta Worriers and Pandas made those cities top 5 must-visit stops in China!"
						],
						highLights: [
							"Most symbolic China highlights e.g. Pandas, the bund; perfect for first-timers",
							"Tours with light-intensity activities",
							"Packaged pricing (all domestic transportation, entrance tickets, 5-star hotels, private guide service, pick-ups included)",
							"Flexible lengths (5 days, 6-8 days, 11-13 days)",
							"Private tours (tailored to your need; arrival/departure cities can be adjusted)"
						],
						activites: [{
								activityPhoto: "",
								title: '"China Essence and Panda" 13-Day Private Tour',
								duration: '13 Days & 12 Nights',
								nowPrice: "$1348.90",
								oldPrice: "$1551.09",
								startingFrom: "18% Off",
								Cities: "Beijing & Xi'an & Chengdu & Guilin & Shanghai",
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
										des: "Upto 4",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							},
							{
								activityPhoto: "",
								title: '"Classic Wonders" 11-Day Private Tour',
								duration: '11 Days & 10 Nights',
								nowPrice: "$1047.90",
								oldPrice: "$1173.65",
								startingFrom: "12% Off",
								Cities: "Beijing & Xi’an & Guilin/Yangshuo & Shanghai",
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
										des: "Upto 4",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							},
							{
								activityPhoto: "",
								title: '"Old and New China" 8-Day Private Tour',
								duration: '8 Days & 7 Nights',
								nowPrice: "$757.00",
								oldPrice: "$847.84",
								startingFrom: "12% Off",
								Cities: "Beijing & Xi’an & Shanghai",
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
										des: "Upto 4",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							},
							{
								activityPhoto: "",
								title: '"Highlights Explosion" 6-Day Private Tour',
								duration: '6 Days & 5 Nights',
								nowPrice: "$508.48",
								oldPrice: "$847.84",
								startingFrom: "12% Off",
								Cities: "Beijing & Shanghai",
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
										des: "Upto 4",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							}

						],
					},
					{

						title: "See China’s Majestic Beauty",
						des: ["If you want to explore China in depth, there many things that you cannot miss e.g. the Avatar Hallelujah Mountain. Come to Zhangjiajie, Tibet, Yellow ", "Mountain, Jiangnan Watertowns, see the best and the hidden gems of China and leave with a head full of knowledge and a heart full of unique memories."],
						highLights: [
							"Amazing natural scenes and cultural wonders ",
							"Breathtakingly beautiful sites - a shocking and unforgettable experience guaranteed ",
							"Journey with moderately challenging activities",
							"Packaged pricing (see product details for inclusions)",
							"Flexible lengths ( 8, 11, 13 days)",
							"Private tours (tailored to your need; arrival/departure cities can be adjusted)"
						],
						activites: [{
								activityPhoto: "",
								title: '"China Essence and Floating Mountains" 11-Day Private Tour',
								duration: '11 Days & 10 Nights',
								nowPrice: "$1348.90",
								oldPrice: "$1551.09",
								startingFrom: "12% Off",
								Cities: "Beijing & Xi'an & Zhangjiajie & Shanghai",
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
										des: "Upto 4",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							},
							{
								activityPhoto: "",
								title: '"Beautiful China and Holy Tibet" 13-Day Private Tour',
								duration: '13-Day Private Tour',
								nowPrice: "$1895.90",
								oldPrice: "$2124.41",
								startingFrom: "12% Off",
								Cities: "Beijing & Xi'an & Tibet & Chengdu & Shanghai",
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
										des: "Upto 4",
										icon: "&#xe66f;",
										isShow: true,
									},

								]
							},
							{
								activityPhoto: "",
								title: '"Riches of China and Jiangnan" 13 Day Private Tour',
								duration: '13 Days & 12 Nights',
								nowPrice: "$1394.00",
								oldPrice: "$1561.28",
								startingFrom: "12% Off",
								Cities: "Beijing & Xi'an & Tibet & Chengdu & Shanghai",
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
										des: "Upto 4",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							},
							{
								activityPhoto: "",
								title: '"Beautiful Jiangnan and Yellow Mountain" 8-Day Private Tour',
								duration: '8 Days & 7 Nights',
								nowPrice: "$696.90",
								oldPrice: "$780.53",
								startingFrom: "12% Off",
								Cities: "Shanghai & Suzhou & Hangzhou & Yellow Mountain",
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
										des: "Upto 4",
										icon: "&#xe66f;",
										isShow: false,
									},

								]
							}

						],

					}

				],
				oneActivity: [{

					title: "Harvest Happiness in Ancient China",
					des: ["If there are more chances to immerse with the local culture throughout the journey of visiting landmarks, such as learning to make different shapes of", "dumplings, painting a Peking opera mask, craft Terra-cotta Warriors figurines, you will load your trip with more local knowledge and amazing experiences."],
					highLights: [
						"Tours suit both old and young generation, relaxing yet full of new experiences",
						"Couple/ family friendly",
						"Journey with light-intensity activities",
						"Packaged pricing (see product details for inclusions)",
						"Flexible lengths ( 11 or 13 days)",
						"Private tours (tailored to your need; arrival/departure cities can be adjusted)"
					],
					activites: [{
							activityPhoto: "",
							title: '"The Pursuit of Happiness" 11-Day Private Tour',
							duration: '11 Days & 10 Nights',
							nowPrice: "$1147.90",
							oldPrice: "$1285.65",
							startingFrom: "12% Off",
							Cities: "Beijing & Xi'an & Guilin & Shanghai",
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
									des: "Upto 4",
									icon: "&#xe66f;",
									isShow: false,
								},

							]
						},
						{
							activityPhoto: "",
							title: '"Happy Vacation" 13-Day Private Tour',
							duration: '13 Days & 12 Nights',
							nowPrice: "$1448.90",
							oldPrice: "$1622.77",
							startingFrom: "12% Off",
							Cities: "Beijing & Xi'an & Chengdu & Guilin/Yangshuo & Shanghai",
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
									des: "Upto 4",
									icon: "&#xe66f;",
									isShow: false,
								},

							]
						},
					]
				}, ]
			}
		},
		components: {
			HeaderCommon,
			FooterCommon,
			//Foot
		},
		methods: {

		},
		mounted: function() {
			this.logIn = window.localStorage.getItem("logstate");

		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
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
	.description::-webkit-scrollbar { width: 8px; }
	.description::-webkit-scrollbar-track { background-color: #eeeeee;  border-radius: 4px; }
	.description::-webkit-scrollbar-thumb { border-radius: 4px;  background-color: #f4b33f; }
	.chinaTour {
		.banner {
			height: 500px;
			background: url("https://resource.localpanda.cn/content/landingpage/chinatour/Banner.jpg") no-repeat;
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
			padding: 50px 0 80px;
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
				margin-top: 80px;
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
						background: url("https://resource.localpanda.cn/content/landingpage/chinatour/Map.jpg") no-repeat;
						background-size: cover;
						background-position: center;
						float: right;
						width: 788px;
						height: 753px;
					}
				}
			}
		}
		.customize {
			background: #faf9f8;
			.customizeTrip {
				padding: 53px 0;
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
			padding-bottom: 80px;
			.activityItem {
				margin-top: 79px;
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
							padding: 5px;
							background: #1bbc9d;
							border-radius: 9px;
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
					.tags {
						text-align: right;
						margin-top: 24px;
						span {
							padding: 5px 10px;
							border-radius: 10px;
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
			padding: 80px 0;
			.visitor-cont {
				h3 {
					font-size: 18px;
					text-align: center;
				}
				ul {
					margin-top: 34px;
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