<template>
	<div id="activities">
		<div class="activitiesDel">
			<div class="activitiesInfo">
				<div class="linkseting clearfix">
					<div class="linkinfo">
						<a href="/">Home</a>
						<em class="iconfont">&#xe64a;</em>
						<a v-if="destination=='Xi\'an'" href="/activity/list/Xian">Xi'an Activities</a>
						<a v-else :href="'/activity/list/'+destination">{{destination}} Activities</a>

						<em class="iconfont">&#xe64a;</em>
						<span>Activity Details</span>
					</div>
					<em class="productId">Product ID: {{detail.activityId}}</em>
				</div>
		
				<div class="activitiyTitle">
					<h3><span v-if="detail.groupType" :class="detail.groupType=='Private'?'pr':'gr'">{{detail.groupType}}</span>{{detail.title}}</h3>
					<div class="service">
						<span>
							<label class="iconfont">&#xe624;</label>
							<em>{{detail.duration}} {{detail.durationUnit|firstUpperCase}}</em>
						</span>
						<span>
							<label class="iconfont">&#xe652;</label>
							<em v-if="picInfo.minParticipants==picInfo.maxParticipants">{{picInfo.minParticipants}}</em>
							<em v-else>{{picInfo.minParticipants}} - {{picInfo.maxParticipants}}</em>
						</span>
						<span>
							<label  class="iconfont fs14">&#xeb0e;</label>
							<em>{{detail.trafficType}}</em>
						</span>
						<span>
							<label  class="iconfont">&#xe610;</label>
							<em>{{destinations}}</em>
						</span>
						<span>
							<label  class="iconfont">&#xe627;</label>
							<em v-if="detail.groupType=='Group'">English</em>
							<em v-else>English, Español, Français, Deutsch, русский язык</em>
						</span>
						
					</div>
					<div class="types" v-if="detail.attractions&&detail.attractions.length>0">
						<a v-for="i in tagAttractions" :href="returnUrl(i)"><span>{{i}}</span></a>
						<a v-if="detail.attractions.length>4" @click="tagFn">···</a>
						<!--<p v-if="detail.sales&&detail.sales>0">Booked {{detail.sales}} {{detail.sales==1?'time':'times'}} (last 30 days)</p>-->
					</div>
				</div>				
				<p class="says" v-if="detail.recommendedReason">{{detail.recommendedReason}}</p>
				<div class="heightLights" id="heightLights" v-if="highlights&&highlights.length>0">
					<div class="expect">
						<h3>Why you'll love this trip</h3>
						<p v-if="highlights&&highlights.length>0" :key="index" class="heightLightsList" v-for="(item,index) in highlights">
							<span>{{item}}</span></p>
						<!--<p class="introductionCont" v-if="introduction.length==1">{{introduction[0]}}</p>
						<div class="introduction" :class="{'overflow':isShowView}" v-if="introduction.length>1">
							<p v-if="isShowView==false">{{introduction[0]}}</p>
							<p :key="index" v-else v-for="(j,index) in introduction">{{j}}</p>
						</div>
						<div v-if="introduction.length>1&&isShowView==false" class="viewMore" @click="showVeiwMore()">View more</div>-->
					</div>

				</div>
				<div class="journey" id="journey" ref="journey" v-if="detail.itineraries&&detail.itineraries.length>0">
					<h3>Itinerary</h3>
					 <timeline v-if="showNewStyle" class="new">
						<div class="newItem" :key="index" v-for="(i,index) in itinerary">
							<timeline-item>
									<label>stop{{index+1}}</label>
									<h4>{{i.title}}</h4>
									<p v-if="i.description" v-html="i.description.replace(/\r\n/g,'<br>').replace(/\n/g,'<br>')"></p>
									<div  v-if="i.photo">
										<img  v-lazy="i.photo.url"  alt=""/>
									</div>
					
							</timeline-item>
						</div>
					</timeline>
					<ul v-else class="old">
						<li :key="index" v-for="(i,index) in itinerary">
							<div class="item_v clearfix" v-if="i.photo">
								<div class="contTitle">
									
									<div><img v-lazy="i.photo.url" /><h3>{{i.title}}</h3><span v-if="i.description" v-html="i.description.replace(/\r\n/g,'<br>').replace(/\n/g,'<br>')"></span></div>
									
								</div>
							</div>
							<div class="item clearfix" v-else>
								<div class="cont_title" id="aa">{{i.title}}</div>
								<div class="cont" v-if="i.description" v-html="i.description.replace(/\r\n/g,'<br>').replace(/\n/g,'<br>')"></div>
							</div>
						</li>
					</ul>
					<a v-if="detail.itineraries.length>3&&showMoreItinerary" class="more" href="javascript:;" @click="fn">View More</a>
					
					<p class="itinerary_tip" v-if="detail.groupType=='Private'"><span class="red">*</span> If you want to adjust your itinerary, feel free contact us. Since the tour is private, our staff can help you make changes according to your needs.</p>
				</div>
				 <!-- <div class="notes" v-if="photoList&&photoList.length>0" @click="showPhoto" id="photoList">
					<h3>Pictures of our travelers</h3>
					<div class="photoCover" v-lazy:background-image="photoList.length>0?photoList[0].url:''">
						<div class="mask"></div>
						<div class="cover">
							<h4>Check out our customers' travel experiences with us!</h4>
							<button>Have a look</button>
						</div>
					</div>

				</div> -->
				
				<div class="provide clearfix" id="provide" >
					<div class="inclusions" v-if="itemsIncluded&&itemsIncluded.length>0||(inclusions&&inclusions.length>0)">
							<h3>Inclusions</h3>
							<ul>
								<li :key="index" v-for="(item,index) in itemsIncluded">{{item}}</li>
							</ul>
							<ul v-if="inclusions">
								<li :key="index" v-for="(item,index) in inclusions">
									<h5>{{item.title}}</h5>
									<p v-if="item.content" v-html="item.content"></p>
								</li>
							</ul>
					</div>
					<div class="exclusions" v-if="exclusions&&exclusions.length>0" id="exclusions">
						<h3>Exclusions</h3>
						<ul>
							<li :key="index" v-for="(item,index) in exclusions">
								<h5>{{item.title}}</h5>
								<p v-if="item.content" v-html="item.content"></p>
							</li>
						</ul>
					</div>
				</div>
				<div class="review" v-if="travelersReviews.entities&&travelersReviews.entities.length>0" id="review">
					<div class="reviewTitle clearfix">
						<h3>{{travelersReviews.entities.length==1?"Review":"Reviews"}} ({{travelersReviews.records}})</h3>
						<grade :score="travelersReviews.avgScore" :big="'true'"></grade>
					</div>
					
					<div class="reviewItem" v-for="(item,index) in travelersReviews.entities">
						<div class="reviewInfo clearfix">
							<div class="headPhoto">
								<img v-if="item.userPortraitPhoto" :src="item.userPortraitPhoto.url"/>
								<span v-else>{{item.userName.substring(0,1).toUpperCase()}}</span>
							</div>
							<div class="visitor">
								<div class="name clearfix">
									<h4>{{item.userName}}</h4>
									<grade :score="item.score"></grade>
								</div>
								<div class="time">{{(item.createTime).substring(0,10)}}</div>
							</div>
						</div>
						<div class="reviewContent" v-if="!item.text280">{{item.content.substring(0,280)}}<span @click="showText(index)" v-if="item.content.length>280">...<em style="color: #1bbc9d; font-size: 16px;">Read more</em></span></div>
						<div class="reviewContent" v-else>{{item.content}}</div>
						<ul class="clearfix" v-if="item.userCommentPhoto&&item.userCommentPhoto.length>0">
							<li v-lazy:background-image="i.url" @click="showTavelPhotoList(index,item.userCommentPhoto)" v-for="(i,index) in item.userCommentPhoto" ></li>
						</ul>
						
					</div>
					<div class="moreBtn" v-if="!showMoreBth && travelersReviews.records>pageSize">
						<button @click="moreReviews">Browse More</button>
					</div>
				</div>

				<!-- <div class="notes" v-if="detail.notice.length>0" id="notice">
					<h3>Additional Info</h3>
					<p v-for="(item,index) in detail.notice" :key="index">{{item.title}}</p>
				</div> -->
				
				<div class="notes" id="notes" v-if="remark&&remark.length>0">
					<h3>Notes</h3>
					<p v-if="remark" :key="index" v-for="(item,index) in remark">{{item}}</p>
				</div>
				<div class="notes" v-if="picInfo.refundInstructions" id="CancellationPolicy">
					<h3>Rescheduling and Cancellation Policy</h3>
					<p v-html="picInfo.refundInstructions.replace(/\r\n/g,'<br>').replace(/\n/g,'<br>')"></p>
				</div>
				<div class="provide" v-if="picInfo.details&&picInfo.details.length>0" id="picDetails">
					<h3>Price Details</h3>
					<p style="font-size: 16px;margin-top: 10px;" v-if="picInfo.childDiscount">Children's price is {{nowExchange.code}}   {{nowExchange.symbol}}  {{returnFloat(picInfo.childDiscount)}}   less than adults' price.</p>
					<el-table :data="sixArr" stripe style="width: 100%">
						<el-table-column prop="capacity" label="Number of people" width="244.6" align="center">
							<template slot-scope="scope">
								<span v-if="scope.row.capacity==1">1 person</span>
								<span v-else>{{scope.row.capacity}} people</span>
							</template>
						</el-table-column>
						<el-table-column prop="price" label="Total cost" width="244.6" align="center">
							<template slot-scope="scope">
								
								<div class="price_detail_left">
									<span>{{nowExchange.code}} {{nowExchange.symbol}} {{returnFloat(scope.row.price)}}</span>
								</div>
							</template>
						</el-table-column>
						
						<el-table-column prop="childenTotal" label="Price per person" width="245" align="center">
							<template slot-scope="scope">
							
									
								<div class="price_detail_left" v-show="scope.row.capacity">
									<span>{{nowExchange.code}} {{nowExchange.symbol}} {{returnFloat(scope.row.perPersonPrice)}} </span>
								</div>
							</template>
						</el-table-column>
					</el-table>
					<div class="view" v-if="isShowTable" @click="showTable">View More</div>
					<p class="picNote" v-if="picInfo.priceInstructions">{{picInfo.priceInstructions}}</p>
				</div>
				<div class="notes" v-if="detail.notice||(notice&&notice.length>0)" id="notice">
					<h3>Additional Info</h3>
					<div v-if="detail.notice && !notice.length">
						<p  v-for="item in delNullArr(detail.notice.split('/r/n'))">{{item}}</p>
					</div>
					
					<ul v-if="notice&&notice.length>0">
						<li v-for="item in notice">
							<h5>{{item.title}}</h5>
							<span v-if="item.content">{{item.content}}</span>
						</li>
					</ul>
				</div>
				
				
				<!--<grade></grade>-->
			</div>


			<!-- 产品推荐 -->
			<div class="recommend" id="recommend" v-if="recommed&&recommed.length>0">
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
								<div class="duration"><i class="iconfont">&#xe624;</i>{{i.duration}} {{i.durationUnit|firstUpperCase}}</div>
								<div class="pic">
									<!-- <div class="old-pic" v-if="i.originalPrice">{{nowExchange.symbol}}{{returnFloat(i.originalPrice)}}</div> -->
									<div class="current-price" >From <span>{{nowExchange.code}}</span><b>{{nowExchange.symbol}}{{returnFloat(i.bottomPrice)}}</b><span>  pp</span></div>
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
										<select class="currency_type" v-model="selectExchange"  @change="changeCurrency">
											<option :value="item.code" v-for="item in exchange" :key="item.code">{{item.code}}</option>
										</select>
										<span class="iconfont">&#xe666;</span>
									</div>
									<div class="picRight" >
										<div style="color: #FFF;">
											<p v-if="people=='Select'">{{!picInfo.unifiedPricing?'From':''}}<b style="font-size: 22px"> {{nowExchange.symbol}} {{startingPrice}}  </b>per person
												<span style="font-size:12px;display:block;padding-left:70px" v-if="people=='Select' && !picInfo.unifiedPricing">Price based on group of {{minPeople}}</span>
											</p>
											 
											<p v-if="people>1"><b style="font-size:22px" >{{nowExchange.symbol}} {{startingPrice}}  </b> {{!picInfo.unifiedPricing?'pp for party of '+people : 'per person'}}</p>
											
											<p v-if="people==1"><b style="font-size:22px" >{{nowExchange.symbol}} {{startingPrice}}  </b> for 1 person</p>
											<!-- <span class="question" @mouseover="showNode" @mouseleave="hidden">?</span> -->
											
										</div>
										
									</div>

								<!--   <div class="priceNote" v-if="isShowPicNode" @mouseover="showNodeCont" @mouseleave="hiddenCont">
									
								 	<p>This is the price  {{people==1? 'for 1 person': (people=='Guests Number'?'per person for a group of '+minPeople:'per person for a group of '+people)}} (see "What's Included" for details).</br>

								 		<a href="javascript:;" @click="picDetailposition('picDetails')">Click here</a> if you want to see price for group of different size.
								 	</p>
								 </div>  -->

							</div>
							<div class="selectBox">
								<div class="select clearfix">
									<div class="selectDate">
										<b>Available On</b>
										<!--<flatPickr placeholder="Date" v-model="dateTime" :config="options"></flatPickr>-->
										<input id="js_changetime" readonly v-model="dateTime" type="text" placeholder="Date">
									</div>
									<!--<div class="selectTime" v-if="picInfo.departureTime" >
										<b></b>
										<div class="time" @click.stop="showTime">
											<input readonly="readonly" v-model="time" placeholder="Time"/>
											<i class="iconfont" v-if="!isShowTime">&#xe60f;</i>
											<i class="iconfont" v-else>&#xe63f;</i>
											<div v-if="isShowTime" @click.stop="showTime" class="timeList">
												<ul>
													<li :key="index" v-for="(item,index) in picInfo.departureTime" @click.stop="confirmTime(index)">{{item}}</li>

												</ul>
											</div>
										</div>

									</div>-->
								</div>
								<div class="selectPepole">
									<b>Number of Travelers</b>
									<div class="Guests">
										<!--<input class="people" readonly="readonly" v-model="people" />-->
										<!--<div class="people" v-if="children==0&&adults==0">{{people}}</div>
										<div class="people" v-if="children==0&&adults==1">{{people}} Person</div>
										<div class="people" v-if="children>0||adults>1">{{people}} People</div>-->
										<div class="GuestsBox"  @click="showAdults">
											<div class="people inputColor"  v-if="adults==0&&children==0&&people=='Select'">{{people}}</div>
											<div class="people" v-else-if="children==0&&adults==1">Adult x 1</div>
											<div class="people" v-else-if="children==0&&adults>1">Adults x {{adults}}</div>
											<div class="people" v-if="children>0">
												<span v-if="adults==1">Adult x 1</span>
												<span v-else>Adults x {{adults}}</span> 
												<span v-if="children==1"> , child x 1</span>
												<span v-if="children>1"> , children x  {{children}}</span>
											</div> 
											<i class="iconfont" v-if="!isShowAdults">&#xe60f;</i>
											<i class="iconfont" v-else>&#xe63f;</i>
											<!--<p v-if="isSelectDate" style="margin-top: 10px; font-size: 12px; color:red;">{{dateErrText}}</p>-->
												<p style="margin-top: 10px; font-size:12px;color:red;" v-if="error">{{dateErrText}}</p>
											<!--<p style="margin-top: 10px;color:#353a3f;font-size:12px;opacity: .5;" v-if="!error&&!isSelectDate">{{dateErrText}}</p>-->
										</div>
									
										<div class="choose" v-show="isShowAdults">
											<div class="adults clearfix">
												<b>Adults</b>
												<div class="selectAdults">
													<em class="iconfont color" v-if="adults>1&&(children+adults)>picInfo.minParticipants" @click.stop="del(0)">&#xe64d;</em>
													<em class="iconfont" v-else>&#xe64d;</em>
													<input readonly v-model="adults" />
													<em class="iconfont" v-if="(children+adults)>=picInfo.maxParticipants">&#xe64b;</em>
													<em class="iconfont color" v-else @click.stop="add(0)">&#xe64b;</em>
												</div>
											</div>
											<div class="children clearfix">
												<div class="years">
													<b>Children</b>
													<span v-if="picInfo.childStandard">≤ {{picInfo.childStandard}} years old</span>
												</div>
												
												<div class="selectAdults">
													<em class="iconfont color" v-if="children>0" @click.stop="del(1)">&#xe64d;</em>
													<em class="iconfont" v-else>&#xe64d;</em>
													<input readonly v-model="children" />
													<em class="iconfont" v-if="(children+adults)>=picInfo.maxParticipants">&#xe64b;</em>
													<em class="iconfont color" v-else @click.stop="add(1)">&#xe64b;</em>
												</div>
											</div>
											<!--<div class="children clearfix">
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
											</div>-->
											<p style="margin-top: 10px; font-size:12px;color:red;" v-if="error">{{dateErrText}}</p>
											<div class="submit">
												
												<button class="submitBtn" @click.stop="submitFn">Submit</button>
											</div>
										</div>

									</div>
								</div>
								
								
								<div class="picDetail" v-if="isShowBook">
									<b class='headTitle'>Price Breakdown</b>
									<!-- <span @click.stop="picDetailposition('picDetails')">Price Details</span> -->
									<ul>
										<li class="clearfix">
											<div class="formula" v-if="children==0&&adults==1">{{nowExchange.symbol}}{{adultsPic}} x 1 Person</div>
											<div class="formula" v-else>{{nowExchange.symbol}}{{returnFloat(adultsPic/people)}} x {{people}} People </div>

											<div class="pic">{{nowExchange.symbol}}{{adultsPic}}</div>
										</li>
										<li class="clearfix" v-if="children>0&&picInfo.childDiscount">
											<div class="formula"><b style="display: inline-block;">- {{nowExchange.symbol}}{{returnFloat(children*picInfo.childDiscount)}}</b> for child(ren)</div>
										</li>
									</ul>
									<div class="total clearfix">
										<div class="totalText">Total</div>
										<div class="totalPic" v-if="children>0&&picInfo.childDiscount">{{nowExchange.symbol}}{{returnFloat(adultsPic-returnFloat(children*picInfo.childDiscount))}}</div>
										<div class="totalPic" v-else>{{nowExchange.symbol}}{{adultsPic}}</div>
									</div>
								</div>
								<div class="inquiry">
									<button class="bookNow" @click.stop="order">Book Now</button>
									<div class="inquiry_box">
										<button class="inquiryBtn" @click="showContact">Inquire</button>
										<!-- <a class="inquiryBtn" href="/inquiry/talk" target="_blank">Chat with Panda</a> -->
									</div>
								</div>
								<div class="sales">
										<span v-if="detail.sales&&detail.sales>0">Booked {{detail.sales}} {{detail.sales==1?'time':'times'}} (last 30 days)</span>
										<!-- <div class="fl" v-if="travelersReviews.avgScore&&!ABtest || isABtestShow" @click="goReview">
											<grade style="margin-top:0"  :score="travelersReviews.avgScore" :big="'true'"></grade>
											<span>  ( {{travelersReviews.records}} )</span>
										</div> -->
								</div>
							</div>

						</div>
					</div>
					<div class="blockUsPs" :class="{block:isShowMeau}">
						<ul>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>No hidden booking or credit card fees</p>
							</li>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>Instant confirmation after booking</p>
							</li>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>Best Price Guarantee</p>
							</li>
						</ul>
					</div>

				</div>
			</div>
		</div>
		<Pic :photoList="picList" :alertPicStatus="alertPicStatus" @alert-call-back="setCallBack"></Pic>
		<Contact :ContactStatus="ContactStatus" v-on:contactCallback="contactCallBack" :owner="detail.owner"  :objectType="objectType" :objectId="id"></Contact>
		<Alert   :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert" :index="index"></Alert>

		<!-- service弹窗 -->
		<dialogBox v-model="dialogStatus" confirmShow="true" confirmText="Confirm" @confirmCallback="confirmCallback" width="900">
			
			<div class="tip_title"> Thank you. You have submitted your Inquiry successfully! <br>We will get back to you within 1 day.</div>

			<div class="service_box">
				<p class="tip_detail">A confirmation email has been sent to “{{inqueryEmailOld}}”,<br>Please check. If you have not received it, please check your junk mail folder. If you still do not see it,<br>please <a @click="showEmailBox=true">click here</a> to enter your correct or alternative email address.</p>
				<div class="email_box" v-show="showEmailBox">
					<input type="text" v-model="inqueryEmail">
					<span class="btn_sendemail" @click="sendEmail">Resend email address</span>

					<div class="email_tip red" v-show="emailTip">Please enter a valid email</div>
					<div class="email_tip green" v-show="emailSendTip"><i class="iconfont">&#xe654;</i> Email address has been updated ,and We have sent an email to your new mailbox</div>
				</div>

				
			</div>

			<service></service>
			
		</dialogBox>
	</div>

