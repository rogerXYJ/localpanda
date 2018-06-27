<template>
	<div class="activityList">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="banner">
			<div class="linerBackground"></div>
			<div class="selectInfo">
				<div class="position">
					<h3>Destination</h3>
					<el-select v-model="value" @change="changeVal(value)" @focus="stop">
						<a :href="item.url" v-for="item in options">
							<el-option :key="item.value" :label="item.label" :value="item.value">

							</el-option>
						</a>
					</el-select>
				</div>
			</div>
		</div>
		<div class="seach">
					<div class="seach-table clearfix">
						<ul class="seach-type">
							<li v-if="group_type">
								<div class="citys" @click.stop="showSelect(0)">Service Type
									<i class="iconfont" v-if="!isshowGroupType">&#xe666;</i>
									<i class="iconfont" v-else>&#xe667;</i>
								</div>
								<div class="citysList" v-if="isshowGroupType" @click.stop="selectShow(0)">
									<em class="cancel iconfont" @click.stop="cancel(0)">&#xe606;</em>
									<el-checkbox-group  v-model="checkedGroupType">
										<div class="checkboxlist" v-for="(item,key,index) in group_type">
											<el-checkbox :label="key" :key="key">{{key}} ({{item}})</el-checkbox>
										</div>
										
									</el-checkbox-group>

									<div class="subimtbtn" @click.stop="apply(0)">Apply</div>
								</div>
							</li>
							<li v-if="category">
								<div class="citys" @click.stop="showSelect(1)">Products
									<i class="iconfont" v-if="!isshowcategory">&#xe666;</i>
									<i class="iconfont" v-else>&#xe667;</i>
								</div>
								<div class="citysList" v-if="isshowcategory" @click.stop="selectShow(1)">
									<em class="cancel iconfont" @click.stop="cancel(1)">&#xe606;</em>
									<el-checkbox-group v-model="checkedCategory">
										<div class="checkboxlist" v-for="(item,key,index) in category">
											<el-checkbox :label="key" :key="key">{{key}} ({{item}})</el-checkbox>
										</div>
									</el-checkbox-group>

									<div class="subimtbtn" @click.stop="apply(1)">Apply</div>
								</div>
							</li>
							<li v-if="attraction">
								<div class="citys" @click.stop="showSelect(4)">Interests
									<i class="iconfont" v-if="!isshowAttraction">&#xe666;</i>
									<i class="iconfont" v-else>&#xe667;</i>
								</div>
								<div class="citysList1 clearfix" :class="Object.keys(attraction).length>10?'left':''"  v-if="isshowAttraction" @click.stop="selectShow(4)">
									<div class="citysbox" :class="Object.keys(attraction).length>10?'widthlong':''">
										<em class="cancel position1 iconfont" @click.stop="cancel(4)">&#xe606;</em>
										<el-checkbox-group class="clearfix" v-model="checkedAttraction" v-if="Object.keys(attraction).length<=10">
											<div class="checkboxlist " v-for="(item,key,index) in attraction">
												<el-checkbox :label="key" :key="key">{{key}} ({{item}})</el-checkbox>
											</div>
											<div class="subimtbtn" @click.stop="apply(4)">Apply</div>
										</el-checkbox-group>
										<el-checkbox-group v-model="checkedAttraction" v-else>
											<div class="box clearfix">
												<div class="checkboxlist floatbox longer" v-for="(item,key,index) in attraction">
													<el-checkbox :label="key" :key="key">{{key}} ({{item}})</el-checkbox>
												</div>
												
											</div>
											
										</el-checkbox-group>
										
									</div>
									<div class="subimtbtn" @click.stop="apply(4)">Apply</div>
								</div>
							</li>
							
							<li v-if="tourtype">
								<div class="citys" @click.stop="showSelect(3)">Themes
									<i class="iconfont" v-if="!isshowtourtype">&#xe666;</i>
									<i class="iconfont" v-else>&#xe667;</i>
								</div>
								<div class="citysList" :class="Object.keys(tourtype).length>10?'long':''" v-if="isshowtourtype" @click.stop="selectShow(3)">
									<em class="cancel iconfont" @click.stop="cancel(3)">&#xe606;</em>
									<el-checkbox-group v-model="checkedTourtype" v-if="Object.keys(tourtype).length<=10">
										<div class="checkboxlist" v-for="(i,key,index) in tourtype">
											<el-checkbox :label="key" :key="key">{{key}} ({{i}})</el-checkbox>
										</div>
										<div class="subimtbtn" @click.stop="apply(2)">Apply</div>
									</el-checkbox-group>
									<el-checkbox-group v-model="checkedTourtype" v-else>
										<div class="box clearfix">
											<div class="checkboxlist floatbox" v-for="(i,key,index) in tourtype">
												<el-checkbox :label="key" :key="key">{{key}} ({{i}})</el-checkbox>
											</div>
											
										</div>
										<div class="subimtbtn" @click.stop="apply(2)">Apply</div>
									</el-checkbox-group>
									
									
								</div>
							</li>
							<li v-if="durations">
								<div class="citys" @click.stop="showSelect(2)">Duration
									<i class="iconfont" v-if="!isshowdurations">&#xe666;</i>
									<i class="iconfont" v-else>&#xe667;</i>
								</div>
								<div class="citysList" v-if="isshowdurations" @click.stop="selectShow(2)">
									<em class="cancel iconfont" @click.stop="cancel(2)">&#xe606;</em>
									<el-checkbox-group v-model="checkedDurations">
										<div class="checkboxlist" v-for="(i,key,index) in durations">
											<el-checkbox v-if="key==0" :label="key" :key="key">Half Day ({{i}})</el-checkbox>
											<el-checkbox v-if="key==1" :label="key" :key="key">{{key}} Day ({{i}})</el-checkbox>
											<el-checkbox v-if="key>1" :label="key" :key="key">{{key}} Days ({{i}})</el-checkbox>
										</div>
									</el-checkbox-group>

									<div class="subimtbtn" @click.stop="apply(3)">Apply</div>
								</div>
							</li>

						</ul>
						<div class="recommended">
							<h3>SORT BY</h3>
							<select class="selectSort" @change="sort(selected)" v-model="selected">
								<option v-for="(item,index) in select" v-model="item.selectText">{{item.selectText}}</option>
							</select>
							<i class="iconfont">&#xe666;</i>
						</div>
					</div>
					<div class="delSeach clearfix">
						<div class="del">
							<span v-if="removeGroupType.length>0" v-for="(item,index) in removeGroupType" @click="del(0,removeGroupType,index)">{{item}}<i class="iconfont">&#xe629;</i></span> 
							<span v-if="removeCategory.length>0" v-for="(item,index) in removeCategory" @click="del(1,removeCategory,index)">{{item}}<i class="iconfont">&#xe629;</i></span>
							<span v-if="removeDurations.length>0 && item==0" v-for="(item,index) in removeDurations" @click="del(2,removeDurations,index)">Half Day<i class="iconfont">&#xe629;</i></span>
							<span v-if="removeDurations.length>0 && item==1" v-for="(item,index) in removeDurations" @click="del(2,removeDurations,index)">1 Day<i class="iconfont">&#xe629;</i></span>
							<span v-if="removeDurations.length>0 && item>1" v-for="(item,index) in removeDurations" @click="del(2,removeDurations,index)">{{item}} Days<i class="iconfont">&#xe629;</i></span>
							<span v-if="removeTourtype.length>0" v-for="(item,index) in removeTourtype" @click="del(3,removeTourtype,index)">{{item.replace(/And/g,'&')}}<i class="iconfont">&#xe629;</i></span>
							<span v-if="removeAttraction.length>0" v-for="(item,index) in removeAttraction" @click="del(4,removeAttraction,index)">{{item}}<i class="iconfont">&#xe629;</i></span> 
							<em class="clearAll" @click="clearAll" v-if="removeGroupType.length>0||removeAttraction.length>0||removeCategory.length>0||removeDurations.length>0||removeTourtype.length>0">Clear All</em>
						</div>
						<div class="pageSizeInfo" v-if="records==1">1 activity in total</div>
						<div class="pageSizeInfo" v-if="records==0">0 activity in total</div>
						<div class="pageSizeInfo" v-if="records>1">{{records}} activities in total</div>
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
								<div class="activeType">
									<div class="tourType"><i class="iconfont">&#xe653;</i>{{item.category}}{{item.groupType?' · '+item.groupType:''}}</div>

								</div>
								<div class="titleText" style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">
									{{item.title}}
								</div>
								<div class="duration"><i class="iconfont">&#xe624;</i>Duration: {{item.duration}} {{item.durationUnit|firstUpperCase}}</div>
								<div class="totalPic">

									<div class="nowPic">From <b>${{returnFloat(item.bottomPrice)}}</b><span>  pp</span></div>
								</div>
							</div>

						</div>
					</a>

				</li>
			</ul>

			<div class="pagination-page" v-if="isdisabled">
				<el-pagination background layout="prev, pager, next" :total="records" class="el-pagination is-background" @current-change="handleCurrentChange" :page-size="20">
				</el-pagination>
			</div>

		</div>
		<div class="empty" v-else>
			<p>No activities or tours that match your interests are found. </p>
			<p>You can try to modify your screening conditions or choose our "Customize Your Trip" option.</p>
			<p>We can collect your preferences and customize your ideal trip, free of charge.
				<a href="javascript:;" @click="showContact">Click here to start!</a>
			</p>
		</div>
		<Foot></Foot>
		<FooterCommon></FooterCommon>
		<Loading :loadingStatus="loadingStatus"></Loading>
		<!--<Bottom :scrollTop="600" :isListPage="isListPage"></Bottom>-->
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
			if(!route.query.opctions){
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
						url: '/activity/list/Shanghai'
					},
					{
						value: 'Beijing',
						label: 'Beijing',
						url: '/activity/list/Beijing'
					},
					{
						value: 'Chengdu',
						label: 'Chengdu',
						url: '/activity/list/Chengdu'
					},
					{
						value: "Xi'an",
						label: "Xi'an",
						url: '/activity/list/Xian'
					},
					{
						value: "Guilin",
						label: "Guilin",
						url: '/activity/list/Guilin'
					}
				],
				value: slug == "Xian" ? "Xi\'an" : slug,
				loc: slug,
				activityList: [],
				logIn: '',
				pageSize: 20,
				pageNum: 1,
				loadingStatus: false,
				isdisabled: false,
				//isListPage: true,
				apiBasePath: apiBasePath,
				//唤起定制
				ContactStatus: false,
				isShowAlert: false,
				alertTitle: '',
				alertMessage: "",
				istrue: false,
				objectType: 'CONSULTING',
				//下拉选项
				selected: 'Recommended',
				select: [{
						selectText: "Recommended",
						type: "SCORE",
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
				
				
				//筛选
				group_type:'',
				checkedGroupType:[],
				isshowGroupType:false,
				
				attraction:'',
				checkedAttraction:[],
				isshowAttraction:false,
				
				isshowcategory: false,
				category: '',
				checkedCategory: [],
				
				isshowdurations: false,
				durations: '',
				checkedDurations: [],
				
				isshowtourtype: false,
				tourtype: '',
				checkedTourtype: [],
				
				aggregations:'',
				records: '',
				//删除筛选项
				removeAttraction: [],
				removeCategory: [],
				removeDurations: [],
				removeTourtype: [],
				removeGroupType:[]
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
					data.checkedCategory =opctions.category
					let jsonCategory = {
						type: 'CATEGORY',
						filterValues: data.checkedCategory
					}
					filters.push(jsonCategory)
				}
				if(opctions.durations) {
					data.checkedDurations = opctions.durations
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
					data.checkedTourtype =opctions.tourtype
					let jsonTourtype = {
						type: 'TOUR_TYPE',
						filterValues: data.checkedTourtype
					}
					filters.push(jsonTourtype)
				}
				if(opctions.attraction) {
					console.log(opctions.attraction)
					data.checkedAttraction = opctions.attraction
					let jsonAttraction = {
						type: 'ATTRACTION',
						filterValues: data.checkedAttraction
					}
					filters.push(jsonAttraction)
				}
				if(opctions.group_type) {
					data.checkedGroupType =opctions.group_type
					let jsonGroupType = {
						type: 'GROUP_TYPE',
						filterValues: data.checkedGroupType
					}
					filters.push(jsonGroupType)
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
			console.log(obj)
			try {
				listdata = await Vue.axios.post(apiBasePath + "search/activity", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				})
				data.records = listdata.data.records
				data.aggregations = listdata.data.aggregations
				data.activityList = listdata.data.entities
				if(listdata.data.records > data.pageSize) {
					data.isdisabled = true
				}
				//转化显示选择项
				for(let i = 0; i < listdata.data.aggregations.length; i++) {
					if(listdata.data.aggregations[i].type == "CATEGORY") {
						if(listdata.data.aggregations[i].items){
							data.category = listdata.data.aggregations[i].items
						}
					} else if(listdata.data.aggregations[i].type == "DURATION") {
						if(listdata.data.aggregations[i].items){
							data.durations = listdata.data.aggregations[i].items
						}
						
					} else if(listdata.data.aggregations[i].type == "TOUR_TYPE") {
						if(listdata.data.aggregations[i].items){
							data.tourtype = listdata.data.aggregations[i].items
						}
						
					}else if(listdata.data.aggregations[i].type=="GROUP_TYPE"){
						if(listdata.data.aggregations[i].items){
							data.group_type=listdata.data.aggregations[i].items
						}
						
					}else if(listdata.data.aggregations[i].type=="ATTRACTION"){
						if(listdata.data.aggregations[i].items){
							data.attraction=listdata.data.aggregations[i].items
						}
						
					}
				}
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
			//Bottom,
			Pagination,
			Contact,
			Alert,
			Foot
		},
		methods: {
			changeVal(value){
			ga(gaSend, {
					hitType: 'event',
					eventCategory: 'activity_list',
					eventAction: 'switch',
					eventLabel: 'destination_'+value,

				});
			},
			stop(){
				this.isshowcategory = false
				this.isshowdurations = false
				this.isshowtourtype = false
				this.isshowAttraction=false
				this.isshowGroupType=false
			},
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
			getIsShowAlert(val) {
				this.isShowAlert = val
			},
			showContact() {
				this.ContactStatus = true
			},
			contactCallBack(val) {
				this.ContactStatus = false
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
			showSelect(id) {
				let opctions = JSON.parse(this.getUrlParam("opctions")) ? JSON.parse(this.getUrlParam("opctions")) : JSON.parse(this.getUrlParam("options"));
				if(id==0){
					this.isshowGroupType = !this.isshowGroupType
					this.isshowAttraction = false
					this.isshowdurations = false
					this.isshowtourtype = false
					this.isshowcategory=false
					if(opctions && opctions.group_type) {
						this.checkedGroupType = opctions.group_type
					} else {
						this.checkedGroupType=[]
						this.checkedCategory = opctions && opctions.category ? opctions.category : []
						this.checkedDurations = opctions && opctions.durations ? opctions.durations : []
						this.checkedTourtype = opctions && opctions.tourtype ? opctions.tourtype : []
						this.checkedAttraction=opctions&&opctions.attraction?opctions.attraction:[]
					}
				}
				else if(id == 1) {
					this.isshowcategory = !this.isshowcategory
					this.isshowAttraction = false
					this.isshowdurations = false
					this.isshowtourtype = false
					this.isshowGroupType=false
					if(opctions && opctions.category) {
						this.checkedCategory = opctions.category
					} else {
						
						this.checkedCategory = []
						this.checkedDurations = opctions && opctions.durations ? opctions.durations : []
						this.checkedTourtype = opctions && opctions.tourtype ? opctions.tourtype : []
						this.checkedAttraction=opctions&&opctions.attraction?opctions.attraction:[]
						this.checkedGroupType=opctions&&opctions.group_type?opctions.group_type:[]
					}
				} else if(id == 2) {
					this.isshowdurations = !this.isshowdurations
					this.isshowcategory = false
					this.isshowAttraction = false
					this.isshowtourtype = false
					this.isshowGroupType=false
					if(opctions && opctions.durations) {
						this.checkedDurations = opctions.durations
					} else {
						
						this.checkedCategory = opctions && opctions.category ? opctions.category : []
						this.checkedDurations = []
						this.checkedTourtype = opctions && opctions.tourtype ? opctions.tourtype : []
						this.checkedAttraction=opctions&&opctions.attraction?opctions.attraction:[]
						this.checkedGroupType=opctions&&opctions.group_type?opctions.group_type:[]
					}
				} else if(id == 3) {
					this.isshowtourtype = !this.isshowtourtype
					this.isshowdurations = false
					this.isshowcategory = false
					this.isshowAttraction = false
					this.isshowGroupType=false
					if(opctions && opctions.tourtype) {
						for(let i = 0; i < opctions.tourtype.length; i++) {
							opctions.tourtype[i] = opctions.tourtype[i].replace(/And/g, "&")
						}
						this.checkedTourtype = opctions.tourtype
					} else {
						
						this.checkedCategory = opctions && opctions.category ? opctions.category : []
						this.checkedDurations = opctions && opctions.durations ? opctions.durations : []
						this.checkedTourtype = []
						this.checkedAttraction=opctions&&opctions.attraction?opctions.attraction:[]
						this.checkedGroupType=opctions&&opctions.group_type?opctions.group_type:[]
					}
				}else{
					this.isshowAttraction = !this.isshowAttraction
					this.isshowdurations = false
					this.isshowcategory = false
					this.isshowtourtype=false
					this.isshowGroupType=false
					if(opctions && opctions.attraction) {
						this.checkedAttraction = opctions.attraction
					} else {
						
						this.checkedCategory = opctions && opctions.category ? opctions.category : []
						this.checkedDurations = opctions && opctions.durations ? opctions.durations : []
						this.checkedTourtype = opctions && opctions.tourtype ? opctions.tourtype : []
						this.checkedAttraction=[]
						this.checkedGroupType=opctions&&opctions.group_type?opctions.group_type:[]
					}
				}
			},
			clearAll() {
				location.href = "/activity/list/" + this.loc
			},
			sort(val) {
				for(let i = 0; i < this.checkedTourtype.length; i++) {
					this.checkedTourtype[i] = this.checkedTourtype[i].replace(/&/g, "And")
				}
				var sort = {}
				if(val == "Recommended") {
					sort = {
						type: "SCORE"
					}
					ga(gaSend, {
						hitType: 'event',
						eventCategory: 'activity_list',
						eventAction: 'sort',
						eventLabel: 'score',
	
					});
				} else if(val == "Price :Low to High") {
					sort = {
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
					sort = {
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
					group_type:this.checkedGroupType,
					category: this.checkedCategory,
					durations: this.checkedDurations,
					tourtype: this.checkedTourtype,
					attraction:this.checkedAttraction
				})
				sort = JSON.stringify(sort)
				opctions = encodeURIComponent(JSON.stringify(opctions))
				location.href = "/activity/list/" + this.loc + "?options=" + opctions + (/SCORE/.test(sort)?"":"&sort=" + sort);
			},
			//选项内容点击不收起
			selectShow(id) {
				if(id==0){
					this.isshowGroupType=true
				}else if(id == 1) {
					this.isshowcategory = true
				} else if(id == 2) {
					this.isshowdurations = true
				} else if(id == 3) {
					this.isshowtourtype = true
				}else{
					this.isshowAttraction=true
				}
			},
			cancel(id) {
				let that = this
				let opctions = JSON.parse(that.getUrlParam("opctions")) ? JSON.parse(that.getUrlParam("opctions")) : JSON.parse(that.getUrlParam("options"));
				if(id==0){
					this.isshowGroupType = false
					if(!opctions) {
						this.checkedGroupType = []
					} else if(opctions.group_type) {
						this.checkedGroupType = opctions.group_type
					}
				}else if(id == 1) {
					this.isshowcategory = false
					if(!opctions) {
						this.checkedCategory = []
					} else if(opctions.category) {
						this.checkedCategory = opctions.category
					}
				} else if(id == 2) {
					this.isshowdurations = false
					if(!opctions) {
						this.checkedDurations = []
					} else if(opctions.durations) {
						this.checkedDurations =opctions.durations
					}
				} else if(id==3) {
					this.isshowtourtype = false
					if(!opctions) {
						this.checkedTourtype = []
					} else if(opctions.tourtype) {
						for(let i = 0; i < opctions.tourtype.length; i++) {
							opctions.tourtype[i] = opctions.tourtype[i].replace(/And/g, "&")
						}
						opctions.tourtype = this.checkedTourtype
					}
				}else{
					this.isshowAttraction = false
					if(!opctions) {
						this.checkedAttraction = []
					} else if(opctions.attraction) {
						opctions.attraction = this.checkedAttraction
					}
				}
			},
			del(id, arr, index) {
				let sort = {}
				for(let i = 0; i < this.checkedTourtype.length; i++) {
					this.checkedTourtype[i] = this.checkedTourtype[i].replace(/&/g, "And")
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
				sort = JSON.stringify(sort)
				if(id==0){
					arr.splice(index, 1)
					console.log(arr)
					var opctions = this.delNull({
						group_type:arr,
						category: this.removeCategory,
						durations: this.removeDurations,
						tourtype: this.removeTourtype,
						attraction:this.removeAttraction
						
					})
					opctions = encodeURIComponent(JSON.stringify(opctions))
					console.log(opctions)
					location.href = "/activity/list/" + this.loc + "?options=" + opctions  + (/SCORE/.test(sort)?"":"&sort=" + sort);
				}else if(id == 1) {
					arr.splice(index, 1)
					console.log(arr)
					var opctions = this.delNull({
						category: arr,
						durations: this.removeDurations,
						tourtype: this.removeTourtype,
						attraction:this.removeAttraction,
						group_type:this.removeGroupType,
					})
					opctions = encodeURIComponent(JSON.stringify(opctions))
					console.log(opctions)
					location.href = "/activity/list/" + this.loc + "?options=" + opctions  + (/SCORE/.test(sort)?"":"&sort=" + sort);
				} else if(id == 2) {
					arr.splice(index, 1)
					console.log(arr)
					var opctions = this.delNull({
						//cities:this.removeCity,
						category: this.removeCategory,
						durations: arr,
						tourtype: this.removeTourtype,
						attraction:this.removeAttraction,
						group_type:this.removeGroupType,
					})
					opctions = encodeURIComponent(JSON.stringify(opctions))
					console.log(opctions)
					location.href = "/activity/list/" + this.loc + "?options=" + opctions  + (/SCORE/.test(sort)?"":"&sort=" + sort);
				} else if(id==3) {
					arr.splice(index, 1)
					console.log(arr)
					var opctions = this.delNull({
						category: this.removeCategory,
						durations: this.removeDurations,
						tourtype: arr,
						attraction:this.removeAttraction,
						group_type:this.removeGroupType,
					})
					opctions = encodeURIComponent(JSON.stringify(opctions))
					console.log(opctions)
					location.href = "/activity/list/" + this.loc + "?options=" + opctions + (/SCORE/.test(sort)?"":"&sort=" + sort);
				}else{
					arr.splice(index, 1)
					console.log(arr)
					var opctions = this.delNull({
						category: this.removeCategory,
						durations: this.removeDurations,
						tourtype: this.removeTourtype,
						attraction:arr,
						group_type:this.removeGroupType,
					})
					opctions = encodeURIComponent(JSON.stringify(opctions))
					console.log(opctions)
					location.href = "/activity/list/" + this.loc + "?options=" + opctions + (/SCORE/.test(sort)?"":"&sort=" + sort);
				}
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
				if(that.checkedGroupType.length > 0) {
					let jsonGroupType = {
						type: 'GROUP_TYPE',
						filterValues: that.checkedGroupType
					}
					filters.push(jsonGroupType)
				}
				if(that.checkedAttraction.length>0){
					let jsonAttraction = {
						type: 'ATTRACTION',
						filterValues: that.checkedAttraction
					}
					filters.push(jsonAttraction)
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
			apply(id) {
				if(id==0){
					ga(gaSend, {
						hitType: 'event',
						eventCategory: 'activity_list',
						eventAction: 'filter',
						eventLabel: 'service_type',
	
					});	
				}else if(id==1){
					ga(gaSend, {
						hitType: 'event',
						eventCategory: 'activity_list',
						eventAction: 'filter',
						eventLabel: 'category',
	
					});
				}else if(id==2){
					ga(gaSend, {
						hitType: 'event',
						eventCategory: 'activity_list',
						eventAction: 'filter',
						eventLabel: 'theme',
	
					});
				}else if(id==3){
					ga(gaSend, {
						hitType: 'event',
						eventCategory: 'activity_list',
						eventAction: 'filter',
						eventLabel: 'duration',
	
					});
				}else if(id==4){
					ga(gaSend, {
						hitType: 'event',
						eventCategory: 'activity_list',
						eventAction: 'filter',
						eventLabel: 'attraction',
	
					});
				}
				let sort = {}
				//转url带&符号
				for(let i = 0; i < this.checkedTourtype.length; i++) {
					this.checkedTourtype[i] = this.checkedTourtype[i].replace(/&/g, "And")
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
				var opctions = this.delNull({
					category: this.checkedCategory,
					durations: this.checkedDurations,
					tourtype: this.checkedTourtype,
					attraction:this.checkedAttraction,
					group_type:this.checkedGroupType
				});
				opctions = encodeURIComponent(JSON.stringify(opctions))
				sort = JSON.stringify(sort)
				location.href = "/activity/list/" + this.loc + "?options=" + opctions  + (/SCORE/.test(sort)?"":"&sort=" + sort);
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
			delNull(obj){
				var newOpctions = {};
				for(var key in obj){
					if(obj[key].length){
						newOpctions[key] = obj[key];
					}
				}
				return newOpctions;
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
			/*if(!JSON.parse(that.getUrlParam("opctions"))){
				opctions = JSON.parse(that.getUrlParam("opctions"))? JSON.parse(that.getUrlParam("options")) : null;
			}*/
			that.removeCategory = opctions && opctions.category ? opctions.category : []
			that.removeDurations = opctions && opctions.durations ? opctions.durations : []
			that.removeTourtype = opctions && opctions.tourtype ? opctions.tourtype : []
			that.removeAttraction=opctions && opctions.attraction ? opctions.attraction : []
			that.removeGroupType=opctions && opctions.group_type ? opctions.group_type : []
			
			console.log(this.attraction)

			document.getElementsByTagName("body")[0].addEventListener("click", function() {
				that.isshowcategory = false
				that.isshowdurations = false
				that.isshowtourtype = false
				that.isshowAttraction=false
				that.isshowGroupType=false
			})
			that.logIn = localStorage.getItem("logstate") ? localStorage.getItem("logstate") : null
			
		},
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	.el-input__inner {
		width: 160px;
		height: 40px;
		font-size: 28px!important;
		color: #fff;
		background: transparent;
		border: none;
		padding-left: 0;
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
	.el-input__suffix{
		right: 0;
	}
	.el-select-dropdown {
		text-align: center;
		border-radius: 20px!important;
		border: none!important;
	}
	
	.el-select-dropdown__item.selected {
		color: #1bbc9d!important;
		font-weight: normal!important;
	}
	
	.el-select-dropdown__item {
		font-size: 18px!important;
		text-align: left!important;
		&.hover {
			background-color: #fff!important;
			border-radius: 20px;
		}
		&:hover {
			background-color: #fff!important;
			border-radius: 20px;
			color: #1bbc9d;
		}
	}
	
	.el-select .el-input.is-focus .el-input__inner {
		border-color: #b4bccc!important;
	}
	
	.el-checkbox__label {
		font-size: 16px;
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
	.activityList {
		.pagination-page {
			text-align: center;
			margin-top: 40px
		}
		overflow-x: hidden;
		width: 100%;
		background: #faf9f8;
		.empty {
			width: 1284px;
			margin: 0 auto;
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
		.banner {
			position: relative;
			background:url("https://resource.localpanda.cn/static/headerPhotos/BackGround.jpg") no-repeat;
			background-size: cover;
			height: 260px;
			.linerBackground{
				position: absolute;
				bottom: 0;
				background: linear-gradient(rgba(255,249,248,0),rgba(255,249,248,1));
				height:180px;
				width: 100%;
			}
			.selectInfo {
				width: 1284px;
				margin: 0 auto;
				position: relative;
				height: 260px;
				
				.position {
					position: absolute;
					top: 42px;
					h3 {
						font-size: 18px;
						color: #fff;
					}
					.el-select {
						.el-icon-arrow-up:before {
							content: "\e60f"!important
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
								width: 350px;
								padding: 30px 27px;
								left: 50%;
								
								margin-left: -50%;
								.checkboxlist {
									margin-bottom: 20px;
								}
								.cancel {
									position: absolute;
									top: 10px;
									right: 10px;
									font-size: 12px;
									cursor: pointer;
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
									position:absolute;
									bottom: 25px;
									right: 25px;
									text-align: right;
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
		.list-cont {
			background: #faf9f8;
			margin: 0 auto 80px;
			width: 1284px;
			.activity-item {
				&:hover {
					transform: translateY(-10px);
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
				margin-right:20px;
				&:nth-child(4n+0) {
					margin-right: 0;
				}
				width:306px;
				margin-top: 30px;
				.activity {
					.activity-photo {
						width: 306px;
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
					padding: 0 20px 20px;
					.activeType {
						height: 40px;
						line-height: 40px;
						.tourType {
							color: #d87b65;
							font-size: 14px;
							i {
								font-size: 12px;
								margin-right: 8px;
							}
						}
					}
					.titleText {
						width: 100%;
						height: 72px;
						line-height:24px;
						text-overflow: ellipsis;
						display: -webkit-box;
						display: -moz-box;
						-moz-box-orient: vertical;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						-moz-line-clamp: 3;
						-o-text-overflow: ellipsis;
						word-wrap: break-word;
						font-size: 18px;
						font-weight: bold;
						text-align: left;
						overflow: hidden;
					}
					.duration {
						margin-top: 17px;
						font-size: 14px;
						color: #878e95;
						i {
							font-size: 12px;
							margin-right: 8px;
						}
					}
					.totalPic {
						padding-top: 20px;
						.oldpic {
							text-align: right;
							font-size: 14px;
							color: #878e95;
							text-decoration: line-through;
						}
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
		.floatbox {
			float: left;
			width: 30%;
			margin-right: 5%;
			
		}
		.long {
			width: 671px!important;
			left: -100%!important;
		}
		.widthlong{
			width: 850px!important;
			max-height: 431px;
			
			overflow: auto;
		}
		.left{
			left: -100%!important;
		}
		.longer{
			width: 40%!important;
			
		}
		.citysbox{
			width: 350px;
			padding: 30px 27px;
		}
		.position1{
			top: 20px!important;
			right: 30px!important;
		}
		.citysList1{
			position: absolute;
			z-index: 999999999;
			background: #fff;
			box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.2);
			border-radius: 3px;
			left: 50%;
			margin-left: -50%;
			.checkboxlist {
									margin-bottom: 20px;
								}
								.cancel {
									position: absolute;
									top: 10px;
									right: 10px;
									font-size: 12px;
									cursor: pointer;
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
									position:absolute;
									bottom: 25px;
									right: 25px;
									text-align: right;
									color: #1bbc9d;
									font-size: 18px;
									cursor: pointer;
									font-weight: bold;
								}
		}
	}
</style>