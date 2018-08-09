<template>
	<div :class="checkedCls">
		<div class="GUI-other-specify__title">
            <el-checkbox v-if="type == 'checkbox'" @change="onChangeCheck" :label="text">Other, please specify...</el-checkbox>
            <el-radio v-if="type == 'radio'" :label="text">Other, please specify...</el-radio>
        </div>
		<div v-if="checked" :class="inputCls">
			<el-input 
                v-model="text" 
                :placeholder="placeholder"
            >
            </el-input>
            <div class="GUI-other-specify__error">Field is required (must be valid date)</div>
		</div>
	</div>
</template>
<script>
    import _ from 'lodash';
	export default {
		name: "GUI-OtherSpecify",
		props:{
			type: {
				type: String,
				default: 'checkbox', /* radio, checkbox */
			},
            value: [String, Number, Array],
            label: [String, Number],
            placeholder: String,
			onChangeOther: {
				type: Function,
				default: function(value){
					console.log(value)
				}
			},
		},
		data() {
			let checked = false;
			let text = null;
			switch(this.type){
				case 'radio':
					text = this.label;
					checked = !!this.label;
					break;
				case 'checkbox':
					text = this.label;
					checked = !!this.label;
					break;
			}
			return {
				text,
				oldText: text,
                checked,
                error: false,
			}
		},
		computed: {
			checkedCls() {
				let current = this.checked ? ' GUI-other-specify--current':'';
				let type = ' GUI-other-specify--' + this.type;
				return 'GUI-other-specify' + current + type;
			},
			inputCls() {
				let error = this.error ? ' GUI-other-specify__input--error':'';
				return 'GUI-other-specify__input' + error;
			},
		},
		watch: {
			text: function (newText, oldText) {
				
				this.oldText = oldText;
				console.log(this.oldText )
				this.onChange(newText);
			},
			value: function (newText, oldText) {
				if(newText == this.text){
					this.checked = true;
				}
			},
		},
		methods: {
            onChangeCheck(val) {
				this.checked = val
            },
			onChange(val) {
				let value;
				if(this.type == 'radio'){
					value = val
				}else{
					let index = 0;
                	value = this.value.slice();
					value.forEach((item, i) => {
						if(this.oldText == item){
							index = i;
						}
					});
					value[index] = val;
				}
				this.$emit('input', value);
				this.onChangeOther(value);
			}
		}
	}
</script>

<style lang="scss" scoped>
.GUI-other-specify{
    width: 100%;
	overflow: hidden;
	margin-top: 30px;
    &__title{
		float: left;
		margin-right: 50px;
		.el-radio{
			line-height: 40px;
			.el-radio__input{
				margin-top: 12px;
			}
		}
		.el-checkbox{
			line-height: 40px;
		}
		.el-checkbox__label, .el-radio__label{
			font-size: 16px;
			color: #1bbc9d!important;
		}
    }
    &__input{
		overflow: hidden;
		width: 540px;
        &--error{
            background: #ff0000;
            .GUI-other-specify__error{
                display: block;
            }
        }
    }
    &__error{
        display: none;
    }
}
</style>