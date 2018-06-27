<template>
	<div class="input-number" @click.stop="show">
		<div class="choosePeople">
			<b>Guest Number:</b>
			<div class="operation">
				<em class="iconfont disabled" v-if="peopleNub<=selectNumber.minValue" disabled>&#xe64d;</em>
				<em class="iconfont cur" v-else @click.stop="del()">&#xe64d;</em>
				<input v-model="peopleNub" class="peopleNub" readonly/>
				
				<em class="iconfont disabled" v-if="peopleNub>=selectNumber.maxValue"  disabled>&#xe64b;</em>
				<em class="iconfont cur" v-else @click.stop="add()">&#xe64b;</em>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "input-number",
		data() {
			return {
				peopleNub:'',
				
			}
		},
		components: {

		},
		methods: {
			show(){
				this.$emit('showSelectPeople',true)
			},
			add(){
				this.peopleNub++
				if(this.peopleNub>=this.selectNumber.maxValue){
					
					this.peopleNub=this.selectNumber.maxValue
				}
				this.$emit('getPeople',this.peopleNub)
			},
			del(){
				this.peopleNub--
				if(this.peopleNub<=this.selectNumber.minValue){
					
					this.peopleNub=this.selectNumber.minValue
				}
				this.$emit('getPeople',this.peopleNub)
			},
		},
		watch: {
			
		},
		mounted() {
			this.peopleNub=this.participants
			console.log(this.participants)
		},
		props: ["selectNumber","participants"]
	}
</script>

<style lang="scss" scoped>
	.choosePeople {
		position: absolute;
		background: #fff;
		padding: 20px;
		padding-left: 0;
		border-left: 1px solid #dde0e0;
		border-right: 1px solid #dde0e0;
		border-bottom: 1px solid #dde0e0;
		border-radius: 0 2px 2px 0;
		width: 305px;
		z-index: 20;
		left: -50%;
			b {
				display: inline-block;
				line-height: 40px;
			}
			.operation {
				float: right;
				.peopleNub {
					margin: 0 20px ;
					width: 40px;
					height: 40px;
					border: 1px solid #dde0e0;
					font-size: 18px;
					font-weight: bold;
					text-align: center;
					padding: 0;
					&:hover {
						border-color: #dde0e0!important;
					}
				}
				em {
					
					border-radius: 50%;
					width: 30px;
					height: 30px;
					text-align: center;
					line-height: 30px;
					display: inline-block;
				}
				.cur{
					border: 1px solid #1bbc9d;
					cursor: pointer;
					color: #1bbc9d;
				}
				.disabled{
					cursor:not-allowed;
					border: 1px solid #ebebeb;
					color: #353a3f;
				}
			}
		
	}
</style>