<template>	
    <div class="GUI-checkbox">
        <div class="GUI-checkbox__group">
            <div 
                :class="itemCls(item.value)"
                :key="index" v-for="(item, index) in dataSource"
                @click="onChange(item.value)"
            >
                <slot :item="item">
                    <div class="GUI-checkbox__item-label">{{item.label}}</div>
                </slot>
            </div>
        </div>
        <OtherSpecify :initValue="otherValue" :onChangeOther="onChangeOther" ></OtherSpecify>
    </div>
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
                    console.log(1);
                    return [];
                },
            }
        },
		components: {
            OtherSpecify,
		},
		data() {
            let otherValue = '';
            let value = this.value || [];
            value.forEach((val) => {
                let has = false;
                this.dataSource.forEach((item) => {
                    if(item.value == val){
                        has = true
                    }
                })
                if(!has){
                    otherValue = val
                }
            })
            return {
                valueArr: value,
                otherValue,
            }
        },
        computed: {
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
            onChange(value){
                let arr = this.valueArr.slice();
                let has = false;

                arr.forEach((val) => {
                    if(val == value){
                        has = true;
                    }
                })

                if(!has){
                    arr.push(value)
                }

                console.log(this.valueArr);
                console.log(value);
                console.log(arr);

                this.valueArr = arr;
                this.$emit('input', arr);
            },
            onChangeOther(value){
                this.onChange(value);
            }
		}
	}
</script>

<style lang="scss">
    .GUI-checkbox{
        overflow: hidden;

        &__group{
            overflow: hidden;
        }

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
</style>