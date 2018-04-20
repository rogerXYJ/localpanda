<template>
	<div class="themMenu">
		<ul class="clearfix">
			<li v-for="i in tags"><a :href="'/travel/landingPage/'+loc+'/'+keywords+'/'+i.urlField">{{i.keywords}}</a></li>
		</ul>
	</div>
</template>

<script>
	export default {
		props:["tags","loc","keywords"],
		name: "themMenu",
		data() {
			return {
				
				
				
				
			}
		},
		components: {},
		mounted() {
			
		},
		methods: {
			
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
						line-height: 76px;
						font-size: 16px;
						margin-right: 36px;
						cursor: pointer;
						position:relative;
						a{
							&:hover{
								color: #1bbc9d;
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
      
	}
</style>