<template>
	<div class="message">
			<div class="messageCont">
				<div class="cancel iconfont"  @click="cancle">&#xe606;</div>
				<div class="box">
					<div class="box_show clearfix" >
						<div class="messImg" v-show="info.photoUrl">
							<img :src="info.photoUrl"/>
						</div>
						<div class="mes_info">
							<h3>{{info.title}}</h3>	
							<p class="location">Location: {{info.location}}</p>
							<div class="trafficInfo">
								<p v-if="info.shanghaiTraffic">{{info.shanghaiTraffic.replace(/,/," |")}}</p>
								<p v-if="info.chengduTraffic">{{info.chengduTraffic.replace(/,/," |")}}</p>
								<p v-if="info.beijingTraffic">{{info.beijingTraffic.replace(/,/," |")}}</p>
							</div>
						</div>
					</div>
					<div class="message_des">
						<p v-html="info.introduction"></p>
					</div>
					<div class="btn">
						<a :href="info.link" target="_blank"><button>Explore Further</button></a>
					</div>
				</div>
				
			</div>
		
	</div>
</template>

<script>
export default {
 props:["info","showInfo"],
  name: "message",
  data() {
    return {
     	
    };
  },
  components: {},
  methods: {
    	cancle() {
    			let obj={
    				info:'',
    				show:false
    			}
    			
				this.$emit('back', obj);
			},
  },
  mounted: function() {
  
  }
};
</script>

<style lang="scss" scoped>
	.message{
		height: 100%;
		background: #fff;
		box-shadow:0px 2px 6px 0px rgba(0, 0, 0, 0.1);
		z-index: 30;
		position: relative;	
		.messageCont{
			overflow-y:auto;
			height: 670px;
			.cancel{
				cursor: pointer;
				position: absolute;
				top: 10px;
				right: 10px;
				z-index: 30;
			}
			.box{
				
				
				padding: 20px;
				.messImg{
					float:left;
					width: 256px;
					height: 170px;
					img{
						width: 256px;
						height: 170px;
						border-radius:6px;;
					}
				}
				.mes_info{
					float: right;
					h3{
						font-size: 32px;
						font-weight: bold;
					};
					.location{
						font-size: 14px;
						margin-top: 14px;
					}
					.trafficInfo{
						padding: 12px;
						margin-top: 14px;
						background: #faf9f8;
						border-radius: 6px;
						p{
							font-size: 14px;
							color: #878e95;
							margin-top: 6px;
							&:first-child{
								margin-top: 0;
							}
						}
					}
					
				}
				.message_des{
					margin-top: 23px;
					p{
						font-size: 16px;
						line-height: 20px;
					}
				}
				.btn{
					width: 100%;
					position: absolute;
					bottom: 20px;
					left:0;
					background: #fff;
					text-align: center;
					button{
						width: 380px;
						height: 58px;
						text-align: center;
						line-height: 58px;
						background-image: linear-gradient(-90deg,#009efd 0%,#1bbc9d 100%);
						font-size: 18px;
						font-weight: bold;
						color: #fff;
						border-radius: 30px;
						margin: 0 auto;
					}
					
					
				}
			}
			
		}
		
	}



</style>