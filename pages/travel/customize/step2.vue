<template >    
    <div class="page__container step2">
    	<HeaderCommon :logIn="logIn"></HeaderCommon>
        <Banner></Banner>
        <StepBar step="2"></StepBar>
        <div class="page-section">
            <el-form 
                v-if="formReady" 
                ref="form" 
                :model="form" 
                :rules="formRules"
                class="GUI-form"
            >
                <div class="GUI-form-block">
                    <div class="GUI-form-block__title mb10">What is your preferred type and budget of accommodation (per night)?</div>
                    <div class="GUI-form-block__content">
                        <el-form-item class="GUI-form-item" prop="accommodation">
                            <LevelSelect :dataSource="accommodationDataSource" v-model="form.accommodation"></LevelSelect>
                        </el-form-item>
                    </div>
                </div>
                <div class="GUI-form-block GUI-form-block--require">
                    <div class="GUI-form-block__title">What is your favorite type of accommodation?</div>
                    <div class="GUI-form-block__content">
                        <el-form-item 
                            class="GUI-form-item" 
                            prop="accommodationType"
                        >
                            <RadioPic 
                                :dataSource="accommodationTypeDataSource" 
                                v-model="form.accommodationType"
                                :otherSpecifyDisplay="true"
                            >
                            </RadioPic>
                        </el-form-item>
                    </div>
                </div>

                <div class="GUI-form-block">
                    <div class="GUI-form-block__title">How many rooms & beds do you need?</div>
                    <div class="GUI-form-block__content">
                        <RoomRequirements :roomRequirementsValue="form.roomRequirements" :otherRoomRequirementsValue="form.otherRoomRequirements" :onChange="onChangeRoomRequirements"></RoomRequirements>
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
    import RadioPic from '~/components/GUI/form/RadioPic';
    import LevelSelect from '~/components/GUI/form/LevelSelect';
	import Banner from '~/components/pageComponents/travel/customize/Banner';
    import StepBar from '~/components/pageComponents/travel/customize/StepBar';
    import RoomRequirements from '~/components/pageComponents/travel/customize/RoomRequirements';
    import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import Consts from '~/assets/js/consts/travel/customize/step.js';
    import stepFormStorage from '~/assets/js/stepFormStorage.js';
    
    const storageKey = 'STEP_2_FORM_STORAGE';
    
	export default {
		name: 'TravelCustomizeStep-2',
		components: {
            Banner,
            StepBar,
            RadioPic,
            LevelSelect,
            RoomRequirements,
            HeaderCommon,
            FooterCommon
		},
        data() {
            return {
            	logIn:'',
                formReady: false,
                form: {
                	flag:false,
                    accommodation: {
                        accommodationMinPrice: 0,
                        accommodationMaxPrice: 0,
                    },
                    
                    accommodationType: '',
                    roomRequirements: [
                        {
                            "roomType": "King or Queen bed",
                            "roomNumber": 0,
                            "extraBed": false
                        },
                        {
                            "roomType": "Double bed",
                            "roomNumber": 0,
                            "extraBed": false
                        }
                    ],
                    otherRoomRequirements: '',
                    utcOffset: new Date().getTimezoneOffset() / 60 * -1,
                },
                formRules: {
                    accommodationType: [
                        { required: true, message: 'Field is required'},
                    ],
                },
                accommodationDataSource: Consts.accommodationDataSource,
                accommodationTypeDataSource: Consts.accommodationTypeDataSource,
            }
        },
		methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    //console.log(this.$refs[formName].model);
                    // console.log(this.form);
                    if (valid) {
                        console.log('step2 submit success');
                        let formData = Object.assign({},this.form);
                        formData.accommodationMinPrice = formData.accommodation.accommodationMinPrice;
                        formData.accommodationMaxPrice = formData.accommodation.accommodationMaxPrice;
                        delete formData.accommodation;
	      				
	                    for(let i = 0;i<formData.roomRequirements.length;i++){
	                    	if(formData.roomRequirements[i].roomNumber<1&&formData.roomRequirements[i].extraBed==false){
	                    		
                        		formData.roomRequirements.splice(i,formData.roomRequirements.length)
                        		
                        	}
	                    }
                		if(formData.roomRequirements.length<1){
                			delete formData["roomRequirements"]
                		}
                		formData.flag=true
                        stepFormStorage.addStorage(storageKey, formData);
                        window.location.href = "/travel/customize/step3";
                    } else {
                        console.log('error submit!!');
                        setTimeout(function(){
                            var errorDom = document.getElementsByClassName('is-error');
                            var htmlBody = document.documentElement;
                            if(errorDom.length){
                                htmlBody.scrollTop = errorDom[0].offsetTop-80;
                            }
                        },150);
                        return false;
                    }
                });
            },
            onChangeRoomRequirements(value){
                console.log('onChangeRoomRequirements');
                console.log(value);
                this.form.otherRoomRequirements = value;
            },
            prevForm(){
                window.location.href = "/travel/customize/step1";
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
            if(!formData.falg){
            	stepFormStorage.clearStorage(storageKey);
            }else{
            	if(JSON.stringify(formData).length > 7){
	                try{
	                    
	                    formData.accommodation = {
	                        accommodationMinPrice: formData.accommodationMinPrice || 0,
	                        accommodationMaxPrice: formData.accommodationMaxPrice || 0,
	                    }
	                    delete formData.accommodationMinPrice;
	                    delete formData.accommodationMaxPrice;
	                    this.form = formData;
	                }catch(e){
	                    
	                }
	            }
            }
           
            
            this.formReady = true;
        }
	}
</script>
<style lang="scss">
	//@import '~/assets/scss/_main.scss';
	//@import '~/assets/font/iconfont.css';
    @import '~assets/scss/G-ui/base.scss';
    @import '~assets/scss/G-ui/element-ui.scss';
.step2{
     background:#fff;
    .el-slider__runway{
        .el-slider__bar{
            opacity: 0.5;
        }
    }
    .GUI-form-block{
        &__title.mb10{
            margin-bottom: 10px;
        }
        &--require{
            padding-top: 50px;
        }
    }
    .GUI-level-select{
        width: 1080px;
        margin: 0 auto;
    }
    .GUI-radio-pic{
        &__group{
           .GUI-radio-pic__item{
                margin:0 34px 0 10px;
            }
        }
    }
    .GUI-form .el-form-item.is-error .el-form-item__content{
        padding-top: 0;
    }
}
</style>
<style lang="scss" scoped>
    //@import '~/assets/scss/base/_setting.scss';
</style>
