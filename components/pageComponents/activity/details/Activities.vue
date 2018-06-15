<template>
	<div id="activities">
		<div class="activitiesDel">
			<div class="activitiesInfo">
				<div class="linkseting">
					<div class="linkinfo">
						<a href="/">Home</a>
						<em class="iconfont">&#xe64a;</em>
						<a v-if="destination=='Xi\'an'" href="/activity/list/Xian">Xi'an Activities</a>
						<a v-else :href="'/activity/list/'+destination">{{destination}} Activities</a>

						<em class="iconfont">&#xe64a;</em>
						<span>Activity Details</span>
					</div>
				</div>
				<div class="tags clearfix">
					<span class="tag">{{detail.category}}</span>
					<em class="productId">Product ID: {{detail.activityId}}</em>
				</div>
				<div class="activitiyTitle">
					<h3>{{detail.title}}</h3>
					<div class="types">
						<a v-for="i in detail.tourTypes" :href="returnUrl(i)"><span >{{i}}</span></a>
					</div>
				</div>
				<ul class="description clearfix">
					<li>
						<label class="iconfont">&#xe653;</label>
						<span>Mode: {{detail.trafficType}}</span>
					</li>
					<li>
						<label class="iconfont">&#xe624;</label>
						<span>Duration: {{detail.duration}} {{detail.durationUnit|firstUpperCase}}</span>
					</li>
					<li>
						<label class="iconfont" style="font-size: 20px;">&#xe652;</label>
						<span v-if="picInfo.minParticipants==picInfo.maxParticipants">Participants: {{picInfo.minParticipants}}</span>
						<span v-else>Participants: {{picInfo.minParticipants}} - {{picInfo.maxParticipants}}</span>
					</li>
				</ul>
				<div class="languages clearfix">

					<label class="iconfont">&#xe627;<em>Languages: </em></label>
					<span> English, French, Spanish, Russian, German, Japanese, Korean</span>
				</div>
				<div class="location clearfix">
					<label class="iconfont" style="font-size: 20px;">&#xe610;<em>Location:</em></label>
					<span>{{destinations}}</span>
				</div>
				<p class="says">{{detail.recommendedReason}}</p>
				<div class="heightLights" id="heightLights">
					<p :key="index" class="clearfix" v-for="(item,index) in highlights"><i class="iconfont">&#xe654;</i><span>{{item}}</span></p>

				</div>
				<div class="journey" id="journey" ref="journey">
					<div class="expect">
						<h3>What You Can Expect</h3>
						<p v-if="introduction.length==1">{{introduction[0]}}</p>
						<div class="introduction" :class="{'overflow':isShowView}" v-if="introduction.length>1">
							<p v-if="isShowView==false">{{introduction[0]}}</p>
							<p :key="index" v-else v-for="(j,index) in introduction">{{j}}</p>
						</div>
						<div v-if="introduction.length>1&&isShowView==false" class="viewMore" @click="showVeiwMore()">View more</div>
					</div>
					<ul>
						<li :key="index" v-for="(i,index) in detail.itineraries">
							<div class="item_v clearfix" v-if="i.photoUrl">
								<div class="contTitle">
									<h3>{{i.title}}</h3>
									<p><img v-lazy="i.photoUrl" /><span v-html="i.description.replace(/\r|\n/g,'<br/>')"></span></p>
									
								</div>
								<!--<div class="cont">
									
								</div>-->

							</div>
							<div class="item clearfix" v-else>
								<div class="cont_title" id="aa">{{i.title}}</div>
								<div class="cont"  v-html="i.description.replace(/\r|\n/g,'<br/>')"></div>
							</div>
						</li>
					</ul>

				</div>
				 <div class="notes" v-if="photoList.length>0" @click="showPhoto" id="photoList">
					<h3>Pictures of our travelers</h3>
					<div class="photoCover" v-lazy:background-image="photoList.length>0?photoList[0].url:''">
						<div class="mask"></div>
						<div class="cover">
							<h4>Check out our customers' travel experiences with us!</h4>
							<button>Have a look</button>
						</div>
					</div>

				</div>
				<div class="provide" v-if="picInfo.details.length>0" id="picDetails">
					<h3>Price Details</h3>
					<p style="font-size: 16px;margin-top: 10px;" v-if="picInfo.childDiscount">Children's price is   $  {{returnFloat(picInfo.childDiscount)}} USD  less than adults’ price.</p>
					<el-table :data="sixArr" stripe style="width: 100%">
						<el-table-column prop="capacity" label="Number of people" width="244.6" align="center">
							<template slot-scope="scope">
								<span v-if="scope.row.capacity==1">1 person</span>
								<span v-else>{{scope.row.capacity}} people</span>
							</template>
						</el-table-column>
						<el-table-column prop="price" label="Total cost" width="244.6" align="center">
							<template slot-scope="scope">
								<span>{{nowExchange.symbol}} {{returnFloat(scope.row.price)}} {{nowExchange.code}}</span>
							</template>
						</el-table-column>
						<!-- <el-table-column prop="chlidenNumb" label="Number of people" width="183">
							<template slot-scope="scope">
								<div v-show="scope.row.right.capacity">
									<span>{{scope.row.right.capacity}} people</span>
								</div>
							</template>
						</el-table-column> -->
						<el-table-column prop="childenTotal" label="Price per person" width="245" align="center">
							<template slot-scope="scope">
								<div v-show="scope.row.capacity">
									<span>{{nowExchange.symbol}} {{returnFloat(scope.row.price/scope.row.capacity)}} {{nowExchange.code}}</span>
								</div>
							</template>
						</el-table-column>
					</el-table>
					<div class="view" v-if="isShowTable" @click="showTable">View More</div>
					<p class="picNote" v-if="picInfo.priceInstructions">{{picInfo.priceInstructions}}</p>
				</div>
				<div class="provide" id="provide">
					<h3>What's Included?</h3>
					<ul v-if="itemsIncluded">
						<li :key="index" v-for="(item,index) in itemsIncluded">{{item}}</li>
					</ul>
					<ul v-if="inclusions">
						<li :key="index" v-for="(item,index) in inclusions">
							<h5>{{item.title}}</h5>
							<p v-if="item.content" v-html="item.content"></p>
						</li>
					</ul>
				</div>
				<div class="provide" v-if="exclusions" id="exclusions">
					<h3>Exclusions</h3>
					<ul>
						<li :key="index" v-for="(item,index) in exclusions">
							<h5>{{item.title}}</h5>
							<p v-if="item.content" v-html="item.content"></p>
						</li>
					</ul>
				</div>
				<div class="notes" v-if="notice.length>0" id="notice">
					<h3>Additional Info</h3>
					<p v-for="(item,index) in notice" :key="index">{{item}}</p>
				</div>
				<!--<div class="notes"  id="PriceNote">
					<h3>Price Note</h3>
					
				</div>-->
				<div class="notes" v-if="picInfo.refundInstructions" id="CancellationPolicy">
					<h3>Rescheduling and Cancellation Policy</h3>
					<p v-html="picInfo.refundInstructions.replace(/\r\n/g,'<br/>')"></p>
				</div>
				<div class="notes" id="notes" v-if="remark.length>0">
					<h3>Notes</h3>
					<p v-if="remark" :key="index" v-for="(item,index) in remark">{{item}}</p>
					<!--<p v-if="detail.venues" :key="index" v-for="(i,index) in detail.venues">{{i}}</p>-->
				</div>
				
			</div>

			<div class="recommend" id="recommend" v-if="recommed.length>0">
				<h3>Similar Experiences</h3>
				<ul class="clearfix">
					<li :key="index" v-for="(i,index) in recommed">
						<a :href="'	/activity/details/'+i.activityId">
							<div class="activity-pic">
								<img v-lazy="i.coverPhotoUrl">
							</div>
							<div class="activity-cont">
								<div class="activity-info clearfix">
									<div class="activity-cont-type"><i class="iconfont">&#xe653;</i>{{i.category}}{{i.groupType?' · '+i.groupType:''}}</div>
									
								</div>

								<h4 style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">{{i.title}}</h4>
								<div class="duration"><i class="iconfont">&#xe624;</i>Duration: {{i.duration}} {{i.durationUnit|firstUpperCase}}</div>
								<div class="pic">
									<div class="old-pic" v-if="i.originalPrice">${{returnFloat(i.originalPrice)}}</div>
									<div class="current-price">From<b>${{returnFloat(i.bottomPrice)}}</b><span>  pp</span></div>
								</div>
							</div>
						</a>
					</li>

				</ul>
			</div>
			<div class="book">
				<div :class="{'position':isShowBookNow}">
					<div class="boxshowdow">
						<div class="bookbox">
							<div class="picPp clearfix">
								<div class="picLeft">
									From <span>{{nowExchange.symbol}}{{returnFloat(picInfo.originalPrice)}}</span>
									<b>{{nowExchange.symbol}}{{returnFloat(picInfo.bottomPrice)}}</b> pp
								</div>
								<div class="picRight" @mouseover="showNode" @mouseleave="hidden">
									<select class="currency_type" @change="changeCurrency">
										<option :value="item.code" v-for="item in exchange" :key="item.code">{{item.code}}</option>
									</select>
									<span class="iconfont">&#xe666;</span>
								</div>
								<!-- <div class="priceNote" v-if="isShowPicNode">
									<h4>Price Note</h4>
									<p>Price is in USD and calculated based on the number of people in your tour group and the vehicle required.</p>
								</div> -->

							</div>
							<div class="selectBox">
								<div class="select clearfix">
									<div class="selectDate" :class="picInfo.departureTime?'':'long'">
										<b>Date</b>
										<!--<flatPickr placeholder="Date" v-model="dateTime" :config="options"></flatPickr>-->
										<input id="js_changetime" readonly v-model="dateTime" type="text" placeholder="Date">
									</div>
									<div class="selectTime" v-if="picInfo.departureTime">
										<b>Time</b>
										<div class="time" @click.stop="showTime">
											<input readonly="readonly" v-model="time" />
											<i class="iconfont" v-if="!isShowTime">&#xe60f;</i>
											<i class="iconfont" v-else>&#xe63f;</i>
											<div v-if="isShowTime" @click.stop="showTime" class="timeList">
												<ul>
													<li :key="index" v-for="(item,index) in picInfo.departureTime" @click.stop="confirmTime(index)">{{item}}</li>

												</ul>
											</div>
										</div>

									</div>
								</div>
								<div class="selectPepole">
									<b>Guests</b>
									<div class="Guests" @click.stop="showAdults">
										<!--<input class="people" readonly="readonly" v-model="people" />-->
										<div class="people" v-if="children==0&&adults==0">{{people}}</div>
										<div class="people" v-if="children==0&&adults==1">{{people}} Person</div>
										<div class="people" v-if="children>0||adults>1">{{people}} People</div>

										<i class="iconfont" v-if="!isShowAdults">&#xe60f;</i>
										<i class="iconfont" v-else>&#xe63f;</i>
										<!--<p v-if="isSelectDate" style="margin-top: 10px; font-size: 12px; color:red;">{{dateErrText}}</p>-->
										<p style="margin-top: 10px; font-size:12px;color:red;" v-if="error">{{dateErrText}}</p>
										<!--<p style="margin-top: 10px;color:#353a3f;font-size:12px;opacity: .5;" v-if="!error&&!isSelectDate">{{dateErrText}}</p>-->

										<div class="choose" v-if="isShowAdults">
											<div class="adults clearfix">
												<b>Adults</b>
												<div class="selectAdults">
													<em class="iconfont color" v-if="adults>1" @click.stop="del(0)">&#xe64d;</em>
													<em class="iconfont" v-else>&#xe64d;</em>
													<input readonly v-model="adults" />
													<em class="iconfont" v-if="(children+adults)>=picInfo.maxParticipants">&#xe64b;</em>
													<em class="iconfont color" v-else @click.stop="add(0)">&#xe64b;</em>
												</div>
											</div>
											<div class="children clearfix">
												<div class="years">
													<b>Children</b>
													<span v-if="picInfo.childStandard">{{picInfo.infantStandard}} - {{picInfo.childStandard}} years</span>
												</div>
												
												<div class="selectAdults">
													<em class="iconfont color" v-if="children>0" @click.stop="del(1)">&#xe64d;</em>
													<em class="iconfont" v-else>&#xe64d;</em>
													<input readonly v-model="children" />
													<em class="iconfont" v-if="(children+adults)>=picInfo.maxParticipants">&#xe64b;</em>
													<em class="iconfont color" v-else @click.stop="add(1)">&#xe64b;</em>
												</div>
											</div>
											<div class="children clearfix">
												<div class="years">
													<b>Babies</b>
													<span>Final headcount does not include babies</span>
												</div>
												
												<div class="selectAdults">
													<em class="iconfont color" v-if="infant>0" @click.stop="del(3)">&#xe64d;</em>
													<em class="iconfont" v-else>&#xe64d;</em>
													<input readonly v-model="infant" />
													<em class="iconfont color" v-if="infant<picInfo.maxParticipants-1" @click.stop="add(3)">&#xe64b;</em>
													<em class="iconfont" v-else>&#xe64b;</em>
												</div>
											</div>
											<!--<p style="margin-top: 10px; font-size:12px;color:red;" v-if="error">*Mimimum number of travelers:{{picInfo.minParticipants}}.</p>
											<p style="margin-top: 10px;font-size:12px;" v-else>*Final headcount does not include babies.</p>-->

										</div>

									</div>
								</div>
								<div class="picDetail" v-if="isShowBook">
									<b class='headTitle'>Price Breakdown<span @click.stop="picDetailposition('picDetails')">Price Details</span></b>
									<ul>
										<li class="clearfix">
											<div class="formula" v-if="children==0&&adults==1">{{nowExchange.symbol}}{{returnFloat(adultsPic/(adults+children))}} x {{adults+children}} Person</div>
											<div class="formula" v-else>{{nowExchange.symbol}}{{returnFloat(adultsPic/(adults+children))}} x {{adults+children}} People </div>

											<div class="pic">{{nowExchange.symbol}}{{returnFloat(adultsPic)}}</div>
										</li>
										<li class="clearfix" v-if="children>0&&picInfo.childDiscount">
											<div class="formula"><b style="display: inline-block;">- {{nowExchange.symbol}}{{returnFloat(children*picInfo.childDiscount)}}</b> for child(ren)</div>
										</li>
									</ul>
									<div class="total clearfix">
										<div class="totalText">Total</div>
										<div class="totalPic" v-if="children>0&&picInfo.childDiscount">{{nowExchange.symbol}}{{returnFloat(returnFloat(adultsPic)-returnFloat(children*picInfo.childDiscount))}}</div>
										<div class="totalPic" v-else>{{nowExchange.symbol}}{{returnFloat(adultsPic)}}</div>
									</div>
								</div>
								<div class="inquiry">
									<button class="bookNow" @click.stop="order">Book Now</button>
									<button class="inquiryBtn" @click="showContact">Inquire</button>
								</div>

							</div>

						</div>
					</div>
					<div class="blockUsPs" :class="{block:isShow}">
						<ul>
							<li v-if="detail.category=='Private tour'||detail.category=='Transportation'">
								<i class="iconfont">&#xe654;</i>
								<p>100% Private</p>
							</li>
							<li v-if="detail.category=='Private tour'||detail.category=='Transportation'">
								<i class="iconfont">&#xe654;</i>
								<p>100% Personalizable</p>
							</li>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>Easy booking</p>
							</li>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>Best price guaranteed</p>
							</li>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>Professional customer service</p>
							</li>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>No hidden booking or credit card fees</p>
							</li>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>No cancellation fee with early notice</p>
							</li>
						</ul>
					</div>

				</div>
			</div>
		</div>
		<Pic :photoList="photoList" :alertPicStatus="alertPicStatus" @alert-call-back="setCallBack"></Pic>
		<Contact :ContactStatus="ContactStatus" v-on:isshowfn="isShowFn" v-on:contact-call-back="contactCallBack"  :objectType="objectType" :objectId="id"></Contact>
		<Alert   :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
	</div>

