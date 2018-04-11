<template>
	<div class="M-filter">
		<div class="cont">
			<div class="head">
				<i class="iconfont">&#xe629;</i>
				<div class="title">Filter</div>
				<div class="clear">Clear</div>
			</div>
		
			<div class="filter-detail">
				<ul>
					<li>
						<div class="filter-item">
							Categories
							<i class="iconfont">&#xe666;</i>
						</div>
						
					</li>
					<li>
						<div class="filter-item">
							Themes
							<i class="iconfont">&#xe666;</i>
						</div>
					</li>
					<li>
						<div class="filter-item">
							Duration
							<i class="iconfont">&#xe666;</i>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="subimtBtn">
			<button>See experiences</button>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	.M-filter{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		background: #fff;
		height:100%;
		max-height: 100%;
		.cont{
			padding-bottom: 1.946666rem;
			.head{
				border-bottom: 1px solid #dde0e0;
				height: 1.386666rem;
				line-height: 1.386666rem;
				text-align: center;
				position: relative;
				font-size: 0.373333rem;
				font-weight: bold;
				i{
					position: absolute;
					left: 0.586666rem;
					font-size: 0.4rem;
					
				}
				.clear{
					position: absolute;
					right: 0.586666rem;
					top: 0;
					color:#1bbc9d;
				}
			}
			.filter-detail{
				padding: 0 0.586666rem;
				ul{
					li{
						border-bottom: 1px solid #dde0e0;
						padding: 1.026666rem 0;
						.filter-item{
							font-size:0.48rem;
							font-weight: bold;
							i{
								font-size:0.48rem; 
								float: right;
							}
						}
					}
				}
			}
		}
		.subimtBtn{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 0.373333rem 0.586666rem;
			button{
				width: calc(100% - 1.173333rem);
				height:1.2rem;
				line-height:1.2rem;
				background-image: linear-gradient(270deg,#009efd 0%,#1bbc9d 100%);
				text-align: center;
				color: #fff;
				border-radius: 0.6rem;
				font-size: 0.346666rem;
				font-weight: bold;
			}
		}
		
	}
</style>