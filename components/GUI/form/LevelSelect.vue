<template>	
    <div class="GUI-level-select">
        <el-slider
            v-model="stepValue"
            show-stops
            :max="stepLength"
            @change="onChange"
        >
        </el-slider>
        <div 
            class="GUI-level-select__cell"
            :key="index" v-for="(item, index) in dataSource"
        >
            {{item.label}} 
        </div>
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
                stepValue: 0,
                valueType,
                stepLength: this.dataSource.length-1
            }
        },
        computed: {
        },
		methods: {
            itemCls(value){
                return 'GUI-radio-pic__item' + (this.value == value ? ' GUI-radio-pic__item--current':'');
            },
            onChange(value){
                let val = this.dataSource[value].value;
                console.log(val);
                this.$emit('input', val);
            },
		}
	}
</script>

<style lang="scss">
</style>