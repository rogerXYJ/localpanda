<template>
	<div id="bookDetail" class="bookDetail">
		<div class="back"><i class="iconfont" @click="back">&#xe615;</i></div>
		<div class="head">
			<h3>Booking Details</h3>
			<p>{{title}}</p>
		</div>
		<div class="select">
			<ul>
				<li class="clearfix" :class="{err:dateErr}">
					<label>Date</label>
					<div class="dateTime">
						<!-- <flatPickr placeholder="Please Select" v-model="dateTime" :config="options"></flatPickr> -->
						<input id="js_changetime" placeholder="Please Select" v-model="dateTime" readonly type="text">
					</div>
				</li>
				<li class="clearfix" @click="show()" :class="{err:peopleErr}">
					<label>Guests</label>
					<div v-if="adults+children<1" class="guests placeho">{{people}}</div>
					<div v-if="adults+children==1" class="guests">{{adults+children}} Person</div>
					<div v-if="adults+children>1" class="guests">{{adults+children}} People</div>
				</li>
				<li class="clearfix" v-if="adults+children>=1">
					<label v-if="children==0&&adults==1">${{round(adultsPic/(adults+children))}} x {{adults+children}} Person</label>
					
					<label v-else>${{returnFloat(round(adultsPic/(adults+children)))}} x {{adults+children}} People 
					<br/><em v-if="children>0&&picInfo.childDiscount">- ${{returnFloat(children*picInfo.childDiscount)}}</b> for child(ren)</em>
					</label>
					<span>${{returnFloat(adultsPic)}}</span>
				</li>
				<li class="clearfix" v-if="adults+children>=1">
					<label>Total</label>
					<span class="weight" v-if="children>0&&picInfo.childDiscount">${{returnFloat(cutXiaoNum(adultsPic-children*picInfo.childDiscount,1))}}</span>
					<span class="weight" v-else>${{returnFloat(adultsPic)}}</span>
				</li>
			</ul>
			<p>{{dateErrText}}</p>
		</div>
		<div class="btn">
			<button @click="order">Next</button>
		</div>
		<transition name="slideleft">
			<SelectPeople v-show="isshow" class="view" :picInfo="picInfo" @call-back="setCallBack" @sureSelect="getSave"></SelectPeople>
		</transition>
		
		<transition name="fade">
			<div class="win_bg" @click="showWinBg = false" v-if="showWinBg"></div>
		</transition>
		
	</div>
	
</template>

