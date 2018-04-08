<template >    
    <div class="page__container">
<<<<<<< HEAD
=======
    	<HeaderCommon :logIn="logIn"></HeaderCommon>
>>>>>>> master
        <Banner></Banner>
        <div class="done-head">
            <div class="done-head__icon"><i class="iconfont icon-yixuanze"></i></div>
            <p>
                Thank you for sharing<br>
                your travel dreams with Local Panda!
            </p>
        </div>
        <div class="done-tips page-section">
            <h3>What happens now? </h3>
            <p>
                You'll receive your personalized itinerary within 1 business day. To ensure delivery please add service@localpanda.com to your e-mail
contacts list and check your spam folder too! If you haven’t heard from us within 2 business days, do let us know. 
            </p>
            <h3>Can I make changes to my personalized itinerary?  </h3>
            <p>
                Absolutely! That's why we're here - we'll refine your trip plan with your new request together with you.
You can contact us by: 1) talking to us through the chatbox on the bottom of the page 2) reaching out via email: 
service@localpanda.com.
            </p>
            <h3>Customer service number</h3>
            <p>
                0086 21 80182090<br>
                +1-818-404-8141
            </p>
        </div>
        <div class="done-recommend page-section">
            <h2>The most popular activities in the hottest destinations loved by overseas travelers</h2>
            <ul class="done-recommend__list">
                <li 
                    class="done-recommend__cell"
                    :key="index"
                    v-for="(item, index) in recommendDataSource"
                >
                    <a :href="item.link">
                        <div class="done-recommend__cell-pic" v-lazy:background-image="item.src"></div>
                        <div class="done-recommend__cell-title">{{item.title}}</div>
                        <div class="done-recommend__cell-desc">{{item.desc}}</div>
                    </a>
                </li>
            </ul>

        </div>
<<<<<<< HEAD
=======
        <FooterCommon></FooterCommon>
>>>>>>> master
    </div>
</template>

<script>
<<<<<<< HEAD
import Banner from "~/components/pageComponents/travel/customize/Banner";

const cdnPath = 'https://d2q486kjf9cwwu.cloudfront.net';

=======
import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
import FooterCommon from '~/components/FooterCommon/FooterCommon';
import Banner from "~/components/pageComponents/travel/customize/Banner";
const cdnPath = 'https://d2q486kjf9cwwu.cloudfront.net';
>>>>>>> master
export default {
  name: "TravelCustomizeStep-3",
  components: {
    Banner,
<<<<<<< HEAD
  },
  data() {
    return {
=======
    HeaderCommon,
    FooterCommon
  },
  data() {
    return {
    	logIn:'',
>>>>>>> master
        recommendDataSource: [
            {
                src: cdnPath + '/static/customize/population/Businessgroup.jpg',
                title: 'Panda',
                desc: 'Enjoy a wonderful day observing the clumsy giant panda and the neighboring red pandas, along …',
                link: '/',
            },
            {
                src: cdnPath + '/static/customize/population/Businessgroup.jpg',
                title: 'Panda1',
                desc: 'Enjoy a wonderful day observing the clumsy giant panda and the neighboring red pandas, along …',
                link: '/',
            },
            {
                src: cdnPath + '/static/customize/population/Businessgroup.jpg',
                title: 'Panda2',
                desc: 'Enjoy a wonderful day observing the clumsy giant panda and the neighboring red pandas, along …',
                link: '/',
            },
            {
                src: cdnPath + '/static/customize/population/Businessgroup.jpg',
                title: 'Panda3',
                desc: 'Enjoy a wonderful day observing the clumsy giant panda and the neighboring red pandas, along …',
                link: '/',
            },
            {
                src: cdnPath + '/static/customize/population/Businessgroup.jpg',
                title: 'Panda4',
                desc: 'Enjoy a wonderful day observing the clumsy giant panda and the neighboring red pandas, along …',
                link: '/',
            },
        ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    onChangeRoomRequirements(value) {
      console.log("onChangeRoomRequirements");
      console.log(value);
      this.form.otherRoomRequirements = value;
    }
  },
<<<<<<< HEAD
  mounted: function() {}
=======
  mounted: function() {
  	 this.logIn = window.localStorage.getItem("logstate");
  }
>>>>>>> master
};
</script>
<style lang="scss">
@import "~assets/scss/_main.scss";
@import "~/assets/font/iconfont.css";
@import "~assets/scss/G-ui/base.scss";
</style>
<style lang="scss" scoped>
@import "~assets/scss/base/_setting.scss";
<<<<<<< HEAD

=======
>>>>>>> master
.done-head{
    width: 600px;
    padding: 60px 0;
    margin: 0 auto;
<<<<<<< HEAD

=======
>>>>>>> master
    &__icon{
        width: 70px;
        height: 70px;
        overflow: hidden;
        float: left;
        margin-right: 18px;
        border-radius: 50%;
        background: #1bbc9d;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        line-height: 70px;
<<<<<<< HEAD

=======
>>>>>>> master
        i{
            font-size: 24px;
        }
    }
<<<<<<< HEAD

=======
>>>>>>> master
    p{
        font-size: 28px;
        overflow: hidden;
        line-height: 35px;
        font-weight: bold;
    }
}
<<<<<<< HEAD

=======
>>>>>>> master
.done-tips{
    background: #faf9f8;
    padding: 0 40px 40px;
    font-size: 18px;
<<<<<<< HEAD

=======
>>>>>>> master
    h3{
        font-weight: bold;
        padding: 40px 0 15px;
    }
<<<<<<< HEAD

=======
>>>>>>> master
    p{
        line-height: 30px;
    }
}
<<<<<<< HEAD

.done-recommend{
    margin-top: 56px;

=======
.done-recommend{
    margin-top: 56px;
>>>>>>> master
    h2{
        font-size: 18px;
        font-weight: bold;
    }
<<<<<<< HEAD

=======
>>>>>>> master
    &__list{
        margin-top: 30px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
<<<<<<< HEAD

    }

    &__cell{
        flex: 0 1 218px;
        width: 218px;

=======
    }
    &__cell{
        flex: 0 1 218px;
        width: 218px;
>>>>>>> master
        &-pic{
            width: 218px;
            height: 145px;
        }
        &-title{
            padding: 6px 0;
            font-weight: bold;
            font-size: 18px;
            color: #1bbc9d;
        }
        &-desc{
            font-size: 14px;
            line-height: 20px;
        }
    }
}
<<<<<<< HEAD
</style>

=======
</style>
>>>>>>> master
