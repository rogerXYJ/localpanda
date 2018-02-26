<template>
	<div class="bottom" :class="{scroll:scrollTopshow}">
		<div class="bottom_count">
			<div class="imgLog">
				<img src="https://d2q486kjf9cwwu.cloudfront.net/static/icon/sale.png" />
			</div>
			<p>Send in a request to get $30 off your upcoming trip. Our professional travel consultants will personalize your China trip and make sure it's one to remember!</p>
			<div class="btn">
				
				<button @click="showContact">Free Inquiry</button>
			</div>
			
		</div>
		<div class="false" @click="falseClick">
			<i class="iconfont">&#xe606;</i>
		</div>
		<Contact :ContactStatus="ContactStatus" v-on:isshowfn="isShowFn" v-on:contact-call-back="contactCallBack" :objectId="id" :enName="name" :objectType="objectType"></Contact>
		<Alert   :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
	</div>
</template>

<script>
	
	import Contact from '../../guideDetail/components/Contact';
	import Alert from '../../../components/Prompt/Alert';
	export default {
		props:["name","scrollTop","id"],
		name: 'bottom',
		data() {
			return {
				scrollTopshow:false,
				ContactStatus:false,
				isShowAlert:false,
				alertTitle:'',
				alertMessage:"",
				istrue:false,
				objectType:'ACTIVITY'
			}
		},
		components: {
			Contact,
			Alert
		},
		methods: {
			isShowFn(val){
				this.istrue=val
				if(this.istrue==true){
					this.isShowAlert=true
					this.alertTitle="Submission completed!"
					this.alertMessage="Thank you for your feedback.We will get back to you within 1 day."
					this.istrue=false
				}else{
					this.isShowAlert=true
					this.alertMessage="Failed!"
				}
			},
			getIsShowAlert(val){
				this.isShowAlert=val
			},
			showContact(){
				let that=this
				
				that.ContactStatus=true
			},
			contactCallBack(val){
				this.ContactStatus=false
			},
			falseClick(){
				 this.scrollTopshow = false;
			},
			 checkSticky() {
			 	
	            if (window.scrollY > this.scrollTop) {
	                this.scrollTopshow = true;
	            } else {
	                this.scrollTopshow = false;
	            }
        	},
				
		},
		mounted: function() {
	        window.addEventListener('scroll', (e) => {
	            this.checkSticky();
	        })
		}
	}
</script>

<style lang="scss" scoped>
.bottom{
	width: 100%;
	height: 164px;
	background-image: linear-gradient(45deg, #ef7c6d 0%,#ee6e79 100%);
	position: fixed;
	bottom: -100%;
	left: 0;
	.bottom_count{
		width: 1170px;
		height:164px ;
		margin: 0 auto;
		position: relative;
		.imgLog{
			position: absolute;
			top: -73px;
			width: 164px;
			height: 164px;
			border:4px solid #fff;
			border-radius: 50%;
			img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		P{
			margin:30px 0 0 207px;
			font-weight: bold;
			color: #fff;
			font-size: 24px;
		}
		.btn{
			margin:10px 0 0 207px;
			span{
				
			margin-top: 20px;
				font-size: 18px;
				color: #fff;
			}
			button{
				width: 326px;
				height: 50px;
				line-height: 50px;
				text-align: center;
				border-radius: 25px;
				background: #fff;
			
				margin-left: 190px;
				margin-bottom:10px; 
				color: #ef7b6d;
				font-size: 20px;
				font-weight: bold;
				
		
			}
		}
		
	}
	.false{
			cursor: pointer;
			position: absolute;
			right: 10px;
			font-size: 26px;
			color: #fff;
			top: 10px;
		}
}
.scroll{
	animation: fadebottom 1s ease-in-out forwards;

}
@keyframes fadebottom{
	from{
		bottom: -100%;
	}
	to{
		bottom: 0;
	}
}

</style>