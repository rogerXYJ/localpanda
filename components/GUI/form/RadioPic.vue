<template>	
    <div class="GUI-radio-pic">
        <div 
            :class="itemCls(item.value)"
            :key="index" v-for="(item, index) in dataSource"
            @click="onChange(item.value)"
        >
            <div 
                class="GUI-radio-pic__item-pic" 
                v-lazy:background-image="item.src"
            >
            </div>
            <el-radio v-model="radioValue" :label="item.value">{{item.label}}</el-radio>

            <div v-if="item.extend" class="GUI-radio-item-extend">
                <div class="GUI-radio-item-extend__item">
                    <div class="GUI-radio-item-extend__item-title">Adults &amp; Teenagers:</div>
                    <div class="GUI-radio-item-extend__item-label">
                        <el-input-number controls-position="right" :min="1"></el-input-number>
                    </div>
                </div>
                <div class="GUI-radio-item-extend__item">
                    <div class="GUI-radio-item-extend__item-title">Children under 12:</div>
                    <div class="GUI-radio-item-extend__item-label">
                        <el-input-number controls-position="right" :min="0"></el-input-number>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import OtherSpecify from '~/components/GUI/form/OtherSpecify';

	export default {
		name: "GUI-RadioPic",
		props: {
            dataSource: Array,
            value: [String, Number]
        },
		components: {
            OtherSpecify,
		},
		data() {
            return {
                radioValue: this.value
            }
        },
        computed: {
        },
		methods: {
            itemCls(value){
                return 'GUI-radio-pic__item' + (this.value == value ? ' GUI-radio-pic__item--current':'');
            },
            onChange(value){
                console.log(value);
                this.radioValue = value;
                this.$emit('input', value);
            },
            onChangeOther(value){
                console.log(value);
                this.radioValue = value;
                this.$emit('input', value);
            }
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
    }

    .GUI-radio-item-extend{
        width: 100%;
        height: 2px;
        position: relative;
        margin-top: 18px;
        background: #ebebeb;

        &:after{
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            left: 50%;
            top: 2%;
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

            &:after{
                display: none;
            }

            &__item{
                display: block;

                &-title{
                    font-size: 16px;
                }
            }
        }
    }
</style>