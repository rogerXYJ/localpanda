<template>
	<div :class="checkedCls">
		<div class="GUI-other-specify__title">
            <el-checkbox v-model="checked" @click="onChangeCheck">Other, please specify...</el-checkbox>
        </div>
		<div v-if="checked" :class="inputCls">
			<el-input 
                v-model="text" 
                @change="onChange" 
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
            initValue: [String, Number],
            placeholder: String,
			onChangeOther: {
				type: Function,
				default: function(value){
					console.log(value)
				}
			},
		},
		data() {
			let checked = !!this.initValue;
			return {
				text: '',
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
		methods: {
            onChangeCheck() {
                if(this.checked){
                    this.onChange();
                }
            },
			onChange() {
				this.onChangeOther(this.text)
			}
		}
	}
</script>

<style lang="scss">
.GUI-other-specify{
    width: 100%;
	overflow: hidden;
	margin-top: 40px;

    &__title{
		float: left;
		margin-right: 50px;

		.el-checkbox__label{
			font-size: 16px;
		}
    }

    &__input{
        overflow: hidden;

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