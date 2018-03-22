 <template>
    <div class="page__container about__container">
        <div class="about-cover">
            <h2>We turn trips into amazing experiences</h2>
            <h3>Experience different cities and meet interesting people.</h3>
            <div class="about-cover__play-btn iconfont">&#xe661;</div>
        </div>
        <div class="about-welcome page-section">
            <h3>ABOUT</h3>
            <h2>Local Panda</h2>
            <div class="about__welcome-content">
                <p>We are a new, different kind of China travel platform that is dedicated to improving tourists’ travel experiences. Made up of a diverse team of Chinese and Westerners, we share a fascination with China and a deep love of travel. </p>

                <p>Our goal is to make traveling in China burden-free by delivering real, memorable experiences, connecting customers directly with knowledgeable local guides, personalizing trip-planning, and streamlining the booking process. </p>
            </div>
        </div>
        <div class="about-mission">
            <h3>OUR MISSION</h3>
            <h2>We turn trips into amazing experiences</h2>
            <div class="about-mission__cell page-section">
                <div class="about-mission__cell-icon iconfont">&#xe64e;</div>
                <div class="about-mission__cell-content">
                    <h4>Private</h4>
                    <p>No groups, no tour buses, no long lines. You are the sole concern of our travel experts and professional guides during your trip.</p>
                </div>
            </div>
            <div class="about-mission__cell page-section">
                <div class="about-mission__cell-icon">
                    <i class="iconfont">&#xe65f;</i>
                </div>
                <div class="about-mission__cell-content">
                    <h4>Personalized</h4>
                    <p>Our philosophy is that travel is deeply personal. It creates life-long memories and connects you with friends, loved-ones, and the world beyond your home. Therefore, we tailor every moment of your journey to your preferences, interests, and needs. We also pride ourselves on our flexibility to adapt to situations as they arise during the trip, ensuring that everything goes smoothly. </p>
                </div>
            </div>
            <div class="about-mission__cell page-section">
                <div class="about-mission__cell-icon">
                    <i class="iconfont">&#xe660;</i>
                </div>
                <div class="about-mission__cell-content">
                    <h4>Easy</h4>
                    <p>Booking a trip to a country as large, complex, and foreign as China can be a massive headache. With dedicated China travel experts, incredibly-fast response times, instant booking, and free cancellation, we make planning your trip to China easier than you thought imaginable. </p>
                </div>
            </div>
            <div class="about-mission__cell page-section">
                <div class="about-mission__cell-icon">
                    <i class="iconfont">&#xe65d;</i>
                </div>
                <div class="about-mission__cell-content">
                    <h4>Affordable</h4>
                    <p>No hidden fees, no red tape, no inflated prices for solo travelers. We connect you directly with real local guides and provide you with their best possible price for any given tour or activity.</p>
                </div>
            </div>
            <div class="about-mission__cell page-section">
                <div class="about-mission__cell-icon">
                    <i class="iconfont">&#xe650;</i>
                </div>
                <div class="about-mission__cell-content">
                    <h4>Local</h4>
                    <p>All of our guides are handpicked for being real locals of each destination you will visit. Their mastery of the local area will revolutionize your journey on multiple levels, from being able to get around quicker, to sharing all the local gossip and lore, to showing you the best spots to take pictures, to knowing all the best cheap shops and restaurants. If there is one thing that we have mastered at Local Panda, it is delivering a truly local China Experience.</p>
                </div>
            </div>
            <div class="about-mission__cell page-section">
                <div class="about-mission__cell-icon">
                    <i class="iconfont">&#xe65e;</i>
                </div>
                <div class="about-mission__cell-content">
                    <h4>Authentic</h4>
                    <p>While we love palaces, temples, and monuments, we firmly believe that an authentic travel experience goes beyond visiting the must-see attractions and enables you to genuinely connect with the people, customs, and culture of the place you are visiting. Whether its dancing with old ladies in the park, wandering dying ancient neighborhoods, mastering Chinese chess, practicing Tai Chi, or learning to cook real Chinese food, authentic experiences are at the core of a China adventure with Local Panda.</p>
                </div>
            </div>
        </div>
        <div class="about-leader page-section">
            <h3>OUR STORY</h3>
            <h2>The birth of a panda family</h2>
            <div class="about-leader__pic"></div>
            <div class="about-leader__content">
                <p>Raised by a family of pandas in China’s southwest Sichuan province, Jun grew up with a deep love for all things China. At the age of 18 he moved to Beijing for university, where he discovered his passion for travel. Soon after graduating, he moved to Shanghai and co-founded a start-up dedicated to helping Chinese tourists travel abroad and explore the world beyond his home. </p>

                <p>After successfully growing the business to a valuation of $1 billion, he finally took his chance to experience the world outside China by pursuing a masters at Stanford University. While surrounded by people from all over the world at Stanford, Jun was surprised by both the curiosity and misconceptions that his friends and classmates had about his home. </p>

                <p>Never forgetting his panda roots, Jun returned to Shanghai after graduating with the dream of showing the outside world what China is really like for the real people and pandas who live there. He hand-picked an incredible team of Chinese and Western travel pros and founded Local Panda with a clear mission: to provide authentic adventures and experiences to every visitor in China.</p>
            </div>
        </div>
        <div class="about-family">
            <h2>And finally...the Local Panda Team</h2>
            <h3>If you love to travel and want to build a product that changes the way people experience activities then join our talented team.</h3>
        </div>
        <div class="about-media page-section">
            <h3>MEDIA</h3>
            <h2>Stay up to date</h2>
            <div class="about-media__cell">
                <div class="about-media__cell-icon"></div>
                <div class="about-media__cell-content">Follow us on <a href="#">Facebook</a> for the snazziest travel pictures to inspire your next trip.</div>
            </div>
            <div class="about-media__cell">
                <div class="about-media__cell-icon"></div>
                <div class="about-media__cell-content">Follow us on <a href="#">Twitter</a> for the snazziest travel pictures to inspire your next trip.</div>
            </div>

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
    h2, h3{
        text-align: center;
    }

    h2{
        font-weight: bold;
    }

    p{
        font-size: 18px;
        line-height: 28px;
    }

    .about-cover{
        height: 800px;
        position: relative;
        overflow: hidden;
        background: url('~/static/banner/about_cover.jpg') no-repeat center center;

        h2{
            margin-top: 304px;
            font-size: 44px;
            text-shadow: 0 5px 10px rgba(0,0,0,.3);
            color: #ffffff;
        }

        h3{
            margin-top: 10px;
            font-size: 20px;
            text-shadow: 0 5px 10px rgba(0,0,0,.3);
            color: #ffffff;
        }

        &__play-btn{
            margin-top: 50px;
            color: rgba(255,255,255,.8);
            font-size: 70px;
            text-align: center;
        }

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -900px;
            border-right: 1800px solid #fff;
            border-top: 70px solid transparent;
        }
    }

    .about-welcome{
        padding: 70px 0;

        h2{
            padding: 10px 0 80px;
            font-size: 30px;
            line-height: 28px;
        }

        h3{
            font-size: 16px;
        }

        p{
            padding-bottom: 30px;
            font-size: 18px;
        }
    }

    .about-mission{
        position: relative;
        background: #faf9f8;
        overflow: hidden;
        padding: 70px 0;

        h2{
            padding: 10px 0;
            font-size: 30px;
        }

        h3{
            font-size: 16px;
        }

        h4{
            font-size: 20px;
            padding-bottom: 20px;
        }

        &__cell{
            position: relative;
            padding: 70px 0;
            border-bottom: 1px solid #ebebeb;
            overflow: hidden;

            &:last-of-type{
                border-bottom: none;
            }

            &:nth-of-type(2n){
                .about-mission__cell-icon{
                    float: right;
                }
                .about-mission__cell-content{
                    right: auto;
                    left: 0;
                }
            }
        }

        &__cell-content{
            width: 800px;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
        }

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -900px;
            border-right: 1800px solid #fff;
            border-bottom: 70px solid transparent;
        }

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -900px;
            border-right: 1800px solid #fff;
            border-top: 70px solid transparent;
        }

        &__cell-icon{
            width: 200px;
            height: 200px;
            float: left;
            position: relative;
            padding: 3px;
            background-image: 
                linear-gradient(-45deg, #faf9f8 0%, #faf9f8 100%),
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

    .about-leader{
        overflow: hidden;

        h2{
            padding: 10px 0 80px;
            font-size: 30px;
        }

        h3{
            font-size: 16px;
        }

        &__pic{
            width: 385px;
            height: 465px;
            float: right;
            margin-left: 150px;
            background: url('~/static/banner/leader.jpg');
        }

        &__content{
            overflow: hidden;
            font-size: 18px;

            p{
                padding-bottom: 40px;
            }
        }

    }

    .about-family{
        height: 944px;
        position: relative;
        overflow: hidden;
        background: url('~/static/banner/family.jpg') no-repeat center center;

        h2{
            margin-top: 610px;
            font-size: 44px;
            color: #ffffff;
        }

        h3{
            margin-top: 10px;
            font-size: 20px;
            color: #ffffff;
        }

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -900px;
            border-left: 1800px solid #fff;
            border-bottom: 70px solid transparent;
        }
    }

    .about-media{
        padding: 70px 0;

        h2{
            padding: 10px 0 50px;
            font-size: 30px;
            line-height: 28px;
        }

        h3{
            font-size: 16px;
        }

        &__cell{
            padding: 30px 0 20px;
        }

        &__cell-content{
            margin-top: 40px;
            text-align: center;
            font-size: 18px;

            a{
                color: #1bbc9d;
                text-decoration: underline;
            }
        }

    }
</style>