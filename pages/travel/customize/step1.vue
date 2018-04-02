<template >    
    <div class="page__container">
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
                    <div class="GUI-form-block__title">Who will be traveling?</div>
                    <div class="GUI-form-block__content">
                        <el-form-item class="GUI-form-item" prop="participant">
                            <RadioPic :dataSource="whoDataSource" v-model="form.participant"></RadioPic>
                        </el-form-item>
                    </div>
                </div>
                <div class="GUI-form-block GUI-form-block--require">
                    <div class="GUI-form-block__title">Where do you want to travel and what are you interested in doing?</div>
                    <div class="GUI-form-block__content">
                        <el-form-item class="GUI-form-item" prop="destination">
                            <div class="GUI-form-item__title">Travel destinations</div>
                            <Checkbox 
                                class="travel-des"
                                :dataSource="whereDataSource" 
                                v-model="form.destination"
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
                        <el-form-item class="GUI-form-item" prop="interests">
                            <div class="GUI-form-item__title">Travel Interests</div>
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
                                        <div class="travel-interest__item-title">{{props.item.label}}</div>
                                    </div>
                                </template>
                            </Checkbox>
                        </el-form-item>
                    </div>
                </div>
                <div class="GUI-form__grid">
                    <div class="GUI-form__grid-col">
                        <div class="GUI-form-block GUI-form-block--require">
                            <div class="GUI-form-block__title">When will you arrive in China?</div>
                            <div class="GUI-form-block__content">
                                <el-form-item class="GUI-form-item" prop="arriveTime">
                                    <div class="arrive-time">
                                        <flatPickr
                                            class="arrive-time__flatpickr"
                                            placeholder="Date"
                                            v-model="form.arriveTime" 
                                            :config="dateOptions"
                                            hidden
                                        >
                                        </flatPickr>
                                    </div>
                                    <input hidden v-model="form.arriveTime">
                                    <el-radio
                                        class="GUI-form__radio-group"
                                        v-model="form.arriveCity" 
                                        label=""
                                    >
                                        I haven't decided yet.
                                    </el-radio>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="GUI-form__grid-col">
                        <div class="GUI-form-block GUI-form-block--require">
                            <div class="GUI-form-block__title">Which city will you arrive at?</div>
                            <div class="GUI-form-block__content">
                                <el-form-item class="GUI-form-item" prop="arriveCity">
                                    <el-input v-model="form.arriveCity" placeholder="Please enter your destination or city, eg Shanghai."></el-input>
                                    <el-radio
                                        class="GUI-form__radio-group"
                                        v-model="form.arriveCity" 
                                        label=""
                                    >
                                        I haven't decided yet.
                                    </el-radio>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="GUI-form-block GUI-form-block__inline">
                            <div class="GUI-form-block__title">How many days do you want to travel?</div>
                            <div class="GUI-form-block__content">
                                <div class="GUI-form-item">
                                    <el-input-number v-model="form.roomNumber" controls-position="right" :min="8"></el-input-number>
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
                                    <el-radio :label="true">Yes</el-radio>
                                    <el-radio :label="false">No</el-radio>
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
    </div>
</template>

<script>
    import flatPickr from "vue-flatpickr-component";
    
    import RadioPic from '~/components/GUI/form/RadioPic';
    import Checkbox from '~/components/GUI/form/Checkbox';
    
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
		},
        data() {
            return {
                formReady: false,
                form: {
                    participant: '',
                    destination: [],
                    interests: [],
                    arriveTime: '',
                    firstTime: null,
                    accommodationIncluded: null,
                    roomNumber: 8,
                    arriveCity: '',
                },
                formRules: {
                    participant: [
                        { required: true, message: 'Field is required' },
                    ],
                    destination: [
                        { required: true, message: 'Field is required'},
                    ],
                    interests: [
                        { required: true, message: 'Field is required' },
                    ],
                    arriveTime: [
                        { required: true, message: 'Field is required (must be valid date)'},
                    ],
                    accommodationIncluded: [
                        { required: true, message: 'Field is required'},
                    ],
                    firstTime: [
                        { required: true, message: 'Field is required'},
                    ],
                    arriveCity: [
                        { required: true, message: 'Field is required'},
                    ],
                },
                whoDataSource: Consts.whoDataSource,
                whereDataSource: Consts.whereDataSource,
                interestsDataSource: Consts.interestsDataSource,
				dateOptions: {
                    inline: true
                }
                
            }
        },
		methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    console.log(this.$refs[formName].model);
                    // console.log(this.form);
                    if (valid) {
                        console.log('step1 submit success');
                        stepFormStorage.addStorage(storageKey, this.form);
                        window.location.href = "/travel/customize/step2";
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
		},
		mounted: function() {
            let formData = stepFormStorage.getStorage(storageKey, this.form);
            try{
                this.form = formData;
            }catch(e){
                this.form = {}
            }
            this.formReady = true;
        }
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
    @import '~assets/scss/G-ui/base.scss';
    @import '~assets/scss/G-ui/element-ui.scss';
    @import 'flatpickr/dist/flatpickr.css';

    .arrive-time{        
        .flatpickr-calendar{
            margin: 0 auto;
        }

        .flatpickr-months .flatpickr-prev-month.flatpickr-prev-month, 
        .flatpickr-months .flatpickr-next-month.flatpickr-prev-month,
        .flatpickr-months .flatpickr-prev-month.flatpickr-next-month, 
        .flatpickr-months .flatpickr-next-month.flatpickr-next-month{
            top: 20px!important;
        }
    }
    
</style>
<style lang="scss" scoped>
    @import "~assets/scss/base/_setting.scss";

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
                padding: 10px 15px;
                font-size: 22px;                
            }

            &-recommend{
                padding: 5px 0 0 10px;
                font-size: 16px;
                line-height: 24px;

                h4{
                    font-weight: bold;
                }
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
    
</style>
