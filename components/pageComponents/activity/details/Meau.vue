<template>
	<div id="menu">
			<div class="menu_list">
				<ul class="clearfix">
					<li v-if="highlights&&highlights.length>0" @click="goAnchor('heightLights')">What to Expect</li>
					<!--<li v-if="photoList.length>0" @click="goAnchor('photoList')">Moments in Travel</li>-->
					<li @click="goAnchor('journey')">Itinerary</li>
					<li v-if="(exclusions&&exclusions.length>0)||(inclusions&&inclusions.length>0)" @click="goAnchor('provide')">Inclusions & Exclusions</li>
					<li v-if="travelersReviews.entities&&travelersReviews.entities.length>0&&!ABtest || travelersReviews.entities && travelersReviews.entities.length && ABtest && userABtestID%2==0" @click="goAnchor('review')">Reviews</li>
					<!--<li v-if="exclusions" @click="goAnchor('exclusions')">Exclusions</li>-->
					<!--<li v-if="notice.length>0" @click="goAnchor('notice')">Additional Info</li>-->
					<!--<li v-if="picInfo.priceInstructions" @click="goAnchor('PriceNote')">Price Note</li>-->
					<li v-if="picInfo.refundInstructions" @click="goAnchor('CancellationPolicy')">Rescheduling & Cancellation</li>
					<li v-if="picInfo.details.length>0" @click="goAnchor('picDetails')">Price Details</li>
					<!--<li @click="goAnchor('notes')">Notes</li>-->
					<li class="selectCurrency" @click.stop="showCurrency=true">
						<label>{{currency}} ( {{symbol}} ) <span class="iconfont">&#xe666;</span> </label>
						<div class="currencyBox" v-if="showCurrency">
							<div class="currencyItem" :class="{color:item.sure}"  v-for="(item,index) in exchange" @click.stop="setCurrency(item,index)">
								{{item.code}} ( {{item.symbol}} )
								<span v-if="item.sure" class="iconfont true">&#xe61e;</span>
							</div>

						</div>
					</li>
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
      console.log(data);
      that.exchange = data;
    };
    console.log(that.exchange);
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
    z-index: 999;
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
            .true {
              color: #1bbc9d;
              font-size: 14px;
              position: absolute;
              right: 15px;
            }
          }
        }
        &:last-child {
          float: right;
          &:hover {
            color: #353a3f;
            &:after {
              height: 0;
            }
          }
        }
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