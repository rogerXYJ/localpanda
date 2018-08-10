<template >    
    <div class="page__container step1">
    	<HeaderCommon :logIn="logIn"></HeaderCommon>
        <Banner></Banner>
        <StepBar step="1"></StepBar>

        <div class="page-section">
            <el-form
                v-if="formReady" 
                ref="form" 
                :model="form" 
                :rules="formRules"
                class="GUI-form"
            >
                <div class="GUI-form-block GUI-form-block--require">
                    <div class="GUI-form-block__title" id="traveling">Who will be traveling?</div>
                    <div class="GUI-form-block__content">
                        <el-form-item class="GUI-form-item" prop="participant">
                            <RadioPic 
                                :dataSource="whoDataSource" 
                                v-model="form.participant"
                                :onChangeExtend="onChangeParticipantExtend"
                                :initExtendData="{
                                    adults : form.adults,
                                    children : form.children
                                }"
                            >
                            </RadioPic>
                        </el-form-item>
                    </div>
                </div>
                <div class="GUI-form-block GUI-form-block--require">
                    <div class="GUI-form-block__title">Where do you want to travel and what are you interested in doing?</div>
                    <div class="GUI-form-block__content">
                        <el-form-item class="GUI-form-item" prop="destinations">
                            <div class="GUI-form-item__title">Travel destinations <span class="red">*</span></div>
                            <Checkbox 
                                class="travel-des"
                                :dataSource="whereDataSource" 
                                v-model="form.destinations"
                                :otherSpecifyDisplay="true"
                            >
                                <template slot-scope="props">
                                    <div class="travel-des__item">
                                        <div 
                                            class="travel-des__item-pic" 
                                            v-lazy:background-image="props.item.src"
                                        >
                                        </div>
                                        <div class="travel-des__item-title">{{props.item.label}}</div>
                                        <div class="travel-des__item-recommend">
                                            <h4>BEST FOR:</h4>
                                            <p :key="index" v-for="(des, index) in props.item.des">{{des}}</p>
                                        </div>
                                    </div>
                                </template>
                            </Checkbox>
                        </el-form-item>
                        <el-form-item class="GUI-form-item GUI-form-block__content_border" prop="interests">
                            <div class="GUI-form-item__title">Travel Interests <span class="red">*</span></div>
                            <Checkbox 
                                class="travel-interest"
                                :dataSource="interestsDataSource" 
                                v-model="form.interests"
                                :otherSpecifyDisplay="true"
                            >
                                <template slot-scope="props">
                                    <div 
                                        class="travel-interest__item"
                                        v-lazy:background-image="props.item.src"
                                    >
                                        <div class="travel-interest__item-title" v-html="props.item.label"></div>
                                    </div>
                                </template>
                            </Checkbox>
                        </el-form-item>
                    </div>
                </div>
                <div class="GUI-form__grid">
                    <div class="GUI-form__grid-col">
                        <div class="GUI-form-block GUI-form-block--require">
                            <div class="GUI-form-block__title" id="arriveTime">When will you arrive in China?</div>
                            <div class="GUI-form-block__content">
                                <el-form-item class="GUI-form-item" prop="arriveTime">
                                    <div class="arrive-time">
                                        <flatPickr
                                            class="arrive-time__flatpickr"
                                            placeholder="Date"
                                            v-model="arriveTimeDate" 
                                            :config="dateOptions"
                                            hidden
                                        >
                                        </flatPickr>
                                    </div>
                                    <el-input class="input-hidden" v-model="form.arriveTime"></el-input>
                                    <el-checkbox
                                        class="GUI-form__radio-group"
                                        v-model="arriveTimeNotDecided"
                                        label="Not Decided"
                                    >
                                        I haven't decided yet.
                                    </el-checkbox>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="GUI-form__grid-col">
                        <div class="GUI-form-block GUI-form-block--require">
                            <div class="GUI-form-block__title">Which city will you arrive at?</div>
                            <div class="GUI-form-block__content">
                                <el-form-item class="GUI-form-item" prop="arriveCity">
                                    <el-input v-model="arriveCityInput" placeholder="Please enter your destination or city, eg Shanghai."></el-input>
                                    <el-input class="input-hidden" v-model="form.arriveCity"></el-input>
                                    <el-checkbox
                                        class="GUI-form__radio-group"
                                        v-model="arriveCityNotDecided"
                                    >
                                        I haven't decided yet.
                                    </el-checkbox>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="GUI-form-block GUI-form-block__inline">
                            <div class="GUI-form-block__title">How many days do you want to travel?</div>
                            <div class="GUI-form-block__content">
                                <div class="GUI-form-item">
                                    <el-input-number v-model="form.duration" controls-position="right" :min="0"></el-input-number>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="GUI-form-block GUI-form-block--require">
                    <div class="GUI-form-block__title">Have you ever traveled to China before?</div>
                    <div class="GUI-form-block__content">
                        <el-form-item class="GUI-form-block__content GUI-form__radio-group" prop="firstTime">
                            <el-radio-group class="GUI-form-item">
                                <el-radio-group v-model="form.firstTime">
                                    <el-radio :label="false">Yes</el-radio>
                                    <el-radio :label="true">No</el-radio>
                                </el-radio-group>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </div>
                <div class="GUI-form-block GUI-form-block--require">
                    <div class="GUI-form-block__title">Would you like us to include accomodation arrangements in your customized trip plan?</div>
                    <div class="GUI-form__tips">We have a wealth of hotel options for any kind of traveler, and can arrange better prices than you'll find on any hotel booking website.</div>
                    <div class="GUI-form-block__content">
                        <el-form-item class="GUI-form-item" prop="accommodationIncluded">
                            <el-radio-group class="GUI-form__radio-group" v-model="form.accommodationIncluded">
                                <el-radio :label="true">Yes</el-radio>
                                <el-radio :label="false">No</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </div>
                <div class="GUI-form-block">
                    <div class="GUI-form-bar">
                        <el-button @click="onSubmit('form')">Next</el-button>
                    </div>
                </div>
            </el-form>
        </div>   
       <FooterCommon></FooterCommon>
    </div>
