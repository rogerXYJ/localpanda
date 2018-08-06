<template>
	<div id="menutab">
		<ul v-if="logIn==1">
			<li v-for="(item,index) in menuList" ><a :href="item.url" :class="{active:index==menu}"><i class="iconfont" v-html="item.icon"></i>{{item.tab}}</a></li>
			<li style="padding-left: 20px;" @click="signOut"><i class="iconfont" >&#xe62c;</i>Sign out</li>
		</ul>
		<ul v-else>
			<li class="active" style="padding-left: 20px; width: 230px;"><i class="iconfont">&#xe62b;</i>My Bookings</li>
		</ul>
	</div>
</template>

<script>
export default {
	props:["menu","logIn"],
    name: 'menutab',
    data () {
        return {
          	menuList:[
          	{	
          		icon:'&#xe62b;',
          		url:"/user/myBookings?menu=0&flag=1",
          		tab:'My Bookings'
          	},
          	{
          		icon:'&#xe630;',
          		url:"/user/profile?menu=1&flag=1",
          		tab:'Profile'
          	}
          	
          	
          	]
        }
    },
    components: {
      
    },
    methods: {
        signOut(){
        	window.localStorage.clear();
        	window.location.href="/"
        }
    },
    mounted: function() {
        
    }
}
</script>

<style lang="scss" scoped>
//@import '~/assets/scss/base/_setting.scss';
#menutab{
   position: absolute;
   left: 0;
   top: 60px;
   li{
   	width: 250px;
   	height:60px;
   	line-height: 60px;
   	font-size: 18px;
   	color:  #353a3f;
   	cursor: pointer;
   	a{
   			padding-left:20px;
			display: block;
   			&.active{
   				
	   			color: #fff!important;
		   		background: #1bbc9d;
	   		}
   		}
   	i{
   		margin-right:20px;
   		font-size: 24px;
   		
   	}
	   	
   	
   }
   .active{
   			
	   		color: #fff!important;
	   		background: #1bbc9d;
	   	}
    
}
</style>