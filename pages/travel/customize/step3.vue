<template >    
    <div class="page__container step3">
    	<HeaderCommon :logIn="logIn"></HeaderCommon>
        <Banner></Banner>
        <StepBar step="3"></StepBar>
        <div class="page-section">
            <el-form 
                v-if="formReady" 
                ref="form" 
                :model="form" 
                :rules="formRules"
                class="GUI-form"
            >
                <div class="GUI-form-block GUI-form-block--require">
                    <div class="GUI-form-block__title">How can we reach you?</div>
                    <div class="GUI-form-block__content">

                        <div class="GUI-form__grid">
                            <div class="GUI-form__grid-col">
                                <el-form-item class="GUI-form-item" label="First name" prop="firstName">
                                    <el-input v-model="form.firstName" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="GUI-form__grid-col">
                                <el-form-item class="GUI-form-item" label="Last name" prop="lastName">
                                    <el-input v-model="form.lastName" ></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <el-form-item class="GUI-form-item width100" label="Email Address" prop="emailAddress">
                            <el-input v-model="form.emailAddress" ></el-input>
                        </el-form-item>
                        <div class="GUI-form__grid">
                            <div class="GUI-form__grid-col">
                                <el-form-item class="GUI-form-item" label="Nationality" prop="nationality">
                                    <el-input v-model="form.nationality" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="GUI-form__grid-col">
                                <el-form-item class="GUI-form-item" label="Phone Number" prop="phoneNumber">
                                    <el-input v-model="form.phoneNumber" ></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="GUI-form-block">
                    <div class="GUI-form-block__title">What else do we need to know to create your perfect trip?</div>
                    <div class="GUI-form-block__content">
                        <el-form-item class="GUI-form-item" prop="message">
                            <el-input 
                                type="textarea" 
                                v-model="form.message" 
                                size="large"
                                placeholder="If you have other special needs, e.g. vegetarian food requirements, ADA requirements, etc, you can leave them here."
                            >
                            </el-input>
                        </el-form-item>
                    </div>
                </div>
                
                <div class="GUI-form-block">
                    <div class="GUI-form-bar">
                        <el-button @click="prevForm">Previous</el-button>
                        <el-button @click="onSubmit('form')">Next</el-button>
                    </div>
                </div>
            </el-form>
        </div>  
        <FooterCommon></FooterCommon>
    </div>
</template>