<script>
	if(process.browser) {
		
		require('~/assets/js/plugin/flexible.js')
	}
	//import flatPickr from "vue-flatpickr-component";
	import Flatpickr from 'flatpickr';
	
	import { GetDateStr, addmulMonth } from "~/assets/js/plugin/utils";
	import SelectPeople from "~/components/pageComponents/activity/details/mobile/SelectPeople"
	import Vue from 'vue';

	export default {
		name: "activitiesDetail",
		data() {
			return {
				dateTime: '',
				logIn: '',
				people: "Please Select",
				picInfo: '',
				options: {},
				isshow: false,
				adults: 0,
				children: 0,
				infant: 0,
				adultsPic:'',
				id:'',
				title:'',
				category:'',
				dateErr:false,
				peopleErr:false,
				dateErrText:"",
				showWinBg : false
				
			}
		},

		components: {
			//flatPickr,
			SelectPeople
		},
		methods: {
			back() {
				history.back()
			},
			show() {
				this.isshow = true
			},
			setCallBack(val) {
				console.log(val)
				this.isshow = val

			},
			getSave(val) {
				this.adults = val.adults
				this.children = val.children
				this.infant = val.infant
				console.log(val)
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
			   returnFloat(value) {
				if(value){
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
				}
				
			},
			order(){
		      window.ga && ga("gtag_UA_107010673_1.send", {
		        hitType: "event",
		        eventCategory: "Button",
		        eventAction: "Click",
		        eventLabel: "activity_book"
		      });
		      let that = this;
		      if (that.dateTime == "") {
				that.dateErr=true;

				//弹出日历
				that.flatPickr.open();
				
				   
		      } else if (that.children + that.adults < that.picInfo.minParticipants) {
		      	that.peopleErr=true
		        that.dateErrText =
		          "*Mimimum number of travelers:" + that.picInfo.minParticipants + ".";
		      }else if(that.children + that.adults<1){
		      		that.peopleErr=true
		      }else {
		        that.dateErr=false
		        that.peopleErr=false
		        var orderInfo = {
		          userId: localStorage.getItem("userid")
		            ? localStorage.getItem("userid"): null,
		          activityId: that.id,
		          amount:
		            that.children > 0 && that.picInfo.childDiscount
		              ? that.cutXiaoNum(
		                  that.adultsPic - that.children * that.picInfo.childDiscount,
		                  1
		                )
		              : that.adultsPic,
		          currency: "USD",
		          adultNum: that.adults,
		          childrenNum: that.children,
		          infantNum: that.infant,
		          startDate: that.dateTime,
		          startTime: that.time ? that.time : null,
		          adultsPic: that.adultsPic,
		          title: that.title,
		          childDiscountP: that.picInfo.childDiscount,
		          category: that.category,
		          averagePrice: that.round(
		            that.adultsPic / (that.adults + that.children)
		          ),
		          childDiscount: that.picInfo.childDiscount
		            ? that.children * that.picInfo.childDiscount
		            : null
		        };
		        orderInfo = JSON.stringify(orderInfo);
		        console.log(orderInfo);
		        localStorage.setItem("orderInfo", orderInfo);
				
				location.href="/activity/booking/mobile"
		        //routes.push('/fillYourInfo')
		      }
    
			}
		},
		mounted: function() {
			let that=this
			this.logIn = window.localStorage.getItem("logstate");
			this.picInfo = JSON.parse(window.localStorage.getItem("objDetail")).picInfo
			this.id=JSON.parse(window.localStorage.getItem("objDetail")).id
			this.title=JSON.parse(window.localStorage.getItem("objDetail")).title
			this.category=JSON.parse(window.localStorage.getItem("objDetail")).category
			this.options = {
				minDate: this.picInfo.earliestBookDate,
				maxDate: addmulMonth(this.picInfo.earliestBookDate, 12),
				disableMobile: true,
				onOpen : function(e){
					let calendarContainer = this.calendarContainer.style;
					let winW = document.documentElement.clientWidth;
					setTimeout(function(){
						calendarContainer.top = parseInt(calendarContainer.top)-100+'px';
						calendarContainer.left = (winW-parseInt(calendarContainer.width)-38)/2+'px';
						// calendarContainer.transform = 'translateX(-50%)';
						// calendarContainer.right = 'auto';
					},0);
					that.showWinBg = true;
				},
				onChange(){
					that.showWinBg = false;
				}
			}
			
			that.flatPickr = new Flatpickr('#js_changetime',this.options);
			
			
			
		},
		watch: {
			dateTime:function(val,oldVal){
				if(val){
					this.dateErr=false
				}
			},
			adults(val, odlVal) {
		      this.people = val + this.children;
		    },
		    children(val, oldVal) {
		      this.people = val + this.adults;
		    },
		    people(val,oldVal){
		    	if(val>=this.picInfo.minParticipants||val>=1){
		    		this.dateErrText=""
		    		this.peopleErr=false
		    	}
		    	for (var i = 0; i < this.picInfo.details.length; i++) {
		        if (this.adults + this.children == this.picInfo.details[i].capacity) {
		          this.adultsPic = this.picInfo.details[i].price;
		          
		          break;
		        } else {
		          if (this.adults + this.children < this.picInfo.details[i].capacity) {
		            this.adultsPic = this.picInfo.details[i].price;
		            
		            break;
		          }
		        }
		      }
		    }
		}
	};
</script>
<style lang="scss">
	@import "~/assets/scss/G-ui/flatpickr.min.css";
	@import "~assets/scss/_main.scss";
	@import "~/assets/font/iconfont.css";
	.flatpickr-months .flatpickr-prev-month svg,
	.flatpickr-months .flatpickr-next-month svg {
		width: 20px!important;
		height: 20px!important;
	}
	#launcher {
		bottom: 0.266666rem!important;
	}
	
	.dateTime {
		.flatpickr-input {
			border: none!important;
			padding-left: 0!important;
			height: 1.706666rem!important;
			text-align: right;
			color: #1bbc9d;
		}
	}
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	.bookDetail {
		padding: 0 0.586666rem 1.946666rem;
		.back {
			padding: 0.426666rem 0 0.8rem;
		}
		.head {
			h3 {
				font-size: 0.8rem;
				font-weight: bold;
			}
			p {
				font-size: 0.453333rem;
				line-height: 0.56rem;
				margin-top: 1.2rem;
				font-weight: bold;
			}
		}
		.select {
			margin-top: 0.56rem;
			p{
				margin-top: 0.266666rem;
				color: red;
			}
			ul {
				li {
					border-top: 1px solid #ebebeb;
					
					line-height: 1.706666rem;
					label {
						float: left;
						font-size: 0.48rem;
					}
					div {
						float: right;
						width: 70%;
						text-align: right;
						font-size: 0.48rem;
					}
					span{
						float: right;
						width: 40%;
						text-align: right;
						font-size: 0.48rem;
						&.weight{
							font-weight: bold;
						}
					}
					&:last-child {
						border-bottom: 1px solid #ebebeb;
					}
				}
			}
		}
		.btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 0.373333rem 0.586666rem;
			button {
				width: calc(100% - 1.173333rem);
				height: 1.2rem;
				line-height: 1.2rem;
				background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
				text-align: center;
				color: #fff;
				border-radius: 0.6rem;
				font-size: 0.346666rem;
				font-weight: bold;
			}
		}
		.view {
			position: absolute;
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
		.err{
			border-top:1px solid red!important;
			border-bottom:1px solid red!important;
			color: red;
		}
		.placeho{
			color:#878e95;
		}
		
		.win_bg{ width:100%; height:100%; background-color:rgba(0,0,0,0.5); position: absolute; left:0; top:0;}
		.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
		}
		.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
		}
		
	}

	
</style>