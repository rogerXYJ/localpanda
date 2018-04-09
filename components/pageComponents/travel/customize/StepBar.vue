<template>
	<div class="step-bar">
        <div class="step-bar__tips">
            Enter your plans below, and one of our travel specialists <br>
            will design and email you a detailed itinerary for free.
        </div>
        <div :class="stepStateCls">
            <div class="step-state__cell step-state__cell--first">
                <div class="step-state__cell-number">
                    <i class="iconfont icon-yixuanze"></i>
                    <span>1</span>
                </div>
                <div class="step-state__cell-info">
                    Your travel <br>
                    interests
                </div>
            </div>
            <div class="step-state__cell step-state__cell--sec">
                <div class="step-state__cell-number">
                    <i class="iconfont icon-yixuanze"></i>
                    <span>2</span>
                </div>
                <div class="step-state__cell-info">
                    Your accomodation<br>
                    preference
                </div>
            </div>
            <div class="step-state__cell step-state__cell--last">
                <div class="step-state__cell-number">
                    <i class="iconfont icon-yixuanze"></i>
                    <span>3</span>
                </div>
                <div class="step-state__cell-info">
                    Your personal <br>
                    information
                </div>
            </div>
        </div>
	</div>
</template>
<script>
	export default {
        name: "TravelCustomizeStepBar",
        props: {
            step: {
                type: [String,Number],
                default: 1
            }
        },
		data() {
            return {
                
            }
        },
        computed: {
            stepStateCls() {
                return 'step-state step-state--' + this.step;
            }
        },
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
    .step-bar{
        padding-top: 60px;
        
        &__tips{
            line-height: 34px;
            font-weight: bold;
            text-align: center;
            font-size: 28px;
        }
    }
    
    .step-state{
        width: 636px;
        margin: 45px auto 84px;
        position: relative;
        overflow: hidden;
        &:before{
            content: '';
            width: 0;
            height: 2px;
            position: absolute;
            left: 106px;
            top: 23px;
            background: #1bbc9d;
        }
        &__cell{
            width: 212px;
            float: left;
            text-align: center;
            &-number{
                width: 50px;
                height: 50px;
                margin: 0 auto;
                position: relative;
                overflow: hidden;
                border-radius: 50%;
                background: #dde0e0;
                font-size: 28px;
                line-height: 50px;
                font-weight: bold;
                color: #ffffff;
                i{
                    display: none;
                    font-size: 18px;
                }
            }
            &-info{
                margin-top: 14px;
                font-size: 16px;
                line-height: 24px;
            }
        }
        &--1{
            .step-state__cell--first{
                .step-state__cell-number{
                    background: #1bbc9d;
                }
            }
        }
        &--2{
            &:before{
                width: 212px;
            }
            .step-state__cell--first{
                .step-state__cell-number{
                    background: #1bbc9d;
                    span{
                        display: none;
                    }
                    i{
                        display: block;
                    }
                }
            }
            .step-state__cell--sec{
                .step-state__cell-number{
                    background: #1bbc9d;
                }
            }
        }
        &--3{
            &:before{
                width: 424px;
            }
            .step-state__cell--first, 
            .step-state__cell--sec{
                .step-state__cell-number{
                    background: #1bbc9d;
                    span{
                        display: none;
                    }
                    i{
                        display: block;
                    }
                }
            }
            .step-state__cell--last{
                .step-state__cell-number{
                    background: #1bbc9d;
                }
            }
        }
    }
</style>