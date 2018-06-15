<template>
	<div class="activityList">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="banner">
			<div class="linerBackground">
				<div class="selectInfo">
					<el-select v-model="value" @change="changeVal(value)">
						<a :href="item.url" v-for="item in options">
							<el-option :key="item.value" :label="item.label" :value="item.value">

							</el-option>
						</a>
					</el-select>

				</div>
			</div>
		</div>
		<div class="page-content">
			<div class="page pageInfo clearfix">
				<div class="pageLeft">
					<div class="filterBox">
						<div class="title clearfix">
							<h3>Categories</h3>
							<span>clear</span>
						</div>
						<div class="filterItem">
							<checkbox-group v-model="checkedCategory">
								<div class="checkboxlist" v-for="(item,key,index) in category">
									<checkbox :label="key" :key="key">{{key}} ({{item}})</checkbox>
								</div>
							</checkbox-group>
						</div>
					</div>
					<div class="filterBox">
						<div class="title clearfix">
							<h3>Themes</h3>
							<span>clear</span>
						</div>
						<div class="filterItem">
							<checkbox-group v-model="checkedTourtype">
								<div class="checkboxlist floatbox" v-for="(i,key,index) in tourtype">
									<checkbox :label="key" :key="key">{{key}} ({{i}})</checkbox>
								</div>
							</checkbox-group>
						</div>
					</div>
					<div class="filterBox">
						<div class="title clearfix">
							<h3>Duration</h3>
							<span>clear</span>
						</div>
						<div class="filterItem">
							<checkbox-group v-model="checkedDurations">
								<div class="checkboxlist" v-for="(i,key,index) in durations">
									<checkbox v-if="key==0" :label="key" :key="key">Half Day ({{i}})</checkbox>
									<checkbox v-if="key==1" :label="key" :key="key">{{key}} Day ({{i}})</checkbox>
									<checkbox v-if="key>1" :label="key" :key="key">{{key}} Days ({{i}})</checkbox>
								</div>
							</checkbox-group>
						</div>
					</div>
				</div>
				<div class="pageRight">
					<div class="selectType clearfix">
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
							<span class="iconfont listIcon margin active">&#xe677;</span>
							<span class="iconfont listIcon">&#xe678;</span>
						</div>
					</div>
					<div class="list-cont" v-if="records>0">
						<ul class="clearfix">
							<li class="activity-item" v-for="item in activityList">

								<a :href="'/activity/details/'+item.activityId" target="_blank">
									<div class="activity">

										<div class="activity-photo" v-lazy:background-image="item.coverPhotoUrl">

										</div>

									</div>
									<div class="activitDe">
										<div class="info">
											<div class="titleText" style="-moz-box-orient: vertical;
										    -webkit-box-orient:vertical;">
												{{item.title}}
											</div>
											<div class="activeType">
												<div class="tourType">{{item.category}}</div>

											</div>
											<div class="duration">Duration: {{item.duration}} {{item.durationUnit|firstUpperCase}}</div>
											<div class="totalPic">
												<div class="nowPic">From <b>${{returnFloat(item.bottomPrice)}}</b><span>  pp</span></div>
											</div>
										</div>

									</div>
								</a>
							</li>
						</ul>

					</div>
				</div>

			</div>
			

			<div class="pagination-page" v-if="isdisabled">
				<el-pagination background layout="prev, pager, next" :total="records" class="el-pagination is-background" @current-change="handleCurrentChange" :page-size="20">
				</el-pagination>
			</div>
			<div class="empty page" v-else>
				<p>No activities or tours that match your interests are found. </p>
				<p>You can try to modify your screening conditions or choose our "Customize Your Trip" option.</p>
				<p>We can collect your preferences and customize your ideal trip, free of charge.
					<a href="javascript:;" @click="showContact">Click here to start!</a>
				</p>
			</div>
		</div>
		
		<Foot></Foot>
		<FooterCommon></FooterCommon>
		<Loading :loadingStatus="loadingStatus"></Loading>
		<Contact :ContactStatus="ContactStatus" v-on:isshowfn="isShowFn" v-on:contact-call-back="contactCallBack" :objectType="objectType"></Contact>
		<Alert :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { SelectId, Pagination } from 'element-ui';
	import { GetQueryString } from '~/assets/js/plugin/utils'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import Loading from '~/components/Loading/Loading'
	//import Bottom from '~/components/bottom/Bottom'
	import Contact from '~/components/Contact/Contact';
	import Alert from '~/components/Prompt/Alert';
	import Foot from '~/components/FooterCommon/Foot';
	import {checkboxGroup,checkbox} from "~/plugins/panda/checkbox/"
	export default {
		name: 'activityList',
		async asyncData({
			route,
			store,
			error,
			apiBasePath,
			redirect
		}) {
			let opctions = route.query.opctions ? JSON.parse(route.query.opctions) : null;
			if(!route.query.opctions) {
				opctions = route.query.options ? JSON.parse(route.query.options) : null;
			}
			let sort = route.query.sort ? JSON.parse(route.query.sort) : {
				type: "SCORE",

			}
			let slug = route.params.slug;
			let data = {
				options: [{
						value: 'Shanghai',
						label: 'Shanghai',
						url: '/pashStatus/Shanghai'
					},
					{
						value: 'Beijing',
						label: 'Beijing',
						url: '/pashStatus/Beijing'
					},
					{
						value: 'Chengdu',
						label: 'Chengdu',
						url: '/pashStatus/Chengdu'
					},
					{
						value: "Xi'an",
						label: "Xi'an",
						url: '/pashStatus/Xian'
					},
					{
						value: "Guilin",
						label: "Guilin",
						url: '/pashStatus/Guilin'
					}
				],
				value: slug == "Xian" ? "Xi\'an" : slug,
				loc: slug,
				activityList: [],
				logIn: '',
				pageSize: 18,
				pageNum: 1,
				loadingStatus: false,
				
				isdisabled: false,//是否显示翻页
				
				apiBasePath: apiBasePath,
				//唤起定制
				ContactStatus: false,
				isShowAlert: false,
				alertTitle: '',
				alertMessage: "",
				istrue: false,
				aggregations:"",
				sortBy:sort,
				
				objectType: 'CONSULTING',
				//下拉选项
				selected: 'Recommended',
				select: [
					{
						selectText: "Recommended",
						
					},
					{
						selectText: "Price :Low to High",
						
					},
					{
						selectText: "Price :High to Low",
						
					}
				],
				category: [],
				checkedCategory: [],
				
				durations: [],
				checkedDurations: [],
				
				tourtype: [],
				checkedTourtype: [],
				
				records: '',
			
			}
			let listdata = {}
			let filters = []
			let obj = {}
			if(sort) {
				if(sort.type == "SCORE") {
					data.selected = "Recommended"
				}
				if(sort.type == "PRICE" && sort.reverse == true) {
					data.selected = "Price :High to Low"
				}
				if(sort.type == "PRICE" && sort.reverse == false) {
					data.selected = "Price :Low to High"
				}
			}
			if(opctions) {
				if(opctions.category) {
					data.checkedCategory = data.checkedCategory.concat(opctions.category)
					let jsonCategory = {
						type: 'CATEGORY',
						filterValues: data.checkedCategory
					}
					filters.push(jsonCategory)
				}
				if(opctions.durations) {
					data.checkedDurations = data.checkedDurations.concat(opctions.durations)
					let jsonDurations = {
						type: 'DURATION',
						filterValues: data.checkedDurations
					}
					filters.push(jsonDurations)
				}
				if(opctions.tourtype) {
					for(let i = 0; i < opctions.tourtype.length; i++) {
						opctions.tourtype[i] = opctions.tourtype[i].replace(/And/g, '&')
					}
					data.checkedTourtype = data.checkedTourtype.concat(opctions.tourtype)
					let jsonTourtype = {
						type: 'TOUR_TYPE',
						filterValues: data.checkedTourtype
					}
					filters.push(jsonTourtype)
				}
				obj = {
					location: data.loc == "Xian" ? "Xi\'an" : data.loc,
					pageNum: data.pageNum,
					pageSize: data.pageSize,
					filters: filters,
					sort: sort
				}
			} else {
				obj = {
					location: data.loc == "Xian" ? "Xi\'an" : data.loc,
					pageNum: data.pageNum,
					pageSize: data.pageSize,
					sort: sort
				}
			}
			try {
				listdata = await Vue.axios.post(apiBasePath + "search/activity", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				})
				data.records = listdata.data.records
				data.aggregations=listdata.data.aggregations
				data.activityList = listdata.data.entities
				if(listdata.data.records > data.pageSize) {
					data.isdisabled = true
				}
				//转化显示选择项
				
				//console.log(obj)
			} catch(err) {
				//return error(JSON.stringify(err));
			}
			return data
		},
		head() {
			let location = this.value;
			let title = "The Top " + location + " Tours | " + location + " Local Activities and Experiences";
			let keywords = "Best Things to do in " + location + ", " + location + " tours, " + location + " trip, " + location + " travel, " + location + " tour packages, " + location + " guide, china tours"
			if(location == "Beijing") {
				var description = "See top things to do in Beijing, including Beijing city tours, Beijing walking tours, Beijing history & culture tours, and Beijing food tours. Visit the Forbidden City, Temple of Heaven, Great Wall, Tiananmen Square, and Beijing Summer Palace with our local China tour guides."
			} else if(location == "Shanghai") {
				var description = "See top things to do in Shanghai, including Shanghai city tours, Shanghai walking tours, Shanghai history & culture tours, and Shanghai food tours. Visit the bund shanghai, the Shanghai Tower, the French concession, yu garden, zhujiajiao and Suzhou with our local China tour guides."
			} else if(location == "Guilin") {
				var description = "See top things to do in Guilin, including Guilin scenic tours, Guilin walking tours, Guilin history & culture tours, Guilin food tours, and Guilin Biking tours. See the best scenery in Guilin including Elephant Trunk Hill, Guilin Forest, Li River, Sun & Moon Pagodas, and Yaoshan Mountain."
			} else if(location == "Chengdu") {
				var description = "See top things to do in Chengdu, including Chengdu city tours, Chengdu walking tours, Chengdu history & culture tours, and Chengdu food tours. Visit the Giant Panda Breeding Research Base, Mount Qingcheng, Wenshu Yuan Monestary, Jinli Street, and Dujiangyan with our local China tour guides."
			} else {
				var description = "See top things to do in Xi’an, including Xi’an city tours, Xi’an walking tours, Xi’an history & culture tours, and Xi’an food tours. Visit the Terra-cotta Warriors, Xi’an City Wall, Muslim Quarter, Shaanxi History Museum, and Xi’an markets with our local China tour guides."
			}
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
    		checkbox
		},
		methods: {
			//选择城市Ga
			changeVal(value) {
				ga(gaSend, {
					hitType: 'event',
					eventCategory: 'activity_list',
					eventAction: 'switch',
					eventLabel: 'destination_' + value,

				});
			},
			//弹框报错
			isShowFn(val) {
				this.istrue = val
				if(this.istrue == true) {
					this.isShowAlert = true
					this.alertTitle = "Submission completed!"
					this.alertMessage = "Thank you for your feedback.We will get back to you within 1 day."
					this.istrue = false
				} else {
					this.isShowAlert = true
					this.alertMessage = "Failed!"
				}
			},
			//弹框组件回调
			getIsShowAlert(val) {
				this.isShowAlert = val
			},
			//显示contact
			showContact() {
				this.ContactStatus = true
			},
			//contact回调
			contactCallBack(val) {
				this.ContactStatus = false
			},
			//小数点取两位
			returnFloat(value) {
				var value = Math.round(parseFloat(value) * 100) / 100;
				var xsd = value.toString().split(".");
				if(xsd.length == 1) {
					value = value.toString() + ".00";
					return value;
				}
				if(xsd.length > 1) {
					if(xsd[1].length < 2) {
						value = value.toString() + "0";
					}
					return value;
				}
			},
			clearAll() {
				location.href = "/activity/list/" + this.loc
			},
			sortLink(arr){
				arr.sort((a,b)=>{return a>b})
			},
			sortFn(val) {
				if(val == "Recommended") {
					this.sort = {
						type: "SCORE"
					}
					ga(gaSend, {
						hitType: 'event',
						eventCategory: 'activity_list',
						eventAction: 'sort',
						eventLabel: 'score',

					});
				} else if(val == "Price :Low to High") {
					this.sort = {
						type: "PRICE",
						reverse: false
					}
					ga(gaSend, {
						hitType: 'event',
						eventCategory: 'activity_list',
						eventAction: 'sort',
						eventLabel: 'price_up',

					});
				} else if(val == "Price :High to Low") {
					this.sort = {
						type: "PRICE",
						reverse: true
					}
					ga(gaSend, {
						hitType: 'event',
						eventCategory: 'activity_list',
						eventAction: 'sort',
						eventLabel: 'price_down',

					});
				}
				var opctions = this.delNull({
					category: this.checkedCategory,
					durations: this.checkedDurations,
					tourtype: this.checkedTourtype,
				})
				this.sort = JSON.stringify(this.sort)
				opctions =encodeURIComponent(JSON.stringify(opctions))
				//location.href =  this.$route.path + "?options=" + opctions + (/SCORE/.test(this.sort) ? "" : "&sort=" + this.sort);
			},
			handleCurrentChange(val) {
				let that = this
				let obj = {}
				let filters = []
				let sort = {}
				that.pageNum = val
				if(that.checkedCategory.length > 0) {
					let jsonCategory = {
						type: 'CATEGORY',
						filterValues: that.checkedCategory
					}
					filters.push(jsonCategory)
				}
				if(that.checkedDurations.length > 0) {
					let jsonDurations = {
						type: 'DURATION',
						filterValues: that.checkedDurations
					}
					filters.push(jsonDurations)
				}
				if(that.checkedTourtype.length > 0) {
					let jsonTourtype = {
						type: 'TOUR_TYPE',
						filterValues: that.checkedTourtype
					}
					filters.push(jsonTourtype)
				}
				if(this.selected == "Recommended") {
					sort = {
						type: "SCORE"
					}
				} else if(this.selected == "Price :Low to High") {
					sort = {
						type: "PRICE",
						reverse: false
					}
				} else if(this.selected == "Price :High to Low") {
					sort = {
						type: "PRICE",
						reverse: true
					}
				}
				if(filters.length > 0) {
					obj = {
						location: that.loc == "Xian" ? "Xi\'an" : that.loc,
						pageNum: val,
						pageSize: that.pageSize,
						filters: filters,
						sort: sort
					}
				} else {
					obj = {
						location: that.loc == "Xian" ? "Xi\'an" : that.loc,
						pageNum: val,
						pageSize: that.pageSize,
						sort: sort
					}
				}
				that.loadingStatus = true
				Vue.axios.post(that.apiBasePath + "search/activity", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(function(response) {
					if(response.data.entities.length) {
						that.loadingStatus = false
						that.activityList = response.data.entities
						window.scrollTo(100, 0)
					}
				}, function(response) {})
			},
//			apply(id) {
//				if(id == 1) {
//					ga(gaSend, {
//						hitType: 'event',
//						eventCategory: 'activity_list',
//						eventAction: 'filter',
//						eventLabel: 'category',
//
//					});
//				} else if(id == 2) {
//					ga(gaSend, {
//						hitType: 'event',
//						eventCategory: 'activity_list',
//						eventAction: 'filter',
//						eventLabel: 'theme',
//
//					});
//				} else {
//					ga(gaSend, {
//						hitType: 'event',
//						eventCategory: 'activity_list',
//						eventAction: 'filter',
//						eventLabel: 'duration',
//
//					});
//				}
//				let sort = {}
//				//转url带&符号
//				for(let i = 0; i < this.checkedTourtype.length; i++) {
//					this.checkedTourtype[i] = this.checkedTourtype[i].replace(/&/g, "And")
//				}
//				if(this.selected == "Recommended") {
//					sort = {
//						type: "SCORE"
//					}
//				} else if(this.selected == "Price :Low to High") {
//					sort = {
//						type: "PRICE",
//						reverse: false
//					}
//				} else if(this.selected == "Price :High to Low") {
//					sort = {
//						type: "PRICE",
//						reverse: true
//					}
//				}
//				var opctions = this.delNull({
//					category: this.checkedCategory,
//					durations: this.checkedDurations,
//					tourtype: this.checkedTourtype,
//				});
//
//				opctions = JSON.stringify(opctions)
//				sort = JSON.stringify(sort)
//				location.href = "/activity/list/" + this.loc + "?options=" + opctions + (/SCORE/.test(sort) ? "" : "sort=" + sort);
//			},
			getUrlParam(k) {
				var regExp = new RegExp('([?]|&)' + k + '=([^&]*)(&|$)');
				var result = window.location.href.match(regExp);
				if(result) {
					return decodeURIComponent(result[2]);
				} else {
					return null;
				}
			},
			delNull(obj) {
				var newOpctions = {};
				for(var key in obj) {
					if(obj[key].length) {
						newOpctions[key] = obj[key];
					}
					console.log(obj[key])
				}
				return newOpctions;
			}
		},
		watch: {
			checkedCategory(val,oldVal){
					
				
					
		
			},
			checkedDurations(val, oldVal) {
				
			},
			checkedTourtype(val, oldVal) {
				
			}
		},
		filters: {
			firstUpperCase(val) {
				if(val)
					return val.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
			}
		},
		created: function() {
			const that = this
			that.value = that.loc == "Xian" ? "Xi'an" : that.loc
		},
		mounted: function() {
			const that = this
			let opctions = JSON.parse(that.getUrlParam("opctions")) ? JSON.parse(that.getUrlParam("opctions")) : JSON.parse(that.getUrlParam("options"));
			
			
             console.log(that.aggregations)
           
           //console.log(state)
           
            
			that.logIn = localStorage.getItem("logstate") ? localStorage.getItem("logstate") : null

		},
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	.el-input__inner {
		width: 466px;
		height: 48px;
		font-size: 18px!important;
		background: transparent;
		border: none;
		padding-left: 20px;
		font-weight: bold;
	}
	
	.el-popper[x-placement^=bottom] {
		margin-top: 2px!important;
	}
	
	.el-popper .popper__arrow,
	.el-popper .popper__arrow::after {
		border-style: none!important;
	}
	
	.el-select .el-input .el-select__caret {
		color: #fff;
		font-weight: bold;
		font-size: 22px;
		line-height: 22px;
	}
	
	.el-input__suffix {
		right: 0;
	}
	
   .checkbox_content{
   	font-size: 16px;
   	padding-right: 0;
   }

	

	
	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%)
	}
	
	.el-pagination.is-background .btn-next,
	.el-pagination.is-background .btn-prev,
	.el-pagination.is-background .el-pager li {
		background: #fff;
		color: #353a3f;
	}
	
	#footercommon {
		border-top: 1px solid #E6E6E6;
		.footInfo {
			width: 1284px!important;
		}
	}
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	.page {
		width: 1284px;
		margin: 0 auto;
	}
	
	.empty {
		padding-bottom: 300px;
		p {
			font-size: 16px;
			margin-top: 20px;
			text-align: center;
			a {
				color: #1bbc9d;
			}
		}
	}
	
	.activityList {
		background: #fff;
		.pagination-page {
			text-align: center;
			margin-top: 40px
		}
		overflow-x: hidden;
		width: 100%;
		background: #faf9f8;
		.banner {
			position: relative;
			background: url("https://resource.localpanda.cn/static/headerPhotos/BackGround.jpg") no-repeat;
			background-size: cover;
			height: 350px;
			.linerBackground {
				position: absolute;
				bottom: 0;
				background: rgba(0, 0, 0, 0.5);
				height: 64px;
				width: 100%;
				text-align: center;
			}
			.selectInfo {
				height: 48px;
				width: 466px;
				border-radius: 30px;
				background: #fff;
				margin: 8px auto 0;
				.el-select {
					.el-icon-arrow-up:before {
						content: "\e60f"!important
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
					.filterBox {
						margin-bottom: 15px;
						padding: 20px 20px 0 20px;
						border-radius: 6px;
						border: solid 1px #ebebeb;
						.checkboxlist {
							margin-bottom: 20px;
						}
						.title {
							margin-bottom: 27px;
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
					}
				}
				.pageRight {
					width: 975px;
					float: left;
					margin-left: 30px;
					.recommended {
						float: left;
						width: 244px;
						height: 40px;
						border-radius: 6px;
						border: solid 1px #dde0e0;
						line-height: 42px;
						position: relative;
						font-size: 16px;
						
						.selectSort {
							width:100%;
							height: 100%;
							padding-left:14px;
							font-size: 16px;
							-webkit-appearance: none;
							-moz-appearance: none;
							appearance: none;
							background-color: transparent;
							border: none;
						}
						i {
							position: absolute;
							right: 14px;
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
							color: #1bbc9d!important;
						}
						.margin {
							margin: 0 20px 0 30px;
						}
					}
					.list-cont {
						margin-top: 15px;
						.activity-item {
							&:hover {
								transform: translateY(-5px);
								box-shadow: 0px 10px 20px 0px rgba(53, 58, 63, 0.1);
							}
							transition: .3s transform;
							float:left;
							box-shadow: 0px 2px 6px 0px rgba(53,
							58,
							63,
							0.1);
							overflow:hidden;
							background: #fff;
							margin-right:15px;
							&:nth-child(3n+0) {
								margin-right: 0;
							}
							width:315px;
							margin-top: 15px;
							border-radius: 6px;
							.activity {
								.activity-photo {
									width:315px;
									height: 153px;
									background-repeat: no-repeat!important;
									background-size: cover!important;
									position: relative;
									.type {
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
							}
							.activitDe {
								padding: 20px;
								height: 152px;
								position: relative;
								.activeType {
									margin-top: 14px;
									height: 20px;
									line-height: 20px;
									padding:0 6px;
									background-color: #f4b33f;
									border-radius: 3px;
									display:inline-block;
									.tourType {
										color: #fff;
										font-size: 12px;
									}
								}
								.titleText {
									
									line-height: 21px;
									text-overflow: ellipsis;
									display: -webkit-box;
									display: -moz-box;
									-moz-box-orient: vertical;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 3;
									-moz-line-clamp: 3;
									-o-text-overflow: ellipsis;
									word-wrap: break-word;
									font-size: 16px;
									font-weight: bold;
									text-align: left;
									overflow: hidden;
								}
								.duration {
									margin-top: 14px;
									font-size: 14px;
									color: #878e95;
				
								}
								.totalPic {
									position: absolute;
									bottom: 20px;
									right: 20px;
									.nowPic {
										text-align: right;
										font-size: 14px;
										color: #878e95;
										b {
											color: #353a3f;
											font-size: 20px;
										}
										span {
											color: #353a3f;
										}
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
						margin-right:15px;
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
			width: 671px!important;
		}
	}
</style>