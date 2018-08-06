<template>
	<div class='destInfo'>
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="info" v-html="cont"></div>
		<FooterCommon></FooterCommon>
	</div>
</template>

<script>
	import Vue from 'vue'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	export default {
		async asyncData ({route, store, error, apiBasePath, redirect }) {
			let id=route.params.articleId
			let data={
				logIn:'',
				articleId:id,
	    		cont:'',
	    		title:'',
	    		keywords:'',
	    		description:''
			}
			let articleData={}
			try {
		        articleData = await Vue.axios.get(apiBasePath+"content/article/"+ data.articleId)
		       	data.cont=articleData.data.content
		       	data.title=articleData.data.title
		       	data.keywords=articleData.data.keywords
		       	data.description=articleData.data.description
			 	
		      } catch (err) {
		      	//return error(JSON.stringify(err));
		    }
		      return data
		},
	    name: 'destInfo',
	   /* data(){
	    	return {
	    		logIn:'',
	    		cont:''
	    		
	    	}
	    },*/
	   head(){
	   		let title=this.title
	   		let keywords=this.keywords
	   		let description=this.description
	   		
	   		return {
				title: title,
				meta: [{
						hid: "keywords",
						name: "keywords",
						content: keywords
					},
					{
						hid: "description",
						name: "description",
						content: description
					}

				]
			};
	   },
	    components: {
	    	HeaderCommon,
	    	FooterCommon
	    },
	    methods: {
	    	
	    },
	    mounted: function() {
	        this.logIn = window.localStorage.getItem("logstate");
	     	
	    }
}
</script>
<style lang="scss">
	//@import '~/assets/scss/_main.scss';
	//@import '~/assets/scss/base/_setting.scss';
	//@import '~/assets/font/iconfont.css';
	
	#header {
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
	.destInfo {
		.info{
			margin:60px auto 80px;
			width:1170px;
			h3{
				font-size: 38px;
				font-weight: bold;
				text-align:center; 
				
			}
			h4{
				font-size: 16px;
				font-weight: bold;
				margin-top: 30px;
				
			}
			h5{
				font-size: 16px;
				font-weight: bold;
				margin-top: 30px;
			}
			ul{
				margin-top: 30px;
				li{
					font-size:16px ;
					margin-top: 10px;
					position:relative;
					padding-left: 20px;
					&:first-child{
						margin-top: 0;
					}
					&:after{
						content: "";
					    position: absolute;
					    width: 4px;
					    height: 4px;
					    border-radius: 50%;
					    background: #353a3f;
					    left: 0px;
					    top: 10px;
					}
				}
			}
			p{
				font-size: 16px;
				line-height: 26px;
				a{
					color: #1bbc9d;
				}
				margin-top:30px;
				
			}
		}
	}
</style>
