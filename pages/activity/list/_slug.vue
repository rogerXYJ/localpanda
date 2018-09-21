<template>
	<div class="activityList">
		<HeaderCommon :logIn="logIn" @closeSearchList="closeFn" :nowCurrency="currency" @headCurrency="headCurrencyFn"  :selectNumber="selectNumber"></HeaderCommon>
		
		<div class="banner" :style="bannerInfo?'background: url('+bannerInfo.bannerSrc+') no-repeat;':''">
			<div class="linerBackground">
				<div class="covertitle" v-if="bannerInfo">
					<h3>{{bannerInfo.title}}</h3>
					<h4>{{bannerInfo.subtitle}}</h4>
				</div>
				<div class="covertitle" v-else>
					<h3>Unlock Local Access to China</h3>
					<h4>Explore hundreds of unique, immersive and authentic experiences</h4>
				</div>
				<!--seach bar -->
				<div class="selectInfo">
					<input type="text" v-model="seachContent" @click.stop="showHot" maxlength="60" @keyup.enter="seachFn" autocomplete="off" placeholder="Attraction, Activity, Destination" />
					<div class="selectPeople">
						<!-- <span>{{postData.participants}} People <i class="iconfont">&#xe60f;</i></span>
						<input-number v-if="selectPeople" :participants="postData.participants" :selectNumber="selectNumber" @showSelectPeople="setSelectPeople" @getPeople="setPeople"></input-number> -->
						<select v-model="postData.participants" class="participants" @change="setPeople">
							<option v-for="(item,index) in participantsOptionFn()" :value="item.label">{{item.selectparticipant}}</option>
							
						</select>
						<i class="iconfont">&#xe60f;</i>
					</div>
					
					<button class="seachBtn" @click="seachFn">Search</button>
					<div class="hotRecommend clearfix" v-if="isShowHot" @click.stop="isShowHot=true">
						<div class="city">
							<h3>Popular Destinations</h3>
							<ul>
								<li v-for="item in options"><a @click.stop="gaRecommendation" :href="getUrl(item,'recommend')">{{item}}</a></li>
								
							</ul>
						</div>
						<div class="theme">
							<h3>Popular Choices</h3>
							<ul>
								<li v-for="item in thems"><a @click.stop="gaRecommendation" :href="getUrl(item,'recommend')">{{item}}</a></li>
							</ul>
						</div>
					</div>
					<div class="seachList" v-if="showSeachList">
						<ul>
							<li v-for="item in seachList">
								<a :href="getUrl(item.value,'suggest')" @click="gaSuggestion">
								<i class="iconfont" v-if="item.type=='DESTINATION'">&#xe610;</i>
								<i class="iconfont" v-else>&#xe609;</i>
								<span v-html="textHighlight(item.value)"></span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				
			</div>
		</div>
		<div class="slogn">
			<div class="slogn_box">
				<div class="slogn_item">
					<span class="iconfont">&#xe677;</span>
					<div class="slogn_cont">
						<h4>Bridging East and West</h4>
						<p>Our multicultural team understands what China has to </br>offer and what you as a traveler are looking for</p>
					</div>
				</div>
				<div class="slogn_item">
					<span class="iconfont">&#xe678;</span>
					<div class="slogn_cont">
						<h4>Exceptional Trips</h4>
						<p>We hand-pick our offerings to ensure excellence in </br> quality and competitive pricing</p>
					</div>
				</div>
				<div class="slogn_item">
					<span class="iconfont">&#xe651;</span>
					<div class="slogn_cont">
						<h4>Personalized Experiences</h4>
						<p>We work closely with you to deliver experiences </br> that fit your personality, interests, and travel style</p>
					</div>
				</div>
			</div>
		</div>
		<div class="page-content">
			<div class="page pageInfo clearfix">
				<div class="pageLeft">
					<div class="filterSeach" v-if="showSelected">
						<div class="title">
							<h3>My Search</h3>
							<span @click="clearAll">Clear All</span>
						</div>
						<div class="seachCont" v-for="(i,key,index) in filterCheck" v-if="filterCheck[key].length>0">
							<div class="seachTitle clearfix" >
								<h3>{{getFilterType(key.toUpperCase())}}</h3>
							</div>
							<div class="checked clearfix" v-for="(item,index) in i" @click="clearCheck(key,index)"> 
								<i class="iconfont">&#xe606;</i>
								<span v-if="key=='duration'">{{returnD(item)}}</span>
								<span v-else>{{item}}</span>
							</div>
							
						</div>
					</div>
					<div class="filterBox padding">
						<div class="title">
							<h3>Price / Person</h3>
						</div>
						<div class="filterItem1" v-if="currency.code == 'CNY'">
							 <el-slider
						      v-model="checkPrice"
						      :step="30"
						      range
						     :max="3030"
						     :format-tooltip="format"
						      @change="filterPriceChange"
						      >
						    </el-slider>
						    <div class="clearfix">
						    	<span style="font-size: 16px; position: relative;left: -4px;font-weight: bold;">{{currency.symbol}}{{checkPrice[0]}}</span>
						    	<span style="font-size: 16px; position: relative;float:right;right:-13px;top:-2px;font-weight: bold;">{{currency.symbol}}{{checkPrice[1]>3000?'3000+':checkPrice[1]}}</span>
						    </div>
						    
						</div>
						<div class="filterItem1" v-else-if="currency.code == 'JPY'">
							 <el-slider
						      v-model="checkPrice"
						      :step="500"
						      range
						     :max="50500"
						     :format-tooltip="format"
						      @change="filterPriceChange"
						      >
						    </el-slider>
						    <div class="clearfix">
						    	<span style="font-size: 16px; position: relative;left: -4px;font-weight: bold;">{{currency.symbol}}{{checkPrice[0]}}</span>
						    	<span style="font-size: 16px; position: relative;float:right;right:-13px;top:-2px;font-weight: bold;">{{currency.symbol}}{{checkPrice[1]>50000?'50000+':checkPrice[1]}}</span>
						    </div>
						    
						</div>
						<div class="filterItem1" v-else>
							 <el-slider
						      v-model="checkPrice"
						      :step="5"
						      range
						     :max="505"
						     :format-tooltip="format"
						      @change="filterPriceChange"
						      >
						    </el-slider>
						    <div class="clearfix">
						    	<span style="font-size: 16px; position: relative;left: -4px;font-weight: bold;">{{currency.symbol}}{{checkPrice[0]}}</span>
						    	<span style="font-size: 16px; position: relative;float:right;right:-13px;top:-2px;font-weight: bold;">{{currency.symbol}}{{checkPrice[1]>500?'500+':checkPrice[1]}}</span>
						    </div>
						    
						</div>
					</div>

					<div class="filterBox" v-for="(item,index) in aggregations" v-if="getObjLength(item.items)>1">
						<div class="title">
							<h3>{{getFilterType(item.type)}}</h3>
						</div>
						<div class="filterItem" v-if="item.type=='DURATION'">
							<checkbox-group  v-model="filterCheck.duration">
								<div class="checkboxlist" v-for="(i,key,index) in item.items">
									<checkbox :label="key"  :key="key">{{returnD(key)}} ({{i}})</checkbox>
								</div>
								
							</checkbox-group>
							<span class="viewMore" @click="showMore(filterCheck,item.items,item.type)" v-if="getObjLength(item.items)>6">View More</span>
						</div>
						<div class="filterItem" v-else>
							<checkbox-group  v-model="filterCheck[toLower(item.type)]">
								<div class="checkboxlist" v-for="(i,key,index) in item.items">
									<checkbox :label="key" :change="closeChecked" :key="key">{{key}} ({{i}})</checkbox>
								</div>
							</checkbox-group>
							<span class="viewMore" @click="showMore(filterCheck,item.items,item.type)" v-if="getObjLength(item.items)>6">View More</span>
						</div>
					</div>

				</div>

				<div class="pageRight">
					<div class="selectType clearfix" v-if="records>0">
						<div class="recommended">
							<select class="selectSort" @change="sortFn(selected)" v-model="selected">
								<option v-for="(item,index) in select" v-model="item.selectText">{{item.selectText}}</option>
							</select>
							<i class="iconfont">&#xe60f;</i>
						</div>
						<div class="all">
							<span class="pageSizeInfo" v-if="records==1">1 activity in total</span>
							<span class="pageSizeInfo" v-if="records==0">0 activity in total</span>
							<span class="pageSizeInfo" v-if="records>1"><b>{{records}}</b> activities in total</span>
						</div>
					</div>
					<div class="list-cont" v-if="records>0">
						<ul>
							<li class="activity-item" v-for="item in activityList">

								<a :href="'/activity/details/'+item.activityId" target="_blank">
									<div class="activity">
										<div class="activity-photo" v-lazy:background-image="item.coverPhotoUrl">
											<p class="type">{{item.category}}</p>
										</div>
									</div>
									<div class="activitDe">
										<div class="info">
											<div class="titleText" :title="item.title" style="-moz-box-orient: vertical;
										    -webkit-box-orient:vertical;">
												<span>{{item.title}}</span>
											</div>
											<!--<div class="recommendedReason" v-if="item.recommendedReason">{{item.recommendedReason}}</div>-->
											<div class="attractions clearfix" :title="item.attractions.join('  .  ')" style="color: #1bbc9d;" v-if="item.attractions && item.attractions.length>0"><b>{{item.attractions.length>1?'Interests: ':'Interest: '}}</b><span v-html="item.attractions.join('<b>  ·  </b>')"></span></div>
											<div class="destinations "><b>{{item.destinations.length>1?'Destinations':'Destination'}}:</b> {{item.destinations.join(' , ')}}</div>
											<div class="duration"><b>Duration:</b> {{item.duration}} {{item.durationUnit|firstUpperCase}}</div>
											
											
											
											<div class="activeType">
												<label class="tag_private" v-if="item.groupType=='Private'">{{item.groupType}}</label>
												<label class="tag_group" v-if="item.groupType=='Group'">{{item.groupType}}</label>
												
											</div>
											<div class="totalPic">
												<div class="nowPic">
													{{postData.participants==0?'From  ':''}}
													<b><span class="currency_code">{{currency.code}}</span>  {{currency.symbol}}{{postData.participants!=0?returnFloat(item.perPersonPrice):returnFloat(item.bottomPrice)}}</b><span>{{postData.participants!=0?(postData.participants>1?' pp for party of '+ postData.participants:' for 1 preson'):' pp'}}</span>
												</div>
												<p v-if="item.sales&&item.sales>0">Booked {{item.sales}} {{item.sales==1?'time':'times'}} (last 30 days)</p>
											</div>
										</div>

									</div>
								</a>
							</li>
						</ul>
						<div class="pagination-page" v-if="isdisabled">
							<el-pagination background layout="prev, pager, next"  :current-page="postData.pageNum" :total="records" class="el-pagination is-background" @current-change="handleCurrentChange" :page-size="16">
							</el-pagination>
						</div>
					</div>
					<div class="empty page" v-else>
						<p>No offerings that match your interests are found.</p>
						<p>You can try to modify your screening conditions or choose our "Customize Your Trip" option.</p>
						<p>We can collect your preferences and customize your ideal trip, free of charge.
							<a href="javascript:;" @click="showContact">Click here to start!</a>
						</p>
					</div>
				</div>

			</div>

		</div>

		<Foot></Foot>
		<FooterCommon :nowCurrency="currency" @headCurrency="headCurrencyFn"></FooterCommon>
		<Loading :loadingStatus="loadingStatus"></Loading>
		<Contact :ContactStatus="ContactStatus" v-on:contactCallback="contactCallBack" :objectType="objectType"></Contact>
		<Alert :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
		<filterModel :filterContent="filterContent" :filterCheck="filterCheck" :type="filterType" v-if="showModel" @callBack="setBack"></filterModel>	
	</div>
