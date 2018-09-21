<template>
	<div id="menu">
			<div class="menu_list">
				<ul class="clearfix">
					<li v-if="highlights&&highlights.length>0" @click="goAnchor('heightLights')">What to Expect</li>
					<!--<li v-if="photoList.length>0" @click="goAnchor('photoList')">Moments in Travel</li>-->
					<li @click="goAnchor('journey')">Itinerary</li>
					<li v-if="(exclusions&&exclusions.length>0)||(inclusions&&inclusions.length>0)" @click="goAnchor('provide')">Inclusions & Exclusions</li>
          <li v-if="travelersReviews.entities&&travelersReviews.entities.length>0" @click="goAnchor('review')">Reviews</li>
					<!-- <li v-if="travelersReviews.entities&&travelersReviews.entities.length>0&&!ABtest || travelersReviews.entities && travelersReviews.entities.length && ABtest && userABtestID%2==0" @click="goAnchor('review')">Reviews</li> -->
					<!--<li v-if="exclusions" @click="goAnchor('exclusions')">Exclusions</li>-->
					<!--<li v-if="notice.length>0" @click="goAnchor('notice')">Additional Info</li>-->
					<!--<li v-if="picInfo.priceInstructions" @click="goAnchor('PriceNote')">Price Note</li>-->
					<li v-if="picInfo.refundInstructions" @click="goAnchor('CancellationPolicy')">Rescheduling & Cancellation</li>
					<li v-if="picInfo.details.length>0" @click="goAnchor('picDetails')">Price Details</li>
					<!--<li @click="goAnchor('notes')">Notes</li>-->
					<!-- <li class="selectCurrency" @click.stop="showCurrency=!showCurrency">
						<label>{{currency}} ( {{symbol}} ) <span class="iconfont">&#xe666;</span> </label>
						<div class="currencyBox" v-if="showCurrency">
							<div class="currencyItem" :class="{color:item.sure}"  v-for="(item,index) in exchange" @click.stop="setCurrency(item,index)">
                	<svg v-if="index==1" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false">
                  <path d="m0 0h32v24h-32z" fill="#de2910">
                  </path>
                  <path d="m6 7.5-2.1 1.4.8-2.45-2.1-1.55h2.6l.8-2.5.8 2.5h2.6l-2.1 1.55.8 2.45zm5.79-4.59-.92.19.64-.75-.48-.85.88.37.65-.77-.11 1 .88.37-.94.25-.1.98zm2.86 2.38-.46.82-.15-.98-.96-.2.86-.42-.16-.99.69.74.86-.42-.43.87.68.72zm-.24 3.67-.75.57.26-.95-.79-.57.96-.03.26-.97.33.95.96-.03-.75.62.33.93-.79-.51zm-2.63 2.37-.91.23.61-.77-.51-.83.89.34.62-.79-.07 1 .89.34-.93.28-.06.99z" fill="#ffde00">
                  </path>
                </svg>
                <svg v-if="index==0" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false" ><path d="m0 0h32v24h-32z" fill="#fff"></path><path d="m0-.25h32v1.85h-32zm-.09 3.85h32v1.85h-32v-1.85zm.13 3.94h32v1.85h-32v-1.85zm-.03 3.62h32v1.85h-32zm0 3.44h32v1.85h-32zm0 3.9h32v1.85h-32zm0 4h32v1.85h-32z" fill="#de2110"></path><path d="m0 0h18v13h-18z" fill="#0334ab"></path><path d="m1.31.61.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm-13.79 1.29.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm-13.79 1.29.17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm-13.79 1.29.17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm-13.79 1.29.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm-13.79 1.29.17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm-13.79 1.29.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm-13.79 1.29.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm-13.79 1.29.17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51z" fill="#fff"></path></svg>			
                <svg v-if="index==2" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false"><path d="m0 0h32v24h-32z" fill="#039"></path><path d="m16 5.56-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm3.56.98-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm2.6 2.59-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm.96 3.55-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-.97 3.57-.77.54.29-.94-.77-.6h.96l.29-.96.3.96h.96l-.77.6.29.94-.77-.54zm-2.59 2.61-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-3.56.93-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-3.56-.95-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-2.6-2.62-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-.95-3.53-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm.95-3.56-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm2.61-2.63-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94z" fill="#fc0"></path></svg>	
                <svg v-if="index==3" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false"><path d="m .02 0h32v24h-32z" fill="#006"></path><path d="m-7.98 0v2.67l42.57 21.24h5.36v-2.67l-42.58-21.24h-5.36zm37.31 7.97 10.62-5.3v-2.67h-5.36l-14.61 7.29v-7.29h-7.99v7.97h-19.97v7.97h10.62l-10.62 5.3v2.67h5.36l14.61-7.29v7.29h7.99v-7.97h19.97v-7.97z" fill="#fff"></path><path d="m-7.98 9.57v4.78h47.93v-4.78zm21.57 14.43h4.79v-24h-4.79zm-21.57-.09 15.98-7.97h3.57l-15.98 7.98h-3.57zm0-23.92 15.97 7.98h-3.57l-12.4-6.19v-1.78zm28.38 7.97 15.98-7.96h3.57l-15.98 7.97h-3.57zm19.55 15.94-15.98-7.96h3.57l12.4 6.19v1.78z" fill="#c00"></path></svg>		
                <svg v-if="index==4" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false"><path d="m0 0h32v24h-32z" fill="#00247d"></path><path d="m0 0h1.93l15.35 11.1v1.4h-1.93l-15.35-11.1zm13.46 4.17h3.83v4.17h-7.2v4.17h-2.88v-3.81l-5.27 3.81h-1.93v-1.4l3.83-2.77h-3.83v-4.17h7.2v-4.17h2.88v3.81l5.27-3.81h1.93v1.4z" fill="#fff"></path><path d="m0 5v2.5h17.28v-2.5zm7.78-5v12.5h1.73v-12.5zm-7.78 12.5 5.76-4.17h1.29l-5.76 4.17zm0-12.5 5.76 4.17h-1.29l-4.47-3.24zm10.24 4.17 5.76-4.17h1.29l-5.76 4.17zm7.05 8.33-5.76-4.17h1.29l4.47 3.24z" fill="#c00"></path><path d="m14.99 19.63-2.18.19.3 2.17-1.51-1.59-1.51 1.59.3-2.17-2.18-.19 1.88-1.12-1.21-1.83 2.05.78.67-2.09.67 2.09 2.05-.78-1.21 1.83zm9.34 2-.53-.79.89.34.29-.91.29.91.89-.34-.53.79.82.49-.95.08.13.94-.66-.69-.66.69.13-.94-.95-.08zm0-14.1-.53-.79.89.34.29-.91.29.91.89-.34-.53.79.82.49-.95.08.13.94-.66-.69-.66.69.13-.94-.95-.08zm-5.29 5.73-.53-.79.89.34.29-.91.29.91.89-.34-.53.79.82.49-.95.08.13.94-.66-.69-.66.69.13-.94-.95-.08zm9.99-1.41-.53-.79.89.34.29-.91.29.91.89-.34-.53.79.82.49-.95.08.13.94-.66-.69-.66.69.13-.94-.95-.08.82-.49zm-1.93 4.16-.52.32.14-.59-.47-.39.61-.05.23-.56.23.56.61.05-.47.39.14.59z" fill="#fff"></path></svg>	
                <svg v-if="index==5" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false" ><path d="m0 0h32v24h-32z" fill="#c00"></path><path d="m8 0h16v24h-16z" fill="#fff"></path><path d="m10.62 12.06-.62.22 2.88 2.58c.22.66-.08.86-.26 1.21l3.13-.41-.08 3.21.65-.02-.14-3.19 3.13.38c-.19-.42-.37-.64-.19-1.31l2.88-2.44-.5-.19c-.41-.32.18-1.56.27-2.34 0 0-1.68.59-1.79.28l-.43-.84-1.53 1.72c-.17.04-.24-.03-.28-.17l.71-3.58-1.12.64c-.09.04-.19.01-.25-.11l-1.08-2.2-1.11 2.29c-.09.08-.17.09-.24.04l-1.07-.61.64 3.56c-.05.14-.17.18-.32.1l-1.45-1.7c-.19.31-.32.82-.57.94-.25.11-1.1-.22-1.67-.34.19.71.8 1.9.42 2.29z" fill="#c00"></path></svg>
                <svg v-if="index==6" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false" ><path fill="#FFF" d="M0 0h32v24H0z"></path><circle fill="#C00" cx="16" cy="12" r="7"></circle></svg>
                <span>{{item.code}} ( {{item.symbol}} )</span>
								<span v-if="item.sure" class="iconfont true">&#xe61e;</span>
							</div>

						</div>
					</li> -->
					<!--<li v-if="recommed.length>0"@click="goAnchor('recommend')">Similar Experiences</li>-->
				</ul>
			</div>
		</div>