</template>

<script>
	import {
		GetDateStr,
		addmulMonth,
		getUrlParams,
		getParents
		
	} from "~/assets/js/plugin/utils";
	import Contact from '~/components/Contact/Contact';
	import Alert from '~/components/Prompt/Alert';
	import service from '~/components/pageComponents/inquiry/service';
	import dialogBox from '~/plugins/panda/dialogBox';
	import Flatpickr from 'flatpickr';
	require('~/assets/scss/G-ui/flatpickr.min.css')
	import Pic from "~/components/pageComponents/activity/details/Pic"
	import grade from "~/components/pageComponents/activity/details/grade"
	import { Timeline, TimelineItem, TimelineTitle } from '~/plugins/panda/stepline'
import { setTimeout } from 'timers';
	export default {
		props: [
			"isShowMeau",
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
			//"photoList",
			"travelersReviews",
			"userABtestID",
			"ABtest",
			"isABtestShow",
			"value",
			"AvailableDate",
			"participants",
			"exchange"
		],
		name: "Activities",
		
		data() {
			return {
				number:2,//起价
				PriceDetail: [], //价格明细
				open: null,
				//infant: 0, //婴儿
				dateTime: "", //riqi
				adults: 0, //成人  默认1人
				children: 0, //儿童
				people:'',
				time: "",
				isShowBook: false,
				isShowAdults: false,
				isShowTime: false,
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
				//exchange:[],
				picList:[],
				mouseTime:null,
				detailAll:[],
				index:0,
				pageNum:1,
				pageSize:3,
				showMoreBth:false,
				showMoreTag:false,
				tagAttractions:[],
				showNewStyle:false,
				itinerary:[],//行程折叠
				showMoreItinerary:false,
				minPeople:0,
				startingPrice:0,
				selectExchange:'USD',
				
				dialogStatus:false,
				emailTip:false,
				emailSendTip:false,
				showEmailBox:false,
				inqueryEmail:'',
				inqueryEmailOld:'',
				feedbackId: ''
			};
			
		},
		components: {
			grade,
			Pic,
			Contact,
			Alert,
			service,
			dialogBox,
			Timeline, 
			TimelineItem, 
			TimelineTitle
		},
		methods: {
			confirmCallback(){
				this.dialogStatus = false;
			},
			sendEmail(){
				var that = this;
				if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.inqueryEmail)){

					//默认是修改feedback的邮箱
					var postData = {
						emailAddress: this.inqueryEmail,
						id: this.feedbackId
					};
					var postUrl = "https://api.localpanda.com/api/user/feedback";

					//修改邮箱请求
					that.axios.post(postUrl, JSON.stringify(postData), {
						headers: {
							'Content-Type': 'application/json'
						}
					}).then(function(response) {
						if(response.data.succeed) {
							that.emailSendTip = true;
							that.inqueryEmail = '';
						};

					}, function(response) {

					})
					this.emailTip = false;
				}else{
					this.emailTip = true;
				}
			},
			getPrice(){
				var picInfo=this.picInfo.details
				for(var i=0;i<picInfo.length;i++){
					if(this.people==picInfo[i].capacity){
						return {price:picInfo[i].price,perPersonPrice:picInfo[i].perPersonPrice}
					}
				}
			},
			submitFn(){
				this.people=this.adults+this.children
				if(this.people < this.picInfo.minParticipants){
					this.people='Select'
					this.error = true;
					this.dateErrText = "*Mimimum number of travelers:" + this.picInfo.minParticipants + ".";
					this.startingPrice=this.returnFloat(this.picInfo.bottomPrice)
					this.isShowBook=false
				
				}else{
					
					this.isShowAdults=false
					this.startingPrice=this.returnFloat(this.getPrice().perPersonPrice)
				}
			},
			tagFn(){
				this.showMoreTag=!this.showMoreTag
				if(this.showMoreTag){
					this.tagAttractions=this.detail.attractions.concat().splice(0,4)	
				}else{
					this.tagAttractions=this.detail.attractions
				}
			},
			fn(){
				this.showMoreItinerary=false
				if(this.showMoreItinerary){
					
					this.itinerary=this.detail.itineraries.concat().splice(0,3)	
				}else{
					this.itinerary=this.detail.itineraries
				}
			},
			delNullArr(array){
				for(var i = 0; i < array.length; i++) {
					if(array[i] == "" || typeof(array[i]) == "undefined") {
						array.splice(i, 1);
						i = i - 1;

					}

				}
				return array;

			},
			//点评翻页
			moreReviews(){
				let self=this	
				this.pageNum++
				let params={
					activityId:this.id,
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					status:1
				}
				this.axios.post('https://api.localpanda.com/api/user/comment/list',JSON.stringify(params),{
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(res=>{
					let data=res.data
					console.log(data)
					if(data.entities&&data.entities.length>0){
						if(data.entities.length<self.pageSize){
							self.showMoreBth=true
						}
						for(var i = 0 ;i<data.entities.length;i++){
							data.entities[i].text280=false
							self.travelersReviews.entities.push(data.entities[i])
						}
						
					}else{
						self.showMoreBth=true
					}
				},res=>{})
			},
			//点评内容显示
			showText(index){
				this.travelersReviews.entities[index].text280=true	
			},
			changeCurrency(e){
				var self = this;
				var value = e.target ? e.target.value : e;
				var picInfo = this.picInfo;
				var thisDetail = picInfo.details;
				//换算折扣价
				var exchange = this.exchange;
				for(var i=0;i<exchange.length;i++){
					var thisEx = exchange[i];
				 	//检测当前货币类型
				 	if(thisEx.code==value){
				// 		//设置当前币种
						 this.nowExchange = thisEx;
					 }
				}
				// 		//切换折扣价币种
				// 		picInfo.currency = value;
				// 		picInfo.symbol = thisEx.symbol;
				// 		picInfo.bottomPrice = picInfo.defaultPrice.bottomPrice * thisEx.exchangeRate;
				// 		picInfo.originalPrice = picInfo.defaultPrice.originalPrice * thisEx.exchangeRate;
				// 		if(picInfo.defaultPrice.childDiscount){
				// 			//之所以在这里加returnFloat，是为了让儿童优惠后的总价格，不会超过总价-儿童优惠价
				// 			picInfo.childDiscount =picInfo.defaultPrice.childDiscount * thisEx.exchangeRate;
				// 		}
				// 		//切换价格详情币种
				// 		for(var i=0;i<thisDetail.length;i++){
				// 			thisDetail[i].price = thisDetail[i].defaultPrice * thisEx.exchangeRate;
				// 		}

				// 		//切换详情币种
				// 		var sixArr = this.sixArr;
				// 		for(var i=0;i<sixArr.length;i++){
				// 			//之所以在这里加returnFloat，是为了让儿童优惠后的总价格，不会超过总价-儿童优惠价
				// 			sixArr[i].price = sixArr[i].defaultPrice * thisEx.exchangeRate;
				// 		}
						
				// 		break;
				// 	}
				// }
				// if(self.people>0){
				// 	self.adultsPic = thisDetail[this.people-1].price;
				// 	// self.amount = that.children > 0 && picInfo.childDiscount ?
				// 	// 		self.returnFloat(self.returnFloat(self.adultsPic) - self.returnFloat(self.children * self.picInfo.childDiscount)) :
				// 	// 		self.returnFloat(self.adultsPic);
				// }
					
					// self.axios.get("https://api.localpanda.com/api/product/activity/"+this.id+"/price?currency="+value).then(function(res) {
							// self.picInfo.childDiscount=res.data.childDiscount
							// self.picInfo.currency=res.data.currency
							// self.picInfo.bottomPrice=res.data.bottomPrice
					// }, function(res) {
						
					// });
					
					// self.axios.get("https://api.localpanda.com/api/product/activity/"+this.id+"/price/detail?currency="+value).then(function(res) {
							// self.picInfo.details=res.data
							// self.sixArr=res.data
							// if(res.data.length>6){
							// 	self.isShowTable=true
							// 	self.sixArr=res.data.concat().splice(0,6);
							// }else{
							// 	self.sixArr=res.data;
							// }
					// }, function(res) {
						
					// });
					// if(self.people>0){
					// 	self.startingPrice = self.returnFloat(self.picInfo.details[self.people-1].price/self.people);	
					// }else{
					// 	self.startingPrice=self.returnFloat(self.picInfo.bottomPrice)
					// }
					// console.log(self.startingPrice)

					const p1 = new Promise(function (resolve, reject) {
						self.axios.get("https://api.localpanda.com/api/product/activity/"+self.id+"/price?currency="+value).then(function(res) {
							// self.picInfo.childDiscount=res.data.childDiscount
							// self.picInfo.currency=res.data.currency
							// self.picInfo.bottomPrice=res.data.bottomPrice
							resolve(res)
						}, function(res) {
							
						});
					});

					const p2 = new Promise(function (resolve, reject) {
						self.axios.get("https://api.localpanda.com/api/product/activity/"+self.id+"/price/detail?currency="+value).then(function(res) {
							// self.picInfo.details=res.data
							// 	self.sixArr=res.data
							// 	if(res.data.length>6){
							// 		self.isShowTable=true
							// 		self.sixArr=res.data.concat().splice(0,6);
							// 	}else{
							// 		self.sixArr=res.data;
							// 	}
							resolve(res)
						}, function(res) {
							
						});
					
					})
					Promise.all([p1,p2]).then(results=>{
							if(self.picInfo.childDiscount){
								self.picInfo.childDiscount=results[0].data.childDiscount
							}
							
							self.picInfo.currency=results[0].data.currency
							self.picInfo.bottomPrice=results[0].data.bottomPrice
							

							self.picInfo.details=results[1].data
							self.sixArr=results[1].data
							if(results[1].data.length>6){
								self.isShowTable=true
								self.sixArr=results[1].data.concat().splice(0,6);
							}else{
								self.sixArr=results[1].data;
							}
							if(self.people>0){
								self.startingPrice = self.returnFloat(self.getPrice().perPersonPrice);
								self.adultsPic= self.returnFloat(self.getPrice().price)	
							}else{
								self.startingPrice=self.returnFloat(self.picInfo.bottomPrice)
							}

					})



				//当前币种
				console.log(this.nowExchange)
				self.$emit('input',this.nowExchange);

				//请求推荐模块
				this.axios.get("https://api.localpanda.com/api/product/activity/"+this.id+"/recommend?currency="+value+(this.participants?'&participants='+this.participants:'')).then(function(res) {
					if(res.status==200){
						self.$emit('currencyChange',res.data);
					}
				}, function(res) {});
				
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
			
			getIsShowAlert(val){
				this.isShowAlert=val
			},
			contactCallBack(val){
				if(val){
					var data = val.data;
					this.feedbackId = data.response;
					this.inqueryEmailOld = val.email;
					this.dialogStatus = true;
				}
				

				this.istrue=val?true:false;
				if(this.istrue==true){
					// this.isShowAlert=true
					// this.alertTitle="Submission completed!"
					// this.alertMessage="Thank you for your feedback.We will get back to you within 1 day."
					// this.istrue=false
				}else{
					this.isShowAlert=true
					this.alertMessage="Failed!"
				};

				//关闭弹窗
				this.ContactStatus=false
			},
			showContact() {
				let that = this;
				window.ga && ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
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
				this.picList=this.photoList;
				this.alertPicStatus = true
				
			},
			showTavelPhotoList(index,userCommentPhoto){
				this.picList=userCommentPhoto;
				this.index=index
				this.alertPicStatus = true
				console.log(this.index)
			},
			setCallBack(val) {
				this.alertPicStatus = val
			},
			showVeiwMore() {
				this.isShowView = true;
				window.ga && ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "Click",
					eventLabel: "activity_view_more"
				});
			},
			showNode() {
				this.isShowPicNode = true;
			},
			hidden() {
				let that=this
				that.mouseTime=setTimeout(function(){
					that.isShowPicNode = false;
				},300)	
			
				
			},
			showNodeCont(){
				clearTimeout(this.mouseTime)
				this.isShowPicNode = true;
			},
			hiddenCont() {
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
			returnUrl(val){
				let enVal=encodeURIComponent(val)
				let url="/activity/list/"+enVal
				return url
			},
			returnFloat(value) {
				if(value) {
					var bit = bit || 2;
					var numberArr = (''+value).split('.');
					if(numberArr.length>1 && numberArr[1].length>bit){
						var zeroStr = '';
						for(var i=0;i<bit;i++){
							zeroStr+='0';
						}
						return (value+('0.'+zeroStr+'5')*1).toFixed(bit);
					}
					return value.toFixed(bit);
				}else{
					return 0;
				}
			},
			showTable() {
				this.isShowTable = false
				this.sixArr=this.picInfo.details
			},
			
			add(id) {
				if(id == 0) {
					this.adults++;
				} else if(id == 1) {
					this.children++;
				} 
//				else {
//					this.infant++;
//				}
			},
			del(id) {
				if(id == 0) {
					this.adults--;
				} else if(id == 1) {
					
					this.children--;
					console.log(this.people)
				}
//				else {
//					this.infant--;
//				}
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
				let that=this
				if(this.people=='Select'&&!this.error){
					this.adults=1
					// this.people=this.adults+this.children
					// this.startingPrice=this.returnFloat(this.picInfo.details[this.people-1].price/this.people)
				}
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
				
				if(this.isShowTime == true) this.isShowTime = false;
				setTimeout(()=>{
					that.isShowAdults = !that.isShowAdults;
				},50)
				if(!that.isShowAdults){
					if(that.error){
						that.isShowAdults=true
					}
				}
				
				// if(that.isShowAdults){
				// 	that.people=that.adults+that.children
				// 	that.adultsPic=that.picInfo.details[that.people-1].price;
				// 	that.startingPrice=that.returnFloat(that.picInfo.details[that.people-1].price/that.people)
				// }else if(that.people=='Select'){
				// 	that.startingPrice=that.returnFloat(that.picInfo.bottomPrice)
				// }
				// this.isShowBook = true;
				this.$emit('showPeople',true)
				
				
			},
			gaFail(){
				window.ga && ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "click",
					eventLabel: "activity_book_fail"
				});
			},
			order() {
				let that = this;
				let isFail=true
				if(that.people == "Select"){
						that.isShowAdults=true
						that.adults =!that.error?1:that.adults;
						
						that.people = that.adults + that.children;
						if(that.people < that.picInfo.minParticipants){
							that.people='Select'
							that.adultsPic=that.picInfo.bottomPrice
							that.startingPrice=that.picInfo.bottomPrice
						}else{
							that.adultsPic=that.returnFloat(that.getPrice().price)
							that.startingPrice=that.returnFloat(that.getPrice().perPersonPrice)
						}
						
				}else if(that.people < that.picInfo.minParticipants) {
					isFail=true
					that.error = true;
					that.isShowAdults = true;
					that.dateErrText = "*Mimimum number of travelers:" + that.picInfo.minParticipants + ".";
					//默认帮用户选一个游玩人
					// if(that.people == "Select") {
					// 	that.adults = that.adults + 1;
					// 	that.people = that.adults + that.children;
					// 	that.adultsPic=that.returnFloat(that.picInfo.details[that.people-1].price)
					// }
				}else if(that.dateTime == "") {
					that.isSelectDate = true;
					//that.dateErrText = "*Please select a date first.";
					//弹出日历
					that.flatPickr.open();
					isFail=true
				}  else {
					isFail=false
					window.ga && ga(gaSend, {
						hitType: "event",
						eventCategory: "activity_detail",
						eventAction: "click",
						eventLabel: "activity_book_succ"
					});
					that.error = false;
					that.isSelectDate = false;
					
					//that.dateErrText = "*Final headcount does not include babies.";
					var orderInfo = {
						userId: localStorage.getItem("userid") ?
							localStorage.getItem("userid") : null,
						activityId: that.detail.activityId,
						refundTimeLimit: that.picInfo.refundTimeLimit,
						fullRefund:that.picInfo.fullRefund,
						amount: that.children > 0 && that.picInfo.childDiscount ?
							that.returnFloat(that.adultsPic - that.returnFloat(that.children * that.picInfo.childDiscount)) :
							that.adultsPic,
						details: that.picInfo.details,
						currency: that.picInfo.currency,
						peopleNum:that.people,
						symbol: that.nowExchange.symbol,
						adultNum: that.adults?that.adults:that.people,
						childrenNum: that.children,
						//infantNum: that.infant,
						startDate: that.dateTime,
						startTime: that.time ? that.time : null,
						adultsPic: that.adultsPic,
						coverPhotoUrl: that.detail.coverPhotoUrl,
						title: that.detail.title,
						childDiscountP: that.returnFloat(that.picInfo.childDiscount),
						childDiscountPP: that.picInfo.childDiscount?that.returnFloat(that.picInfo.childDiscount):0,
						//category: that.detail.category,
						pickup:that.detail.pickup,
						averagePrice: that.returnFloat(
							that.adultsPic / (that.adults + that.children!=0?that.adults + that.children:that.people)
						),
						childDiscount: that.picInfo.childDiscount ?
							that.returnFloat(that.children * that.picInfo.childDiscount) :
							null
					};
					console.log(orderInfo)
					orderInfo = JSON.stringify(orderInfo);

					localStorage.setItem("orderInfo", orderInfo);


					//点评ABtest
					// if(this.isABtestShow){
					// 	ga(gaSend, {
					// 		hitType: 'event',
					// 		eventCategory: 'activity_detail',
					// 		eventAction: 'abtest_comment',
					// 		eventLabel: 'book',
					// 	});
					// }

					location.href = "/activity/booking/"+that.detail.activityId

					//routes.push('/fillYourInfo')
				}
				if(isFail){
					this.gaFail()
				}
			},
			goReview(){
				var anchor = document.getElementById("review")
				document.body.scrollTop = anchor.offsetTop+document.getElementById("banner").offsetHeight+60-76
				document.documentElement.scrollTop =anchor.offsetTop+document.getElementById("banner").offsetHeight+60-76
			},
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
				let that=this
			
				
			},
			children(val, oldVal) {
				//this.people =val + this.adults;
			},
			people(val, odlVal) {
				let that = this;
				
				if(val >= that.picInfo.minParticipants) {
					that.error = false;
					that.dateErrText = "*Final headcount does not include babies.";
				}
				
				if(val>0&&!this.error){
					that.isShowBook = true;
					that.adultsPic=that.returnFloat(that.getPrice().price);
					
				}
				
				
			},
			
			isShowBook(val, oldVal) {
				
				if(val) {
					this.isShow = true;
				} else {
					this.isShow = false;
				}
			},
			'flatPickr.isOpen':function(val,oldVal){
				if(val){
					this.isSelectDate = false;
					document.body.style.overflowY="hidden"
				}else{
					document.body.style.overflowY="visible"
				}
			},
			value:function(val){
				let that=this
				this.nowExchange = val;
				this.selectExchange=val.code
				this.changeCurrency(val.code)
			},
			feedbackId:function(){
				this.emailTip = false;
				this.emailSendTip=false;
				this.showEmailBox=false;
				this.inqueryEmail='';
			}