</template>

<script>
if (process.browser) {
  //require("~/assets/js/pages/talk.js");
}
import Vue from "vue";
import { SelectId, Pagination } from "element-ui";
import HeaderCommon from "~/components/HeaderCommon/HeaderCommon";
import FooterCommon from "~/components/FooterCommon/FooterCommon";
import Loading from "~/components/Loading/Loading";
//import Bottom from '~/components/bottom/Bottom'
import Contact from "~/components/Contact/Contact";
import Alert from "~/components/Prompt/Alert";
import Foot from "~/components/FooterCommon/Foot";
import { checkboxGroup, checkbox } from "~/plugins/panda/checkbox/";
import filterModel from "~/components/pageComponents/activity/list/filterModel";
import { createECDH } from "crypto";
//import inputNumber from '~/components/pageComponents/activity/list/input-number'
export default {
  name: "activityList",
  async asyncData({ route, store, error, apiBasePath, redirect, req }) {
    let options = route.query.opctions ? JSON.parse(route.query.opctions) : "";
    if (!route.query.opctions) {
      options = route.query.options ? JSON.parse(route.query.options) : "";
    }
    let slug = route.params.slug ? route.params.slug : "china";
    let sort = route.query.sort ? JSON.parse(route.query.sort) : "";
    let keyword = route.query.keyword ? route.query.keyword : "";
    let type = route.query.type ? route.query.type : "link";
    let loc =
      slug.toLowerCase() == "china" && !options && !keyword ? "Beijing" : slug;
    if (keyword) {
      loc = keyword;
    }

    let postData = {
      keyword: loc == "Xian" || loc == "xian" ? "Xi'an" : loc,
      pageNum: 1,
      pageSize: 16,
      participants: 0,
      type: type,
      currency: "USD",
      sort: {
        type: "SCORE"
      }
    };

    //获取页面cookie
    var userCookie = {};
    if (req) {
      var cookie = req.headers.cookie;
      if (cookie) {
        var cookieArr = cookie.split(";");
        for (var i = 0; i < cookieArr.length; i++) {
          var thisCookie = cookieArr[i].split("=");
          userCookie[thisCookie[0].trim()] = (thisCookie[1] || "").trim();
        }
      }
    }

    var currency = { code: "USD", symbol: "$", exchangeRate: 1 };
    if (userCookie.currency) {
      currency = JSON.parse(decodeURIComponent(userCookie.currency));
      postData.currency = currency.code;
    }
    var participants = 0;
    if (userCookie.participants) {
      participants = JSON.parse(decodeURIComponent(userCookie.participants));
      postData.participants = participants;
    }

    var price = [0, 505];
    if (currency.code == "CNY") {
      price = [0, 3030];
    } else if (currency.code == "JPY") {
      price = [0, 50500];
    }
    //兼容老的key，老key转为新key
    var oldType = function(text) {
      if (text == "TOURTYPE") {
        return "TOUR_TYPE";
      } else if (text == "DURATIONS") {
        return "DURATION";
      }
      return text;
    };

    //兼容老的key，新key转为老key
    var oldTypeKey = function(text) {
      if (text == "tour_type") {
        return "tourtype";
      } else if (text == "duration") {
        return "durations";
      }
      return text;
    };
    //根据url数据生成post需要的格式
    var postFilters = [];
    for (var key in options) {
      var keyUpper = key.toUpperCase();
      if (key != "price") {
        postFilters.push({
          type: oldType(keyUpper), //兼容老的字段
          filterValues: options[key]
        });
      } else {
        if (currency.code == "CNY") {
          if (options[key].maxValue > 3000) {
            postFilters.push({
              type: keyUpper,
              minValue: options[key].minValue
            });
          } else {
            postFilters.push({
              type: keyUpper,
              maxValue: options[key].maxValue,
              minValue: options[key].minValue
            });
          }
        } else if (currency.code == "JPY") {
          if (options[key].maxValue > 50000) {
            postFilters.push({
              type: keyUpper,
              minValue: options[key].minValue
            });
          } else {
            postFilters.push({
              type: keyUpper,
              maxValue: options[key].maxValue,
              minValue: options[key].minValue
            });
          }
        } else {
          if (options[key].maxValue > 500) {
            postFilters.push({
              type: keyUpper,
              minValue: options[key].minValue
            });
          } else {
            postFilters.push({
              type: keyUpper,
              maxValue: options[key].maxValue,
              minValue: options[key].minValue
            });
          }
        }

        price = [options.price.minValue, options.price.maxValue];
      }
    }
    if (sort) {
      postData.sort = sort;
    }
    if (options) {
      postData.filters = postFilters;
    }
    let obj = Object.assign({}, postData);
    //处理调用select 人数
    if (obj.participants == 0) {
      delete obj.participants;
    }
    //服务端请求数据
    let listdata = {};
    try {
      listdata = await Vue.axios.post(
        apiBasePath + "search/activity",
        JSON.stringify(obj),
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        }
      );
    } catch (err) {}
    var data = listdata.data;
    var listData = listdata.data.entities;

    let filterAll = {},
      filterCheck = {},
      selectNumber = {};

    if (data.aggregations) {
      data.aggregations.forEach(item => {
        var thisFilter = [];
        for (var key in item.items) {
          thisFilter.push(key);
        }
        //当前类型
        var thisType = item.type.toLowerCase();
        filterAll[thisType] = thisFilter; ////添加filter每种类型数据
        if (item.type == "MIN_PARTICIPANTS") {
          selectNumber.minValue = item.value;
        } else if (item.type == "MAX_PARTICIPANTS") {
          selectNumber.maxValue = item.value;
        }
        //检测url是否有老的筛选类型
        if (options[oldTypeKey(thisType)]) {
          filterCheck[thisType] = options[oldTypeKey(thisType)];
        } else {
          filterCheck[thisType] = options[thisType] ? options[thisType] : []; //添加filter每种类型默认check数据
        }
      });
    }

    var rankCheck = "Recommended";
    if (sort) {
      if (sort.type == "PRICE" && sort.reverse == true) {
        rankCheck = "Price :High to Low";
      } else if (sort.type == "PRICE" && sort.reverse == false) {
        rankCheck = "Price :Low to High";
      } else if (sort.type == "SALES") {
        rankCheck = "Popularity";
      }
    }
    //filterCheck排序
    var sortDefault = [
      "CATEGORY",
      "GROUP_TYPE",
      "ATTRACTION",
      "DURATION",
      "TOUR_TYPE",
      "CITY"
    ];
    //给数据添加排序的序号
    var newfilterCheck = {};
    var thisNumLength = 0;
    for (var key in filterCheck) {
      var thisKey = sortDefault[thisNumLength];
      if (thisKey) {
        thisKey = thisKey.toLowerCase();
        newfilterCheck[thisKey] = filterCheck[thisKey];
        thisNumLength++;
      }
    }

    //设置banner---开始
    var setBanner = function() {
      // if(!keyword){
      // 	return '';
      // }
      //判断获取头部和标题
      var bannerData = [
        {
          bannerSrc:
            "https://cloud.localpanda.com/activityList/banners/Beijing.jpg",
          keywords: ["Beijing"],
          title: "Beijing Tours & Activities",
          subtitle: "Explore China's 3000 Year-old Capital"
        },
        {
          bannerSrc:
            "https://cloud.localpanda.com/activityList/banners/ForbiddenCity.jpg",
          keywords: ["Forbidden City", "Forbidden Palace"],
          title: "Forbidden City - Beijing",
          subtitle: "Step Back in Time to Imperial China"
        },
        {
          bannerSrc:
            "https://cloud.localpanda.com/activityList/banners/GreatWall.jpg",
          keywords: [
            "The Great Wall",
            "Great Wall of China",
            "Great Wall Hiking",
            "Great Wall"
          ],
          title: "Great Wall of China - Beijing",
          subtitle: "Discover the Perfect Great Wall Trip for You"
        },
        {
          bannerSrc:
            "https://cloud.localpanda.com/activityList/banners/Hangzhou.jpg",
          keywords: ["Hangzhou"],
          title: "Hangzhou Tours & Activities",
          subtitle: "Incredible Day Trips from Shanghai"
        },
        {
          bannerSrc:
            "https://cloud.localpanda.com/activityList/banners/Panda.jpg",
          keywords: ["Pandas", "Giant Pandas", "panda"],
          title: "Giant Pandas - Chengdu",
          subtitle: "Hang out with China’s Favorite Animal"
        },
        {
          bannerSrc:
            "https://cloud.localpanda.com/activityList/banners/Shanghai.jpg",
          keywords: ["Shanghai"],
          title: "Shanghai Tours & Activities",
          subtitle: "Experience Life in China’s Biggest Metropolis"
        },
        {
          bannerSrc:
            "https://cloud.localpanda.com/activityList/banners/TheBund.jpg",
          keywords: ["The Bund", "Bund"],
          title: "The Bund - Shanghai",
          subtitle: "Where Shanghai’s Past & Future Meet"
        },
        {
          bannerSrc:
            "https://cloud.localpanda.com/activityList/banners/WaterTown.jpg",
          keywords: ["Water town", "Watertown"],
          title: "Suzhou & China’s Water Towns",
          subtitle: "Sleepy Canal Towns with Legendary Gardens"
        },
        {
          bannerSrc:
            "https://cloud.localpanda.com/activityList/banners/Xian.jpg",
          keywords: ["Xi'an", "Xian", "Terra-Cotta Warriors"],
          title: "Xi'an & Terracotta Warriors",
          subtitle: "See Where Imperial China was Born"
        },
        {
          bannerSrc:
            "https://cloud.localpanda.com/activityList/banners/Xian_01.jpg",
          keywords: ["Terracotta Warriors", "Terracotta", "Terracotta Army"],
          title: "Xi'an & Terracotta Warriors",
          subtitle: "See Where Imperial China was Born"
        }
      ];

      //设置当前banner
      for (var i = 0; i < bannerData.length; i++) {
        var thisKeywords = bannerData[i].keywords;
        for (var j = 0; j < thisKeywords.length; j++) {
          var thisData = thisKeywords[j];
          //if(loc.toLowerCase()=='china' && keyword.toLowerCase()==thisData.toLowerCase() || loc.toLowerCase()!='china' && loc.toLowerCase()==thisData.toLowerCase()){
          if (
            keyword.toLowerCase() == thisData.toLowerCase() ||
            loc.toLowerCase() == thisData.toLowerCase()
          ) {
            return bannerData[i];
          }
        }
      }

      return "";
    }; ///设置banner---结束

    return {
      listdata: data,
      participantsOption: [
        {
          selectparticipant: "Number of Travelers",
          label: 0
        },
        {
          selectparticipant: "1 person",
          label: 1
        },
        {
          selectparticipant: "2 people",
          label: 2
        },
        {
          selectparticipant: "3 people",
          label: 3
        },
        {
          selectparticipant: "4 people",
          label: 4
        },
        {
          selectparticipant: "5 people",
          label: 5
        },
        {
          selectparticipant: "6 people",
          label: 6
        },
        {
          selectparticipant: "7 people",
          label: 7
        },
        {
          selectparticipant: "8 people",
          label: 8
        },
        {
          selectparticipant: "9 people & more",
          label: 9
        }
      ],
      options: [
        "Shanghai",
        "Beijing",
        "Xi'an",
        "Guilin",
        "Chengdu",
        "Tibet",
        "Suzhou",
        "Hangzhou"
      ],
      thems: [
        "Bund",
        "Watertown",
        "Great Wall",
        "Terra-Cotta Warriors",
        "Forbidden City",
        "Li River",
        "Layover Tour",
        "Day trips",
        "Local Food",
        "Dumplings",
        "Landmarks",
        "Short Excursions",
        "Family Friendly",
        "Panda",
        "Everest Base Camp"
      ],
      loc: slug,
      activityList: listData,
      logIn: "",
      loadingStatus: false,
      isdisabled: data.records > postData.pageSize ? true : false, //是否显示翻页

      checkPrice: price, //选择价格区间值
      apiBasePath: apiBasePath,
      //唤起定制
      ContactStatus: false,
      isShowAlert: false,
      alertTitle: "",
      alertMessage: "",
      istrue: false,
      //请求接口数据
      postData: postData,
      //切换币种
      currency: currency,
      //currencyOptions:{},
      //筛选数据
      //aggregations: data.aggregations ? data.aggregations : [],

      objectType: "CONSULTING",
      //下拉选项
      selected: rankCheck,
      select: [
        {
          selectText: "Recommended"
        },
        {
          selectText: "Price :Low to High"
        },
        {
          selectText: "Price :High to Low"
        },
        {
          selectText: "Popularity"
        }
      ],
      records: data.records ? data.records : "",
      // 筛选

      filterCheck: newfilterCheck,
      filterAll: filterAll,
      filterType: "",
      filterContent: {},
      showModel: false, //筛选弹框
      showSelected: false, //选中历史
      seachContent: keyword ? keyword : loc == "Xian" ? "Xi'an" : loc, //搜索内容
      isShowHot: false, //推荐
      seachList: [], //搜索列表
      showSeachList: false, //显示搜索列表
      selectPeople: false, //显示选择人数
      selectNumber: selectNumber, //人数最大最小值
	  isfilter: false,
	  hiddenHead:false,

      bannerInfo: setBanner()
    };
  },
  head() {
    let keyword = this.defaultKeyword ? this.defaultKeyword : "China";

    let pageTdk = {
      title:
        "All China {{keyword}} Trips | {{keyword}} Activities and Experiences | {{keyword}} Tours",
      description:
        "Browse top {{keyword}} experiences, {{keyword}} tours, {{keyword}} trips, {{keyword}} travel, {{keyword}} guides, and other China trips, led by local experts.",
      keywords:
        "China {{keyword}}, {{keyword}} trips, {{keyword}} tours, {{keyword}} day tours, {{keyword}} day trips, {{keyword}} city tours, {{keyword}} walking tours, {{keyword}} landmarks, {{keyword}} attractions, {{keyword}} highlights."
    };

    var isDestination = function(str) {
      //视为目的地的关键词
      var destination = [
        "shanghai",
        "beijing",
        "chengdu",
        "xi'an",
        "guilin",
        "china"
      ];
      for (var i = 0; i < destination.length; i++) {
        if (destination[i] == str.toLowerCase()) {
          return true;
        }
      }
      return false;
    };

    //检测是否目的地
    if (isDestination(keyword)) {
      pageTdk = {
        title:
          "The Top {{keyword}} Trips | {{keyword}} Local Activities and Experiences | {{keyword}} Tours",
        description:
          "Best Things to do in {{keyword}}, {{keyword}} tours, {{keyword}} trip, {{keyword}} travel, {{keyword}} tour packages, {{keyword}} guide, China tours",
        keywords:
          "See top things to do in {{keyword}}, including {{keyword}} city tours, {{keyword}} walking tours, {{keyword}}history & culture tours, and {{keyword}} food tours. Visit the bund {{keyword}} with our local China tour guides."
      };
    }
    return {
      title: pageTdk.title.replace(/{{keyword}}/g, keyword),
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: pageTdk.keywords.replace(/{{keyword}}/g, keyword)
        },
        {
          hid: "description",
          name: "description",
          content: pageTdk.description.replace(/{{keyword}}/g, keyword)
        }
      ]
    };
  },
  components: {
    HeaderCommon,
    SelectId,
    FooterCommon,
    Loading,
    Pagination,
    Contact,
    Alert,
    Foot,
    checkboxGroup,
    checkbox,
    filterModel
    //inputNumber
  },
  computed: {
    //获取指定顺序的数据
    aggregations: function() {
      //获取默认数据
      var aggregations = this.listdata.aggregations; //设置自定义顺序

      var sortDefault = {
        CATEGORY: 1,
        GROUP_TYPE: 2,
        ATTRACTION: 3,
        DURATION: 4,
        TOUR_TYPE: 5,
        CITY: 6
      };
      //给数据添加排序的序号

      var newAggregations = [];
      for (var i = 0; i < aggregations.length; i++) {
        var thisType = aggregations[i].type;
        var thisNum = sortDefault[thisType];
        aggregations[i].number = thisNum ? thisNum : 10; //没有的字段默认设置顺序为10
        if (
          typeof sortDefault[thisType] !== "undefined" &&
          aggregations[i].items
        ) {
          newAggregations.push(aggregations[i]);
        }
      }

      //排序
      newAggregations = newAggregations.sort(function(a, b) {
        return a.number > b.number;
      });
      return newAggregations;
    }
  },
  methods: {
    closeFn(value) {
      this.showSeachList = value;
      this.isShowHot = value;
    },
    //处理价格筛选显示500+
    format(e) {
      var tipStr = 500;
      if (this.currency.code == "CNY") {
        tipStr = 3000;
      } else if (this.currency.code == "JPY") {
        tipStr = 50000;
      }
      if (e > tipStr) {
        return tipStr + "+";
      }
    },
    //筛选价格
    filterPriceChange(e) {
      let that = this;
      that.postData.pageNum = 1;

      //that.postData.filters.push(priceCheck)

      that.jumpUrl();
    },
    //
    setPeople() {
      Cookie.set("participants", this.postData.participants, {
        path: "/",
        expires: 30
      });
      this.jumpUrl();
    },
    //搜索显示推荐
    showHot() {
	  let that = this;
	//   that.hiddenHead=true
      if (this.seachContent) {
        this.isShowHot = false;
        setTimeout(() => (that.showSeachList = true), 300);
        let postData = {
          keyword: this.seachContent,
          size: 10
        };
        Vue.axios
          .post(
            "https://api.localpanda.com/api/search/suggest",
            JSON.stringify(postData),
            {
              headers: {
                "Content-Type": "application/json; charset=UTF-8"
              }
            }
          )
          .then(
            res => {
              this.seachList = res.data;
            },
            res => {}
          );
      } else {
        this.showSeachList = false;
        this.isShowHot = true;
      }
    },
    gaSuggestion() {
      this.Ga("search", "suggestion");
      this.Ga("search", "search");
    },
    gaRecommendation() {
      this.Ga("search", "recommendation");
      this.Ga("search", "search");
    },
    //筛选弹框
    setBack(val) {
      this.showModel = val;
    },
    closeChecked(e) {
      let checked = this.filterCheck;
      for (var key in checked) {
        if (!checked[key].length) {
          this.showSelected = false;
        }
      }
    },
    //搜索补全高亮
    textHighlight(value) {
      var reg = new RegExp(this.seachContent, "gi");
      var textReg = value.match(reg);
      if (textReg) {
        textReg = textReg[0];
      }
      return value.replace(reg, "<b style='color:#1bbc9d'>" + textReg + "</b>");
    },
    //选择城市Ga
    changeVal(value) {
      ga(gaSend, {
        hitType: "event",
        eventCategory: "activity_list",
        eventAction: "switch",
        eventLabel: "destination_" + value
      });
    },
    //筛选名称转换
    getFilterType(type) {
      var typeStr = "";
      switch (type) {
        case "DURATION":
          typeStr = "Duration";
          break;
        case "GROUP_TYPE":
          typeStr = "Service Type";
          break;
        case "TOUR_TYPE":
          typeStr = "Themes";
          break;
        case "ATTRACTION":
          typeStr = "Points of Interest";
          break;
        case "CATEGORY":
          typeStr = "Products";
          break;
        case "CITY":
          typeStr = "Destinations Covered";
          break;
      }
      return typeStr ? typeStr : type;
    },

    getObjLength(obj) {
      var thisObjLength = 0;
      for (var key in obj) {
        thisObjLength++;
      }
      return thisObjLength;
    },
    toLower(val) {
      return val.toLowerCase();
    },
    returnD(key) {
      if (key == 0) {
        return "Half Day";
      } else if (key == 1) {
        return "One Day";
      }
      return key + " Days";
    },
    
    //弹框组件回调
    getIsShowAlert(val) {
      this.isShowAlert = val;
    },
    //显示contact
    showContact() {
      this.ContactStatus = true;
    },
    //contact回调
    contactCallBack(val) {
      this.istrue=val?true:false;
      if (this.istrue == true) {
        this.isShowAlert = true;
        this.alertTitle = "Submission completed!";
        this.alertMessage =
          "Thank you for your feedback.We will get back to you within 1 day.";
        this.istrue = false;
      } else {
        this.isShowAlert = true;
        this.alertMessage = "Failed!";
      }
      this.ContactStatus = false;
    },
    //小数点取两位
    returnFloat(value) {
      if (value) {
        var bit = bit || 2;
        var numberArr = ("" + value).split(".");
        if (numberArr.length > 1 && numberArr[1].length > bit) {
          var zeroStr = "";
          for (var i = 0; i < bit; i++) {
            zeroStr += "0";
          }
          return (value + ("0." + zeroStr + "5") * 1).toFixed(bit);
        }
        return value.toFixed(bit);
      } else {
        return 0;
      }
    },
    clearAll() {
      var filterCheck = this.filterCheck;
      this.showSelected = false;
      this.postData.pageNum = 1;
      for (var key in filterCheck) {
        filterCheck[key] = [];
      }

      var price = [0, 505];
      if (this.currency.code == "CNY") {
        price = [0, 3030];
      } else if (this.currency.code == "JPY") {
        price = [0, 50500];
      }
      this.checkPrice = price;
    },
    showMore(filterCheck, item, type) {
      this.showModel = true;
      this.filterContent = item;
      this.filterType = type;
      this.filterCheck = filterCheck;
    },
    participantsOptionFn() {
      var participants = this.participantsOption,
        minParticipants = this.selectNumber.minValue,
        maxParticipants = this.selectNumber.maxValue;
      var newParticipants = [];
      for (var i = 1; i < participants.length; i++) {
        if (
          participants[i].label >= minParticipants &&
          participants[i].label <= maxParticipants
        ) {
          newParticipants.push(participants[i]);
        }
      }
      newParticipants.unshift({
        selectparticipant: "Number of Travelers",
        label: 0
      });

      return newParticipants;
    },
    //删除选中的单个选项
    clearCheck(item, index) {
      this.postData.pageNum = 1;
      for (var key in this.filterCheck) {
        if (key == item) {
          this.filterCheck[item].splice(index, 1);
        }
        if (!this.filterCheck[key].length) {
          this.showSelected = false;
        }
      }
    },
    //点击搜索按钮
    seachFn() {
      this.seachContent = this.seachContent.replace(/^\s+|\s+$/g, "");
      if (this.seachContent) {
        this.Ga("search", "search");
        this.Ga("search", "direct");
        location.href = this.getUrl(this.seachContent, "direct");
      }
    },
    getUrl(value, type) {
      return "/activity/list/China?keyword=" + value + "&type=" + type;
    },

    sortFn(val) {
      this.selected = val;
      let gaLabel = "score";
      if (val == "Price :Low to High") {
        gaLabel = "price_up";
      } else if (val == "Price :High to Low") {
        gaLabel = "price_down";
      } else if (val == "Popularity") {
        gaLabel = "popularity";
      }
      this.Ga("sort", gaLabel);
      this.Ga("sort", "sort");
      this.postData.pageNum = 1;

      this.jumpUrl();
    },
    handleCurrentChange(val) {
      console.log(val);
      let that = this;
      that.postData.pageNum = val;
      that.getData();
    },
    jumpUrl() {
      //获取当前路径
      var path = this.$route.path;
      //获取当前选中的数据
      var filterCheck = this.filterCheck;
      //获取rank对象
      var rankCheck = this.selected;
      var postFilters = [];
      //默认跳转数据
      var jumpData = {
        options: {},
        sort: {},
        keyword: this.seachContent
        // participants:this.postData.participants==0?'':this.postData.participants,
        //type:this.postData.type
      };
      // if(jumpData.participants==0){
      // 	delete jumpData.participants
      // }
      //console.log(filterCheck)

      //var sort = this.postData.sort;
      if (rankCheck == "Price :Low to High") {
        jumpData.sort = JSON.stringify({ type: "PRICE", reverse: false });
      } else if (rankCheck == "Price :High to Low") {
        jumpData.sort = JSON.stringify({ type: "PRICE", reverse: true });
      } else if (rankCheck == "Popularity") {
        jumpData.sort = JSON.stringify({ type: "SALES" });
      } else {
        jumpData.sort = JSON.stringify({ type: "SCORE" });
      }

      //去掉空数据,并对跳转的数据排序，把需要的数据放在新的options里
      var options = {};
      for (var key in filterCheck) {
        if (filterCheck[key].length) {
          options[key] = filterCheck[key].sort();
          postFilters.push({
            type: key.toUpperCase(),
            filterValues: filterCheck[key]
          });
        } else if (key == "price" && !Array.isArray(filterCheck[key])) {
          if (this.postData.currency == "CNY") {
            if (
              filterCheck[key].maxValue != 3030 ||
              filterCheck[key].minValue != 0
            ) {
              options[key] = filterCheck[key];
            }

            if (filterCheck[key].maxValue > 3000) {
              postFilters.push({
                type: key.toUpperCase(),
                minValue: filterCheck[key].minValue
              });
            } else {
              postFilters.push({
                type: key.toUpperCase(),
                maxValue: filterCheck[key].maxValue,
                minValue: filterCheck[key].minValue
              });
            }
          } else if (this.postData.currency == "JPY") {
            if (
              filterCheck[key].maxValue != 50500 ||
              filterCheck[key].minValue != 0
            ) {
              options[key] = filterCheck[key];
            }

            if (filterCheck[key].maxValue > 50000) {
              postFilters.push({
                type: key.toUpperCase(),
                minValue: filterCheck[key].minValue
              });
            } else {
              postFilters.push({
                type: key.toUpperCase(),
                maxValue: filterCheck[key].maxValue,
                minValue: filterCheck[key].minValue
              });
            }
          } else {
            if (
              filterCheck[key].maxValue != 505 ||
              filterCheck[key].minValue != 0
            ) {
              options[key] = filterCheck[key];
            }

            if (filterCheck[key].maxValue > 500) {
              postFilters.push({
                type: key.toUpperCase(),
                minValue: filterCheck[key].minValue
              });
            } else {
              postFilters.push({
                type: key.toUpperCase(),
                maxValue: filterCheck[key].maxValue,
                minValue: filterCheck[key].minValue
              });
            }
          }
        }
      }
      this.postData.filters = postFilters;
      this.getData();

      //跳转并对对象转码
      jumpData.options = encodeURIComponent(JSON.stringify(options));
      //检测是否有筛选项
      var urlQuery = "";
      for (var key in jumpData) {
        //检测有效数据
        if (
          JSON.stringify(jumpData[key]) != "{}" &&
          jumpData[key] != "%7B%7D" &&
          jumpData[key] != ""
        ) {
          urlQuery += "&" + key + "=" + jumpData[key];
        }
      }
      urlQuery = urlQuery.substring(1); //去掉第一个&
      console.log(decodeURIComponent(urlQuery));
      var url = "/activity/list/China" + (urlQuery ? "?" + urlQuery : "");
      history.pushState(null, null, url);
      //location.href =url
    },
    hideBodyScroll() {
      document.body.style.overflowY = "hidden";
    },
    showBodyScroll() {
      document.body.style.overflowY = "inherit";
    },
    getData() {
      if (this.selected == "Price :Low to High") {
        this.postData.sort = {
          type: "PRICE",
          reverse: false
        };
      } else if (this.selected == "Price :High to Low") {
        this.postData.sort = {
          type: "PRICE",
          reverse: true
        };
      } else if (this.selected == "Popularity") {
        this.postData.sort = {
          type: "SALES"
        };
      } else {
        this.postData.sort = {
          type: "SCORE"
        };
      }
      this.loadingStatus = true;
      let postData = Object.assign({}, this.postData);
      if (this.postData.participants == 0) {
        delete postData.participants;
      }
      console.log(postData.filters);
      //return
      Vue.axios
        .post(this.apiBasePath + "search/activity", JSON.stringify(postData), {
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then(
          res => {
            this.loadingStatus = false;
            this.activityList = res.data.entities;
            this.listdata.aggregations = res.data.aggregations;
            this.records = res.data.records;
            if (res.data.records < this.postData.pageSize) {
              this.isdisabled = false;
            } else {
              this.isdisabled = true;
            }
            if (res.data.aggregations) {
              res.data.aggregations.forEach(item => {
                var thisFilter = [];
                for (var key in item.items) {
                  thisFilter.push(key);
                }
                //当前类型
                var thisType = item.type.toLowerCase();
                this.filterAll[thisType] = thisFilter;

                if (item.type == "MIN_PARTICIPANTS") {
                  this.selectNumber.minValue = item.value;
                } else if (item.type == "MAX_PARTICIPANTS") {
                  this.selectNumber.maxValue = item.value;
                }
              });
            }
            window.scrollTo(0, 0);
          },
          res => {}
        );
    },
    Ga(action, label) {
      ga(gaSend, {
        hitType: "event",
        eventCategory: "activity_list",
        eventAction: action,
        eventLabel: label
      });
    },
    headCurrencyFn(currency) {
      this.postData.currency = currency.code;
      this.currency = currency;
      var price = [];
      if (this.currency.code == "CNY") {
        price = [0, 3030];
      } else if (this.currency.code == "JPY") {
        price = [0, 50500];
      } else {
        price = [0, 505];
      }
      this.checkPrice = price;

      //重置价格区间
      var thisFil = this.postData.filters;
      if (thisFil) {
        for (var i = 0; i < thisFil.length; i++) {
          var thisData = thisFil[i];
          if (thisData.type == "PRICE") {
            this.postData.filters[i] = { type: "PRICE", minValue: 0 };
          }
        }
      }

      this.jumpUrl();
      //this.getData();
    }
  },
  watch: {
    filterCheck: {
      handler: function(val, oldVal) {
        var path = this.$route.path;
        var rankCheck = this.selected;
        var postFilters = [];
        var options = {};

        var jumpData = {
          options: {},
          sort: {},
          keyword: this.seachContent
          //participants:this.postData.participants,
          //type:this.postData.type
        };
        for (var key in val) {
          if (Array.isArray(val[key])) {
            var thisVal = val[key].concat();
            if (val[key].length > 0) {
              this.showSelected = true;
              options[key] = thisVal.sort();
              if (thisVal.length == 1) {
                this.Ga("filter", key);
                this.Ga("filter", "filter_apply");
              }
              postFilters.push({
                type: key.toUpperCase(),
                filterValues: val[key]
              });
            }
          } else if (key == "price" && !Array.isArray(val[key])) {
			  if(this.postData.currency=="CNY"){
				  if (val[key].maxValue <= 3000 || val[key].minValue > 0) {
					options[key] = val[key];
					}
					if (val[key].maxValue > 3000) {
					postFilters.push({
						type: key.toUpperCase(),
						minValue: val[key].minValue
					});
					} else {
					postFilters.push({
						type: key.toUpperCase(),
						maxValue: val[key].maxValue,
						minValue: val[key].minValue
					});
				}
			  }else if(this.postData.currency=="JPY"){
				  if (val[key].maxValue <= 50000 || val[key].minValue > 0) {
					options[key] = val[key];
					}
					if (val[key].maxValue > 50000) {
					postFilters.push({
						type: key.toUpperCase(),
						minValue: val[key].minValue
					});
					} else {
					postFilters.push({
						type: key.toUpperCase(),
						maxValue: val[key].maxValue,
						minValue: val[key].minValue
					});
				}
			  }else{
				  if(this.postData.currency=="CNY"){
					if (val[key].maxValue <= 500 || val[key].minValue > 0) {
						options[key] = val[key];
						}
						if (val[key].maxValue > 500) {
						postFilters.push({
							type: key.toUpperCase(),
							minValue: val[key].minValue
						});
						} else {
						postFilters.push({
							type: key.toUpperCase(),
							maxValue: val[key].maxValue,
							minValue: val[key].minValue
						});
					}
				}
			  }
            
          }
        }

        if (rankCheck == "Price :Low to High") {
          jumpData.sort = JSON.stringify({ type: "PRICE", reverse: false });
        } else if (rankCheck == "Price :High to Low") {
          jumpData.sort = JSON.stringify({ type: "PRICE", reverse: true });
        } else if (rankCheck == "Popularity") {
          jumpData.sort = JSON.stringify({ type: "SALES" });
        } else {
          jumpData.sort = JSON.stringify({ type: "SCORE" });
        }

        //					//跳转并对对象转码

        jumpData.options = encodeURIComponent(JSON.stringify(options));
        //检测是否有筛选项

        this.postData.filters = postFilters;
        console.log(this.postData.filters);
        this.postData.pageNum = 1;
        this.getData();

        var urlQuery = "";
        for (var key in jumpData) {
          //检测有效数据
          if (
            JSON.stringify(jumpData[key]) != "{}" &&
            jumpData[key] != "%7B%7D" &&
            jumpData[key] != ""
          ) {
            urlQuery += "&" + key + "=" + jumpData[key];
          }
        }
        urlQuery = urlQuery.substring(1); //去掉第一个&
        var url = "/activity/list/China" + (urlQuery ? "?" + urlQuery : "");
        history.pushState(null, null, url);
        console.log(options);
      },
      deep: true
    },
    seachContent: function(val, oldVal) {
      val = val.replace(/^\s+|\s+$/g, "");
      if (val) {
        this.isShowHot = false;
        this.showSeachList = true;
        let postData = {
          keyword: val,
          size: 10
        };
        Vue.axios
          .post(
            "https://api.localpanda.com/api/search/suggest",
            JSON.stringify(postData),
            {
              headers: {
                "Content-Type": "application/json; charset=UTF-8"
              }
            }
          )
          .then(
            res => {
              this.seachList = res.data;
              if (this.seachList.length == 0) {
                this.showSeachList = false;
              }
            },
            res => {}
          );
      } else {
        this.showSeachList = false;
        this.isShowHot = true;
      }
    },
    showModel: function(val, oldVal) {
      if (val) {
        this.hideBodyScroll();
      } else {
        this.showBodyScroll();
      }
    },
    checkPrice(val) {
      this.filterCheck.price = {
        minValue: val[0],
        maxValue: val[1]
      };
      console.log(this.filterCheck.price);
    }
  },
  filters: {
    firstUpperCase(val) {
      if (val)
        return val.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
    }
  },
  created: function() {
    const that = this;
    that.value = that.loc == "Xian" ? "Xi'an" : that.loc;
  },
  mounted: function() {
    console.log(this.listdata);
    const that = this;
    for (var key in that.filterCheck) {
      if (that.filterCheck[key].length > 0) {
        that.showSelected = true;
      }
    }
    document
      .querySelector(".participants option")
      .setAttribute("hidden", "hidden");
    document.body.addEventListener("click", () => {
      that.isShowHot = false;
      that.showSeachList = false;
      that.selectPeople = false;
    });

    // if(window.name != "bencalie"){
    // 	location.reload();
    // 	window.name = "bencalie";
    // }else{
    // 	window.name = "";
    // }
    var currency = JSON.parse(Cookie.get("currency"))
      ? JSON.parse(Cookie.get("currency"))
      : { code: "USD", symbol: "$" };
    if (this.currency != currency) {
      this.currency = currency;
    }
    that.logIn = localStorage.getItem("logstate")
      ? localStorage.getItem("logstate")
      : null;
  }
};
</script>
<style lang="scss">
//@import '~/assets/scss/_main.scss';
//@import '~/assets/font/iconfont.css';
.activityList {
  .checkbox_label {
    padding: 0;
    padding-left: 20px;
  }
  .checkbox_content {
    font-size: 16px;
    padding-right: 0 !important;
    padding-left: 0 !important;
    line-height: 22px;
    white-space: inherit !important;
  }
  .checkbox_label {
    .checkbox_box {
      float: left;
      margin-left: -20px;
      margin-top: 3px;
      border-color: #666;
      margin-top: 5px;
    }
  }
  .isChecked .checkbox_box {
    border-color: #1bbc9d;
  }
  .el-slider__button-wrapper {
    z-index: 10 !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%);
  }

  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background: #fff;
    color: #353a3f;
  }

  #footercommon {
    border-top: 1px solid #e6e6e6;
    .footInfo {
      width: 1284px !important;
    }
  }
}
</style>
<style lang="scss" scoped>
//@import '~/assets/scss/base/_setting.scss';
.page {
  width: 1284px;
  margin: 0 auto;
}
.background {
  background-color: #faf9f8;
}
.empty {
  padding: 30px 0 200px;
  text-align: center;
  width: 975px;
  p {
    font-size: 16px;
    margin-top: 20px;

    a {
      color: #1bbc9d;
    }
  }
}
.checkbox-group {
  max-height: 200px;
  overflow: hidden;
}
.activityList {
  background: #fff;
  .pagination-page {
    clear: both;
    text-align: center;
    padding-top: 46px;
  }
  overflow-x: hidden;
  width: 100%;
  background: #faf9f8;
  .banner {
    position: relative;
    background: url("https://cloud.localpanda.com/static/headerPhotos/ListBanner.jpg")
      no-repeat;
    background-size: cover!important;
    background-position: center!important;
    height: 290px;
    .linerBackground {
      .covertitle {
        text-align: center;
        padding-top: 72px;
        h3 {
          font-size: 44px;
          color: #fff;
          font-weight: bold;
          text-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, 0.3);
        }
        h4 {
          font-size: 20px;
          color: #ffffff;
          margin: 24px 0;
          text-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, 0.3);
        }
      }
      /*position: absolute;
				top: 50%;
				transform:translateY(-50%) ;
				height: 64px;
				width: 100%;
				text-align: center;*/
    }
    .selectInfo {
      height: 48px;
      width: 1040px;
      border-radius: 6px;
      background: #fff;
      margin: 0 auto;
      position: relative;

      a {
        display: block;
      }
      input {
        border-radius: 6px;
        width: 710px;
        border: none;
        height: 100%;
        margin: 0;
        padding-left: 24px;
        font-size: 16px;
        float: left;
      }
      .selectPeople {
        width: 210px;
        height: 48px;
        display: inline-block;
        line-height: 48px;
        font-size: 16px;
        border-left: 1px solid #ebebeb;
        cursor: pointer;
        position: relative;

        .participants {
          width: 100%;
          padding-left: 30px;
          height: 100%;
          border: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-color: transparent;
        }
        i {
          position: absolute;
          right: 0px;
        }
      }
      .seachBtn {
        width: 107px;
        height: 48px;
        background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
        position: absolute;
        right: 0;
        top: 0;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        font-size: 16px;
        color: #ffffff;
        font-weight: bold;
      }
      .hotRecommend {
        transition: all 0.4s ease-out 0s;
        padding: 27px 0 37px 30px;
        box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.2);
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        position: absolute;
        top: 45px;
        width: calc(100% - 30px);
        background: #fff;
        z-index: 20;
        border-top: 1px solid #ebebeb;
        h3 {
          text-align: left;
          font-size: 16px;
          font-weight: bold;
        }
        .city {
          float: left;
          width: 376px;

          ul {
            li {
              float: left;
              margin-right: 64px;
              margin-top: 28px;
              font-size: 16px;
            }
          }
        }
        .theme {
          border-left: 1px solid #ebebeb;
          float: left;
          padding-left: 73px;
          width: 538px;
          ul {
            li {
              float: left;
              margin-right: 64px;
              margin-top: 28px;
              font-size: 16px;
            }
          }
        }
      }
      .seachList {
        transition: all 0.4s ease-out 0s;
        padding: 10px 0;
        box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.2);
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        position: absolute;
        top: 45px;
        width: 100%;
        background: #fff;
        z-index: 20;
        border-top: 1px solid #ebebeb;
        ul {
          li {
            padding-left: 30px;
            text-align: left;
            font-size: 16px;
            height: 48px;
            line-height: 48px;
            span {
              b {
                color: #1bbc9d !important;
              }
            }
            &:hover {
              background: #f5f7f7;
            }
            i {
              font-size: 16px;
              margin-right: 24px;
            }
          }
        }
      }
    }
  }
  .slogn {
    background: #fff;
    width: 100%;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 5px;
    .slogn_box {
      width: 1284px;
      margin: 0 auto;
      padding: 25px 0;
      display: flex;
      .slogn_item {
        flex: 1;
        span {
          font-size: 34px;
          background-image: -webkit-linear-gradient(135deg, #009efd, #1bbc9d);
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;

          background-image: -moz-linear-gradient(135deg, #009efd, #1bbc9d);
          -moz-text-fill-color: transparent;
          -moz-background-clip: text;

          background-image: -moz-linear-gradient(135deg, #009efd, #1bbc9d);
          -ms-text-fill-color: transparent;
          -ms-background-clip: text;

          background-image: -o-linear-gradient(135deg, #009efd, #1bbc9d);
          -o-text-fill-color: transparent;
          -o-background-clip: text;
        }
        .slogn_cont {
          float: right;
          width: 90%;
          h4 {
            font-weight: bold;
            font-size: 16px;
          }
          p {
            font-size: 14px;
            margin-top: 5px;
          }
        }
      }
    }
  }
  .page-content {
    background: #fff;
    .pageInfo {
      padding: 30px 0 80px;
      .pageLeft {
        width: 278px;
        float: left;
        .filterSeach {
          background: #faf9f8;
          margin-bottom: 15px;
          border-radius: 6px;
          border: solid 1px #ebebeb;
          box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
          .title {
            height: 40px;
            line-height: 40px;
            position: relative;
            border-bottom: solid 1px #ebebeb;
            padding-left: 20px;
            h3 {
              font-size: 16px;
              font-weight: bold;
            }
            span {
              font-size: 16px;
              color: #1bbc9d;
              position: absolute;
              right: 20px;
              top: 0;
              cursor: pointer;
            }
          }
          .seachCont {
            margin-bottom: 15px;
            margin: 20px 20px;
            border-bottom: solid 1px #ebebeb;
            &:last-child {
              border-bottom: none;
            }
            .seachTitle {
              margin-bottom: 10px;
              h3 {
                font-size: 16px;
                font-weight: bold;
                float: left;
              }
              span {
                float: right;
                color: #1bbc9d;
                font-size: 16px;
                display: block;
                cursor: pointer;
              }
            }
            .checked {
              cursor: pointer;
              padding-left: 20px;
              padding-bottom: 8px;
              &:last-child {
                padding-bottom: 15px;
              }

              i {
                font-size: 8px;
                float: left;
                margin-top: 5px;
                margin-left: -20px;
              }
              span {
                font-size: 16px;
                display: inline-block;
              }
            }
          }
        }
        .filterBox {
          margin-bottom: 15px;
          padding: 20px 10px 30px 20px;
          border-radius: 6px;
          border: solid 1px #ebebeb;
          .filterItem1 {
            position: relative;
            left: -5px;
          }
          .filterItem {
            .viewMore {
              margin-top: 25px;
              text-align: center;
              text-decoration: underline;
              display: block;
              font-size: 16px;
              cursor: pointer;
            }
          }
          .checkboxlist {
            margin-bottom: 20px;
            &:last-child {
              margin: 0;
            }
          }
          .title {
            margin-bottom: 20px;
            h3 {
              font-size: 16px;
              font-weight: bold;
            }
          }
        }
      }
      .pageRight {
        width: 975px;
        float: left;
        margin-left: 30px;
        .recommended {
          float: left;
          position: relative;
          font-size: 16px;
          .selectSort {
            border: solid 1px #dde0e0;
            width: 244px;
            height: 40px;
            padding-left: 14px;
            font-size: 16px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background-color: transparent;
            border-radius: 6px;
            position: relative;
            z-index: 1;
          }
          i {
            position: absolute;
            right: 14px;
            top: 12px;
          }
        }
        .all {
          float: right;
          height: 40px;
          line-height: 40px;
          .pageSizeInfo {
            font-size: 16px;
          }
          .listIcon {
            font-size: 16px;
            color: #878e95;
            cursor: pointer;
          }
          .active {
            color: #1bbc9d !important;
          }
          .margin {
            margin: 0 20px 0 30px;
          }
        }
        .list-cont {
          margin-top: 15px;

          .activity-item {
            &:hover {
              box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.24);
              .titleText {
                span {
                  text-decoration: underline;
                }
              }
            }
            a {
              display: block;
            }
            position: relative;
            float: left;
            box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            background: #fff;
            width: 976px;
            margin-top: 15px;
            border-radius: 6px;
            .activity {
              position: absolute;
              width: 309px;
              height: 100%;
              min-height: 135px;
              .activity-photo {
                width: 309px;
                height: 100%;
                min-height: 135px;
                background-repeat: no-repeat !important;
                background-size: cover !important;
                position: relative;
                .type {
                  position: absolute;
                  bottom: 0;
                  width: 100%;
                  height: 34px;
                  font-size: 16px;
                  font-weight: bold;
                  background: rgba(0, 0, 0, 0.6);
                  color: #fff;
                  line-height: 34px;
                  padding-left: 20px;
                }
              }
            }
            .activitDe {
              float: right;
              width: 667px;
              padding: 20px;
              .activeType {
                margin-top: 14px;
                label {
                  padding: 6px 8px;
                  border-radius: 4px;
                  display: inline-block;
                  color: #fff;
                  font-size: 12px;
                  background-color: #f4b33f;
                  &.tag_group {
                    background-color: #efae99;
                  }
                  &.tag_private {
                    background-color: #1bbc9d;
                  }
                }
              }
              .titleText {
                line-height: 21px;

                text-overflow: ellipsis;
                display: -webkit-box;
                display: -moz-box;
                -moz-box-orient: vertical;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                -moz-line-clamp: 2;
                -o-text-overflow: ellipsis;
                word-wrap: break-word;
                font-size: 16px;
                text-align: left;
                overflow: hidden;
                label {
                  font-weight: normal;
                  padding: 1px 8px;
                  border-radius: 10px;
                  display: inline-block;
                  color: #fff;
                  font-size: 12px;
                  margin-right: 5px;
                  vertical-align: baseline;
                }
                span {
                  font-weight: bold;
                }
              }

              .recommendedReason {
                text-overflow: ellipsis;
                display: -webkit-box;
                display: -moz-box;
                -moz-box-orient: vertical;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                -moz-line-clamp: 2;
                -o-text-overflow: ellipsis;
                word-wrap: break-word;
                font-size: 14px;
                color: #878e95;
                margin-top: 14px;
                text-align: left;
                overflow: hidden;
              }
              .duration {
                margin-top: 14px;
                font-size: 14px;
              }
              .destinations {
                font-size: 14px;
                margin-top: 14px;
              }
              .attractions {
                font-size: 14px;
                margin-top: 14px;
                b {
                  color: #353a3f !important;
                  float: left;
                  margin-right: 5px;
                }
                span {
                  text-overflow: ellipsis;
                  display: -webkit-box;

                  display: -moz-box;

                  -moz-box-orient: vertical;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  -moz-line-clamp: 2;
                  -o-text-overflow: ellipsis;
                  word-wrap: break-word;
                  overflow: hidden;
                }
              }
              .totalPic {
                position: absolute;

                bottom: 20px;
                right: 20px;
                text-align: right;
                .nowPic {
                  font-size: 14px;
                  color: #878e95;
                  b {
                    color: #353a3f;
                    font-size: 20px;
                  }
                  span {
                    color: #353a3f;
                  }
                  .currency_code {
                    font-weight: normal;
                    font-size: 14px;
                    color: #666;
                  }
                }
                p {
                  font-size: 14px;
                }
              }
            }
          }
          .more {
            width: 232px;
            height: 42px;
            background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
            border-radius: 20px;
            text-align: center;
            line-height: 42px;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            margin: 48px auto 0;
            cursor: pointer;
          }
        }
      }
    }
  }
  .seach {
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    background: #fff;
    padding: 24px 30px 29px;
    width: 1224px;
    margin: -120px auto 0;
    background: #fff;
    z-index: 99;
    position: relative;
    h3 {
      font-size: 14px;
      color: #878e95;
      margin-bottom: 10px;
    }
    .recommended {
      position: relative;
      float: right;
      .selectSort {
        font-size: 16px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: transparent;
        border: none;
        min-width: 160px;
      }
    }
    .seach-type {
      float: left;
      padding: 20px 0 24px;
      li {
        float: left;
        margin-left: 63px;
        position: relative;
        &:first-child {
          margin-left: 0;
        }
        .citys {
          font-size: 16px;
          cursor: pointer;
          i {
            margin-left: 10px;
            font-size: 16px;
          }
        }
        .citysList {
          position: absolute;
          z-index: 999999999;
          background: #fff;
          box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.2);
          border-radius: 3px;
          padding: 30px 0px 40px 27px;
          width: 311px;
          left: 50%;
          margin-left: -50%;
          .checkboxlist {
            margin-bottom: 20px;
          }
          .clear {
            position: absolute;
            bottom: 23px;
            left: 25px;
            color: #1bbc9d;
            font-size: 18px;
            cursor: pointer;
            font-weight: bold;
          }
          .subimtbtn {
            position: absolute;
            bottom: 25px;
            right: 25px;
            color: #1bbc9d;
            font-size: 18px;
            cursor: pointer;
            font-weight: bold;
          }
        }
      }
    }
    .delSeach {
      border-top: 1px solid #ebebeb;
      padding-top: 13px;
      .del {
        width: 85%;
        float: left;
        .clearAll {
          font-size: 16px;
          font-weight: bold;
          color: #1bbc9d;
          cursor: pointer;
        }
        span {
          cursor: pointer;
          padding: 3px 14px;
          border: 1px solid #878e95;
          font-size: 16px;
          border-radius: 20px;
          margin-top: 15px;
          display: inline-block;
          i {
            font-size: 12px;
            margin-left: 6px;
            color: #1bbc9d;
            font-weight: bold;
          }
          margin-right: 15px;
        }
      }
      .pageSizeInfo {
        width: 15%;
        float: right;
        text-align: right;
        font-size: 16px;
        margin-top: 15px;
      }
    }
  }
  .long {
    width: 671px !important;
  }
  .padding {
    padding-right: 20px !important;
    padding-bottom: 22px !important;
  }
}
</style>