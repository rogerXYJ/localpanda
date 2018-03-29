<template >    
    <div class="page__container">
        <Banner></Banner>
        <StepBar step="2"></StepBar>
        <div class="page-section">
            <el-form 
                ref="form" 
                :model="form" 
                :rules="formRules"
                class="GUI-form"
            >
                <div class="GUI-form-block GUI-form-block--require">
                    <div class="GUI-form-block__title">What is your preferred type of accommodation?</div>
                    <div class="GUI-form-block__content">
                        <el-form-item class="GUI-form-item" prop="accommodation">
                            <LevelSelect :dataSource="accommodationDataSource" v-model="form.accommodation"></LevelSelect>
                        </el-form-item>
                    </div>
                </div>
                <div class="GUI-form-block GUI-form-block--require">
                    <div class="GUI-form-block__title">Who will be traveling?</div>
                    <div class="GUI-form-block__content">
                        <el-form-item class="GUI-form-item" prop="accommodationType">
                            <RadioPic :dataSource="accommodationTypeDataSource" v-model="form.accommodationType"></RadioPic>
                        </el-form-item>
                    </div>
                </div>
                <div class="GUI-form-block">
                    <el-button @click="onSubmit('form')">Next</el-button>
                </div>
            </el-form>
        </div>  
    </div>
</template>

<script>    
    import RadioPic from '~/components/GUI/form/RadioPic';
    import LevelSelect from '~/components/GUI/form/LevelSelect';

	import Banner from '~/components/pageComponents/travel/customize/Banner';
    import StepBar from '~/components/pageComponents/travel/customize/StepBar';
    
	import Consts from '~/assets/js/consts/travel/customize/step.js';
    
	export default {
		name: 'TravelCustomizeStep-2',
		components: {
            Banner,
            StepBar,
            RadioPic,
            LevelSelect,
		},
        data() {
            return {
                form: {
                    accommodation: {
                        accommodationMinPrice: 0,
                        accommodationMaxPrice: 0
                    },
                    accommodationType: '',
                },
                formRules: {
                    accommodation: [
                        { required: true, message: 'Field is required', trigger: 'change' },
                    ],
                    accommodationType: [
                        { required: true, message: 'Field is required'},
                    ],
                },
                accommodationDataSource: Consts.accommodationDataSource,
                accommodationTypeDataSource: Consts.accommodationTypeDataSource,
            }
        },
		methods: {
            onSubmit() {
                console.log('submit!');
            }
		},
		mounted: function() {

        }
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
    @import '~assets/scss/G-ui/base.scss';
    @import '~assets/scss/G-ui/element-ui.scss';
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
</style>

