<template>
	<div class="page-banner">
		<div class="mask"></div>
        <h2>Customize My Trip</h2>
        <h3>Create your own free China Itinerary, personalized to your schedule and interests.</h3>
        <div class="banner-bar" id="banner-bar">
            <ul>
                <li><i class="iconfont icon-icon-test1"></i>Completely free</li>
                <li><i class="iconfont icon-icon-test1"></i>Professional Advice</li>
                <li><i class="iconfont icon-icon-test1"></i>Personalized Itinerary</li>
                <li><i class="iconfont icon-icon-test1"></i>Quick Response</li>
            </ul>
        </div>
	</div>
</template>
<script>
	export default {
		name: "TravelCustomizeBanner",
		data() {
            return {}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
    h2, h3{
        text-align: center;
    }
    h2{
        font-weight: bold;
    }
	.page-banner{
        height: 500px;
        position: relative;
        overflow: hidden;
        background: url(https://cloud.localpanda.com/static/customize/customizebanner.jpg) center center no-repeat #efefef;
        background-size: cover;
        h2{
            margin-top: 184px;
            font-size: 44px;
            text-shadow: 0 5px 10px rgba(0,0,0,.3);
            color: #ffffff;
            position: relative;
        }
        h3{
            margin-top: 10px;
            font-size: 20px;
            text-shadow: 0 5px 10px rgba(0,0,0,.3);
            color: #ffffff;
            position: relative;
        }
        .mask{
        	position: absolute;
        	left: 0;
        	top: 0;
        	height: 500px;
        	background:rgba(0,0,0,.2);
        	width: 100%;
        }
    }
    .banner-bar{
        width: 100%;
        height: 58px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, .3);
        color: #ffffff;
        line-height: 58px;
        font-size: 18px;
        ul{
            width: 1170px;
            margin: 0 auto;
            overflow: hidden;
            li{
                width: 323px;
                float: left;
                position: relative;
                i{
                    display: inline-block;
                    margin-right: 12px;
                    font-size: 14px;
                }
                &:last-of-type{
                    width: auto;
                    float: right;
                    text-align: right;
                }
            }
        }
    }
</style>