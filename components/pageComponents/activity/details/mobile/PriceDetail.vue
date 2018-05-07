<template>
	<div class="priceDetail">
		<div class="cont">
			<div class="back"><i class="iconfont" @click="back">&#xe615;</i></div>
			<div class="head">
				<h3>Price details</h3>
			</div>
			<el-table :data="sixArr" stripe style="width: 100%">
				<el-table-column prop="capacity" label="Number of people"  align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.capacity==1">1 person</span>
						<span v-else>{{scope.row.capacity}} people</span>
					</template>
				</el-table-column>
				<el-table-column prop="price" label="Total cost" align="center">
					<template slot-scope="scope">
						<span>$ {{returnFloat(scope.row.price)}} USD</span>
					</template>
				</el-table-column>
				<el-table-column prop="childenTotal" label="Price per person"  align="center">
					<template slot-scope="scope">
						<div v-show="scope.row.capacity">
							<span>$ {{returnFloat(round(scope.row.price/scope.row.capacity))}} USD</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		props: [
			'picInfo'
		],
		name: "priceDetail",
		data() {
			return {
				sixArr:[],
			}

		},
		components: {

		},
		methods: {
			back() {
				this.$emit('call-back-detail', false);
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
			tableData(details) {
				//console.log(details);
				var newObj = function(obj) {
					var o = {};
					for(var key in obj) {
						o[key] = obj[key];
					}
					return o;
				}

				let newArr = [],
					tableD = [];



				if(details.length==1){
					console.log(1)
					console.log(details[0].capacity)
					for(let i=0;i<details[0].capacity;i++){
						var s=newObj(details[0]);
						newArr.push(s)
					}
					
				}else{
					for(let i = 0; i < details.length; i++) {
						let thisD = details[i];
						newArr.push(thisD);
						if(i + 1 > details.length - 1) break;

						var thisC = thisD.capacity;
						var nextC = details[i + 1].capacity;
						var forLen = nextC - thisC - 1;
						for(let j = 0; j < forLen; j++) {
							var midArr = newObj(details[i+1]);
							//console.log(midArr)
							newArr.push(midArr);
						}
						//console.log(newArr)
					}
				}
				console.log(newArr)
					
				for(var k = 0; k < newArr.length; k++) {
					newArr[k].capacity = k + 1;

				}
				
				return newArr;
			}
		},
		mounted: function() {
			let that=this
			that.$nextTick(function(){
				that.sixArr=that.tableData(that.picInfo.details)
			})
//			console.log(that.tableData(that.picInfo.details))
			
		}
	}
</script>

<style lang="scss" scoped>
	.priceDetail{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		min-height: 100%;
		z-index: 99999999;
		background: #fff;
		.cont{
			padding:0 0.586666rem;
			.back{
				padding:0.426666rem 0 0.8rem;
			}
			.head{
				h3{
					font-size:0.8rem;
					font-weight: bold;
				}
			}
		}
	}
</style>