<template>
    <div class="page__container privacy__container">
        <HeaderCommon :logIn="logIn"></HeaderCommon>
        
        <h2>The Local Panda Privacy Policy</h2>

        <div class="privacy-content page-section">
            <div class="privacy-detail">

<p>At Local Panda, we recognize that earning and retaining your trust is one of the most important things we do as a business. Protecting your privacy is a responsibility we take very seriously.</p>
<p>We have prepared this Privacy Policy to help you understand how Local Panda collects, uses and seeks to safeguard your personal information you provide to us on our websites, mobile applications, via email, and through our service providers and distribution partners. This Privacy Policy does not address, and we are not responsible for, the privacy, information or other practices of any third party, including any third-party distribution partners, suppliers and tour operators, and any third party operating any site to which our websites contain a link. By downloading, accessing or using our websites or content on a mobile phone, tablet or similar device ("Device"), or providing information to us in connection with our websites or other sites or services, you agree to the terms and conditions of this Privacy Policy.</p>
<h4>Who We Are</h4>
<p>Local Panda is a China specialized travel platform that is dedicated to improving tourists’ travel experiences. Made up of a diverse team of Chinese and Westerners, we share a fascination with China and a deep love of travel. Our goal is to make traveling in China burden-free by personalizing trip-planning, streamlining booking, and delivering real, memorable experiences, led by local guides.</p>
<p>Local Panda is an online service that enables users to research, find, and book travel experiences worldwide. Our products and services are made available through <a href="/" target="_blank">localpanda.com.</a> We also work with distributors who manage the hosting, purchase and payment for our products and services</p>           
<p>If you provide information directly to our distributors, suppliers or tour guides, the terms of their respective privacy policies, and not this Privacy Policy, will apply to such disclosures. You should carefully review the privacy policies of the distributor, supplier or the guides prior to providing information to such third parties.</p>            
<h4>What Information Do We Collect?</h4>
<h5>In General</h5>
<p>We receive and store any information you enter on our websites or give us in any other way. We collect two types of information from you on our websites, via Wechat, email, and through our service providers and distribution partners. Personal Information is information that identifies you personally, such as your first and last name, email address, telephone number, postal and email addresses, user name and password, and billing information (such as your credit card number, cardholder name, and card expiration date). We also collect Other Information that does not identify you personally, such as gender and country of residence.</p>
<p>When you purchase products or services, it is necessary for you to disclose Personal Information, including your name, address, email address, phone number, credit card details and other personally identifying information. If you do not provide Personal Information when purchase, we cannot confirm your purchase or facilitate your booking.</p>
<h5>Automatic Information</h5>   
<p>When you visit <a href="/" target="_blank">localpanda.com</a>, our web server automatically recognizes and collects your IP address, which is assigned by your Internet Service Provider and does not identify you personally, web browser software, and referring website. To help us analyze the usage of our websites and related services, and to send more relevant communications to you, we also collect and keep track of Other Information about your online activity, such as content viewed, pages visited, and searches and/or reservations facilitated or made. One of our goals in collecting this automatic information is to help us understand the interests and preferences of our users and customize your user experience. </p>
<h5>Payment Information</h5>
<p>If you book a tour or excursion with third-party suppliers facilitated by Local Panda, we will collect payment information from you, including your credit card number, cardholder name, expiration date, authentication code, and billing address.</p>
<h5>Your Contributions</h5>
<p>You can contribute to Local Panda in a number of different ways, including writing reviews and send us your travel photos. We may store these contributions (your "Content"), publicly display them on our websites and display them to other users, share them with our affiliate distributors, and use them for promotional purposes. Note that if you include Personal Information in your Content, it can be used and viewed by others. We are not responsible for the information you choose to include in your Content.</p>
<h5>Sharing with Service Providers</h5>
<p>Some of the Personal Information we collect is shared with our service providers (e.g., your hotel name for pick-ups and drop-offs, your local phone number or your mobile phone number, your email address, etc.) We do not provide our service providers with any other Personal Information. If you decide to provide any Personal Information directly to a service provider, we recommend that you review the service provider's privacy policy to determine how such service provider may use or disclose your Personal Information.</p>
<h4>Our Distributors and Suppliers</h4>   
<p>Tours, activities and experiences advertised on our site are partially made available through our distributors and suppliers. Our distributors and suppliers may have privacy policies that differ from Local Panda’s Privacy Policy.</p>
<p>You should also be aware that some product or tour suppliers and some of our affiliates and distributors may need additional Personal Information or Other Information (such as health or physical fitness information) to determine whether you can participate in an activity. You should read and rely upon the relevant supplier, affiliate or distributor Privacy Policy only (and not Viator's Privacy Policy), if Viator does not collect this information from you directly.</p>            
<h4>How You Can Access Your Information</h4>
<p>We take reasonable steps to ensure that your information is relevant to its intended use, accurate, and complete. You can access and update your contact information by accessing your account via Local Panda’s website. If you update any of your information, we may keep a copy of the information that you originally provided to us in our archives for uses documented in this policy.</p>
<p>You can also close your Local Panda's account by accessing your account via our website. We will send you an email to confirm your request. Please note that after you close an account, you will not be able to sign in or access any of your Personal Information. However, you can open a new account at any time.</p>           
<p>Please also note that we may retain certain Personal Information and Other Information associated with your account in our archives, including for analytical purposes as well as for record keeping integrity, fraud prevention, dispute resolution, investigations, and compliance with legal requirements.</p>            
<h4>Children's Privacy</h4>
<p>Local Panda is a general audience site and does not offer services directed to children. Should an individual whom we know to be a child under age 13 send personal information to us, we will delete or destroy such information as soon as reasonably possible.</p>
<h4>Contacting Us</h4>
<p>For some Local Panda’s services you can access and update your registration and Personal Information online.</p>
<p>To correct or update any other Personal Information, or if you have questions about our Privacy Policy, please email us at service@localpanda.com</p>
            
            
            
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
    name: 'privacy',
    data(){
    	return {
            logIn:''
    	}
    },
    components: {
        HeaderCommon,
        Foot
    },
    head() {
        let title = 'Privacy Policy - Localpanda.com';
        let description = 'Local Panda is responsible for protecting your security and confidentiality when sharing your information.'
        let keywords ='Privacy Policy, Local Panda'
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
    h5{
    	font-weight: bold;
    	font-size: 18px;
    	margin-top: 20px;
    }
    p{
        font-size: 18px;
        line-height: 28px;
    }
    a{
    	color: #1bbc9d;
    	text-decoration: underline;
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