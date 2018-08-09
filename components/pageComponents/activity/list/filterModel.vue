<template>
	<div class="filterModel">
		<div class="filterModelContent">
			<div class="filterModelBox">
				<i class="iconfont back" @click="close">&#xe606;</i>
				<div class="filterModelBoxDetail clearfix" v-if="type=='DURATION'">
					
					<checkbox-group  v-model="filterCheck[toLower('DURATION')]">
						<div class="checkboxlist" v-for="(i,key,index) in filterContent">
							<checkbox :label="key"  :key="key">{{returnD(key)}} ({{i}})</checkbox>
						</div>
						
					</checkbox-group>		
				</div>
				<div class="filterModelBoxDetail clearfix" v-else>
					<checkbox-group  v-model="filterCheck[toLower(type)]">
							<div class="checkboxlist" v-for="(i,key,index) in filterContent" :class="type=='ATTRACTION'?'floatHalf':''">
								<checkbox :label="key" :key="key">{{key}} ({{i}})</checkbox>
							</div>
						</checkbox-group>	
				</div>
			</div>
			<div class="btn" >
				<button @click="close">Apply</button>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { checkboxGroup, checkbox } from "~/plugins/panda/checkbox/";
	export default {
		props:["filterCheck","filterContent","type"],
		name: "filterModile",
		data() {
			return {
				
			}
		},
		 components: {
		    checkboxGroup,
		    checkbox
		 },
		methods: {
			
			close() {
				this.$emit("callBack", false)
			},
			toLower(val) {
				return val.toLowerCase()
			},
			returnD(key) {
				if(key == 0) {
					return "Half Day"
				} else if(key == 1) {
					return "One Day"
				}
				return key + " Days"
			},
			
		},
		mounted:function(){
			//console.log(this.filterContent)
			//console.log(this.filterCheck[this.type.toUpperCase()])
			console.log(this.filterCheck)
			console.log(this.type)
		}
	}
</script>

<style lang="scss" scoped>
.checkboxlist{
	padding-bottom: 12px;
	float: left;
	width: 33%;
	
}
.floatHalf{
	width: 50%!important;
}
.checkbox-group{
		overflow: inherit;
		height: auto!important;
	}
.filterModelContent{
	position: relative;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	width: 728px;
	box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.2);
	border-radius: 6px;
	
	background:#fff;
	
}
.filterModel{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(255,255,255,0.9);
	z-index: 99999;
	.filterModelBox{
		max-height:431px;
		padding: 68px 68px 85px 68px;
		overflow:auto;
		.back{
			position: absolute;
			right: 24px;
			top: 24px;
			font-size: 14px;
			cursor: pointer;
		}
		
	}
	.btn{
			
			cursor: pointer;
			position: absolute;
			bottom:0;
			left: 50%;
			transform: translateX(-50%);
			clear:both;
			height: 68px;
			background: #fff;
			line-height: 68px;
			text-align:  center;
			width: 100%;
			button{
				width: 154px;
				height: 38px;
				text-align: center;
				line-height:38px;
				background-image: linear-gradient(-90deg,#009efd 0%, #1bbc9d 100%);
				border-radius: 20px;
				color: #fff;
				font-weight: bold;
				font-size: 16px; 
			}
		}
}




</style>