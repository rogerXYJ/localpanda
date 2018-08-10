<template>	
    <el-radio-group 
        class="GUI-radio-pic" 
        v-model="radioValue"
    >
        <div class="GUI-radio-pic__group">
            <div 
                :class="itemCls(item.value)"
                :key="index" v-for="(item, index) in dataSource"
            >
                <div 
                    class="GUI-radio-pic__item-pic" 
                    v-lazy:background-image="item.src"
                    @click="onChange(item.value, item.extend)"
                >
                </div>
                <el-radio :label="item.value">{{item.label}}</el-radio>

                <div v-if="item.extend" class="GUI-radio-item-extend">
                    <div class="GUI-radio-item-extend__item">
                        <div class="GUI-radio-item-extend__item-title">Adults &amp; Teenagers:</div>
                        <div class="GUI-radio-item-extend__item-label">
                            <el-input-number 
                                controls-position="right" 
                                v-model="adultsNum" 
                                @change="onChangeAdults" 
                                :min="0"
                            >
                            </el-input-number>
                        </div>
                    </div>
                    <div class="GUI-radio-item-extend__item">
                        <div class="GUI-radio-item-extend__item-title">Children under 12:</div>
                        <div class="GUI-radio-item-extend__item-label">
                            <el-input-number 
                                controls-position="right" 
                                v-model="childNum" 
                                @change="onChangeChildren" 
                                :min="0"
                            >
                            </el-input-number>
                        </div>
                    </div>
                </div>
                <div v-if="adultsNum == 0 && item.extend" class="GUI-radio-item-extend__error">Please input right number of adults.</div>
            </div>
        </div>
        <OtherSpecify 
            v-if="otherSpecifyDisplay"
            :label="otherValue"
            v-model="radioValue"
            type="radio"
        ></OtherSpecify>
    </el-radio-group>
</template>
<script>
    import OtherSpecify from '~/components/GUI/form/OtherSpecify';
	export default {
		name: "GUI-RadioPic",
		props: {
            dataSource: Array,
            value: [String, Number],
            initExtendData: {
                type: Object,
                default: () => {
                    return {
                        adults: 0,
                        children: 0,
                    }
                }
            },
            otherSpecifyDisplay: {
                type: Boolean,
                default: false
            },
            onChangeExtend: {
                type: Function,
                default: (data) => {
                    console.log(data)
                }
            }
        },
		components: {
            OtherSpecify,
		},
		data() {
            let otherValue = null;
            let value = this.value || null;
            let has = false;
            this.dataSource.forEach((item) => {
                if(item.value == value){
                    has = true
                }
            })
            if(!has){
                otherValue = value;
            }
            return {
                radioValue: this.value,
                otherValue,
                adultsNum: this.initExtendData.adults || 0,
                childNum: this.initExtendData.children || 0,
            }
        },
        computed: {
        },
		watch: {
			radioValue: function (newText, oldText) {
                if(newText !== oldText){
				    this.$emit('input', newText);
                }
			},
        },
		methods: {
            itemCls(value){
                return 'GUI-radio-pic__item' + (this.value == value ? ' GUI-radio-pic__item--current':'');
            },
            onChange(value, extendType){
                
                this.adultsNum = 0;
                this.childNum = 0;
                this.onChangeExtend({
                    adults: 0,
                    children: 0,
                })
                if(value != this.radioValue){
                    this.radioValue = value;
                    this.$emit('input', value);
                }
            },
            onChangeOther(value){
                this.onChange(value)
            },
            onChangeAdults(val){
                this.onChangeExtend({
                    adults: val,
                    children: this.childNum,
                })
            },
            onChangeChildren(val){
                this.onChangeExtend({
                    adults: this.adultsNum,
                    children: val,
                })
            }
        },
        beforUpdate(){
            
        }
        
	}
</script>

<style lang="scss">
.GUI-radio-pic{
        overflow: hidden;
        &__item{
            width: 216px;
            float: left;
            margin: 0 9px;
            &-pic{
                width: 216px;
                height: 216px;
                margin-bottom: 18px;
                background: center center no-repeat;
                background-size: cover;
            }
            .el-radio{
                display: block;
            }
        }
    
    .GUI-radio-pic__group{
        overflow: hidden;
    }
    .GUI-radio-item-extend{
        width: 100%;
        height: 20px;
        position: relative;
        margin-top: 18px;
        border-top: 2px solid #ebebeb;
        &:after{
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            left: 50%;
            top: 0;
            margin-left: -20px;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-top: 13px solid #ebebeb;
        }
        &__item{
            display: none;
        }
    }
    .GUI-radio-pic__item--current{
        .GUI-radio-item-extend{
            height: auto;
            padding: 18px;
            border-top: none;
            background: #ebebeb;
            &:after{
                display: none;
            }
            &__item{
                display: block;
                padding-bottom: 10px;
                &-title{
                    font-size: 16px;
                    padding-bottom: 10px;
                }
            }
            &__error{
                margin-top: 5px;
                font-size: 12px;
                line-height: 20px;
                color: #f56c6c;
            }
        }
    }
    
    .el-radio__inner{
        border-color: #bbb;
    }
    
}
.step2{
    .GUI-radio-pic{
        .el-radio__input{
            margin-top: 10px;
        }
    }
}
</style>