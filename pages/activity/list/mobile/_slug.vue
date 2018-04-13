<template>
	<div class="M-activityList">
		<div class="headpic">
			<div class="linerBackground"></div>
			<div class="position">
				<h3>Destination</h3>
				<el-select v-model="value">
					<a :href="item.url" v-for="item in options">
						<el-option :key="item.value" :label="item.label" :value="item.value">

						</el-option>
					</a>
				</el-select>
			</div>
		</div>
		<div class="filter" :class="{scroll:isscroll}">
			
			<div class="filter-table clearfix">
				
				<div class="filter-cont" @click="showFilter">
					<i class="iconfont">&#xe668;</i>
					<span>Filter</span>
				</div>
				<div class="recommended">
					<h3>SORT BY</h3>
					<select class="selectSort" @change="sortFn(selected)" v-model="selected">
						<option v-for="(item,index) in select" v-model="item.selectText">{{item.selectText}}</option>
					</select>
					<i class="iconfont">&#xe666;</i>
				</div>
			</div>
			<div class="filter-list">
				<!--<em class="clearAll" v-if="checkedCategory.length>0||checkedDurations.length>0||checkedTourtype.length>0">Clear All</em>-->
				<span v-if="checkedCategory&&checkedCategory.length>0" v-for="(item,index) in checkedCategory" @click="del(1,checkedCategory,index)">{{item}}<i class="iconfont">&#xe629;</i></span>
				<span v-if="checkedDurations&&checkedDurations.length>0 && item==0" v-for="(item,index) in checkedDurations" @click="del(2,checkedDurations,index)">Half Day<i class="iconfont">&#xe629;</i></span>
				<span v-if="checkedDurations&&checkedDurations.length>0 && item==1" v-for="(item,index) in checkedDurations" @click="del(2,checkedDurations,index)">1 Day<i class="iconfont">&#xe629;</i></span>
				<span v-if="checkedDurations&&checkedDurations.length>0 && item>1" v-for="(item,index) in checkedDurations" @click="del(2,checkedDurations,index)">{{item}} Days<i class="iconfont">&#xe629;</i></span>
				<span v-if="checkedTourtype&&checkedTourtype.length>0" v-for="(item,index) in checkedTourtype" @click="del(3,checkedTourtype,index)">{{item.replace(/And/g,'&')}}<i class="iconfont">&#xe629;</i></span>
				
			</div>
			<div class="pageSizeInfo" v-if="records==1&&!isscroll">1 activity in total</div>
			<div class="pageSizeInfo" v-if="records==0&&!isscroll">0 activity in total</div>
			<div class="pageSizeInfo" v-if="records>1&&!isscroll">{{records}} activities in total</div>
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
								<div class="activeType">
									<div class="tourType">{{item.category}}</div>

								</div>
								<div class="titleText" style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">
									{{item.title}}
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
		<transition name="slideleft">
			<Mfilter 
				v-show="isshow" 
				@callBack="setCallBack" 
				:sort="sort" 
				:category="category" 
				:durations="durations" 
				:tourtype="tourtype" 
				:loc="loc"
				:checkedCategory="checkedCategory"
				:checkedDurations="checkedDurations"
				:checkedTourtype="checkedTourtype"
				
				class="view" 
				></Mfilter>
		</transition>
		<infinite-loading  @infinite="infiniteHandler"  ref="infiniteLoading"></infinite-loading>
	</div>
