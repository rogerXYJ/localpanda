<template>
	<div class="footMobile">
		<div class="footMessage">
			<ul>
				<li></li>
			</ul>
		</div>
	</div>
</template>

<script>
	if (process.BROWSER_BUILD) {
	  require('~/assets/font/iconfont.js')
	}
	export default{
		name:'footMobile',
		data(){
			return{
				footMessage:[]
			}
		},
		components: {
	    },
	    methods: {
	    	
	    },
	    mounted: function() {
	        
	     	
	    }
	}
</script>

<style>
</style>