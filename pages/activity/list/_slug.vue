<template>
	<div class="activityList">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="banner" :class="city(loc)">
			<div class="selectInfo">
				<div class="linkseting">
					<a href="/">Home</a>
					<em class="iconfont">&#xe64a;</em>
					<a href="javascript:" v-if="loc=='Shanghai'">Shanghai Activities</a>
					<a href="javascript:" v-if="loc=='Beijing'">Beijing Activities</a>
					<a href="javascript:" v-if="loc=='Chengdu'">Chengdu Activities</a>
					<a href="javascript:" v-if="loc=='Xian'">Xi'an Activities</a>
					<a href="javascript:" v-if="loc=='Guilin'">Guilin Activities</a>
				</div>
				<div class="position">
					<span v-if="loc=='Shanghai'">Shanghai</span>
					<span v-if="loc=='Beijing'">Beijing</span>
					<span v-if="loc=='Chengdu'">Chengdu</span>
					<span v-if="loc=='Xian'">Xi'an</span>
					<span v-if="loc=='Guilin'">Guilin</span>
					<el-select v-model="value" @change="clearlocalStorage">
						<a :href="item.url" v-for="item in options">
							<el-option :key="item.value" :label="item.label" :value="item.value">

							</el-option>
						</a>
					</el-select>
				</div>

			</div>
		</div>
		<div style="background: #fff;">
		<div class="selectType" v-if="loc!='Chengdu'&&loc!='Xian'&&loc!='Guilin'">
			<ul class="clearfix">
				<li>

					<div class="bg">
						<div class="bgTitle">Activities</div>
						<p>Activities with the most authentic </p>
						<p>experiences, handpicked by our travel consultants</p>
					</div>

				</li>
				<li>
					<a :href="'/guide/list/'+loc">
						<div class="bg">
							<div class="bgTitle">Guides</div>
							<p>Professional tour guides with local </p>
							<p>knowledge and user-centered services</p>
						</div>

					</a>
				</li>
			</ul>
		</div>
		<div class="seach">
			<h3>SORTBY</h3>
			<div class="seach-table clearfix">
				<div class="recommended">
					<select style="border:none;font-size: 16px;" @change="sort(selected)" v-model="selected">
						<!--<option>Recommended</option>
						<option>Price</option>-->
						<option v-for="(item,index) in select" v-model="item.selectText" >{{item.selectText}}</option>
					</select>
				</div>
				<ul class="seach-type">
					<li>
						<div class="citys" @click.stop="showSelect(0)">Destinations
							<i class="iconfont" v-if="!isshowcity" >&#xe666;</i>
							<i class="iconfont" v-else>&#xe667;</i>
						</div>
						<div class="citysList" v-if="isshowcity" @click.stop="selectShow(0)">
							  <em class="cancel iconfont" @click.stop="cancel(0)">&#xe606;</em>
							  <el-checkbox-group v-model="checkedCities" >
							  	<div class="checkboxlist" v-for="(city,key,index) in cities">
							  		<el-checkbox  :label="key" :key="key">{{key}}({{city}})</el-checkbox>
							  	</div>
							  </el-checkbox-group>
							  <div class="subimtbtn" @click.stop="apply()">Apply</div>
						</div>
					</li>
					<li>
						<div class="citys" @click.stop="showSelect(1)">Categories
							<i class="iconfont" v-if="!isshowcategory" >&#xe666;</i>
							<i class="iconfont" v-else>&#xe667;</i>
						</div>
						<div class="citysList" v-if="isshowcategory" @click.stop="selectShow(1)">
							<em class="cancel iconfont" @click.stop="cancel(1)">&#xe606;</em>
							  <el-checkbox-group v-model="checkedCategory" >
							  	<div class="checkboxlist" v-for="(item,key,index) in category">
							  		<el-checkbox  :label="key" :key="key">{{key}}({{item}})</el-checkbox>
							  	</div>
							  </el-checkbox-group>
							  <div class="subimtbtn" @click.stop="apply()">Apply</div>
						</div>
					</li>
					<li>
						<div class="citys" @click.stop="showSelect(3)">Themes
							<i class="iconfont" v-if="!isshowtourtype" >&#xe666;</i>
							<i class="iconfont" v-else>&#xe667;</i>
						</div>
						<div class="citysList" :class="Object.keys(tourtype).length>10?'long':''" v-if="isshowtourtype" @click.stop="selectShow(3)">
							<em class="cancel iconfont" @click.stop="cancel(3)">&#xe606;</em>
							  <el-checkbox-group v-model="checkedTourtype" v-if="Object.keys(tourtype).length<10">
							  	<div class="checkboxlist"  v-for="(i,key,index) in tourtype">
							  		<el-checkbox  :label="key" :key="key">{{key}}({{i}})</el-checkbox>
							  	</div>
							  </el-checkbox-group>
							  <el-checkbox-group v-model="checkedTourtype" v-else>
							  	<div class="checkboxlist floatbox"  v-for="(i,key,index) in tourtype">
							  		<el-checkbox  :label="key" :key="key">{{key}}({{i}})</el-checkbox>
							  	</div>
							  </el-checkbox-group>
							  <div class="subimtbtn" @click.stop="apply()">Apply</div>
						</div>
					</li>
					<li>
						<div class="citys" @click.stop="showSelect(2)">Duration
							<i class="iconfont" v-if="!isshowdurations">&#xe666;</i>
							<i class="iconfont" v-else>&#xe667;</i>
						</div>
						<div class="citysList" v-if="isshowdurations" @click.stop="selectShow(2)">
							<em class="cancel iconfont" @click.stop="cancel(2)">&#xe606;</em>
							  <el-checkbox-group v-model="checkedDurations" >
							  	<div class="checkboxlist" v-for="(i,key,index) in durations">
							  		<el-checkbox  v-if="key==0" :label="key" :key="key">Half Day({{i}})</el-checkbox>
							  		<el-checkbox  v-if="key==1" :label="key" :key="key">{{key}} Day({{i}})</el-checkbox>
							  		<el-checkbox  v-if="key>1" :label="key" :key="key">{{key}} Days({{i}})</el-checkbox>
							  	</div>
							  </el-checkbox-group>
							   <div class="subimtbtn" @click.stop="apply()">Apply</div>
						</div>
					</li>
					
				</ul>
			</div>
			<div class="delSeach clearfix">
				<div class="del">
					<span v-if="removeCity.length>0" v-for="(item,index) in removeCity" @click="del(0,removeCity,index)">{{item}}<i class="iconfont">&#xe629;</i></span>
					<span v-if="removeCategory.length>0" v-for="(item,index) in removeCategory" @click="del(1,removeCategory,index)">{{item}}<i class="iconfont">&#xe629;</i></span>
					<span v-if="removeDurations.length>0 && item==0" v-for="(item,index) in removeDurations" @click="del(2,removeDurations,index)">Half Day<i class="iconfont">&#xe629;</i></span>
					<span v-if="removeDurations.length>0 && item==1" v-for="(item,index) in removeDurations"  @click="del(2,removeDurations,index)">1 Day<i class="iconfont">&#xe629;</i></span>
					<span v-if="removeDurations.length>0 && item>1" v-for="(item,index) in removeDurations"  @click="del(2,removeDurations,index)">{{item}} Days<i class="iconfont">&#xe629;</i></span>
					<span v-if="removeTourtype.length>0" v-for="(item,index) in removeTourtype" @click="del(3,removeTourtype,index)">{{item.replace(/And/g,'&')}}<i class="iconfont">&#xe629;</i></span>
				</div>
				<div class="pageSizeInfo">totally {{records}} activities</div>
			</div>
		</div>
	</div>
		<div class="list-cont">
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
									<div class="tourType"><i class="iconfont">&#xe653;</i>{{item.category}}</div>

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
			<!--<div v-if="!isdisabled" class="more" @click="more()">View More</div>-->
			<div class="pagination-page" v-if="isdisabled">
				<el-pagination
				  background
				  layout="prev, pager, next"
				  :total="records"
				 
				  @current-change="handleCurrentChange"
				  :page-size="20">
				</el-pagination>
			</div>
			

		</div>
		<FooterCommon></FooterCommon>
		<Loading :loadingStatus="loadingStatus"></Loading>
		<Bottom :scrollTop="600" :isListPage="isListPage"></Bottom>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { SelectId } from 'element-ui';
	import {GetQueryString}from '~/assets/js/plugin/utils'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import Loading from '~/components/Loading/Loading'
	import Bottom from '~/components/bottom/Bottom'
	export default {
		name: 'activityList',
		async asyncData({
			route,
			store,
			error,
			apiBasePath,
			redirect
		}) {
			let opctions=route.query.opctions?JSON.parse(route.query.opctions):null
			let sort=route.query.sort?JSON.parse(route.query.sort):{type:"DEFAULT"}
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
				isListPage: true,
				apiBasePath: apiBasePath,
				
				selected:'Recommended',
				select:[
					{selectText:"Recommended",type:"DEFAULT",isSelect:true},
					{selectText:"Price :Low to High",type:"PRICE",isSelect:true},
					{selectText:"Price :High to Low",type:"PRICE",isSelect:false}
				
				],
				
				
				isshowcity:false,
				cities:["shanghai","beijing"],
				checkedCities:[],
				
				isshowcategory:false,
				category:["zhangsna","lisi"],
				checkedCategory:[],
				
				isshowdurations:false,
				durations:['1','0'],
				checkedDurations:[],
				
				isshowtourtype:false,
				tourtype:['end','ending'],
				checkedTourtype:[],
				records:'',
				
				removeCity:[],
				removeCategory:[],
				removeDurations:[],
				removeTourtype:[],
				
			}
			let listdata = {}
			let filters=[]
			let obj={}
			/*opction=JSON.parse(opction)*/
			if(sort){
				if(sort.type=="DEFAULT"){
					data.selected="Recommended"
				}
				if(sort.type=="PRICE"&&sort.reverse==true){
					data.selected="Price :High to Low"
				}
				if(sort.type=="PRICE"&&sort.reverse==false){
					data.selected="Price :Low to High"
				}
			}
			if(opctions){
				if(opctions.cities.length>0){
					data.checkedCities=data.checkedCities.concat(opctions.cities)
					//data.checkedCities.push(opctions.cities.join(","))
					console.log(data.checkedCities)
					let jsonCity={type:'CITY',filterValues:opctions.cities}
					filters.push(jsonCity)
				}
				if(opctions.category.length>0){
					data.checkedCategory=data.checkedCategory.concat(opctions.category)
					let jsonCategory={type:'CATEGORY',filterValues:data.checkedCategory}
					filters.push(jsonCategory)
				}
				if(opctions.durations.length>0){
					data.checkedDurations=data.checkedDurations.concat(opctions.durations)
					let jsonDurations={type:'DURATION',filterValues:data.checkedDurations}
					filters.push(jsonDurations)
				}
				if(opctions.tourtype.length>0){
					for(let i=0;i<opctions.tourtype.length;i++){
						opctions.tourtype[i]=opctions.tourtype[i].replace(/And/g,'&')
					}
					data.checkedTourtype=data.checkedTourtype.concat(opctions.tourtype)
					let jsonTourtype={type:'TOUR_TYPE',filterValues:data.checkedTourtype}
					filters.push(jsonTourtype)
				}
				obj = {
					location: data.loc == "Xian" ? "Xi\'an" : data.loc,
					pageNum: data.pageNum,
					pageSize: data.pageSize,
					filters:filters,
					sort:sort
				}
			}else{
				obj = {
					location: data.loc == "Xian" ? "Xi\'an" : data.loc,
					pageNum: data.pageNum,
					pageSize: data.pageSize,
					sort:sort
				}
			}
			console.log(obj)
			 
			//console.log(data.checkedCities)
			try {
				listdata = await Vue.axios.post(apiBasePath + "search/activity", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				})
				data.records= listdata.data.records
				data.activityList = listdata.data.entities
				if(listdata.data.records>data.pageSize){
					data.isdisabled=true
				}
				//转化显示选择项
				for(let i=0;i<listdata.data.aggregations.length;i++){
					if(listdata.data.aggregations[i].type=="CITY"){
						data.cities=listdata.data.aggregations[i].items
					}else if(listdata.data.aggregations[i].type=="CATEGORY"){
						data.category=listdata.data.aggregations[i].items
					}else if(listdata.data.aggregations[i].type=="DURATION"){
						data.durations=listdata.data.aggregations[i].items
					}else if(listdata.data.aggregations[i].type=="TOUR_TYPE"){
						data.tourtype=listdata.data.aggregations[i].items
					}
					
				}
				
				
				
				
			} catch(err) {
				//return error(JSON.stringify(err));
			}
			return data
			
			console.log(opction)
		},
		head() {
			let location = this.value;
			let title = "The Top " + location + " Tours | " + location + " Local Activities and Experiences";
			let keywords = "Best Things to do in " + location + ", " + location + " tours, " + location + " trip, " + location + " travel, " + location + " tour packages, " + location + " guide, china tours"
			
			if(location == "Beijing") {
				var	description= "See top things to do in Beijing, including Beijing city tours, Beijing walking tours, Beijing history & culture tours, and Beijing food tours. Visit the Forbidden City, Temple of Heaven, Great Wall, Tiananmen Square, and Beijing Summer Palace with our local China tour guides."
			} else if(location == "Shanghai") {
				var description= "See top things to do in Shanghai, including Shanghai city tours, Shanghai walking tours, Shanghai history & culture tours, and Shanghai food tours. Visit the bund shanghai, the Shanghai Tower, the French concession, yu garden, zhujiajiao and Suzhou with our local China tour guides."
			} else if(location == "Guilin") {
				var description="See top things to do in Guilin, including Guilin scenic tours, Guilin walking tours, Guilin history & culture tours, Guilin food tours, and Guilin Biking tours. See the best scenery in Guilin including Elephant Trunk Hill, Guilin Forest, Li River, Sun & Moon Pagodas, and Yaoshan Mountain."
			} else if(location == "Chengdu") {
				var description= "See top things to do in Chengdu, including Chengdu city tours, Chengdu walking tours, Chengdu history & culture tours, and Chengdu food tours. Visit the Giant Panda Breeding Research Base, Mount Qingcheng, Wenshu Yuan Monestary, Jinli Street, and Dujiangyan with our local China tour guides."
			} else {
				var description="See top things to do in Xi’an, including Xi’an city tours, Xi’an walking tours, Xi’an history & culture tours, and Xi’an food tours. Visit the Terra-cotta Warriors, Xi’an City Wall, Muslim Quarter, Shaanxi History Museum, and Xi’an markets with our local China tour guides."
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
			Bottom
		},
		methods: {
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
			city(loc) {
				if(loc == 'Shanghai') return 'shanghai'
				if(loc == 'Beijing') return 'beijing'
				if(loc == 'Chengdu') return 'chengdu'
				if(loc == 'Xian') return 'xian'
				if(loc == 'Guilin') return 'guilin'
			}, 
			showSelect(id){
				
				if(id==0){
					this.isshowcity=!this.isshowcity
					this.isshowcategory=false
					this.isshowdurations=false
					this.isshowtourtype=false
					if(JSON.parse(localStorage.getItem("opctions")).cities.length>0){
						this.checkedCities=JSON.parse(localStorage.getItem("opctions")).cities
						console.log(this.checkedCities)
					}else{
						this.checkedCities=[]
						this.checkedCategory=JSON.parse(localStorage.getItem("opctions")).category.length>0?JSON.parse(localStorage.getItem("opctions")).category:[]
						this.checkedDurations=JSON.parse(localStorage.getItem("opctions")).durations.length>0?JSON.parse(localStorage.getItem("opctions")).durations:[]
						this.checkedTourtype=JSON.parse(localStorage.getItem("opctions")).tourtype.length>0?JSON.parse(localStorage.getItem("opctions")).tourtype:[]
					}
					
				}else if(id==1){
					this.isshowcategory=!this.isshowcategory
					this.isshowcity=false
					this.isshowdurations=false
					this.isshowtourtype=false
					 if(JSON.parse(localStorage.getItem("opctions")).category.length>0){
						this.checkedCategory=JSON.parse(localStorage.getItem("opctions")).category
						
					}else{
						this.checkedCities=JSON.parse(localStorage.getItem("opctions")).cities.length>0?JSON.parse(localStorage.getItem("opctions")).cities:[]
						this.checkedCategory=[]
						this.checkedDurations=JSON.parse(localStorage.getItem("opctions")).durations.length>0?JSON.parse(localStorage.getItem("opctions")).durations:[]
						this.checkedTourtype=JSON.parse(localStorage.getItem("opctions")).tourtype.length>0?JSON.parse(localStorage.getItem("opctions")).tourtype:[]
					}
					
					
				}else if(id==2){
					this.isshowdurations=!this.isshowdurations
					this.isshowcategory=false
					this.isshowcity=false
					this.isshowtourtype=false
					
					
					 if(JSON.parse(localStorage.getItem("opctions")).durations.length>0){
						console.log()
						this.checkedDurations=JSON.parse(localStorage.getItem("opctions")).durations	
					}else{
						this.checkedCities=JSON.parse(localStorage.getItem("opctions")).cities.length>0?JSON.parse(localStorage.getItem("opctions")).cities:[]
						this.checkedCategory=JSON.parse(localStorage.getItem("opctions")).category.length>0?JSON.parse(localStorage.getItem("opctions")).category:[]
						this.checkedDurations=[]
						this.checkedTourtype=JSON.parse(localStorage.getItem("opctions")).tourtype.length>0?JSON.parse(localStorage.getItem("opctions")).tourtype:[]
					}
					
				}else{
					this.isshowtourtype=!this.isshowtourtype
					this.isshowdurations=false
					this.isshowcategory=false
					this.isshowcity=false
					
					if(JSON.parse(localStorage.getItem("opctions")).tourtype.length>0){
						
						for(let i=0;i<JSON.parse(localStorage.getItem("opctions")).tourtype.length;i++){
							JSON.parse(localStorage.getItem("opctions")).tourtype[i]=JSON.parse(localStorage.getItem("opctions")).tourtype[i].replace(/And/g, "&")
							
						}
						this.checkedTourtype=JSON.parse(localStorage.getItem("opctions")).tourtype
					}else{
						this.checkedCities=JSON.parse(localStorage.getItem("opctions")).cities.length>0?JSON.parse(localStorage.getItem("opctions")).cities:[]
						this.checkedCategory=JSON.parse(localStorage.getItem("opctions")).category.length>0?JSON.parse(localStorage.getItem("opctions")).category:[]
						this.checkedDurations=JSON.parse(localStorage.getItem("opctions")).durations.length>0?JSON.parse(localStorage.getItem("opctions")).durations:[]
						this.checkedTourtype=[]
					}
					
				}
			},
			clearlocalStorage(){
				var opctions={
					cities:[],
					category:[],
					durations:[],
					tourtype:[],	
				}
				opctions=JSON.stringify(opctions)
				localStorage.setItem("opctions",opctions)
			},
			sort(val){
				var sort={}
				if(val=="Recommended"){
					sort={
						type:"DEFAULT"
					}
				}else if(val=="Price :Low to High"){
					sort={
						type:"PRICE",
						reverse:false
					}
				}else if(val=="Price :High to Low"){
					sort={
						type:"PRICE",
						reverse:true
					}
				}
				var opctions={
					cities:this.checkedCities,
					category:this.checkedCategory,
					durations:this.checkedDurations,
					tourtype:this.checkedTourtype,
					
				}
				sort=JSON.stringify(sort)
				opctions=JSON.stringify(opctions)
				//console.log(opctions)
				//localStorage.setItem("sort",sort)
				location.href="/activity/list/"+this.loc+"?opctions="+opctions+"&sort="+sort
								
				
			},
			
			//选项内容点击不收起
			selectShow(id){
				if(id==0){
					this.isshowcity=true
					
					
				}else if(id==1){
					this.isshowcategory=true
					
					
				}else if(id==2){
					this.isshowdurations=true
					
					
				}else{
					this.isshowtourtype=true
					
					
				}
			},
			cancel(id){
				if(id==0){
					this.isshowcity=false
					if(JSON.parse(localStorage.getItem("opctions"))==null){
						this.checkedCities=[]
					}else if(JSON.parse(localStorage.getItem("opctions")).cities.length>0){
						this.checkedCities=JSON.parse(localStorage.getItem("opctions")).cities
						console.log(this.checkedCities)
					}
					
				}else if(id==1){
					this.isshowcategory=false
					if(JSON.parse(localStorage.getItem("opctions"))==null){
						this.checkedCategory=[]
					}else if(JSON.parse(localStorage.getItem("opctions")).category.length>0){
						this.checkedCategory=JSON.parse(localStorage.getItem("opctions")).category
						
					}
					
				}else if(id==2){
					this.isshowdurations=false
					if(JSON.parse(localStorage.getItem("opctions"))==null){
						this.checkedDurations=[]
					}else if(JSON.parse(localStorage.getItem("opctions")).durations.length>0){
						this.checkedDurations=JSON.parse(localStorage.getItem("opctions")).durations
						
					}
					
				}else{
					this.isshowtourtype=false
					if(JSON.parse(localStorage.getItem("opctions"))==null){
						this.checkedTourtype=[]
					}else if(JSON.parse(localStorage.getItem("opctions")).tourtype.length>0){
						
						for(let i=0;i<JSON.parse(localStorage.getItem("opctions")).tourtype.length;i++){
							JSON.parse(localStorage.getItem("opctions")).tourtype[i]=JSON.parse(localStorage.getItem("opctions")).tourtype[i].replace(/And/g, "&")
							
					}
						JSON.parse(localStorage.getItem("opctions")).tourtype=this.checkedTourtype
					}
					
				}
			},
			del(id,arr,index){
				let sort={}
				
				for(let i=0;i<this.checkedTourtype.length;i++){
					this.checkedTourtype[i]=this.checkedTourtype[i].replace(/&/g, "And")
					
				}
				console.log(11)
				if(this.selected=="Recommended"){
					 sort={
						type:"DEFAULT"
					}
				}else if(this.selected=="Price :Low to High"){
					 sort={
						type:"PRICE",
						reverse:false
					}
				}else if(this.selected=="Price :High to Low"){
					 sort={
						type:"PRICE",
						reverse:true
					}
				}
				sort=JSON.stringify(sort)
				
				if(id==0){
					arr.splice(index,1)
					var opctions={
						cities:arr,
						category:this.removeCategory,
						durations:this.removeDurations,
						tourtype:this.removeTourtype,
					}
					opctions=JSON.stringify(opctions)
					localStorage.setItem("opctions",opctions)
					location.href="/activity/list/"+this.loc+"?opctions="+opctions+"&sort="+sort
				}else if(id==1){
					arr.splice(index,1)
					var opctions={
						cities:this.removeCity,
						category:arr,
						durations:this.removeDurations,
						tourtype:this.removeTourtype,
					}
					opctions=JSON.stringify(opctions)
					localStorage.setItem("opctions",opctions)
					location.href="/activity/list/"+this.loc+"?opctions="+opctions+"&sort="+sort
				}else if(id==2){
					arr.splice(index,1)
					var opctions={
						cities:this.removeCity,
						category:this.removeCategory,
						durations:arr,
						tourtype:this.removeTourtype,
					}
					opctions=JSON.stringify(opctions)
					localStorage.setItem("opctions",opctions)
					location.href="/activity/list/"+this.loc+"?opctions="+opctions+"&sort="+sort
				}else{
					arr.splice(index,1)
					var opctions={
						cities:this.removeCity,
						category:this.removeCategory,
						durations:this.removeDurations,
						tourtype:arr,
					}
					opctions=JSON.stringify(opctions)
					localStorage.setItem("opctions",opctions)
					location.href="/activity/list/"+this.loc+"?opctions="+opctions+"&sort="+sort
				}
				
				
				//arr.splice(index,1)
			},
			handleCurrentChange(val){
				
				let that=this
				let obj={}
				let filters=[]
				let sort={}
				that.pageNum=val
				if(that.checkedCities.length>0){
					let jsonCity={type:'CITY',filterValues:that.checkedCities}
					filters.push(jsonCity)
				}
				if(that.checkedCategory.length>0){
					let jsonCategory={type:'CATEGORY',filterValues:that.checkedCategory}
					filters.push(jsonCategory)
				}
				if(that.checkedDurations.length>0){
					let jsonDurations={type:'DURATION',filterValues:that.checkedDurations}
					filters.push(jsonDurations)
				}
				if(that.checkedTourtype.length>0){
					
					let jsonTourtype={type:'TOUR_TYPE',filterValues:that.checkedTourtype}
					filters.push(jsonTourtype)
				}
				if(this.selected=="Recommended"){
					 sort={
						type:"DEFAULT"
					}
				}else if(this.selected=="Price :Low to High"){
					 sort={
						type:"PRICE",
						reverse:false
					}
				}else if(this.selected=="Price :High to Low"){
					 sort={
						type:"PRICE",
						reverse:true
					}
				}
				if(filters.length>0){
					obj = {
						location: that.loc == "Xian" ? "Xi\'an" : that.loc,
						pageNum: val,
						pageSize: that.pageSize,
						filters:filters,
						sort:sort
						
					}	
				}else{
					obj = {
						location: that.loc == "Xian" ? "Xi\'an" : that.loc,
						pageNum: val,
						pageSize: that.pageSize,
						sort:sort
						
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
						that.activityList=response.data.entities
						window.scrollTo(100,0)
					}
				}, function(response) {
				})
			},
			apply(){
				let sort={}
				
				for(let i=0;i<this.checkedTourtype.length;i++){
					this.checkedTourtype[i]=this.checkedTourtype[i].replace(/&/g, "And")
					
				}
				console.log(11)
				if(this.selected=="Recommended"){
					 sort={
						type:"DEFAULT"
					}
				}else if(this.selected=="Price :Low to High"){
					 sort={
						type:"PRICE",
						reverse:false
					}
				}else if(this.selected=="Price :High to Low"){
					 sort={
						type:"PRICE",
						reverse:true
					}
				}
				var opctions={
					cities:this.checkedCities,
					category:this.checkedCategory,
					durations:this.checkedDurations,
					tourtype:this.checkedTourtype,
					
				}
				opctions=JSON.stringify(opctions)
				localStorage.setItem("opctions",opctions)
				sort=JSON.stringify(sort)
				
				location.href="/activity/list/"+this.loc+"?opctions="+opctions+"&sort="+sort
			},
			
		},
		watch:{
			checkedCities:function(val,oldVal){
				console.log(val)
			},
			pageNum:function(val,oldVal){
				console.log(val)
			},
			checkedDurations(val,oldVal){
				console.log(val)
			},
			checkedTourtype(val,oldVal){
				console.log(val)
				
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
			if(window.location.search){
				
			}else{
				this.clearlocalStorage()
			}
			that.removeCity=JSON.parse(localStorage.getItem("opctions"))!=null?JSON.parse(localStorage.getItem("opctions")).cities:[]
			that.removeCategory=JSON.parse(localStorage.getItem("opctions"))!=null?JSON.parse(localStorage.getItem("opctions")).category:[]
			that.removeDurations=JSON.parse(localStorage.getItem("opctions"))!=null?JSON.parse(localStorage.getItem("opctions")).durations:[]
			that.removeTourtype=JSON.parse(localStorage.getItem("opctions"))!=null?JSON.parse(localStorage.getItem("opctions")).tourtype:[]
			document.getElementsByTagName("body")[0].addEventListener("click",function(){
				that.isshowcity=false
				that.isshowcategory=false
				that.isshowdurations=false
				that.isshowtourtype=false		
			})
			that.logIn = localStorage.getItem("logstate") ? localStorage.getItem("logstate") : null
			//console.log(Object.keys(this.tourtype).length)
			
		},
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	.el-input__inner {
		width: 168px!important;
		height: 40px;
		font-size: 18px!important;
		border-radius: 20px!important;
		border-color: none;
		padding-left: 20px!important;
		border: none!important;
	}
	
	.el-popper[x-placement^=bottom] {
		margin-top: 2px!important;
	}
	
	.el-popper .popper__arrow,
	.el-popper .popper__arrow::after {
		border-style: none!important;
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
	
	.el-icon-arrow-up {
		&:before {
			content: "\e60c"!important;
			color: #353a3f;
		}
	}
	
	.el-select .el-input.is-focus .el-input__inner {
		border-color: #b4bccc!important;
	}
	.el-checkbox__label{
		font-size: 16px;
	}
	.el-pagination.is-background .el-pager li:not(.disabled).active{
		background-image: linear-gradient(-90deg,#009efd 0%,#1bbc9d 100%) 
	}
	.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
		background: #fff;
		color: #353a3f;
	}
	#footercommon{
		border-top: 1px solid #E6E6E6;
		.footInfo{
			width: 1284px!important;
		}
	}
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	.activityList {
		.pagination-page{
			text-align: center;
			margin-top:40px
		}
		overflow-x: hidden;
		width: 100%;
		background: #faf9f8;
		.banner {
			&.beijing {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Beijing.jpg") no-repeat;
				background-size: cover;
			}
			&.shanghai {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Shanghai.jpg") no-repeat;
				background-size: cover;
			}
			&.chengdu {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Chengdu.jpg") no-repeat;
				background-size: cover;
			}
			&.xian {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Xian.jpg") no-repeat;
				background-size: cover;
			}
			&.guilin {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Guilin.jpg") no-repeat;
				background-size: cover;
			}
			height: 260px;
			.selectInfo {
				width: 1284px;
				margin: 0 auto;
				position: relative;
				height: 260px;
				.linkseting {
					padding-top: 19px;
					a {
						font-size: 14px;
						color: #fff;
						&:hover {
							text-decoration: underline;
						}
						&:last-child {
							&:hover {
								text-decoration: none;
								cursor: auto;
							}
						}
					}
					em {
						color: #fff;
						font-size: 12px;
					}
				}
				.position {
					position: absolute;
					top: 107px;
					span {
						margin-right: 30px;
						font-size: 38px;
						font-weight: bold;
						color: #fff;
						display: inline-block;
						vertical-align: bottom;
					}
					.el-select {
						.el-icon-arrow-up:before {
							content: "\e60f"!important
						}
					}
				}
			}
		}
		.selectType {
			width: 1284px;
			margin: 0 auto;
			padding: 20px 0 10px;
			background: #fff;
			ul {
				li {
					width: 632px;
					height: 130px;
					background: #0074D9;
					float: left;
					background-size: cover;
					&:first-child {
						margin-right: 20px;
						background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Activities.jpg") no-repeat;
					}
					&:last-child {
						background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Guides.jpg") no-repeat;
					}
					.bg {
						width: 604px;
						height: 74px;
						padding: 28px 0 28px 28px;
						color: #fff;
						.bgTitle {
							font-size: 24px;
							font-weight: bold;
							margin-bottom: 13px;
						}
						p {
							font-size: 16px;
						}
					}
				}
			}
		}
		.seach{
			padding: 24px 0;
			width: 1284px;
			margin: 0 auto;
			background: #fff;
			h3{
				font-size: 14px;
				color: #878e95;
			}
			.recommended{
				float: left;
			}
			.seach-type{
				float: left;
				margin-left: 100px;
				padding-bottom: 24px;
				li{
					float: left;
					margin-left: 63px;
					position:relative; 
					&:first-child{
						margin-left: 0;
					}
					.citys{
						font-size: 16px;
						cursor: pointer;
						i{
							margin-left: 10px;
							font-size: 16px;
							
						}
					}
					.citysList{
						position: absolute;
						z-index: 999999999;
						background: #fff;
						box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.2);
						border-radius: 3px;
						padding:30px 0px 40px 27px;
						width: 311px;
						left: 50%;
						margin-left: -50%;
						
						.checkboxlist{
							margin-bottom: 20px;
							
						}
						.cancel{
							position: absolute;
							top: 10px;
							right: 10px;
							font-size: 8px;
							cursor: pointer;
						}
						.subimtbtn{
							position: absolute;
							bottom: 10px;
							right: 10px;
							color:#1bbc9d;
							font-size: 14px;
							cursor: pointer;
							font-weight: bold;
						}
					}
				}
			}
			.delSeach{
				border-top: 1px solid #dde0e0;
				padding-top: 28px;
				.del{
					width:85%;
					float: left;
					span{
						cursor: pointer;
						padding: 3px 14px;
						border: 1px solid #878e95;
						font-size: 16px;
						border-radius: 20px;
						margin-bottom: 15px;
						display: inline-block;
						i{
							font-size: 7px;
							margin-left: 6px;
							color:#1bbc9d;
						}
						margin-right:15px;
					}
				}
				.pageSizeInfo{
					width: 15%;
					float: right;
					text-align: right;
					font-size: 16px;
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
						height: 45px;
						text-overflow: ellipsis;
						display: -webkit-box;
						display: -moz-box;
						-moz-box-orient: vertical;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						-moz-line-clamp: 2;
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
		.floatbox{
			float: left;
			width: 30%;
			margin-left:5%;	
		}
		.long{
				width:671px!important;
			}
	}
</style>