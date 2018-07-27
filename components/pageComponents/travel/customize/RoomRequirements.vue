<template>
    <div class="room-bed">
        <div 
            class="room-bed__cell"
            :key="index"
            v-for="(item, index) in roomRequirementsValue"
        >
            <span class="room-bed__cell-label">{{item.roomType}}:</span>
            <span class="room-bed__cell-count">
                <el-input-number v-model="item.roomNumber" controls-position="right" :min="0"></el-input-number>
            </span>
            <span class="room-bed__cell-extra">
                <el-checkbox v-model="item.extraBed">Need an extra bed</el-checkbox>
            </span>
        </div>  
        <el-checkbox-group v-model="checkboxValue">
            <OtherSpecify
                v-model="checkboxValue"
                :label="otherValue"
            ></OtherSpecify>
        </el-checkbox-group>
    </div>
</template>
<script>
    import OtherSpecify from '~/components/GUI/form/OtherSpecify';
	export default {
		name: "RoomRequirements",
		props: {
            roomRequirementsValue: Array,
            otherRoomRequirementsValue: String,
            onChange: {
                type: Function,
				default: function(value){
					console.log(value)
				}
            },
        },
		components: {
            OtherSpecify,
		},
		data() {
            let checkboxValue = [];
            if(!!this.otherRoomRequirementsValue){
                checkboxValue[0] = this.otherRoomRequirementsValue;
                console.log(checkboxValue[0])
            }
            return {
                checkboxValue,
                otherValue: this.otherRoomRequirementsValue
            }
		},
		watch: {
			checkboxValue: function (newArr) {
                this.onChangeOther(newArr);
			},
		},
		methods: {
            onChangeOther(value){
                this.onChange(value[0])
            }
		}
	}
</script>

<style lang="scss" scoped>
    
    .room-bed{
        &__cell{
            margin-bottom: 20px;
            span{
                display: inline-block;
                font-size: 16px;
                line-height: 40px;
            }
            &-label{
                width: 200px;
                padding: 0 15px 0 20px;
                text-align: right;
            }
            &-count{
                margin-right: 30px;
            }
        }
    }
    
</style>

<style lang="scss">
.el-input-number{
    width: 120px;
    &__increase,&__decrease{
        width: 25px;
    }
}
</style>