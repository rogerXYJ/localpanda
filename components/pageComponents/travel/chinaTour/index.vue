<template>
	
	<div class="message">
		<transition name="slideleft" >
			<div class="messageCont" :class="{viewRun:showInfo}">
				<div class="nav">
					<span class="iconfont" @click.stop="cancle">&#xe615;</span>
					{{info.title}}
				</div>
				<div class="box">
					<div class="messImg">
						<img :src="info.photoUrl"/>
					</div>
					<div class="mes_info">
						<h3>{{info.photoContent}}</h3>	
						<p class="location">Location: {{info.location}}</p>
						<div class="trafficInfo">
							<p v-if="info.shanghaiTraffic">{{info.shanghaiTraffic.replace(/,/," |")}}</p>
							<p v-if="info.chengduTraffic">{{info.chengduTraffic.replace(/,/," |")}}</p>
							<p v-if="info.beijingTraffic">{{info.beijingTraffic.replace(/,/," |")}}</p>
						</div>
					</div>
					<div class="message_des">
						<p v-html="info.introduction"></p>
					</div>
					<div class="btn">
						<a :href="info.link" target="_blank"><button>Explore Futher</button></a>
					</div>
				</div>
				
			</div>
		</transition>
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
				this.$emit('back', false);
			},
  },
  mounted: function() {
  
  }
};
</script>

<style lang="scss" scoped>
.view {
			
	transition: all 0.3s cubic-bezier(.55, 0, .1, 1);
	-webkit-transform: translateX(-100%);
	transform: translateX(-100%);
	}

	
	.message{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,0.4);
		width: 100%;
		max-height: 100%;
		z-index: 40;
		.messageCont{
			position: fixed;
			height: 100%;
			background: #fff;
			width: 610px;
			overflow:auto;
			transition: all 0.3s cubic-bezier(.55, 0, .1, 1);
	-webkit-transform: translateX(-100%);
	transform: translateX(-100%);
			.nav{
				height: 76px;
				text-align: center;
				line-height: 76px;
				border-bottom: 1px solid #ebebeb;
				font-size: 18px;
				font-weight: bold;
				position: fixed;
				width: 610px;
				background: #fff;
				span{
					position: absolute;
					left: 20px;
					cursor: pointer;
				}
			}
			.box{
				padding: 131px 60px 106px;
				.messImg{
					text-align: center;
					img{
						width: 490px;
						height: 326px;
						border-radius:6px;;
					}
				}
				.mes_info{
					margin-top: 52px;
					h3{
						font-size: 32px;
						font-weight: bold;
					};
					.location{
						font-size: 18px;
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
					margin-top: 36px;
					p{
						font-size: 16px;
						line-height: 20px;
					}
				}
			}
			.btn{
				position: fixed;
				width: 610px;
				bottom: 0;
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
					margin: 20px auto 20px;
				}
				
				
			}
		}
		.viewRun{
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
	}



</style>