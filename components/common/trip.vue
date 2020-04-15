<template>
	<view class="trip_page">
		<view class="cl">
			<h3 class="cl">
				<image src="../../static/img/img/sy_003.png" mode="widthFix"></image>
				<text>上学</text>
				<view class="dzmsg">
					(现代森林小镇-光谷第二小学-线路123)
				</view>
			</h3>
			<view class="msgs">
				<i></i>
				<text>上车时间：09:02</text>
				<view>
					上车地点：现在森林小镇公交站
				</view>
			</view>
			<view class="msgs">
				<i></i>
				<text>下车时间：</text>
				<text class="red">未检测到下车，行程异常，请联系安全员老师！</text>
				<!-- <view>
					上车地点：现在森林小镇公交站
				</view> -->
			</view>
			<h3 class="cl">
				<image src="../../static/img/img/sy_004.png" mode="widthFix"></image>
				<text>放学</text>
				<view class="dzmsg">
					(现代森林小镇-光谷第二小学-线路123)
				</view>
			</h3>
			<view class="msgs">
				<i></i>
				<text>上车时间：</text>
				<text class="green">已请假</text>
			</view>
			<view class="msgs">
				<i></i>
				<text>下车时间：</text>
				<text class="">暂未下车</text>
				<!-- <view>
					上车地点：现在森林小镇公交站
				</view> -->
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		
	}
</script>

<style lang="scss" scoped>
	.trip_page{
		padding:40rpx;
		>view{
			border-left: 1px solid #ccc;
			h3{
				margin-left: -20rpx;
				position: relative;
				overflow: hidden;
				image{
					position: absolute;
					top: 0rpx;
					width: 40rpx;
				}
				text{
					font-weight: bold;
					margin-left: 60rpx;
					position: absolute;
					top: -5rpx;
				}
				view{
					color: #666;
					padding: 0 50rpx;
					font-size: 12px;
					line-height: 70rpx;
					margin-bottom: 10rpx;
					margin-top: 35rpx;
				}
			}
			.msgs{
				padding:0 30rpx;
				position: relative;
				font-size: 14px;
				line-height: 50rpx;
				padding-bottom: 20rpx;
				i{
					position: absolute;
					left: -10rpx;
					top: 20rpx;
					width: 20rpx;
					height: 20rpx;
					background: #ccc;
					border-radius: 50%;
				}
				.red{
					color: red;
				}
				.green{
					color: green;
				}
			}
		}
	}
</style>
