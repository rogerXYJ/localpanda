 <template>
    <div class="page__container about__container">
        <div class="about-cover">
            <div class="about__play-btn">

            </div>
            <h2></h2>
            <h3></h3>
        </div>
        <div class="about-welcome">
            <h3></h3>
            <h2></h2>
            <div class="about__welcome-content">

            </div>
        </div>
        <div class="about-mission">
            <h3></h3>
            <h2></h2>
            <div class="about-mission__cell">
                <div class="about-mission__cell-icon">
                    <i class="iconfont">&#xe64e;</i>
                </div>
                <div class="about-mission__cell-content">
                    <h4></h4>
                    <p></p>
                </div>
            </div>
            <div class="about-mission__cell">
                <div class="about-mission__cell-icon">
                    <i class="iconfont">&#xe65f;</i>
                </div>
                <div class="about-mission__cell-content">
                    <h4></h4>
                    <p></p>
                </div>
            </div>
            <div class="about-mission__cell">
                <div class="about-mission__cell-icon">
                    <i class="iconfont">&#xe660;</i>
                </div>
                <div class="about-mission__cell-content">
                    <h4></h4>
                    <p></p>
                </div>
            </div>
            <div class="about-mission__cell">
                <div class="about-mission__cell-icon">
                    <i class="iconfont">&#xe65d;</i>
                </div>
                <div class="about-mission__cell-content">
                    <h4></h4>
                    <p></p>
                </div>
            </div>
            <div class="about-mission__cell">
                <div class="about-mission__cell-icon">
                    <i class="iconfont">&#xe650;</i>
                </div>
                <div class="about-mission__cell-content">
                    <h4></h4>
                    <p></p>
                </div>
            </div>
            <div class="about-mission__cell">
                <div class="about-mission__cell-icon">
                    <i class="iconfont">&#xe65e;</i>
                </div>
                <div class="about-mission__cell-content">
                    <h4></h4>
                    <p></p>
                </div>
            </div>
        </div>
        <div class="about-leader">
            <h3></h3>
            <h2></h2>
        </div>
        <div class="about-family">
            <h2></h2>
            <h3></h3>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    name: 'about-us',
    components: {
    },
    methods: {
    },
    mounted: function() {
        
    }
}
</script>
<style lang="scss">
    @import '~assets/scss/_main.scss';
    @import '~/assets/font/iconfont.css';
    @import '~assets/scss/G-ui/base.scss';
</style>
<style lang="scss" scoped>
    @import "~assets/scss/base/_setting.scss";
    @import '~assets/scss/G-ui/mixin.scss';
    .about-cover{
        width: 100%;
        height: 500px;
        position: relative;
        overflow: hidden;


        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -900px;
            border-right: 1800px solid #333;
            border-top: 100px solid transparent;
        }
    }

    .about-mission{
        &__cell-icon{
            width: 200px;
            height: 200px;
            position: relative;
            padding: 3px;
            background-image: 
                linear-gradient(-45deg, #ffffff 0%, #ffffff 100%),
                linear-gradient(-45deg, #009efd 0%, #1bbc9d 100%);
			background-clip: content-box, padding-box;
            border-radius: 50%;

            .iconfont{
                position: absolute;
                font-size: 114px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: -webkit-linear-gradient(135deg, #009efd 0%, #1bbc9d 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
        }
    }
</style>