//			isShowAdults(val,oldVal){
//				let that=this
//				if(val){
//					that.adults=that.people
//					
//				}
//				
//				
//			}
		},
		filters: {
			firstUpperCase(val) {
				if(val)
					return val.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
			},
			replaceVal(val){
				if(val){
					//return val.replace(/\r\n/g,'<br>');
				}
			}
		},
		created:function(){
			let that=this
			
		},
		mounted: function() {
			
			let that = this;
			//ab test 行程
			if(this.$route.query.newStyle||this.detail.newType){
				this.showNewStyle=true	
			}else{
				this.showNewStyle=false	
			}
			
		//tag
		if(this.detail.attractions&&this.detail.attractions.length>0){
				if(this.detail.attractions.length>4){
					this.showMoreTag=true
					this.tagAttractions=this.detail.attractions.concat().splice(0,4)	
				}else{
					this.tagAttractions=this.detail.attractions
				}
				
			}	

	//行程折叠
		
			if(this.detail.itineraries&&this.detail.itineraries.length>0){
				if(this.detail.itineraries.length>3){
					this.showMoreItinerary=true
					this.itinerary=this.detail.itineraries.concat().splice(0,3)	
				}else{
					this.itinerary=this.detail.itineraries
				}
				
			}
			
			//人数

			//最低价格人数
			var picInfo=that.picInfo.details
			
			for(var i=0;i<picInfo.length;i++){
				
				// console.log(picInfo[i].price)
				// console.log(picInfo[i].capacity)
				if(that.picInfo.bottomPrice==that.returnFloat(picInfo[i].price/picInfo[i].capacity)){
					
					that.minPeople=picInfo[i].capacity
				}else{
					that.minPeople=that.picInfo.maxParticipants
				}
			}
			

			let participants=this.participants;
			
			if(participants==0){
				that.people="Select"
				that.startingPrice=that.returnFloat(that.picInfo.bottomPrice)
			}else{
				that.people=parseInt(participants)<that.picInfo.minParticipants?that.picInfo.minParticipants:parseInt(participants);
				//大于最大人数时，人数设置最大人数
				if(that.people>this.picInfo.maxParticipants){
					that.people=this.picInfo.maxParticipants;
				}
				that.adultsPic=that.returnFloat(that.getPrice().price);
				that.startingPrice=that.returnFloat(that.getPrice().perPersonPrice)
				that.isShowBook=true
				that.adults= that.people-that.children
			}
		

			

			
			//that.people=participants?(that.picInfo.maxParticipants==1?1:parseInt(participants)):(that.picInfo.minParticipants<3?(that.picInfo.maxParticipants==1?1:2):that.picInfo.minParticipants);
			
			
			//that.people=that.picInfo.minParticipants<3?that.picInfo.maxParticipants:(participants?parseInt(participants):that.picInfo.minParticipants)
			// if(that.people!='Guests Number'){
				
			// }
			
			//that.setPriceData();
			// that.detailAll = that.tableData(that.picInfo.details);
			
			
			var currency= JSON.parse(Cookie.get('currency'))?JSON.parse(Cookie.get('currency')):{'code':'USD','symbol':'$'};
			 //that.exchange=currency
			 that.nowExchange=currency
			that.selectExchange=currency.code
			 
			//调整数据，设置默认价格 
			
			// if(that.picInfo.childDiscount){
			// 	that.picInfo.childDiscountDefault = that.picInfo.childDiscount;
			// 	console.log(that.picInfo.childDiscountDefault)
			// }
			
			//加载币种
			// that.axios.get("https://api.localpanda.com/api/public/currency/all/"+that.picInfo.currency).then(function(response) {
			// 	// console.log(response);
			// 	if(response.status==200){
			// 		that.exchange = response.data;
			// 		that.nowExchange = that.exchange[0];
			// 	}
			// }, function(response) {});

			//this.sixArr=this.tableData(this.picInfo.details)

			//初始化清空日期
			that.dateTime = ""
			
			
//			console.log(that.detailAll)
			if(that.picInfo.details.length>6){
				this.isShowTable=true
				that.sixArr=that.picInfo.details.concat().splice(0,6);
			}else{
				that.sixArr=that.picInfo.details;
			}

			
			
			//that.sixArr=that.tableData(that.picInfo.details)
			//初始化日历
			
				var AvailableDate=[]
				for(var i=0;i<that.AvailableDate.length;i++){
					AvailableDate.push(that.AvailableDate[i].saleDate)
				}
				
				that.flatPickr = new Flatpickr('#js_changetime', {
					minDate: that.picInfo.earliestBookDate,
					maxDate: addmulMonth(that.picInfo.earliestBookDate, 12),
					enable:AvailableDate
				});
			


			// document.querySelector('.Guests .choose').addEventListener("click", function(e) {
			// 	e.stopPropagation();
			// });
			document.getElementsByTagName("body")[0].addEventListener("click", function(e) {
					
					var target = e.target;

					if(!getParents(target,'choose')){
						if(that.isShowAdults){
							that.people=that.adults+that.children
							if(that.people<that.picInfo.minParticipants){
								that.people='Select'
								that.error=true
								that.isShowAdults=false
								that.dateErrText = "*Mimimum number of travelers:" + that.picInfo.minParticipants + ".";
								that.isShowBook=false
								that.startingPrice=that.returnFloat(that.picInfo.bottomPrice)
								return false
							}else{
								that.adultsPic=that.returnFloat(that.getPrice().price);
								that.startingPrice=that.returnFloat(that.getPrice().perPersonPrice)
								that.isShowTime = false;
								that.isShowAdults=false
							}
							
						}else if(that.people=='Select'){
							that.startingPrice=that.returnFloat(that.picInfo.bottomPrice)
						}
					}
					
					

					
					
					
				});
			

			document.querySelector('body').className = "acitivity_detail";
		}
	};
