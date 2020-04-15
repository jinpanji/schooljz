<template>
	<view class="">
		<view class="list_box">
			<view class="box cl" @click="goDetails()">
				<view class="img">
					<image src="../../static/img/xxzx_009.png" mode="widthFix"></image>
				</view>
				<view class="textbox">
					<h3>
						<view class="statusbox">
							<image src="../../static/img/weide001.png" mode="widthFix"></image>
							<text>未读</text>
						</view>
						<text>投诉信息</text>
						<text class="times">2019年8月21日</text>
					</h3>
					<text>报名已提交弟弟顶顶顶顶顶订单顶顶顶顶的点点滴滴</text>
				</view>
			</view>
			<view class="box cl">
				<view class="img">
					<image src="../../static/img/xxzx_009.png" mode="widthFix"></image>
				</view>
				<view class="textbox">
					<h3>
						<view class="statusbox">
							<image src="../../static/img/xxzx_006.png" mode="widthFix"></image>
							<text>未回复</text>
						</view>
						<text>投诉信息</text>
						<text class="times">2019年8月21日</text>
					</h3>
					<text>报名已提交弟弟顶顶顶顶顶订单顶顶顶顶的点点滴滴</text>
				</view>
			</view>
			<view class="box cl">
				<view class="img">
					<image src="../../static/img/xxzx_009.png" mode="widthFix"></image>
				</view>
				<view class="textbox">
					<h3>
						<view class="statusbox">
							<image src="../../static/img/xxzx_007.png" mode="widthFix"></image>
							<text>已回复</text>
						</view>
						<text>投诉信息</text>
						<text class="times">2019年8月21日</text>
					</h3>
					<text>报名已提交弟弟顶顶顶顶顶订单顶顶顶顶的点点滴滴</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			goDetails(){
				uni.navigateTo({
					url:"./info"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list_box{
		padding: 0 30rpx;
		background: #fff;
		// padding-bottom: 50rpx;
		border-bottom: 1px solid #ccc;
		.box{
			padding: 25rpx 0;
			border-bottom: 1px solid #ccc;
			.img{
				float: left;
				width: 90rpx;
				margin-right: 20rpx;
				margin-top: 15rpx;
				image{
					width: 100%;
				}
			}
			.textbox{
				float: left;
				width: 580rpx;
				font-size: 28rpx;
				// font-weight: ;
				line-height:60rpx;
				h3{
					width: 100%;
					.times{
						float: right;
						font-weight: normal;
						color: #ccc;
					}
					image{
						width: 80rpx;
						margin-right: 20rpx;
					}
				}
				>text{
					display: inline-block;
					width: 100%;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					color: #646464;
				}
			}
		}
		.box:last-child{
			border: 0;
		}
		.statusbox{
			float:left;
			position: relative;
			image{
				width: 80rpx;
				// position: absolute;			
			}
			text{
				position: absolute;
				top: 0;
				color: #fff;
				left: 0;
				width: 80rpx;
				text-align: center;
				font-size: 8px;
				// padding:  0 10rpx;
			}
		}
	}
	
</style>
