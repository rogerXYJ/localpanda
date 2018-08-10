<template>	
    <div class="GUI-level-select">
        <el-slider
            v-model="stepValue"
            :max="stepLength"
            :show-tooltip="false"
        >
        </el-slider>
        <ul class="GUI-level-select__list">
            <li :key="index" v-for="(item, index) in dataSource">
                <p v-html="item.label"></p>
            </li>
        </ul>
    </div>
</template>
<script>
	export default {
		name: "GUI-LevelSelect",
		props: {
            dataSource: {
                type: Array,
                default: []
            },
            value: [String, Number, Object]
        },
		components: {
		},
		data() {
            let stepValue = 0;
            let valueType = typeof this.value;
            this.dataSource.forEach((item, index) => {
                let has = true;
                if(this.valueType == 'Object'){
                    for(this.value in key){
                        if(this.value[key] != item.value[key]){
                            has = false;
                        }
                    }
                }else{
                    if(item.value != this.value){
                        has = false;
                    }
                }
                if(has){
                    stepValue = index;
                }
            });
            return {
                stepValue,
                valueType,
                stepLength: this.dataSource.length-1
            }
        },
        computed: {
        },
		watch: {
			stepValue: function (newText, oldText) {
                if(newText !== oldText){
				    this.onChange(newText);
                }
			},
		},
		methods: {
            itemCls(value){
                return 'GUI-radio-pic__item' + (this.value == value ? ' GUI-radio-pic__item--current':'');
            },
            onChange(value){
                let val = this.dataSource[value].value;
                this.$emit('input', val);
            },
		}
	}
</script>

<style lang="scss" scoped>
.GUI-level-select{
    position: relative;
    &__list{
        width: 100%;
        position: absolute;
        left: 0;
        top: 43px;
        display: flex;
        li{
            flex: 1;
            p{
                width: 250px;
                position: relative;
                margin-left: -125px;
                text-align: center;
                line-height: 24px;
                &:before{
                    content: '';
                    position: absolute;
                    top: -4px;
                    left: 50%;
                    width: 1px;
                    height: 3px;
                    background: #878e95;
                }
            }
            &:last-of-type{
                flex: 0;
                position: absolute;
                right: 0;
                top: 0;
                p{
                    margin: 0 -125px 0 0;
                }
            }
            
        }
    }
}
</style>