<script>
import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
import FooterCommon from '~/components/FooterCommon/FooterCommon';
import Banner from "~/components/pageComponents/travel/customize/Banner";
import StepBar from "~/components/pageComponents/travel/customize/StepBar";
import stepFormStorage from "~/assets/js/stepFormStorage.js";
const storageKey = "STEP_3_FORM_STORAGE";
export default {
    name: "TravelCustomizeStep-3",
        components: {
        Banner,
        StepBar,
        HeaderCommon,
        FooterCommon
    },
    data() {
        let nameCheck = (rule, value, callback) => {
        	
            if(!/^[a-zA-Z]+$/g.test(value)){
            	
                callback(new Error('Please make sure you enter the correct information'));
            }else{
                callback();
            }
        }
        let mailCheck = (rule, value, callback) => {
            if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)){
            	
                callback(new Error('Please make sure you enter the correct information'));
            }else{
                callback();
            }
        }
        let phoneCheck=(rule, value, callback)=>{
        	if(!/^((\d{2,8}-\d{4,13})|(\d{4,13})|(\d{1,5}\+\d{4,13}))$/.test(value)){
        		 callback(new Error('Please make sure you enter the correct information'));
        	}else{
        		callback();
        	}
        }
        return {
        	logIn:"",
            formReady: false,
            form: {
                firstName: "",
                lastName: "",
                emailAddress: "",
                phoneNumber: "",
                nationality: "",
                message: "",
                isSubmiting:false,
                utcOffset:new Date().getTimezoneOffset() / 60 * -1,
            },
                formRules: {
                firstName: [
                    { validator: nameCheck,required:true},
                ],
                lastName: [
                    { validator: nameCheck,required:true},
                ],
                emailAddress: [
                    { validator: mailCheck, trigger: 'blur',required:true},
                ],
                phoneNumber:[
                	{validator: phoneCheck, trigger: 'blur',required:true}
                ]
            }
        };
    },
    methods: {
        onSubmit(formName) {
            if(this.isSubmiting){
                return;
            }
            this.$refs[formName].validate((valid) => {
                console.log(this.$refs[formName].model);
                // console.log(this.form);
                if (valid) {
                	ga(gaSend, {
						hitType: 'event',
						eventCategory: 'customization',
						eventAction: 'submit',
						eventLabel: 'customize_succ',
	
					});
                    this.isSubmiting = true;
                    console.log('step3 submit success');
                    let formData = this.form;
                    let formDataStep1 = stepFormStorage.getStorage('STEP_1_FORM_STORAGE');
                    let formDataStep2 = stepFormStorage.getStorage('STEP_2_FORM_STORAGE');
                    formData = Object.assign(formData, formDataStep1);
                    formData = Object.assign(formData, formDataStep2);
                    console.log(formData);
                    this.axios.put('https://api.localpanda.com/api/user/customization',JSON.stringify(formData),{
                    	headers: {
							'Content-Type': 'application/json; charset=UTF-8'
						}
                    }).then(function(response) {
                        stepFormStorage.clearStorage('STEP_1_FORM_STORAGE');
                        stepFormStorage.clearStorage('STEP_2_FORM_STORAGE');
                        window.location.href = "/travel/customize/done";
                    }, function(response) {
                        this.isSubmiting = false;
                    })
                } else {
                	ga(gaSend, {
						hitType: 'event',
						eventCategory: 'customization',
						eventAction: 'submit',
						eventLabel: 'customize_fail',
	
					});
                    console.log('error submit!!');
                    var errorDom = document.getElementsByClassName('page-section');
                    var htmlBody = document.documentElement;
                    if(errorDom.length){
                        htmlBody.scrollTop = errorDom[0].offsetTop;
                    }
                    
                    this.isSubmiting = false;
                    return false;
                }
            });
        },
        onChangeRoomRequirements(value) {
            console.log("onChangeRoomRequirements");
            console.log(value);
            this.form.otherRoomRequirements = value;
        },
        prevForm(){
            let formDataStep1 = stepFormStorage.getStorage('STEP_1_FORM_STORAGE');
            if(formDataStep1.accommodationIncluded){
                window.location.href = "/travel/customize/step2";
            }else{
                window.location.href = "/travel/customize/step1";
            }
        }
    },
    mounted: function() {
        //定位banner位置
            var htmlBody = document.documentElement;
            var pageBody = document.body;
            var goTop = document.getElementById('banner-bar').offsetTop+60;
            htmlBody.scrollTop = goTop;
            pageBody.scrollTop = goTop;


    	 this.logIn = window.localStorage.getItem("logstate");
        let formData = stepFormStorage.getStorage(storageKey);
        if(JSON.stringify(formData).length > 7){
            try{
                this.form = formData;
            }catch(e){
                
            }
        }
        this.formReady = true;
    }
};
</script>
<style lang="scss">
//@import '~/assets/scss/_main.scss';
//@import '~/assets/font/iconfont.css';
@import "~assets/scss/G-ui/base.scss";
@import "~assets/scss/G-ui/element-ui.scss";
</style>
<style lang="scss" scoped>
//@import '~/assets/scss/base/_setting.scss';

</style>

<style lang="scss">
.step3{
    background:#fff;
    .GUI-form {
        .GUI-form__grid-col {
            padding-right: 24px;
        }
        .GUI-form-block__content {
            padding-right: 24px;
            &:last-of-type {
                padding-right: 0;
            }
            .el-form-item{
                .el-form-item__content{ 
                    padding-top: 0;
                    .el-form-item__error{
                        top:40px;
                        height: 22px;
                        line-height: 22px;
                        font-size:14px;
                    }
                }
            }
            
        }
        .width100{
         width:calc(100% - 26px);  	
        }  
    } 
    .GUI-form .el-form-item.is-error .el-form-item__content{
        padding-top: 0;
    }
}
</style>
