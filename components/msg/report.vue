<template>
	<view class="report">
		<view class="">
			<view class="tit">
				司机行为监督
			</view>
		</view>
		<view class="cl">
			<text class="txt">紧急情况</text>
			<Select />
		</view>
		<view class="cl">
			<text class="txt">急刹情况</text>
			<Select />
		</view>
		<view class="cl">
			<text class="txt">急打方向</text>
			<Select />
		</view>
		<view class="cl">
			<text class="txt">激烈驾驶</text>
			<Select />
			<h4>（原则上30公里以内速度）</h4>
		</view>
		<view class="cl">
			<text class="txt">开车过程中打电话</text>
			<Select />
		</view>
		<view class="cl">
			<text class="txt">开车过程中抽烟</text>
			<Select />
		</view>
		<button type="primary">结束行程</button>
		
		<!-- 通知 -->
		<view class="shadow">
			<view class="box">
				<h3>通知</h3>
				<view>发车时间：8：00</view>
				<view>到达时间：8:30</view>
				<view>上车28人</view>
				<view>下车：28人</view>
				<view>滞留：0人</view>
				<button type="primary">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Select from "../common/select.vue"
	export default{
		components:{
			Select
		},
		data(){
			return{
				val1:1,
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.report{
		padding: 0 20rpx;
		background: #fff;
		>view{
			// position: relative;
			padding:20rpx 0;
			border-bottom: 1px solid #ccc;
			Select{
				float: right;
			}
			h4{
				color:#ccc;
				font-size: 30rpx;
			}
		}
		>button{
			width: 100%;
			position: fixed;
			bottom: 0;
			left:0 ;
		}
	}
	button{
		background: #FF6C00;
	}
	.shadow{
		position:fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background: rgba(0,0,0,.5);
		z-index: 1000000;
		.box{
			border-radius: 20rpx;
			background: #fff;
			width: 560rpx;
			margin: auto;
			margin-top: 200rpx;
			padding: 40rpx;
			line-height: 74rpx;
			h3{
				text-align: center;
				font-weight: bold;
				line-height: 60rpx;
			}
			button{
				margin-top: 30rpx;
				border-radius: 50rpx;
			}
		}
	}
</style>
