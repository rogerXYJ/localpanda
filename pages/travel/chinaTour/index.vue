 <!--<template>
    <div class="page__container about__container">
    	<HeaderCommon :logIn="logIn"></HeaderCommon>
      	<div class="banner"></div>
        
       
        <FooterCommon></FooterCommon>
    </div>
</template>

<script>
import Vue from 'vue'
import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
import FooterCommon from '~/components/FooterCommon/FooterCommon';
//import Foot from '~/components/FooterCommon/Foot';
export default {
    name: 'about-us',
    data(){
    	return {
    		logIn:'',
    		
    		
    	}
    },
    components: {
    	HeaderCommon,
    	FooterCommon,
    	//Foot
    },
    methods: {
    	
    },
    mounted: function() {
        this.logIn = window.localStorage.getItem("logstate");
    
        	
        
    }
}
</script>
<style lang="scss">
    @import '~assets/scss/_main.scss';
    @import '~/assets/font/iconfont.css';
</style>
<style lang="scss" scoped>
    @import "~assets/scss/base/_setting.scss";
 	
</style>-->