</template>

<script>
	import {
		GetDateStr,
		addmulMonth,
		getUrlParams
	} from "~/assets/js/plugin/utils";
	import Contact from '~/components/Contact/Contact';
	import Alert from '~/components/Prompt/Alert';
	import Flatpickr from 'flatpickr';
	require('~/assets/scss/G-ui/flatpickr.min.css')
	import Pic from "~/components/pageComponents/activity/details/Pic"
	export default {
		props: [
			"remark",
			"detail",
			"highlights",
			"destinations",
			"itemsIncluded",
			"id",
			"isscroll",
			"isShowBookNow",
			"picInfo",
			"recommed",
			"introduction",
			"inclusions",
			"exclusions",
			"notice",
			"destination",
			"photoList"

		],
		name: "Activities",
		data() {

			return {
				PriceDetail: [], //价格明细
				open: null,
				infant: 0, //婴儿
				dateTime: "", //riqi
				adults: 0, //成人  默认1人
				children: 0, //儿童
				people: "Please Select",
				time: "",
				isShowBook: false,
				isShowAdults: false,
				isShowTime: false,
				options: {
					minDate: this.picInfo.earliestBookDate,
					maxDate: addmulMonth(this.picInfo.earliestBookDate, 12)
				},
				adultsPic: "",
				objectType: "ACTIVITY",
				error: false,
				isSelectDate: false,
				dateErrText: "",
				isShow: false, //价格说明
				margin: 0,
				isShowView: false,
				isShowPicNode: false,
				enName: '',
				sixArr: [],
				isShowTable: false, //价格明细
				flatPickr: null,
				alertPicStatus: false,
				// inquery
				ContactStatus:false,
				isShowAlert:false,
				alertTitle:'',
				alertMessage:"",
				istrue:false,
				objectType:'ACTIVITY',
				//汇率换算
				nowExchange:{},//{'rate':1,'currency':'USD','symbol':'$'}
				exchange:[]
				// [
				// 	{'rate':1,'currency':'USD','symbol':'$'},
				// 	{'rate':6.3710,'currency':'CNY','symbol':'¥'},
				// 	{'rate':0.8348,'currency':'EUR','symbol':'€'}
				// ]
			};
			
		},
		components: {
			//flatPickr,
			Pic,
			Contact,
			Alert
		},
		methods: {
			changeCurrency(e){
				var self = this;
				var value = e.target.value;
				var picInfo = this.picInfo;
				var thisDetail = picInfo.details;

				//换算折扣价
				var exchange = this.exchange;
				for(var i=0;i<exchange.length;i++){
					var thisEx = exchange[i];
					//检测当前货币类型
					if(thisEx.code==value){
						//设置当前币种
						this.nowExchange = thisEx;
						//切换折扣价币种
						picInfo.currency = value;
						picInfo.bottomPrice = picInfo.defaultPrice.bottomPrice * thisEx.exchangeRate;
						picInfo.originalPrice = picInfo.defaultPrice.originalPrice * thisEx.exchangeRate;
						if(picInfo.defaultPrice.childDiscount){
							//之所以在这里加returnFloat，是为了让儿童优惠后的总价格，不会超过总价-儿童优惠价
							picInfo.childDiscount = picInfo.defaultPrice.childDiscount * thisEx.exchangeRate;
						}
						//切换价格详情币种
						for(var i=0;i<thisDetail.length;i++){
							thisDetail[i].price = thisDetail[i].defaultPrice * thisEx.exchangeRate;
						}

						//切换详情币种
						var sixArr = this.sixArr;
						for(var i=0;i<sixArr.length;i++){
							//之所以在这里加returnFloat，是为了让儿童优惠后的总价格，不会超过总价-儿童优惠价
							sixArr[i].price = sixArr[i].defaultPrice * thisEx.exchangeRate;
						}
						
						break;
					}
				}
				
				if(this.people>0){
					this.adultsPic = thisDetail[this.people-1].price;
					// self.amount = that.children > 0 && picInfo.childDiscount ?
					// 		self.returnFloat(self.returnFloat(self.adultsPic) - self.returnFloat(self.children * self.picInfo.childDiscount)) :
					// 		self.returnFloat(self.adultsPic);
				}
				
			},
			//设置默认价格
			setPriceData(){
				var picInfo = this.picInfo;
				var thisDetail = picInfo.details;
				//设置默认价格和折扣价
				picInfo.defaultPrice = {
					bottomPrice: picInfo.bottomPrice,
					originalPrice: picInfo.originalPrice
				};
				//儿童折扣
				if(picInfo.childDiscount){
					picInfo.defaultPrice.childDiscount = picInfo.childDiscount;
				}
				//设置人数列表价格
				for(var i=0; i<thisDetail.length; i++){
					var thisPrice = thisDetail[i].price;
					thisDetail[i].defaultPrice = thisPrice;
				}
			},
			//inquery
			isShowFn(val){
				this.istrue=val
				if(this.istrue==true){
					this.isShowAlert=true
					this.alertTitle="Submission completed!"
					this.alertMessage="Thank you for your feedback.We will get back to you within 1 day."
					this.istrue=false
				}else{
					this.isShowAlert=true
					this.alertMessage="Failed!"
				}
			},
			getIsShowAlert(val){
				this.isShowAlert=val
			},
			contactCallBack(val){
				this.ContactStatus=false
			},
			showContact() {
				let that = this;

				window.ga && ga("gtag_UA_107010673_1.send", {
					hitType: "event",
					eventCategory: "Button",
					eventAction: "Click",
					eventLabel: "activity_inquiry"
				});
				that.ContactStatus=true
			},
			
			
			//定位到价格明细
			picDetailposition(selector){
				var anchor = document.getElementById(selector)
				document.body.scrollTop = anchor.offsetTop+document.getElementById("banner").offsetHeight+60-76
				document.documentElement.scrollTop =anchor.offsetTop+document.getElementById("banner").offsetHeight+60-76
			},
			//唤起图片轮播
			showPhoto() {
				this.alertPicStatus = true
			},
			setCallBack(val) {
				this.alertPicStatus = val
			},
			showVeiwMore() {
				this.isShowView = true;
				window.ga && ga("gtag_UA_107010673_1.send", {
					hitType: "event",
					eventCategory: "Button",
					eventAction: "Click",
					eventLabel: "activity_view_more"
				});
			},
			showNode() {
				this.isShowPicNode = true;
			},
			hidden() {
				this.isShowPicNode = false;
			},
			cutXiaoNum(num, len) {
				var numStr = num.toString();
				if(len == null || len == undefined) {
					len = numStr.length;
				}
				var index = numStr.indexOf(".");
				if(index == -1) {
					index = numStr.length;
					numStr += ".0000000000000";
				} else {
					numStr += "0000000000000";
				}
				var newNum = numStr.substring(0, index + len + 1);
				return newNum;
			},
			round(val) {
				if(typeof val === "number" && val % 1 === 0) {
					return val;
				} else if(val.toString().split(".")[1].length <= 1) {
					return val;
				} else {
					return(parseFloat(this.cutXiaoNum(val, 1)) + 0.1).toFixed(1);
				}
			},
			// returnFloat(value) {
			// 	if(value) {
			// 		var value = Math.round(parseFloat(value) * 100) / 100;
			// 		var xsd = value.toString().split(".");
			// 		if(xsd.length == 1) {
			// 			value = value.toString() + ".00";
			// 			return value;
			// 		}
			// 		if(xsd.length > 1) {
			// 			if(xsd[1].length < 2) {
			// 				value = value.toString() + "0";
			// 			}
			// 			return value;
			// 		}
			// 	}

			// },
			returnUrl(val){
				val=val.replace(/&/g, 'And')
				let options={
					tourtype:[val]
				}
				let url="/activity/list/"+this.destination+"?options="+JSON.stringify(options)
				return url
			},
			returnFloat(value) {
				value*=1;
				if(value) {
					var numberArr = (''+value).split('.');
					if(numberArr.length>1 && numberArr[1].length>2){
						return (value+0.005).toFixed(2);
					}
					return value.toFixed(2);
				}else{
					return 0;
				}
			},
			showTable() {
				this.isShowTable = false
				this.sixArr=this.tableData(this.picInfo.details)

			},
			
			add(id) {
				if(id == 0) {
					this.adults++;
				} else if(id == 1) {
					this.children++;
				} else {
					this.infant++;
				}
			},
			del(id) {
				if(id == 0) {
					this.adults--;
				} else if(id == 1) {
					this.children--;
				} else {
					this.infant--;
				}
			},
			showTime() {
				this.isShowTime = true;
				if(this.isShowAdults == true) {
					this.isShowAdults = false;
				}
			},
			confirmTime(index) {
				this.time = this.picInfo.departureTime[index];
				this.isShowTime = false;
			},
			showAdults() {
				window.ga && ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "select",
					eventLabel: "guests"
				});
				window.ga && ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "select",
					eventLabel: "detail_select"
				});
				if(this.people == "Please Select") {
					this.adults = this.adults + 1;
					this.people = this.adults + this.children;
				}
				if(this.isShowTime == true) this.isShowTime = false;
				this.isShowAdults = true;
			},
			order() {

				window.ga && ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "click",
					eventLabel: "activity_book"
				});
				let that = this;
				if(that.dateTime == "") {
					that.isSelectDate = true;
					//that.dateErrText = "*Please select a date first.";
					//弹出日历
					that.flatPickr.open();

				} else if(that.children + that.adults < that.picInfo.minParticipants) {
					that.error = true;
					that.isShowAdults = true;
					that.dateErrText = "*Mimimum number of travelers:" + that.picInfo.minParticipants + ".";
					//默认帮用户选一个游玩人
					if(that.people == "Please Select") {
						that.adults = this.adults + 1;
						that.people = this.adults + this.children;
					}
				} else {
					that.error = false;
					that.isSelectDate = false;
					//that.dateErrText = "*Final headcount does not include babies.";
					var orderInfo = {
						userId: localStorage.getItem("userid") ?
							localStorage.getItem("userid") : null,
						activityId: that.detail.activityId,
						refundTimeLimit: that.detail.refundTimeLimit * 24,
						amount: that.children > 0 && that.picInfo.childDiscount ?
							that.returnFloat(that.returnFloat(that.adultsPic) - that.returnFloat(that.children * that.picInfo.childDiscount)) :
							that.returnFloat(that.adultsPic),
						details: that.detailAll,
						currency: that.picInfo.currency,
						symbol: that.nowExchange.symbol,
						adultNum: that.adults,
						childrenNum: that.children,
						infantNum: that.infant,
						startDate: that.dateTime,
						startTime: that.time ? that.time : null,
						adultsPic: that.returnFloat(that.adultsPic),
						coverPhotoUrl: that.detail.coverPhotoUrl,
						title: that.detail.title,
						childDiscountP: that.returnFloat(that.picInfo.childDiscount),
						childDiscountPP: that.picInfo.childDiscountDefault?that.returnFloat(that.picInfo.childDiscountDefault):0,
						category: that.detail.category,
						averagePrice: that.returnFloat(
							that.adultsPic / (that.adults + that.children)
						),
						childDiscount: that.picInfo.childDiscount ?
							that.returnFloat(that.children * that.picInfo.childDiscount) :
							null
					};
					//console.log(orderInfo)
					orderInfo = JSON.stringify(orderInfo);

					localStorage.setItem("orderInfo", orderInfo);

					location.href = "/activity/booking"

					//routes.push('/fillYourInfo')
				}
			},
			tableData(details) {
				//console.log(details);
				var newObj = function(obj) {
					var o = {};
					for(var key in obj) {
						o[key] = obj[key];
					}
					return o;
				}

				let newArr = [],
					tableD = [];



				if(details.length==1){
					for(let i=0;i<details[0].capacity;i++){
						var s=newObj(details[0]);
						newArr.push(s)
					}
					
				}else{
					for(let i = 0; i < details.length; i++) {
						let thisD = details[i];
						newArr.push(thisD);
						if(i + 1 > details.length - 1) break;

						var thisC = thisD.capacity;
						var nextC = details[i + 1].capacity;
						var forLen = nextC - thisC - 1;
						for(let j = 0; j < forLen; j++) {
							var midArr = newObj(details[i+1]);
							//console.log(midArr)
							newArr.push(midArr);
						}
						//console.log(newArr)
					}
				}
				

				for(var k = 0; k < newArr.length; k++) {
					newArr[k].capacity = k + 1;

				}
				return newArr;
			}
		},
		watch: {
			dateTime(val, oldVal) {
				window.ga && ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "select",
					eventLabel:"date"
				});
				window.ga && ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "select",
					eventLabel:"detail_select"
				});
				if(val == "") {
					this.isSelectDate = true;
					this.dateErrText = "*Please select a date first.";
				} else {
					this.isSelectDate = false;
				}
			},
			adults(val, odlVal) {
				this.people = val + this.children;
			},
			children(val, oldVal) {
				this.people = val + this.adults;
			},
			people(val, odlVal) {
				let that = this;
				that.isShowBook = true;
				if(val >= that.picInfo.minParticipants) {
					that.error = false;
					that.dateErrText = "*Final headcount does not include babies.";
				}
				for(var i = 0; i < that.picInfo.details.length; i++) {
					if(that.adults + that.children == that.picInfo.details[i].capacity) {
						that.adultsPic = that.picInfo.details[i].price;

						break;
					} else {
						if(that.adults + that.children < that.picInfo.details[i].capacity) {
							that.adultsPic = that.picInfo.details[i].price;

							break;
						}
					}
				}
			},
			isShowBook(val, oldVal) {
				if(val) {
					this.isShow = true;
				} else {
					this.isShow = false;
				}
			},
			
		},
		filters: {
			firstUpperCase(val) {
				if(val)
					return val.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
			},
			replaceVal(val){
				if(val){
					//return val.replace(/\r\n/g,'<br/>');
				}
			}
		},
		mounted: function() {
			let that = this;

			//调整数据，设置默认价格
			that.setPriceData();
			if(that.picInfo.childDiscount){
				that.picInfo.childDiscountDefault = that.picInfo.childDiscount;
			}
			
			
			//加载币种
			that.axios.get("https://api.localpanda.com/api/public/currency/all/"+that.picInfo.currency).then(function(response) {
				// console.log(response);
				if(response.status==200){
					that.exchange = response.data;
					that.nowExchange = that.exchange[0];
				}
			}, function(response) {});

			//this.sixArr=this.tableData(this.picInfo.details)

			//初始化清空日期
			that.dateTime = ""

			that.detailAll = that.tableData(that.picInfo.details);
			if(that.tableData(that.picInfo.details).length>5){
				this.isShowTable=true
				that.sixArr=that.detailAll.concat().splice(0,6);
			}else{
				that.sixArr=that.detailAll;
			}
			//that.sixArr=that.tableData(that.picInfo.details)
			//初始化日历
			that.flatPickr = new Flatpickr('#js_changetime', that.options);
			
			document
				.getElementsByTagName("body")[0]
				.addEventListener("click", function() {
					that.isShowTime = false;
					that.isShowAdults = false;
				});
		}
	};
