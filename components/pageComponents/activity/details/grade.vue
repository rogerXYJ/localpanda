<template>
	<div class="gradeList" v-html="remarkStarHtml(score)">
		<!--<div class="grade">
			<div></div>
		</div>
		<div class="grade half">
			<div></div>
		</div>
				<div class="grade none">
			<div></div>
		</div>-->
		<!--<span class="star_list"><i></i><div class="star_half"><span class="star_list"><i></i></span></div></span>
		<span class="star_list star_h"><i></i><div class="star_half"><span class="star_list"><i></i></span></div></span>
		<span class="star_list star_no"><i></i><div class="star_half"><span class="star_list"><i></i></span></div></span>-->
	</div>
	
	

</template>
<script>
export default {
		props:["score","big"],
    name: 'grade',
    data(){
    	return {
    		
    	}
    },
    components: {
    	
    },
    methods: {
    		remarkStarHtml(score){
    			var html = '';
    				for(let i=0;i<5;i++){
    					if(this.big){
    						if(/\./.test(score/2+'') && i == parseInt(score/2)){
    						
    							html+='<div class="gradeBig halfbig"><div></div></div>'
    						
	    					}else if(i>score/2-1){
	    						html+='<div class="gradeBig none"><div></div></div>'
	    					}else{
	    						html+='<div class="gradeBig"><div></div></div>'
	    					}
    					}else{
    						if(/\./.test(score/2+'') && i == parseInt(score/2)){
    						
    							html+='<div class="grade half"><div></div></div>'
    						
	    					}else if(i>score/2-1){
	    						html+='<div class="grade none"><div></div></div>'
	    					}else{
	    						html+='<div class="grade"><div></div></div>'
	    					}
    					}
    					
    				}
    				return html
    		}
    },
    mounted: function() {
      
    }
}
</script>
<style lang="scss">
	.gradeList{
		display: inline-block;
		margin-top:4px; 
		
	}
	
	.gradeBig{
		width: 18px;
		height: 18px;
		background: linear-gradient(135deg, #1bbc9d 0%, #009efd 100%);
		border-radius: 50%;
		display: inline-block;
		position: relative;
		margin-top:5px; 
		&:before{
			 width: 9px;
			 height: 18px;
			 padding: 3px;
			 border-top-left-radius: 9px;
			 border-bottom-left-radius: 9px;
			 position: absolute;
	    content: "";
	    left: 0;
	    top: 0;
	    display: block;
	   	padding-right: 0;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    background: -webkit-gradient(linear, left top, right top, color-stop(0, #faf9f8), color-stop(1, #faf9f8)), -webkit-gradient(linear, left top, right top, color-stop(0, #009efd), color-stop(1, #1bbc9d));
	    background-clip: content-box, padding-box;
	    overflow: hidden;
		}
		&:after{
			left:9px;
	    height: 18px;
	    padding:3px;
	    width: 9px;
	    border-top-right-radius: 9px;
			border-bottom-right-radius: 9px;
	    top: 0;
	    position: absolute;
	    content: "";
	    display: block;
	   	padding-left: 0;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    background: -webkit-gradient(linear, left top, right top, color-stop(0, #faf9f8), color-stop(1, #faf9f8)), -webkit-gradient(linear, left top, right top, color-stop(0, #009efd), color-stop(1, #1bbc9d));
	    background-clip: content-box, padding-box;
	    z-index: 2;
	    overflow: hidden;
		}
		div{
			width: 8px;
			height: 8px;
			background:linear-gradient(135deg, #1bbc9d 0%, #009efd 100%);
			border-radius: 50%;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			z-index: 3;
		}
	}
	
	
	
	
		.grade{
			width: 12px;
			height: 12px;
			background: linear-gradient(135deg, #1bbc9d 0%, #009efd 100%);
			border-radius: 50%;
			display: inline-block;
			position: relative;
			&:before{
					position: absolute;
			    content: "";
			    left: 0;
			    top: 0;
			    display: block;
			    width: 6px;
			    height: 12px;
			    padding: 2px;
			   	padding-right: 0;
			    -webkit-box-sizing: border-box;
			    box-sizing: border-box;
			    border-top-left-radius: 6px;
			    border-bottom-left-radius: 6px;
			    background: -webkit-gradient(linear, left top, right top, color-stop(0, #faf9f8), color-stop(1, #faf9f8)), -webkit-gradient(linear, left top, right top, color-stop(0, #009efd), color-stop(1, #1bbc9d));
			    background-clip: content-box, padding-box;
			    overflow: hidden;
			}
			&:after{
				  left: 6px;
			    top: 0;
			    position: absolute;
			    content: "";
			    display: block;
			    width: 6px;
			    height: 12px;
			    padding:2px;
			   	padding-left: 0;
			    -webkit-box-sizing: border-box;
			    box-sizing: border-box;
			    border-top-right-radius: 6px;
			    border-bottom-right-radius: 6px;
			    background: -webkit-gradient(linear, left top, right top, color-stop(0, #faf9f8), color-stop(1, #faf9f8)), -webkit-gradient(linear, left top, right top, color-stop(1, #1bbc9d),color-stop(0, #009efd));
			    background-clip: content-box, padding-box;
			    z-index: 2;
			    overflow: hidden;
				
				
			}
			div{
				width: 6px;
				height: 6px;
				background:linear-gradient(135deg, #1bbc9d 0%, #009efd 100%);
				border-radius: 50%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				z-index: 3;
			}
			
		}
		.none{
			width: 12px;
			height: 12px;
			background: #fff;
			border:2px solid #dde0e0;
			vertical-align: top;
			div{
				z-index:3!important;
				background: #dde0e0;
			}
			&:after{
				padding: 0!important;
				background: none;
			}
			&:before{
				padding: 0!important;
				background: none;
			}
		}
		.halfbig{
			
				div{
					&:after{
						width: 4px;
						height: 8px;
						position: absolute;
						content: "";
						z-index:3;
						left: 4px;
						background: #dde0e0;
						border-top-right-radius: 4px;
						border-bottom-right-radius: 4px;
					}
				}
				&:after{
					padding:0!important;
				}
		}
		.half{
			
				div{
					&:after{
						width: 3px;
						height: 6px;
						position: absolute;
						content: "";
						z-index:3;
						left: 3px;
						background: #dde0e0;
						border-top-right-radius: 3px;
						border-bottom-right-radius: 3px;
					}
				}
				&:after{
					padding:0!important;
				}
			}
</style>