</template>
<script>
	if (process.browser) {
	  require('~/assets/js/plugin/flexible.js')
	}
	import InfiniteLoading from "vue-infinite-loading"
	import { getUrlParams } from '~/assets/js/plugin/utils';
	import Mfilter from '~/components/pageComponents/activity/list/M-filter'
	import Vue from 'vue'
	export default {
		name: 'M-activityList',
		async asyncData({
			route,
			store,
			error,
			apiBasePath,
			redirect
		}) {
			let loc=route.params.slug;
			let sort = route.query.sort ? JSON.parse(route.query.sort) :{"type": "DEFAULT"};
			let opctions = route.query.opctions ? JSON.parse(route.query.opctions) : null
			let data={
				options: [
					{
						value: 'Shanghai',
						label: 'Shanghai',
						url: '/activity/list/mobile/Shanghai'
					},
					{
						value: 'Beijing',
						label: 'Beijing',
						url: '/activity/list/mobile/Beijing'
					},
					{
						value: 'Chengdu',
						label: 'Chengdu',
						url: '/activity/list/mobile/Chengdu'
					},
					{
						value: "Xi'an",
						label: "Xi'an",
						url: '/activity/list/mobile/Xian'
					},
					{
						value: "Guilin",
						label: "Guilin",
						url: '/activity/list/mobile/Guilin'
					}
				],
				value: loc == "Xian" ? "Xi\'an" : loc,
				loc: loc,
				activityList: '',
				selected: 'Recommended',
				apiBasePath: apiBasePath,
				select: [{
						selectText: "Recommended",
						type: "DEFAULT",
						isSelect: true
					},
					{
						selectText: "Price :Low to High",
						type: "PRICE",
						isSelect: true
					},
					{
						selectText: "Price :High to Low",
						type: "PRICE",
						isSelect: false
					}

				],
				isshow:false,
				records: '',
				pageNum: 1,
				pageSize: 10,
				sort: sort,
				category:'',
				durations:'',
				tourtype:'',
				checkedCategory: [],
				checkedDurations: [],
				checkedTourtype: [],
				isscroll:false,
			};
			let listdata={}
			let filters=[]
			let obj={}
			if(sort) {
				if(sort.type == "PRICE" && sort.reverse == true) {
					data.selected = "Price :High to Low"
				} 
				if(sort.type == "PRICE" && sort.reverse == false) {
					data.selected = "Price :Low to High"
				}
			}else{
				data.selected = "Recommended"
			}
			if(opctions) {
				if(opctions.category&&opctions.category.length > 0) {
					data.checkedCategory = data.checkedCategory.concat(opctions.category)
					let jsonCategory = {
						type: 'CATEGORY',
						filterValues: data.checkedCategory
					}
					filters.push(jsonCategory)
				}
				if(opctions.durations&&opctions.durations.length > 0) {
					data.checkedDurations = data.checkedDurations.concat(opctions.durations)
					let jsonDurations = {
						type: 'DURATION',
						filterValues: data.checkedDurations
					}
					filters.push(jsonDurations)
				}
				if(opctions.tourtype&&opctions.tourtype.length > 0) {
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
			
			
			
			try{
				listdata = await Vue.axios.post(apiBasePath + "search/activity", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				})
				data.records = listdata.data.records
				data.activityList = listdata.data.entities
				for(let i = 0; i < listdata.data.aggregations.length; i++) {
					/*if(listdata.data.aggregations[i].type=="CITY"){
						data.cities=listdata.data.aggregations[i].items
					}else*/
					if(listdata.data.aggregations[i].type == "CATEGORY") {
						data.category = listdata.data.aggregations[i].items
					} else if(listdata.data.aggregations[i].type == "DURATION") {
						data.durations = listdata.data.aggregations[i].items
					} else if(listdata.data.aggregations[i].type == "TOUR_TYPE") {
						data.tourtype = listdata.data.aggregations[i].items
					}

				}
			}catch(err) {
				//return error(JSON.stringify(err));
			}
			return data
		},
		components: {
			Mfilter,
			InfiniteLoading
		},
		methods: {
			setCallBack(val){
				this.isshow=val
			},
			showFilter(){
				this.isshow=true
			},
			del(id, arr, index) {
				this.sort=JSON.stringify(this.sort)
				arr.splice(index, 1)
				if(id == 1) {
					
					var opctions = {
						//cities:this.removeCity,
						category: arr,
						durations: this.checkedDurations,
						tourtype: this.checkedTourtype,
					}
					opctions = JSON.stringify(opctions)
					//localStorage.setItem("opctions",opctions)
					location.href = "/activity/list/mobile/" + this.loc + "?opctions=" + opctions + "&sort=" + this.sort
				} else if(id == 2) {
					
					var opctions = {
						//cities:this.removeCity,
						category: this.checkedCategory,
						durations: arr,
						tourtype: this.checkedTourtype,
					}
					opctions = JSON.stringify(opctions)
					//localStorage.setItem("opctions",opctions)
					location.href = "/activity/list/mobile/" + this.loc + "?opctions=" + opctions + "&sort=" + this.sort
				} else {
					
					var opctions = {
						//cities:this.removeCity,
						category: this.checkedCategory,
						durations: this.checkedDurations,
						tourtype: arr,
					}
					opctions = JSON.stringify(opctions)
					//localStorage.setItem("opctions",opctions)
					location.href = "/activity/list/mobile/" + this.loc + "?opctions=" + opctions + "&sort=" + this.sort
				}
				//arr.splice(index,1)
			},
			sortFn(val){
				let opctions=this.getUrlParam("opctions")?this.getUrlParam("opctions"):''
				console.log(this.getUrlParam("opctions"))
				if(val == "Recommended") {
					location.href="/activity/list/mobile/"+this.loc+"?opctions="+opctions
				} else{
					if(val == "Price :Low to High") {
						this.sort = {
							type: "PRICE",
							reverse: false
						}
					}
					if(val == "Price :High to Low") {
						this.sort = {
							type: "PRICE",
							reverse: true
						}
					}
					this.sort=JSON.stringify(this.sort)
					
					location.href="/activity/list/mobile/"+this.loc+"?sort="+this.sort+"&opctions="+opctions
				}
				
				
			},
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
			getUrlParam(k) {
				var regExp = new RegExp('([?]|&)' + k + '=([^&]*)(&|$)');
				var result = window.location.href.match(regExp);
				if(result) {
					return decodeURIComponent(result[2]);
				} else {
					return null;
				}
			},
			infiniteHandler($state){
				//console.log(1111)
				let that=this
				that.pageNum++
				let filters=[]
				let obj={}
				if(that.checkedCategory&&that.checkedCategory.length > 0) {
					let jsonCategory = {
						type: 'CATEGORY',
						filterValues: that.checkedCategory
					}
					filters.push(jsonCategory)
				}
				if(that.checkedDurations&&that.checkedDurations.length > 0) {
					let jsonDurations = {
						type: 'DURATION',
						filterValues: that.checkedDurations
					}
					filters.push(jsonDurations)
				}
				if(that.checkedTourtype&&that.checkedTourtype.length > 0) {
					let jsonTourtype = {
						type: 'TOUR_TYPE',
						filterValues: that.checkedTourtype
					}
					filters.push(jsonTourtype)
				}
				if(filters.length&&filters.length > 0) {
					obj = {
						location: that.loc == "Xian" ? "Xi\'an" : that.loc,
						pageNum: that.pageNum,
						pageSize: that.pageSize,
						filters: filters,
						sort: that.sort
					}
				} else {
					obj = {
						location: that.loc == "Xian" ? "Xi\'an" : that.loc,
						pageNum: that.pageNum,
						pageSize: that.pageSize,
						sort: that.sort
					}
				}
				Vue.axios.post(that.apiBasePath + "search/activity", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(function(response) {
					if(response.data.entities&&response.data.entities.length) {
						that.activityList=that.activityList.concat(response.data.entities)
						$state.loaded();
					}else{
						 $state.complete();
					}
				}, function(response) {
					$state.complete();
				})
			}
		},
		filters: {
			firstUpperCase(val) {
				if(val)
					return val.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
			}
		},
		watch: {
			pageNum: function(val, oldVal) {
			},
			checkedDurations(val, oldVal) {
			},
			checkedTourtype(val, oldVal) {
				if(val.length > 0) {
					for(let i = 0; i < val.length; i++) {
						val[i] = val[i].replace(/And/g, "&")
					}
				}
			}
		},
		mounted: function() {
			let opctions=JSON.parse(this.getUrlParam("opctions"))
			console.log()
			let that=this
			window.addEventListener("scroll", (e)=>{
				if(scrollY>400){
					that.isscroll=true
				}else{
					that.isscroll=false
				}
			});
		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	html,body{
		background:  #faf9f8;
	}
	.el-input__inner {
		width: 2.8rem;
		height: 40px;
		font-size: 0.453333rem;
		color: #fff;
		background: transparent;
		border: none;
		padding-left: 0;
		font-weight: bold;
	}
	.el-select .el-input .el-select__caret {
		color: #fff;
		font-weight: bold;
		font-size: 0.32rem;
	}
	.el-popper .popper__arrow,
	.el-popper .popper__arrow::after {
		border-style: none!important;
	}
	.el-popper[x-placement^="bottom"]{
		margin-top: 0!important;
	}
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	.M-activityList{
		
		.headpic{
			position: relative;
			background:url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/BackGround.jpg") no-repeat;
			background-size: cover;
			background-position:center;
			.linerBackground{
				position: absolute;
				bottom: 0;
				background: linear-gradient(rgba(255,249,248,0),rgba(255,249,248,1));
				height:2.4rem;
				width: 100%;
			}
			height: 4.666666rem;
			position:relative;
			.position{
				padding: 0.533333rem 0.573333rem 0;
				h3{
					font-size: 0.266666rem;
					color: #fff;
					margin-bottom: 0.186666rem;
				}
			}
		}
		.filter{
			&.scroll{
				position: fixed;
				top: 0;
				left:0;
				margin: 0;
				width: calc(100% - 1.073333rem);
			}
			box-shadow: 0px 0px 0.4rem 0px rgba(0, 0, 0, 0.08);
			border-radius: 0.04rem;
			background: #fff;
			margin:0 0.586666rem;
			padding: 0.546666rem 0.533333rem 0.48rem;
			margin-top: -1.733333rem;
			position: relative;
			z-index: 10;
			h3{
				font-size: 0.346666rem;
				color: #878e95;
				margin-bottom: 0.133333rem;
			}
			.filter-table{
				padding-bottom: 0.533333rem;
				border-bottom: 1px solid #ebebeb;;
				.recommended{
					float:right;
					.selectSort{
						font-size: 0.4rem;
						-webkit-appearance:none;
						-moz-appearance:none;
						appearance:none;
						background-color:transparent;
						border:none;
						min-width:2.133333rem;
					}
				}
				.filter-cont{
					float:left;
					margin-top: 0.533333rem;
					font-size: 0.4rem;
					font-weight: bold;
					i{
						margin-right: 0.266666rem;
					}
				}
				
			}
			.filter-list{
				white-space:nowrap;
				padding-bottom: 0.266666rem;
				overflow-y: scroll;
				-webkit-overflow-scrolling: touch;
				span{
					display: inline-block;
					margin-top: 0.533333rem;
					padding: 0.133333rem 0.333333rem;
					border-radius: 0.533333rem;
					border: solid 0.026666rem #878e95;
					font-size: 0.4rem;
					margin-right: 0.24rem;
					i{
						font-size: 0.186666rem;
						color: #1bbc9d;
						font-weight: bold;
						margin-left: 0.133333rem;
					}
				}
			}
			.pageSizeInfo{
				margin-top: 0.453333rem;
				font-size: 0.4rem;
			}
		}
		.list-cont{
			padding: 0 0.586666rem;
			.activity-item {
				box-shadow: 0px 2px 6px 0px rgba(53,58,63,0.1);
				background: #fff;
				margin-top: 0.4rem;
				.activity {
					.activity-photo {
						height: 4.413333rem;
						background-repeat: no-repeat!important;
						background-size: cover!important;
						position: relative;
					}
				}
				.activitDe {
					padding: 0 0.4rem 0.4rem;
					.activeType {
						height: 0.893333rem;
						line-height: 0.893333rem;
						.tourType {
							color: #d87b65;
							font-size: 0.373333rem;
						}
					}
					.titleText {
						width: 100%;
						height:1rem;
						text-overflow: ellipsis;
						display: -webkit-box;
						display: -moz-box;
						-moz-box-orient: vertical;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						-moz-line-clamp: 2;
						-o-text-overflow: ellipsis;
						word-wrap: break-word;
						font-size: 0.373333rem;
						font-weight: bold;
						text-align: left;
						overflow: hidden;
					}
					.duration {
						margin-top: 0.266666rem;
						font-size: 0.293333rem;
						color: #878e95;
					}
					.totalPic {
						padding-top: 0.4rem;
						.oldpic {
							text-align: right;
							font-size: 14px;
							color: #878e95;
							text-decoration: line-through;
						}
						.nowPic {
							text-align: right;
							font-size: 0.293333rem;
							color: #878e95;
							b {
								color: #353a3f;
								font-size: 0.453333rem;
							}
							span {
								color: #353a3f;
							}
						}
					}
				}
			}
		}
		
		.view {
			width: 100%;
			transition: all .8s cubic-bezier(.55, 0, .1, 1);
		}
		.slideleft-enter-active,
		.slideleft-leave-active {
			opacity: 0;
			-webkit-transform: translate(100%, 0);
			transform: translate(100%, 0);
		}
		.slideleft-enter,
		.slideleft-leave-to {
			opacity: 0;
			-webkit-transform: translate(100%, 0);
			transform: translate(100%, 0);
		}
	}
</style>