</script>
<style lang="scss">
	.el-table__row .cell {
		text-align: center;
		span {
			font-size: 18px;
			color: #353a3f;
			line-height: 35px;
		}
	}
	
	.el-table th>.cell {
		font-size: 16px;
		font-weight: bold;
		color: #353a3f;
	}
	
	.el-table {
		margin-top: 34px;
	}
	
	.el-table--group::after,
	.el-table--border::after,
	.el-table::before {
		height: 0;
	}
	
	.el-table--striped .el-table__body tr.el-table__row--striped td {
		background: rgba(27, 188, 157, 0.06)!important;
	}
	
	.el-table th,
	.el-table td {
		padding: 6px 0;
	}
	
	.el-table tr:hover {
		background: #fff;
	}
	
	.el-table--enable-row-hover .el-table__body tr:hover>td {
		background: #fff;
	}
	
	.el-table th.is-leaf,
	.el-table td {
		border: 0;
	}
</style>
<style lang="scss" scoped>
	@import "~/assets/font/iconfont.css";
	#activities {
		.activitiesDel {
			.view {
				font-size: 18px;
				color: #1bbc9d;
				cursor: pointer;
				margin-top: 20px;
			}
			position: relative;
			max-width: 1170px;
			margin: 0 auto;
			.linkseting {
				.linkinfo {
					margin-top: 30px;
					a {
						color: #878e95;
						font-size: 14px;
						&:hover {
							text-decoration: underline;
							color: #353a3f;
						}
					}
					em {
						font-size: 12px;
						color: #878e95;
					}
					span {
						color: #878e95;
						font-size: 14px;
					}
				}
			}
			.book {
				width: 386px;
				position: absolute;
				right: 0;
				top: 0;
				.boxshowdow {
					width: 386px;
					background: #fff;
					position: relative;
					z-index: 200;
					box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
					.bookbox {
						.picPp {
							cursor: pointer;
							padding: 0 20px;
							height: 50px;
							line-height: 50px;
							background: #353a3f;
							font-size: 14px;
							.picLeft {
								color: #fff;
								float: left;
								b {
									font-size: 24px !important;
									vertical-align: middle;
									margin: 0 6px;
								}
								span {
									text-decoration: line-through;
									margin-left: 5px;
								}
							}
							.picRight {
								color: #fff;
								float: right;
								position: relative;
								opacity: 0.5;
								span {
									font-size: 10px;
								}
								.iconfont{
									position: absolute;
									right: 0;
									top:0;
									height: 51px;
									line-height: 51px;
									text-align:center;
									font-size:18px;
								}
							}
							.priceNote {
								width: 200px;
								background: #fff;
								padding: 16px;
								position: absolute;
								z-index: 200;
								top: -10px;
								font-size: 14px;
								box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
								h4 {
									font-weight: bold;
									line-height: 20px;
								}
								p {
									margin-top: 14px;
									line-height: 20px;
								}
							}
							.currency_type{
								border:none;
								padding-right: 20px;
								font-size: 16px;
								background:none;
								height: 36px;
								color: rgba(255, 255, 255, 0.9);
								option{
									color:#666;
								}
								position: relative;
								z-index: 2;
								-webkit-appearance: none;
								-moz-appearance: none;
								appearance: none;
								
							}
						}
						.selectBox {
							padding: 20px;
							.select {
								.selectDate {
									b {
										font-size: 14px;
										margin-bottom: 10px;
										display: block;
									}
									width: 50%;
									float: left;
									.flatpickr-input {
										height: 40px !important;
										padding-left: 10px !important;
										width: calc(100% - 10px)!important;
										border-color: #e3e5e9;
										border-right: none;
										border-radius: 0px 3px 0px 3px !important;
										&:hover {
											border-color: #e3e5e9 !important;
										}
									}
								}
								.selectTime {
									b {
										font-size: 14px;
										margin-bottom: 10px;
										display: block;
									}
									width: 50%;
									float: left;
									.time {
										position: relative;
										input {
											width: calc(100% - 10px);
											height: 40px;
											border: 1px solid #e3e5e9;
											border-radius: 3px 0px 3px 0;
											cursor: pointer;
											font-size: 16px;
										}
										i {
											position: absolute;
											right: 10px;
											font-size: 10px;
											top: 50%;
											margin-top: -5px;
										}
										.timeList {
											position: absolute;
											top: 47px;
											max-width: 175px;
											max-height: 300px;
											overflow: auto;
											background: #fff;
											box-shadow: 0px 2px 10px 0px rgba(53, 58, 63, 0.2);
											z-index: 300;
											ul {
												li {
													height: 50px;
													width: 175px;
													text-align: center;
													line-height: 50px;
													font-size: 18px;
													cursor: pointer;
													&:hover {
														background-image: linear-gradient( -90deg, #009efd 0%, #1bbc9d 100%);
														color: #fff;
													}
												}
											}
										}
									}
								}
							}
							.selectPepole {
								width: 100%;
								margin-top: 10px;
								b {
									font-size: 14px;
									margin-bottom: 10px;
									display: block;
								}
								.Guests {
									position: relative;
									font-size: 16px;
									.people {
										line-height: 40px;
										border: 1px solid #e3e5e9;
										border-radius: 3px;
										cursor: pointer;
										padding-left: 10px;
									}
									i {
										position: absolute;
										right: 10px;
										font-size: 8px;
										top: 50%;
										transform: translateY(-50%);
									}
									.choose {
										position: absolute;
										top: -132px;
										left: -20px;
										width: 346px;
										box-shadow: 0px 2px 10px 0px rgba(53, 58, 63, 0.2);
										background: #fff;
										padding: 20px;
										b{
											font-size: 18px;
											line-height: 40px;	
											display: inline-block;
											margin: 0;	
										}
										.years{
											display: inline-block;
											b {
												font-size: 18px;
												line-height: inherit;
												display: inline-block;
												margin: 0;
												
											}
											span {
												display: block;
												font-weight: normal;
												color: #878e95;
												font-size: 12px;
												
											}
										}
										
										.children {
											margin-top: 10px;
										}
										.adults,
										.children {
											.color {
												color: #1bbc9d;
											}
											.selectAdults {
												float: right;
												input {
													width: 30px;
													height: 30px;
													font-size: 18px;
													font-weight: bold;
													padding: 0;
													border: solid 2px #ebebeb;
													border-radius: 2px;
													text-align: center;
													line-height: 30px;
													margin: 0 10px;
												}
												em {
													cursor: pointer;
													font-weight: bold;
												}
											}
										}
										.apply {
											width: 100%;
											height: 42px;
											text-align: center;
											background-image: linear-gradient( 270deg, #009efd 0%, #1bbc9d 100%);
											color: #f5f5f5;
											line-height: 42px;
											font-size: 16px;
											font-weight: bold;
											border-radius: 30px;
											margin-top: 20px;
										}
									}
								}
							}
							.picDetail {
								.headTitle {
									display: block;
									font-size: 14px;
									margin-top: 24px;
									padding-bottom: 10px;
									span{
										color:#1bbc9d;
										float:right;
										text-decoration: underline;
										cursor: pointer;
									}
								}
								ul {
									border-bottom: 1px solid #ebebeb;
									border-top: 1px solid #ebebeb;
									padding: 14px 0;
									li {
										&:nth-child(2) {
											padding-top: 14px;
										}
										b {
											margin: 0;
											font-size: 16px;
										}
										.formula {
											float: left;
											font-size: 16px;
										}
										.pic {
											float: right;
											font-size: 16px;
										}
									}
								}
								.total {
									width: 100%;
									padding-top: 14px;
									.totalText {
										float: left;
										font-size: 16px;
									}
									.totalPic {
										font-weight: bold;
										float: right;
										font-size: 24px;
									}
								}
							}
							.inquiry {
								button {
									width: 100%;
									height: 42px;
									text-align: center;
									
									
									line-height: 42px;
									font-size: 16px;
									font-weight: bold;
									border-radius: 30px;
									margin-top: 20px;
									&.bookNow{
										background-image: linear-gradient( 270deg, #009efd 0%, #1bbc9d 100%);
										color: #fff;
									}
									&.inquiryBtn{
										background:#fff;
										border:1px solid #1bbc9d;
										color: #1bbc9d;
									}
								}
								.cancat {
									margin-top: 20px;
									position: relative;
									cursor: pointer;
									p {
										font-size: 14px;
										line-height: 20px;
										span {
											color: #1bbc9d;
										}
									}
									i {
										position: absolute;
										right: 0;
										top: 50%;
										margin-top: -4px;
									}
								}
							}
						}
					}
				}
				.blockUsPs {
					background: #f1f1f1;
					padding: 9px 20px 24px 20px;
					overflow: hidden;
					position: relative;
					ul {
						li {
							margin-top: 15px;
							i {
								font-size: 12px;
								color: #1bbc9d;
							}
							p {
								display: inline-block;
								margin-left: 14px;
								font-size: 16px;
							}
						}
					}
				}
			}
			.activitiesInfo {
				width: 734px;
				.tags {
					margin: 33px 0;
					.tag {
						float: left;
						color: #1bbc9d;
						font-size: 14px;
						border-top: 1px solid #1bbc9d;
						border-bottom: 1px solid #1bbc9d;
						padding: 3px 0;
					}
					.productId {
						float: right;
						font-size: 12px;
						color: #878e95;
						padding: 5px 0;
					}
				}
				.activitiyTitle {
					h3 {
						font-weight: bold;
						font-size: 32px;
					}
					.types {
						margin: 29px 0 24px;
						a {
								
								color: #1bbc9d;
								text-decoration: underline;
								font-size: 18px;
								position: relative;
								padding: 0 16px;
								display:inline-block;
							
							&:first-child {
								
									padding-left: 0;	
								
								
							}
							&:not(:first-child) {
								
									&:after {
										content: "";
										width: 4px;
										height: 4px;
										border-radius: 50%;
										background:  #878e95;
										position: absolute;
										left: 0px;
										top: 50%;
										transform: translateY(-50%);
									}
								
								
							}
						}
					}
				}
				.description {
					padding-top: 33px;
					border-top: 1px solid #dde0e0;
					li {
						float: left;
						width: 33.33333%;
						label {
							margin-right: 14px;
							font-size: 18px;
							color: #878e95;
						}
						span {
							font-size: 18px;
						}
					}
				}
				.location,
				.languages {
					width: 100%;
					margin-top: 24px;
					label {
						float: left;
						font-size: 18px;
						color: #878e95;
						vertical-align: middle;
						em {
							color: #353a3f;
							margin-left: 14px;
							font-size: 18px;
						}
					}
					span {
						float: left;
						font-size: 18px;
						width: 80%;
						word-wrap: break-word;
						margin-top: 2px;
						margin-left: 8px;
					}
				}
				.location {
					padding-bottom: 33px;
					border-bottom: 1px solid #dde0e0;
				}
				.says {
					padding: 33px 0;
					font-style: oblique;
					border-bottom: 1px solid #dde0e0;
					font-size: 18px;
					line-height: 26px;
					color: #353a3f;
				}
				.heightLights {
					padding: 33px 0;
					border-bottom: 1px solid #dde0e0;
					p {
						font-size: 18px;
						margin-top: 16px;
						&:first-child {
							margin-top: 0;
						}
						i {
							font-size: 12px;
							color: #1bbc9d;
							float: left;
							margin-top: 3px;
						}
						span {
							width: 90%;
							float: left;
							margin-left: 12px;
						}
					}
				}
				.journey {
					margin-top: 34px;
					.expect {
						h3 {
							font-size: 24px;
							font-weight: bold;
						}
						p {
							margin: 15px 0 20px;
							font-size: 18px;
							line-height: 26px;
						}
						.introduction {
							overflow: hidden;
						}
						.viewMore {
							color: #1bbc9d;
							font-size: 18px;
							cursor: pointer;
							margin: 6px 0 30px;
						}
					}
					ul {
						padding-bottom: 34px;
						border-bottom: 1px solid #dde0e0;
						li {
							&:nth-of-type(odd) {
								background: rgba(27, 188, 157, 0.06);
							}
							.item {
								padding: 24px 0;
								.cont_title {
									width: calc(50% - 20px);
									font-size: 18px;
									margin-left: 20px;
									font-weight: bold;
								}
								.cont {
									clear: both;
									font-size: 18px;
									line-height: 26px;
									margin:15px 0 0 20px;
								}
							}
							.item_v {
								.contTitle {
									float: left;
									padding: 24px 30px 0 20px;
									h3 {
										font-size: 18px;
										font-weight: bold;
									}
									p {
										font-size: 18px;
										line-height: 26px;
										margin-top: 15px;
										text-align: justify;
									}
									img{
											width: 50%;
											margin-left:20px;
											/*height: 255px;*/
											float: right;
										}
								}
								/*.cont {
									width: 50%;
									float: right;
									img {
										width: 100%;
										height: 255px;
									}
								}*/
							}
						}
					}
				}
				.provide {
					margin-top: 34px;
					padding-bottom: 34px;
					border-bottom: 1px solid #dde0e0;
					.picNote{
						font-size: 18px;
						margin-top: 20px;
					}
					h3 {
						font-size: 24px;
						font-weight: bold;
					}
					ul {
						li {
							padding-left: 20px;
							display: inherit;
							margin-top: 15px;
							font-size: 18px;
							position: relative;
							h5 {
								font-size: 18px;
							}
							p {
								font-size: 14px;
								margin-top: 4px;
							}
							&:after {
								content: "";
								position: absolute;
								width: 4px;
								height: 4px;
								border-radius: 50%;
								background: #353a3f;
								left: 0px;
								top: 10px;
							}
							&:first-child {
								margin-top: 30px;
							}
						}
					}
				}
				.notes {
					margin-top: 34px;
					padding-bottom: 34px;
					border-bottom: 1px solid #dde0e0;
					h3 {
						font-size: 24px;
						font-weight: bold;
						margin-bottom: 24px;
					}
					p {
						font-size: 18px;
						line-height: 26px;
						margin-top: 10px;
					}
					.photoCover {
						margin-top: 0.64rem;
						cursor: pointer;
						height: 300px;
						background-repeat: no-repeat!important;
						background-size: cover!important;
						background-position: center;
						position: relative;
						.mask {
							position: absolute;
							left: 0;
							top: 0;
							width: 660px;
							height: 100%;
							background: linear-gradient( to right, rgba(255, 249, 248,1) 40%, rgba(255, 249, 248, 0) );
						}
						.cover {
							padding: 92px 0 0 39px;
							position: relative;
							h4 {
								font-size: 24px;
								width: 385px;
							}
							button {
								height: 46px;
								width: 242px;
								line-height: 46px;
								text-align: center;
								border-radius: 30px;
								background: #fff;
								box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.1);
								margin-top: 16px;
								font-size: 16px;
								font-weight: bold;
							}
						}
					}
				}
			}
			.recommend {
				margin-top: 34px;
				padding-bottom: 82px;
				h3 {
					font-size: 24px;
					font-weight: bold;
					margin-bottom: 30px;
				}
				ul {
					li {
						float: left;
						margin-right: 20px;
						width: 376px;
						transition: 0.3s transform;
						&:hover {
							transform: translateY(-10px);
							box-shadow: 0px 10px 20px 0px rgba(53, 58, 63, 0.1);
						}
						&:last-child {
							margin-right: 0;
						}
						.activity-pic {
							width: 376px;
							height: 188px;
							position: relative;
							img {
								width: 100%;
								height: 100%;
							}
							span {
								position: absolute;
								top: 10px;
								left: 10px;
								padding: 5px;
								font-size: 14px;
								font-weight: bold;
								background: #f4b33f;
								color: #fff;
							}
						}
						.activity-cont {
							height: 190px;
							position: relative;
							padding: 20px;
							box-shadow: 0px 2px 3px 0px rgba(53, 58, 63, 0.1);
							.activity-info {
								
								.activity-cont-type {
									float: left;
									font-size: 14px;
									color: #d87b65;
									i {
										font-size: 12px;
										color: #d87b65;
										margin-right: 6px;
									}
								}
							}
							h4 {
								color: #353a3f;
								height: 74px;
								line-height: 24px;
								text-overflow: ellipsis;
								display: -webkit-box;
								display: -moz-box;
								-moz-box-orient: vertical;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 3;
								word-wrap: break-word;
								overflow: hidden;
								margin-top: 14px;
								font-size: 20px;
								font-weight: bold;
							}
							.duration {
									font-size: 14px;
									margin-top: 6px;
									color: #878e95;
									i {
										font-size: 12px;
										color: #878e95;
										margin-right: 6px;
									}
								}
							.activity-cont-duration {
								margin-top: 17px;
								i {
									font-size: 12px;
									color: #878e95;
									margin-right: 6px;
								}
								font-size: 14px;
								color: #878e95;
							}
							.pic {
								position: absolute;
								right: 20px;
								bottom: 20px;
								.old-pic {
									text-align: right;
									font-size: 14px;
									color: #878e95;
									text-decoration: line-through;
								}
								.current-price {
									font-size: 14px;
									color: #878e95;
									margin-top: 3px;
									b {
										font-size: 20px;
										color: #353a3f;
										margin-left: 6px;
									}
									span {
										color: #353a3f;
									}
								}
							}
						}
					}
				}
			}
		}
		.overflow {
			overflow: inherit !important;
			height: auto !important;
		}
		.block {
			display: none !important;
		}
		.position {
			position: fixed !important;
			top: 96px !important;
		}
		.long {
			width: 100% !important;
		}
	}
</style>