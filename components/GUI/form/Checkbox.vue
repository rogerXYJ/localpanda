<template>	
    <el-checkbox-group v-model="valueArr" class="GUI-checkbox">
        <div class="GUI-checkbox__group">
            <el-checkbox 
                :class="itemCls(item.value)"
                :key="index" v-for="(item, index) in dataSource"
                :label="item.value"
            >
                <slot :item="item">
                    <div class="GUI-checkbox__item-label">{{item.label}}</div>
                </slot>
            </el-checkbox>
        </div>
        <OtherSpecify 
            v-if="otherSpecifyDisplay"
            :label="otherValue"
            v-model="valueArr"
        >
        </OtherSpecify>
    </el-checkbox-group>
</template>
<script>
    import OtherSpecify from '~/components/GUI/form/OtherSpecify';
	export default {
		name: "GUI-Checkbox",
		props: {
            dataSource: Array,
            value: {
                type: Array,
                default: function(){
                    return [];
                },
            },
            otherSpecifyDisplay: {
                type: Boolean,
                default: false
            }
        },
		components: {
            OtherSpecify,
		},
		data() {
            let otherValue = '';
            let value = this.value || [];
            value.forEach((val) => {
                let hasOther = true;
                this.dataSource.forEach((item) => {
                    if(item.value == val){
                        hasOther = false
                    }
                })
                if(hasOther){
                    otherValue = val
                    console.log(otherValue)
                }
               
            })
            return {
                valueArr: value || [],
                otherValue
            }
        },
        computed: {
        },
		watch: {
			valueArr: function (newArr) {
				this.onChange(newArr);
			},
		},
		methods: {
            itemCls(value){
                let current = '';
                this.valueArr.forEach((val) => {
                    if(val == value){
                        current =  ' GUI-checkbox__item--current';
                    }
                })
                return 'GUI-checkbox__item' + current;
            },
            onChange(value, isOther){
                let arr = this.valueArr.slice();
                console.log(arr)
                this.$emit('input', arr);
                //console.log(arr)
            },
            onChangeOther(value){
                this.onChange(value, true);
            },
		},
	}
</script>

<style lang="scss">
    .GUI-checkbox{
        overflow: hidden;
        &__group{
            overflow: hidden;
            .el-checkbox__input{
                display: none;
            }
            .el-checkbox__label{
                padding: 0;
                display: block;
            }
        }
        &__item.el-checkbox{
            width: 216px;
            float: left;
            margin: 0 9px !important;
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
</style>