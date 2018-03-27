<template>
	<div class='destInfo'>
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div></div>
		<FooterCommon></FooterCommon>
	</div>
</template>

<script>
	import Vue from 'vue'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	export default {
    name: 'destInfo',
    data(){
    	return {
    		logIn:'',
    		
    		
    	}
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

<style lang="scss" scoped>

	



</style>