</template>

<script>
    import flatPickr from "vue-flatpickr-component";
    import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
    import RadioPic from '~/components/GUI/form/RadioPic';
    import Checkbox from '~/components/GUI/form/Checkbox';
    import {GetDateStr} from '~/assets/js/plugin/utils.js'
	import Banner from '~/components/pageComponents/travel/customize/Banner';
    import StepBar from '~/components/pageComponents/travel/customize/StepBar';
    
	import Consts from '~/assets/js/consts/travel/customize/step.js';
    import stepFormStorage from '~/assets/js/stepFormStorage.js';
    
    const storageKey = 'STEP_1_FORM_STORAGE';
    
	export default {
		name: 'TravelCustomizeStep-1',
		components: {
            Banner,
            StepBar,
            RadioPic,
            Checkbox,
            flatPickr,
            HeaderCommon,
            FooterCommon
            
		},
        data() {            
            let arriveTimeNotDecidedCheck = (rule, value, callback) => {
                if(!value && !this.arriveTimeNotDecided){
                    callback(new Error('Field is required (must be valid date)'));
                }else{
                    callback();
                }
            };
            let arriveCityNotDecidedCheck = (rule, value, callback) => {
                if(!value && !this.arriveCityNotDecided){
                    callback(new Error('Field is required'));
                }else{
                    callback();
                }
            };
            return {
                formReady: false,
               	logIn:'',
                form: {
                    participant: '',
                    adults: 0,
                    children: 0,
                    destinations: [],
                    interests: [],
                    arriveTime: '',
                    firstTime: null,
                    accommodationIncluded: null,
                    duration: 0,
                    arriveCity: '',
                    utcOffset: new Date().getTimezoneOffset() / 60 * -1,
                    flag:false
                },
                formRules: {
                    participant: [
                        { required: true, message: 'Field is required' },
                    ],
                    destinations: [
                        { required: true, message: 'Field is required'},
                    ],
                    interests: [
                        { required: true, message: 'Field is required' },
                    ],
                    accommodationIncluded: [
                        { required: true, message: 'Field is required'},
                    ],
                    firstTime: [
                        { required: true, message: 'Field is required'},
                    ],
                    arriveTime: [
                        { validator: arriveTimeNotDecidedCheck},
                    ],
                    arriveCity: [
                        { validator: arriveCityNotDecidedCheck},
                    ],
                },
                arriveTimeDate: '',
                arriveCityInput: '',
                arriveTimeNotDecided: false,
                arriveCityNotDecided: false,
                whoDataSource: Consts.whoDataSource,
                whereDataSource: Consts.whereDataSource,
                interestsDataSource: Consts.interestsDataSource,
				dateOptions: {
                    inline: true,
                    minDate: GetDateStr(1)
                }
                
            }
        },
		watch: {
			arriveTimeDate: function (newText, oldText) {
                if(newText != oldText){
                    this.form.arriveTime = newText;
                }
            },
            arriveTimeNotDecided: function(newState, oldState){
                if(newState){
                    this.form.arriveTime = '';
                    this.$refs.form.validateField('arriveTime');
                }
            },
			arriveCityInput: function (newText, oldText) {
                if(newText!=oldText){
                    this.form.arriveCity = newText;
                }
            },
            arriveCityNotDecided: function(newState, oldState){
                if(newState&&!this.arriveCityInput){
                    this.form.arriveCity = 'Not Decided';
                }else{
                    this.form.arriveCity = '';
                    
                }
            },
            "form.destinations":function(val,oldVal){
	            	console.log(val)
	            	if(val.length==1&&val[0]==""){
	            		val.splice(0,1)
	            	}
            },
            "form.interests":function(val,oldVal){
            	if(val.length==1&&val[0]==""){
            		val.splice(0,1)
            	}
            }
           	
		},
		methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    // console.log(this.form);
                    
                    var htmlBody = document.documentElement;
                    if(this.form.participant !== 'On my own' && this.form.participant !== 'Couple' && this.form.adults == 0){
                        htmlBody.scrollTop = document.getElementById('traveling').offsetTop;
                        return false;
                    }

                    if (valid) {
//                      console.log('step1 submit success');
                        
                        let formData = Object.assign({},this.form);
                        if(this.arriveTimeNotDecided){
                            formData.arriveTime = '';
                        }
                        if(this.arriveCityNotDecided){
                            formData.arriveCity = 'Not Decided';
                        }
                        formData.flag=true
                        stepFormStorage.addStorage(storageKey, formData);
                     if(formData.accommodationIncluded){
                         window.location.href = "/travel/customize/step2";
                     }else{
                          window.location.href = "/travel/customize/step3";
                      }
                    } else {
                        console.log('error submit!!');
                        //var valModel = this.$refs[formNam e].model;
                        //console.log(valModel);
                        setTimeout(function(){
                            var errorDom = document.getElementsByClassName('is-error');
                            if(errorDom.length){
                                htmlBody.scrollTop = errorDom[0].offsetTop-80;
                            }
                        },200);
                        
                        return false;
                    }
                });
            },
            onChangeParticipantExtend(data){
                this.form.adults = data.adults;
                this.form.children = data.children;
            }
		},
		mounted: function() {
			this.logIn = window.localStorage.getItem("logstate");
            let formData = stepFormStorage.getStorage('STEP_1_FORM_STORAGE');
            console.log(formData)
            console.log(formData.flag)
            if(!formData.flag){
            	stepFormStorage.clearStorage('STEP_1_FORM_STORAGE');
            }else{
        
            	if(JSON.stringify(formData).length > 7){
	                try{
	                    if(formData.arriveTime === 'Not Decided'){
	                        formData.arriveTime = '';
	                        this.arriveTimeNotDecided = true;
	                    }else{
	                        this.arriveTimeDate = formData.arriveTime;
	                    }
	                    if(formData.arriveCity === 'Not Decided'){
	                        formData.arriveCity = '';
	                        this.arriveCityNotDecided = true;
	                    }else{
	                        this.arriveCity = formData.arriveCity;
	                        this.arriveCityInput = formData.arriveCity;
	                    }
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
    @import 'flatpickr/dist/flatpickr.css';
    .page__container{
        .arrive-time{        
            .flatpickr-calendar{
                margin: 0 auto;
                box-shadow:none !important;
                -webkit-box-shadow:none !important;
            }
            .flatpickr-months .flatpickr-prev-month.flatpickr-prev-month, 
            .flatpickr-months .flatpickr-next-month.flatpickr-prev-month,
            .flatpickr-months .flatpickr-prev-month.flatpickr-next-month, 
            .flatpickr-months .flatpickr-next-month.flatpickr-next-month{
                top: 20px!important;
            }
        }
        .flatpickr-months .flatpickr-prev-month svg, .flatpickr-months .flatpickr-next-month svg{ margin-top: 0;}

    }
    
</style>
<style lang="scss" scoped>
    //@import '~/assets/scss/base/_setting.scss';
.step1{
    background:#fff;
    .travel-des{        
        &__item{
            border: 3px solid #fff;
            padding-bottom: 10px;
            cursor: pointer;
            &-pic{
                width: 100%;
                height: 144px;
                background: center center no-repeat;
                background-size: cover;
            }
            &-title{
                padding: 10px 10px;
                font-size: 22px;                
            }
            &-recommend{
                padding: 5px 0 0 10px;
                font-size: 16px;
                line-height: 24px;
            }
        }
        .GUI-checkbox__item--current{
            .travel-des__item{
                border: 3px solid #1bbc9d;
            }
        }
    }
    .travel-interest{
        &__item{
            width: 100%;
            height: 68px;
            overflow: hidden;
            position: relative;
            border-radius: 4px;
            background: center center no-repeat;
            background-size: cover;
            margin-bottom: 20px;
            cursor: pointer;
            &-title{
                width: 100%;
                padding: 0 20px;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                color: #ffffff;
                font-size: 18px;
                text-shadow: 0 5px 10px rgba(0,0,0,.3);
                text-align: center;
                line-height: 22px;
                font-weight: bold;
            }
        }
        .GUI-checkbox__item.el-checkbox{
            float: inherit!important;
            margin-left: 9px;
        }
        .GUI-checkbox__item--current{
            .travel-interest__item{
                border: 3px solid #1bbc9d;
            }
        }
        
    }
    .arrive-time{
        width: 80%;
        padding: 20px 0;
        text-align: center;
        background: #ebebeb;
    }
    
    .input-hidden{
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
    }
    .GUI-form-block{
        &__content_border{
            border-top:#ddd solid 1px;
            padding-top: 20px;
        }
        &__title:before{
            width: 25px;
        }
    }
    .GUI-form-item{
        &__title{
            margin-bottom: 5px;
            padding-left: 12px;
        }
    }
    .travel-des__item-recommend{
        h4{
            font-weight:bold;
            color: #353a3f;
        }
    }
    .red{ 
        color:#e14f3f;
        font-size:16px;
    }
    
}
</style>
<style lang="scss">
.page__container .GUI-form .el-form-item.is-error .el-form-item__content{
    padding-top: 0;
}
</style>
