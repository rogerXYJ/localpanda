<template>
    <div class="page__container privacy__container">
        <HeaderCommon :logIn="logIn"></HeaderCommon>
        
        <h2>Service Terms and Disclaimers</h2>

        <div class="privacy-content page-section">
            <div class="privacy-detail">

<p>1.	Local Panda reminds you that before using Local Panda, please make sure to read and understand this statement fully. You can choose to discontinue the use of Local Panda's services. However, if you use "Local Panda" services, your use of Local Panda's services will be deemed as acknowledgement of the content of this statement. </p>


<p>2.	Service Terms:<br>
• Normally, the guide picks up the customer at the hotel lobby at 9:00AM. If you want to be picked-up at another time, you should inform us at least 24 hours prior to the appointed time.<br>

• Please notify us of any health conditions, special food requests, or if you are physically challenged at least 48 hours in advance. <br>

• The listed tour length on Local Panda's product detail page is designed based on normal traffic, it might be shorten or prolonged depends on the day by day traffic conditions. <br>

• Tour itinerary or transportation as per described is subject to change in the event of adverse traffic conditions, traffic control, important event (celebrations, conference, matches and etc.), we reserve the right to alter places to be visited.

<p>3.	Local Panda, as a provider of traveling information, collects and displays traveling information on the internet platform for you to search, book and purchase. We are not responsible for the harm caused by the following conditions including traffic accidents, wars, natural disasters, strikes, robberies, sickness, abductions, etc. You canpurchase relevant insurance before leaving the country to protect your life and property on your behalf.Local Panda does its best to control the quality, safety or legality of its traveling products. Any resulting liability occurred during the happening of services is not beard by local panda.</p>

<p>4.	Local Panda is not responsible for any failures or delays in service caused by unpredictable circumstances such as maintenance to the IT network, network connection failures, breakdowns of computers or other systems, hacking, computer viruses, power failures; strikes/labor disputes, riots, fires, floods, storms, explosions, wars; as well as governmental acts, orders by judicial authorities, or third party causes. </p>

<p>5.	You understands and agree that any pictures or claims published through our website by the users are their personal views. Local Panda does not stand for these viewpoints and please exercise your caution upon viewing. </p>

<p>6.	Any website, if does not want be included by Local Panda, should report to Local Panda promptly. Otherwise, Local Panda will deem the site as web-enabled.</p>

<p>7.	Any organization or individual who believes that Local Panda's content may infringe its/his/her legal rights and interests should submit written feedback to Local Panda in a timely basis. Meanwhile, the organization or the individual should provide proof of identity, proof of ownership and detailed infringement evidence. Upon receipt of the above legal documents, Local Panda will remove the infringing content as soon as possible.</p>

<p>8.	You fully understand and agree that when you purchase a travel product or service through Local Panda, you should finish the payment within the response time. If you exceed the time limit, any changes reflected in service price are not beard by Local Panda. You should also understand that any failure of payment caused by network circumstances is not shouldered by Local Panda.</p>

<p>9.	This statement applies to the laws of the People's Republic of China. If any of these clauses conflict with the laws of the People's Republic of China, these clauses will be reinterpreted in full accordance with the law, while the other clauses are still valid will. 

<p>10.	Local Panda's disclaimer will be modified and updated according to laws, regulations and policies, or due to content changes in our website, changes in technology or other reasons that Local Panda deems reasonable. We will notify users regarding the modifications and updates through website notice or any other appropriate form. If you continue to use our services, we see this as your consent to all our new terms and conditions. </p>

            </div>
        </div>

        <Foot></Foot>
    </div>
</template>

<script>
import Vue from 'vue'
import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
import Foot from '~/components/FooterCommon/FooterCommon';

export default {
    name: 'service-terms',
    data(){
    	return {
            logIn:''
    	}
    },
    head() {
        let title = 'Terms of Service - Localpanda.com ';
        let description = 'The receipt of your deposit or payment indicates that you and your travel agent (when applicable) have read these Terms and Conditions and accepted them. '
        let keywords ='travel terms and conditions, trip reservations, payment, cancellation refunds, tour china'
        return {
            title: title,
            meta: [{
                    hid: "keywords",
                    name: "keywords",
                    content: keywords
                },
                {
                    hid: "description",
                    name: "description",
                    content: description
                }
            ]
        };
	},
    components: {
        HeaderCommon,
        Foot
    },
    methods: {
    },
    mounted: function() {
        this.logIn = window.localStorage.getItem("logstate");
    }
}
</script>
<style lang="scss">
    //@import '~/assets/scss/_main.scss';
    //@import '~/assets/font/iconfont.css';
    @import '~assets/scss/G-ui/base.scss';
.privacy__container{
    .heder-cont{
        box-shadow:0 0 10px rgba(0,0,0,0.4);
    }
     #header {
			.init{
				li{
					&:nth-child(0){
						display: none;
					}
					&:nth-child(1){
						display: none;
					}
					&:nth-child(3){
						display: none;
					}
					
				}
			}
			
			.search{ 
				display: none!important;
			}
			
		}
		.footerInfo{
			li:nth-child(5){
				display: none!important;
			}
		}
}
</style>
<style lang="scss" scoped>
    //@import '~/assets/scss/base/_setting.scss';
    
    h2, h3{
        text-align: center;
    }
    h2{
        font-weight: bold;
    }
    h4{
        font-size:24px;
        margin-top: 20px;
        color: #333;
    }
    p{
        font-size: 18px;
        line-height: 28px;
    }
    
    .privacy-tab{
        padding-bottom: 60px;
        text-align: center;
        font-size: 16px;
        &__cell{
            display: inline-block;
            position: relative;
            padding: 0 18px;
            &--current{
                color: #1bbc9d;
            }
            &:after{
                content: '';
                width: 2px;
                height: 10px;
                position: absolute;
                right: 0;
                top: 50%;
                margin-top: -5px;
                background: #353a3f;
            }
            &:last-of-type{
                &:after{
                    display: none;
                }
            }
        } 
    }
    h2{
        margin-top: 60px;
        font-size: 38px;
        text-shadow: 0 5px 10px rgba(0,0,0,.3);
        color: #333;
    }
    .privacy-content{
        padding: 20px 60px 100px;
        background: #ffffff;
        // box-shadow: 0 5px 10px rgba(0,0,0,.3);
    }
    .privacy-detail{
        font-size: 16px;
        line-height: 24px;
        p{
            margin-top: 20px;
            color: #363636;
            b{
                color:#222;
            }
        }
    }
</style>
