<template >    
    <div class="page__container">
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
                                    <el-input v-model="form.firstName" placeholder="firstName…"></el-input>
                                </el-form-item>
                            </div>
                            <div class="GUI-form__grid-col">
                                <el-form-item class="GUI-form-item" label="Last name" prop="lastName">
                                    <el-input v-model="form.lastName" placeholder="lastName…"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <el-form-item class="GUI-form-item" label="Email Address" prop="emailAddress">
                            <el-input v-model="form.emailAddress" placeholder="Email…"></el-input>
                        </el-form-item>
                        <div class="GUI-form__grid">
                            <div class="GUI-form__grid-col">
                                <el-form-item class="GUI-form-item" label="Nationality" prop="nationality">
                                    <el-input v-model="form.nationality" placeholder="Please Select…"></el-input>
                                </el-form-item>
                            </div>
                            <div class="GUI-form__grid-col">
                                <el-form-item class="GUI-form-item" label="Phone Number" prop="phoneNumber">
                                    <el-input v-model="form.phoneNumber" placeholder="Phone Number…"></el-input>
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
        return {
        	logIn:"",
            formReady: false,
            form: {
                firstName: "",
                lastName: "",
                emailAddress: "",
                phoneNumber: "",
                nationality: "",
                message: ""
            },
                formRules: {
                firstName: [{ required: true, message: "Field is required" }],
                lastName: [{ required: true, message: "Field is required" }],
                emailAddress: [{ required: true, message: "Field is required" }]
            }
        };
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                console.log(this.$refs[formName].model);
                // console.log(this.form);
                if (valid) {
                    console.log('step3 submit success');
                    let formData = this.form;
                    let formDataStep1 = stepFormStorage.getStorage('STEP_1_FORM_STORAGE');
                    let formDataStep2 = stepFormStorage.getStorage('STEP_2_FORM_STORAGE');
                    formData = Object.assign(formData, formDataStep1);
                    formData = Object.assign(formData, formDataStep2);
                    console.log(formData);
                    this.axios.post('https://api.localpanda.com/api/user/customization/commit',JSON.stringify(formData),{
                    	headers: {
							'Content-Type': 'application/json; charset=UTF-8'
						}
                    }).then(function(response) {
                        stepFormStorage.clearStorage('STEP_1_FORM_STORAGE');
                        stepFormStorage.clearStorage('STEP_2_FORM_STORAGE');
                        window.location.href = "/travel/customize/done";
                    }, function(response) {})
                } else {
                    console.log('error submit!!');
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
@import "~assets/scss/_main.scss";
@import "~/assets/font/iconfont.css";
@import "~assets/scss/G-ui/base.scss";
@import "~assets/scss/G-ui/element-ui.scss";
</style>
<style lang="scss" scoped>
@import "~assets/scss/base/_setting.scss";
.GUI-form__grid-col {
  padding-right: 24px;
  &:last-of-type {
    padding-right: 0;
  }
}
</style>