</template>

<script>
export default {
  props: [
    "inclusions",
    "highlights",
    "notice",
    "exclusions",
    "picInfo",
    "photoList",
    "recommed",
    "travelersReviews",
    "userABtestID",
    "ABtest",
    "nowCurrency"
  ],
  name: "menuType",
  data() {
    return {
      currency: "USD",
      symbol: "$",
      exchange: "",
      showCurrency: false
    };
  },
  components: {},
  methods: {
    goAnchor(selector) {
      console.log(this.exclusions);
      var anchor = document.getElementById(selector);
      document.body.scrollTop =
        anchor.offsetTop +
        document.getElementById("banner").offsetHeight +
        60 -
        76;
      document.documentElement.scrollTop =
        anchor.offsetTop +
        document.getElementById("banner").offsetHeight +
        60 -
        76;
    },
    setCurrency(val, index) {
      this.currency = val.code;
      this.symbol = val.symbol;
      this.showCurrency = false;
	  console.log()
      for (let i = 0; i < this.exchange.length; i++) {
        this.exchange[i].sure = 0;
        this.exchange[index].sure = 1;
      }
    }
  },
  mounted() {
    //获取币种列表
    var that = this;
    document.body.addEventListener("click", function() {
				that.showCurrency=false
      })
    window.addEventListener('scroll',function(){
				that.showCurrency=false
			})
    window.currencyCallbackMeau = function(data) {
      that.exchange = data;
    };
  
    //读取币种
    var nowCurrency = JSON.parse(Cookie.get("currency"));
    if (nowCurrency) {
    this.currency = nowCurrency.code;
    this.symbol= nowCurrency.symbol;
    
    
    }
  },
  watch: {
    nowCurrency: function(val) {
      this.currency = val.code;
      this.symbol= val.symbol;
    },
    currency: function(val) {
      var thisCurrency = "",
        exchange = this.exchange;
      for (var i = 0; i < exchange.length; i++) {
        var thisData = exchange[i];
        if (thisData.code == val) {
          thisCurrency = thisData;
        }
      }

      if (thisCurrency) {
        Cookie.set(
          "currency",
          JSON.stringify({
            code: thisCurrency.code,
            symbol: thisCurrency.symbol
          }),
          { path: "/", expires: 30 }
        );

        this.$emit("headCurrency", thisCurrency);
      }
    }
  }
};
</script>

