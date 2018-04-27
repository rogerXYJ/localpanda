<template>
	<div class="M-activityList">
		<Head></Head>
		<div class="filterInfo">
			<span class="destination ">
				<i class="iconfont">&#xe610;</i>
				<select v-model="value" @change="locationFn(value)">
					<option v-for="item in options">{{item.label}}</option>
				</select>
			</span>
			<span class="destination" @touchend="showFilter">
				<i class="iconfont">&#xe668;</i>
				Filter
			</span>
			<span class="destination">
				<i class="iconfont">&#xe610;</i>
				<select  @change="sortFn(selected)" v-model="selected">
					<option v-for="item in select">{{item.selectText}}</option>
				</select>
			</span>
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
									<div class="tourType">{{item.category}} · {{item.duration}} {{item.durationUnit|firstUpperCase}}</div>

								</div>
								<div class="titleText" style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">
									{{item.title}}
								</div>
								
								<div class="totalPic">
									<div class="nowPic">From <b>${{returnFloat(item.bottomPrice)}}</b><span>  pp</span></div>
								</div>
							</div>

						</div>
					</a>

				</li>
			</ul>
		</div>
		<div class="empty" v-else>
			<p>No activities or tours that match your interests are found.</p>
			<p>You can try to modify your screening conditions.</p>
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
		<infinite-loading  @infinite="infiniteHandler" spinner="bubbles"  ref="infiniteLoading">
			<span slot="no-more">You've reached the bottom of the page.</span>
			<span slot="no-results" class="no-results"></span>
		</infinite-loading>
	</div>
</template>
<script>
	if (process.browser) {
	  require('~/assets/js/plugin/flexible.js')
	}
	import Head from '~/components/headMobeil'
	import { getUrlParams } from '~/assets/js/plugin/utils';
	import InfiniteLoading from 'vue-infinite-loading/src/components/Infiniteloading.vue'
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
			Mfilter,
			Head,
			InfiniteLoading
		},
		methods: {
			locationFn(loc){
				location.href="/activity/list/mobile/"+loc
			},
			setCallBack(val){
				this.isshow=val
			},
			showFilter(){
				this.isshow=true
			},
			del(id, arr, index) {
				this.sort=JSON.stringify(this.sort)
				for(let i = 0; i < this.checkedTourtype.length; i++) {
					this.checkedTourtype[i] = this.checkedTourtype[i].replace(/&/g, "And")
				}
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
				let opctions=this.getUrlParam("opctions");
				
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
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	.M-activityList{
		.filterInfo{
			padding:0 0.586666rem 0.453333rem;
			border-bottom:1px solid #dde0e0;
			.destination{
				font-size: 0.346666rem;
				margin-left: 0.186666rem;
				&:first-child{
					margin-left: 0;
				}
				&:last-child{
					padding-right: 0;
				}
				border: solid 0.026666rem #dde0e0;
				border-radius: 8px;
				height: 0.773333rem;
				display: inline-block;
				height: auto;
				padding:0.24rem 0.266666rem;
				&:nth-child(2){
					i{
						margin-right:0;
					}
				}
				i{
					font-size: 0.293333rem;
					margin-right: 0.16rem;
					color:#cacccc;
					
				}
				select{
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;
					border: none;
					font-size: 0.346666rem;
					background:transparent;
				}	
			}
			
			
		}
		
		
		
		.list-cont{
			padding:0.133333rem  0.586666rem 0;
			.activity-item {
				&:nth-child(2n+2){
					margin-right: 0;
				}
				float:left;
				width:48%;
				margin-right: 4%;
				margin-top:0.586666rem;
				.activity {
					.activity-photo {
						height: 2.853333rem;
						background-repeat: no-repeat!important;
						background-size: cover!important;
						position: relative;
					}
				}
				.activitDe {
					.activeType {
						height: 0.893333rem;
						line-height: 0.893333rem;
						.tourType {
							color: #d87b65;
							font-size:0.293333rem;
							
						}
					}
					.titleText {
						width: 100%;
						height:1.45555rem;
						text-overflow: ellipsis;
						display: -webkit-box;
						display: -moz-box;
						-moz-box-orient: vertical;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						-moz-line-clamp: 3;
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
						padding-top: 0.226666rem;
						.oldpic {
							text-align: right;
							font-size: 14px;
							color: #878e95;
							text-decoration: line-through;
						}
						.nowPic {
							text-align:left;
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
		.empty{
			padding: 0.533333rem;
			p{
				text-align: center;
				font-size: 0.32rem;
			}
		}
		.view {
			width: 100%;
			transition: all 0.3s cubic-bezier(.55, 0, .1, 1);
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
		.no-results{
			display: inline-block;
			padding: 0 0.586666rem;
			word-wrap:break-word; 
			
		}
	}
</style>