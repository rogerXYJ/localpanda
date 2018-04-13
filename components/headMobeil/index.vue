<template>
	<div class="M-head">
		<div class="log">
			<svg class="iconLog" aria-hidden="true" @click="goback">
			    <use xlink:href="#icon-logo_"></use>
			</svg>
		</div>
	</div>
</template>

<script>
	if (process.BROWSER_BUILD) {
	  require('~/assets/font/iconfont.js')
	}
	export default{
		name:'M-head',
		data(){
			return{
				
			}
		},
		components: {
	    },
	    methods: {
	    	goback(){
	    		location.href="/"
	    	}
	    },
	    mounted: function() {
	        
	     	
	    }
	}
</script>

<style lang="scss" scoped>
.M-head{
	padding: 0.386666rem 0 0.386666rem 0.586666rem;
	.iconLog {
	       width: 2.266666rem;
	       height:0.746666rem;
	       vertical-align: -0.15em;
	       fill: currentColor;
	       overflow: hidden;
	    }
	    background:#fff;
	.log{
		 width: 2.266666rem;;
	}
}
</style>