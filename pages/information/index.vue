<template>
	<view class="information">
		<!-- 通知列表 -->
		<view class="list_box footerbox"v-if="!isNone">
			<view class="box cl" @click="goLeave()">
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
					<text>报名已我嫩文件恩人叫我二年级胃口就让你就问人家口味提</text>
				</view>
			</view>
		</view>
		
		<!-- 悬浮框 -->
		<!-- <view class="fixed" @click="goGroup()">
			<image src="../../static/img/xxzx_001.png" mode="widthFix"></image>
		</view> -->
		
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
				imgList:[
					require("../../static/img/img/xxzx_001.png"),
					require("../../static/img/img/xxzx_003.png"),
					require("../../static/img/img/xxzx_004.png"),
					require("../../static/img/img/xxzx_010.png"),
					require("../../static/img/img/xxzx_008.png"),
					require("../../static/img/img/xxzx_013.png"),
					require("../../static/img/img/xxzx_005.png"),
					require("../../static/img/img/xxzx_006.png"),
					require("../../static/img/img/xxzx_012.png"),
					require("../../static/img/img/xxzx_014.png"),
					require("../../static/img/img/xxzx_007.png"),
					require("../../static/img/img/xxzx_011.png"),
					require("../../static/img/img/xxzx_002.png"),
					require("../../static/img/img/xxzx_009.png")//投诉回复
				],
				pageNum:1,
				pageSize:10
			}
		},
		methods:{
			goLeave(){
				//今日请假
				uni.navigateTo({
					url:"../../components/info/index"
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
			getmsgList(){
				this.$http.post("puNews/list",{
					parentId:1,
					pageNum:this.pageNum,
					pageSize:this.pageSize
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
					display: block;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
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