</script>

<style lang="scss" scoped>
	//@import '~/assets/font/iconfont.css';
	.inputColor{
		color:#878e95;
	}
	.question{
		display: inline-block;
		text-align: center;
		width: 20px;
		height: 20px;
		line-height: 20px;
		background: #878e95;
		color: #fff;
		border-radius: 50%;
		margin-left:20px;
		position: relative;
		cursor: pointer;
	}
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
				margin-top: 30px;
				.linkinfo {
					float: left;
					width: 80%;
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
				.productId {
						float: right;
						font-size: 12px;
						color: #878e95;
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
					z-index: 9;
					box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
					.bookbox {
						.picPp {
							
							padding: 10px 10px 10px 20px;
							min-height: 50px;
							background: #353a3f;
							font-size: 14px;
							.picLeft {
								color: #fff;
								float: left;
								position: relative;
								margin-right:15px;
								top:8px;
								b {
									font-size: 24px !important;
									vertical-align: middle;
									margin: 0 6px;
								}
								.iconfont{
									position: absolute;
									right: 0;
									top:0;
									text-align:center;
									font-size:18px;
								}
								
							}
							.picRight {
								color: #fff;
								span {
									font-size: 10px;
								}
								
							}
							.priceNote {
								background: #fff;
								padding: 16px;
								position: absolute;
								z-index: 200;
								top: 40px;
								font-size: 14px;
								box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
								z-index: 20;
								width: 100%;
								left: 0px;
								p {
									
									line-height: 20px;
								}
								a{
									color: #1bbc9d;
									text-decoration: underline;
								}
							}
							.currency_type{
								border:none;
								padding-right: 20px;
								font-size: 16px;
								background:none;
								cursor: pointer;
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
									width: 100%;
									
									.flatpickr-input {
										height: 40px !important;
										padding-left: 10px !important;
										width: 100%;
										border-color: #e3e5e9;
										border-right: none;
										border-radius: 0px 3px 0px 3px !important;
										&:hover {
											border-color: #e3e5e9 !important;
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
										top: 15px;
										
									}
									.choose {
										position: absolute;
										z-index: 100;
										top: 42px;
										left: 0px;
										width: 346px;
										box-shadow: 0px 2px 10px 0px rgba(53, 58, 63, 0.2);
										background: #fff;
										padding:35px 20px;
										.submit{
											margin-top:30px;
											padding:0 20px;
											button{
												background-image: linear-gradient( 270deg, #009efd 0%, #1bbc9d 100%);
												color:#fff;
												line-height: 42px;
												font-size: 16px;
												font-weight: bold;
												border-radius: 30px;
												height:42px;
												text-align:center;
												width:100%;
											}
										}
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
											margin-top: 20px;
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
								button,a {
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
									
								}
								.inquiry_box{
									.inquiryBtn{
										background:#fff;
										border:1px solid #1bbc9d;
										color: #1bbc9d;
										width: 100%;
										display: inline-block;
										cursor: pointer;
									}
									.inquiryBtn:nth-child(1){
										// float: right;
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
					background:rgba(27, 188, 157, .06);
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
				
				.activitiyTitle {
					margin-top:30px;
					h3 {
						font-weight: bold;
						font-size: 32px;
						vertical-align:middle;
						span{
							vertical-align:bottom;
							display: inline-block;
							margin-right: 10px;
							font-size: 18px!important;
							padding: 7px 9px;
							color: #fff;
							border-radius: 5px;
							&.pr{
								background:#52b589;
							}
							&.gr{
								background:#efae99;
							}
						}
					}
					.service{
						margin-top: 30px;
						span{
							display: inline-block;
							margin-right:40px;
							margin-bottom: 5px;
							&:last-child{
								margin-right: 0;
							}
							label{
								font-size: 16px;
								display: inline-block;
								margin-right:8px;
							}
							.fs14{
								font-size:14px;
							}
							em{
								font-size: 16px;
								
							}
						}
					}
					.types {
						p{
							font-size: 16px;
							color: #878e95;
							margin-top: 9px;
						}
						a {
								color: #1bbc9d;
								margin-top: 12px;
								font-size: 14px;
								margin-right:6px;
								padding:3px 6px;
								border:1px solid #1bbc9d;
								border-radius: 5px;
								display:inline-block;
								cursor:pointer; 
								&:last-child{
									margin-right: 0;
								}
						}
						
					}
				}
				.says {
					margin-top: 30px;
					font-style: oblique;
					border-bottom: 1px solid #dde0e0;
					font-size: 16px;
					line-height: 26px;
					color: #353a3f;
					padding-bottom: 30px;
				}
				.heightLights {
					padding: 30px 0;
					border-bottom:1px solid #dde0e0;
					.heightLightsList{
						font-size: 18px;
						margin-top: 12px;
						padding-left:14px;
						position:relative; 
						&:first-child {
							margin-top: 0;
						}
						&:after{
							position: absolute;
							content: '';
							width: 5px;
							height: 5px;
							left: 0;
							border-radius: 50%;
							background:#353a3f;
							top: 50%;
							transform: translateY(-50%);
						}
					}
					.expect {
						h3 {
							font-size: 24px;
							font-weight: bold;
						}
						.introductionCont {
							margin: 15px 0 20px;
							font-size: 18px;
							line-height: 26px;
						}
						.introduction {
							overflow: hidden;
							p{
								font-size: 16px;
								line-height: 26px;
								margin: 15px 0 20px;
							}
						}
						.viewMore {
							color: #1bbc9d;
							font-size: 18px;
							cursor: pointer;
						}
					}
				}
			.journey {
				.more{
					display:inline-block;
					padding-left:15px;
					font-size:16px;
					color:#1bbc9d;
					font-weight:bold;
					margin-top:20px;
				}
				padding-bottom: 34px;
				border-bottom: 1px solid #dde0e0;
					h3{
						margin: 28px 0 22px;
						
						font-size: 24px;
						font-weight: bold;
					}
					.old {
						margin-top: 28px;
						
						
						li {
							&:last-child{
								.item{
									padding-bottom: 0!important;
								}
								.item_v{
									.contTitle{
										padding-bottom: 0!important;
									}
								}
							}
							&:nth-of-type(odd) {
								background: rgba(27, 188, 157, 0.06);
							}
							.item {
								padding: 15px 0;
								.cont_title {
									
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
									padding: 15px 0 15px 20px;
									width:100%;
									
									h3 {
										font-size: 18px;
										font-weight: bold;
										margin: 0 0 10px 0!important;
										
									}
									div {
										font-size: 18px;
										line-height: 26px;
										
									
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
					.itinerary_tip{
						margin-top: 20px;
						font-size:14px;
						
						.red{
							color: #f00;
						}
					}
				}
				.provide {
					margin-top: 30px;
					padding-bottom: 30px;
					border-bottom: 1px solid #dde0e0;
					.picNote{
						font-size: 18px;
						margin-top: 20px;
					}
					.inclusions  {
						width: 47%;
						float: left;
						margin-right: 3%;
					}
					 .exclusions{
					 	width: 50%;
						float: left;
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
								margin-top: 25px;
							}
						}
					}
				}
				.notes {
					margin-top: 30px;
					padding-bottom: 30px;
					border-bottom: 1px solid #dde0e0;
					h3 {
						font-size: 24px;
						font-weight: bold;
						margin-bottom: 24px;
					}
					ul{
						li{
							padding-left: 20px;
							display: inherit;
							margin-top: 15px;
							font-size: 18px;
							position: relative;
							h5 {
								font-size: 18px;
							}
							span {
								display: inline-block;
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
								margin-top: 25px;
							}
						}
					}
					p {
						font-size: 18px;
						line-height: 26px;
						margin-top: 10px;
						padding-left:15px;
						position: relative;
						&:after{
								content: "";
								position: absolute;
								width: 4px;
								height: 4px;
								border-radius: 50%;
								background: #353a3f;
								left: 0px;
								top: 10px;
						}
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
							height: 168px;
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
		/** 点评 **/
		.review{
			margin-top: 30px;
			h3{
				margin-bottom: 5px;
				font-size: 24px;
				font-weight: bold;
				float: left;
				margin-right: 18px;
			}
			.reviewItem{
				padding-bottom: 25px;
				border-bottom: 1px solid  #dde0e0;
				margin-top: 20px;
			}
			.headPhoto{
				float: left;
				width: 44px;
				height: 44px;
				background-image: linear-gradient(135deg,#1bbc9d 0%,#009efd 100%);
				border-radius: 50%;
				text-align: center;
				line-height: 44px;
				img{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
				span{
					font-size: 22px;
					color: #fff;
				};
			}
			.visitor{
				float: left;
				margin-left: 18px;
				h4{
					font-size: 16px;
					font-weight: bold;	
					float: left;
					margin-right: 16px;
				}
				.time{
					margin-top:9px;
					font-size: 14px;
				}
			}
			.reviewContent{
				margin-top: 20px;
				font-size: 16px;
				position: relative;
				line-height: 24px;
				word-wrap:break-word; 
				white-space:pre-wrap;
				span{
					cursor: pointer;
				}
			}
			ul{
				margin-top: 15px;
				li{
					float: left;
					margin-right: 16px;
					width: 109px;
					height: 109px;
					background:url("https://cloud.localpanda.com/activity/banners/11027_1106614229_U5251601.jpg");
					background-repeat:no-repeat;
					background-size:cover;
					background-position:center; 
					cursor:pointer;  
					&:last-child{
						margin-right: 0;
					}
				}
			}
			
		}
		.moreBtn{
			text-align: center;
			margin-top: 42px;
			button{
				width: 154px;
				height: 42px;
				text-align: center;
				cursor: pointer;
				line-height: 42px;
				color: #fff;
				font-weight: bold;
				border-radius: 20px;
				background-image: linear-gradient(270deg,#009efd 0%,#1bbc9d 100%);
				
			};
			
		}
		.sales{
			padding-top: 20px;
			span{
				font-size: 14px;
				color:#878e95;
				vertical-align:super;
			}
			.fl{
				float:right;
				margin-top: -6px!important;
				cursor: pointer;
			}
		}
		
		.tip_title{
			padding-top: 20px;
			text-align: center;
			font-size: 22px;
		}

		.service_box{
			font-size: 14px;
			.tip_detail{ 
				margin-top: 20px; font-size: 14px; line-height: 22px;
				a{ color:#00B886; cursor: pointer;
					&:hover{ text-decoration: underline;}
				}
			}
			.email_box{
				margin-top: 10px;
				input{
					width: 300px;
					border: 1px solid #ddd;
					height: 32px;
					line-height: 32px;
				}
				.btn_sendemail{
					display: inline-block;
					height: 32px;
					border-radius: 16px;
					line-height: 30px;
					padding: 0 20px;
					font-size: 14px;
					cursor: pointer;
					background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d));
					background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
					color: #fff;
					margin-left: 10px;
				}
			}
			.email_tip{
				margin-top: 9px;
				i{
					font-size: 14px;
				}
			}
			
			
		}
	
	}
</style>

<style lang="scss">
	.newItem{
		&:last-child{
			.timeline-item{
				padding-bottom: 0!important;
				&:after{
					width:0!important;
				}
			}
			
		}
	}
	.timeline-item{
		padding: 0 0 20px 80px!important;
			label{
				position: absolute;
				left: 0px;
				top: -3px;
				font-size: 16px;
			}
			h4{
				font-size: 18px;
				font-weight: bold;
			}
			p{
				margin-top:20px;
				font-size: 16px;
				line-height: 24px;
				
			}
			img{
				width: 652px;
				margin-top: 22px;
			}
		}
	
	
	

	
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

.acitivity_detail{
	.flatpickr-calendar{
		
	}
	.price_detail_left{
		text-align: left;
		padding-left: 50px;
	}
}
</style>