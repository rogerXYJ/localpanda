<template>
	<div class="themMenu">
		<ul class="clearfix">
			<li v-for="i in tags" ><a :href="i.keywords=='Customize Your Trip'?'/travel/customize/step1':'/travel/'+loc+'/'+keywords+'/'+i.urlField+'#a'" :class="subject==i.urlField?'active':''"><span>{{i.keywords}}</span></a></li>
		</ul>
	</div>
</template>

<script>
	export default {
		props:["tags","loc","subject","keywords"],
		name: "themMenu",
		data() {
			return {
				
			}
		},
		components: {},
		mounted() {
			
		},
		methods: {
			
		},
		watch:{
			"subject":function(val,oldVal){
				console.log(val)
			}
		}
	} 
</script>

<style lang="scss" scoped>
	.themMenu{
		position: fixed;
		top: 0;
		left: 0;
		background-color: #ffffff;
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
		height: 76px;
		display: flex;    
        align-items:center; /*实现垂直居中*/
       animation: fadein 0.3s ease-in-out forwards;
				transform: translateY(-100%);
				background: #fff!important;
				width: 100%;
				height: 76px;
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				position: fixed;
				top: 0;
				z-index: 99999;
				ul {
					width: 1170px;
					margin: 0 auto;
					li {
						
						float: left;
						
						font-size: 16px;
						margin-right: 20px;
						cursor: pointer;
						position:relative;
						
						a{
							display:block; 
							height: 76px;
							width: 120px;
							display: flex;
				            justify-content: center;/*实现水平居中*/
				            align-items:center; /*实现垂直居中*/
							&:hover{
								color: #1bbc9d;
								&:after{
									content: "";
									position: absolute;
									width: 100%;
									height: 3px;
									background:#1bbc9d;
									bottom:0px;
									left: 0;
								}
							}	
						}
						
					}
				}
				@keyframes fadein{
					0%{
						transform: translateY(-100%);
					}
					100%{
						transform: translateY(0);
					}
				}
      			.active{
					color: #1bbc9d!important;
					&:after {
						content: "";
						position: absolute;
						width: 100%;
						height: 3px;
						background: #1bbc9d;
						bottom: 0;
						left: 0;
					}
				}
	}
</style>