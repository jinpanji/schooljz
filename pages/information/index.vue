<template>
	<view class="information">
		<view class="titles cl">
			<view class="tous cl" @click="goTs()">
				<image src="../../static/img/xxzx_004.png" mode="widthFix"></image>
				<text>5未处理</text>
			</view>
			<view class="qinj cl" @click="goLeave()">
				<image src="../../static/img/xxzx_005.png" mode="widthFix"></image>
				<text>5未处理</text>
			</view>
		</view>
		<!-- 通知列表 -->
		<view class="list_box footerbox"v-if="!isNone">
			<view class="box cl">
				<view class="img">
					<image src="../../static/img/xxzx_009.png" mode="widthFix"></image>
				</view>
				<view class="textbox">
					<h3>
						<text>投诉通知</text>
						<text>2019年8月21日</text>
					</h3>
					<text>报名已提</text>
				</view>
			</view>
			<view class="box cl">
				<view class="img">
					<image src="../../static/img/xxzx_002.png" mode="widthFix"></image>
				</view>
				<view class="textbox">
					<h3>
						<text>学校通知</text>
						<text>2019年8月21日</text>
					</h3>
					<text>报名已提</text>
				</view>
			</view>
			<view class="box cl">
				<view class="img">
					<image src="../../static/img/xxzx_003.png" mode="widthFix"></image>
				</view>
				<view class="textbox">
					<h3>
						<text>投诉通知</text>
						<text>2019年8月21日</text>
					</h3>
					<text>报名已提</text>
				</view>
			</view>
		</view>
		
		<!-- 悬浮框 -->
		<view class="fixed" @click="goGroup()">
			<image src="../../static/img/xxzx_001.png" mode="widthFix"></image>
		</view>
		
		<!-- 无通知提示 -->
		<view class="nonebox" v-show="isNone">
			<image src="../../static/img/xxzx_008.png" mode="widthFix"></image>
			<h3>无通知信息</h3>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				isNone:false,//无通知消息：true
			}
		},
		methods:{
			goLeave(){
				//今日请假
				uni.navigateTo({
					url:"../../components/leave/index"
				})
			},
			goGroup(){
				//群发
				uni.navigateTo({
					url:"../../components/msg/groupsend"
				})
			},
			goTs(){
				//投诉
				uni.navigateTo({
					url:"../../components/complaint/index"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.information{		
		.titles{
			padding: 30rpx;
			background: #fff;
			>view{
				float: left;
				position: relative;
				width: 330rpx;
				image{
					width: 100%;
				}
				text{
					position: absolute;
					right: 10rpx;
					bottom: 30rpx;
					padding: 5rpx 30rpx;
					border-radius: 20rpx;
					color: #fff;
					font-size: 24rpx;
				}
			}
			.qinj{
				margin-left: 28rpx;
				text{
					background: #26a2c6;
				}
			}
			.tous{
				text{
					background: #43a047;
				}
			}
		}
	}
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
					text:nth-child(2){
						float: right;
						font-weight: normal;
						color: #ccc;
					}
				}
				>text{
					color: #646464;
				}
			}
		}
		.box:last-child{
			border: 0;
		}
	}
	.fixed{
		position: fixed;
		right: 30rpx;
		bottom: 100rpx;
		width: 102rpx;
		height: 202rpx;
		image{
			width: 100%;
		}
	}
	.nonebox{
		text-align: center;
		image{
			width: 300rpx;
			margin: auto;
			margin-top: 160rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