<style lang="scss">
#menu {
	.color{
		color:#1bbc9d;
	}
  position: relative;
  .menu_list {
    animation: fadein 0.3s ease-in-out forwards;
    transform: translateY(-100%);
    background: #fff !important;
    width: 100%;
    height: 76px;
    box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
    position: fixed;
    top: 0;
    z-index: 99;
    ul {
      width: 1170px;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 99999;
      margin: 0 auto;
      li {
        float: left;
        line-height: 76px;
        font-size: 16px;
        margin-right: 24px;
        cursor: pointer;
        position: relative;
        .selectCurrency {
          cursor: pointer;
        }
        .currencyBox {
          position: absolute;
          background: #fff;
          box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          width: 240px;
          right: 2px;
          z-index: 999999;
          .currencyItem {
            cursor: pointer;
            height: 56px;
            line-height: 56px;
            margin: 0 15px;
            border-bottom: 1px solid #ebebeb;
            &:last-child {
              border: none;
            }
           svg{
							height: 24px; width: 24px; display: inline-block; fill: currentcolor;vertical-align: middle;
						}
            span{
              display:inline-block;
              margin-left:15px;
            }
            .true {
              color: #1bbc9d;
              font-size: 14px;
              position: absolute;
              right: 15px;
            }
          }
        }
        // &:last-child {
        //   float: right;
        //   &:hover {
        //     color: #353a3f;
        //     &:after {
        //       height: 0;
        //     }
        //   }
        // }
        &:hover {
          color: #1bbc9d;
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
      li:nth-last-child(1) {
        margin-right: 0;
      }
    }
    @keyframes fadein {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
}
</style>