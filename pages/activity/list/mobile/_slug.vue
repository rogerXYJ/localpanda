<template>
	<div class="M-activityList">
		<div class="headpic" :class="city(loc)">
			<div class="position">
				<span v-if="loc=='Shanghai'">Shanghai</span>
				<span v-if="loc=='Beijing'">Beijing</span>
				<span v-if="loc=='Chengdu'">Chengdu</span>
				<span v-if="loc=='Xian'">Xi'an</span>
				<span v-if="loc=='Guilin'">Guilin</span>
			</div>
		</div>
		<div class="filter">
			<h3>SORT BY</h3>
			<div class="filter-table clearfix">
				<div class="recommended">
					<select class="selectSort" @change="sort(selected)" v-model="selected">
						<option v-for="(item,index) in select" v-model="item.selectText">{{item.selectText}}</option>
					</select>
					<i class="iconfont">&#xe666;</i>
				</div>
				<div class="filter-cont">
					<i class="iconfont">&#xe668;</i>
					<span>Filter</span>
				</div>
			</div>
			<div class="filter-list">
				<span></span>
			</div>
			<div class="pageSizeInfo" v-if="records==1">1 activity in total</div>
			<div class="pageSizeInfo" v-if="records==0">0 activity in total</div>
			<div class="pageSizeInfo" v-if="records>1">{{records}} activities in total</div>
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
	</div>
</template>
<script>
	if (process.browser) {
	  require('~/assets/js/plugin/flexible.js')
	}
	import { getUrlParams } from '~/assets/js/plugin/utils';
	export default {
		name: 'M-activityList',
		data() {
			return {
				loc: '',
				activityList: '',
				selected: 'Recommended',
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
				records: '',
				pageNum: 1,
				pageSize: 10,
				sort: {
					"type": "DEFAULT"
				}
			}
		},
		components: {

		},
		methods: {
			getActivity() {
				let data = this
				let obj = {
					location: data.loc == "Xian" ? "Xi\'an" : data.loc,
					pageNum: data.pageNum,
					pageSize: data.pageSize,
					sort: data.sort
				}
				data.axios.post("https://api.localpanda.com/api/search/activity", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then((e) => {
					console.log(e.data)
					data.records = e.data.records
					data.activityList = e.data.entities
				}, (e) => {

				})
			},
			city(loc) {
				if(loc == 'Shanghai') return 'shanghai'
				if(loc == 'Beijing') return 'beijing'
				if(loc == 'Chengdu') return 'chengdu'
				if(loc == 'Xian') return 'xian'
				if(loc == 'Guilin') return 'guilin'
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
		},
		filters: {
			firstUpperCase(val) {
				if(val)
					return val.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
			}
		},
		mounted: function() {
			this.loc = getUrlParams()
			this.getActivity()
		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	html,body{
		background:  #faf9f8;
	}
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	.M-activityList{
		
		.headpic{
			
			&.beijing {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Beijing.jpg") no-repeat;
				background-size: cover;
				background-position:center;
			}
			&.shanghai {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Shanghai.jpg") no-repeat;
				background-size: cover;
				background-position:center;
			}
			&.chengdu {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Chengdu.jpg") no-repeat;
				background-size: cover;
				background-position:center;
			}
			&.xian {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Xian.jpg") no-repeat;
				background-size: cover;
				background-position:center;
			}
			&.guilin {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Guilin.jpg") no-repeat;
				background-size: cover;
				background-position:center;
			}
			height: 4.666666rem;
			position:relative;
			.position{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				span{
					color: #fff;
					font-size:0.853333rem;
					font-weight: bold;
					text-shadow:2.5px 2.5px 10px rgba(0, 0, 0, .3);
				}
			}
		}
		.filter{
			background: #fff;
			padding: 0.546666rem 0.586666rem 0.48rem;
			h3{
				font-size: 0.346666rem;
				color: #878e95;
			}
			.filter-table{
				margin-top: 0.266666rem;
				.recommended{
					float:left;
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
					margin-left: 1.333333rem;
					font-size: 0.4rem;
					font-weight: bold;
					i{
						margin-right: 0.266666rem;
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
	}
</style>