<template>
	<view class="share_page">
		<image  src="../../static/img/img/wd_048.png" mode="widthFix"></image>
		<view class="box">
			<view class="head">
				<image @click="goBack()" src="../../static/img/dl_002.png" mode="widthFix"></image>
				<text>邀请奖励</text>
			</view>
			<view class="numbox">
				<h4>累计</h4>
				<h3>15430人</h3>
				<image src="../../static/img/img/wd_049.png" mode="widthFix"></image>
			</view>
			<view class="listbox">
				<view class="li">
					<view class="">
						用户：xxxxx，已报名，获得奖励xxx元
					</view>
					<text>2019-12-04 15:04:30</text>
				</view>
				<view class="msg" @click="msgshow=true">
					《 奖励规则 》
				</view>
			</view>
		</view>
		<!-- 奖励规则提示框 -->
		<view class="shadow" v-show="msgshow">
			<view class="box">
				<view class="tits">
					奖励规则
				</view>
				<view class="txt">
					根据会员层级、预定方式及产品不同，所获取的积分有所不同。芒果网会员的层级分为四个级别，那就是空间的扩散到室内开发你看撒旦法可能萨克DNF开始到。，
				</view>
				<button type="primary" @click="msgshow=false">我知道了</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				msgshow:false,
			}
		},
		methods:{
			goBack(){
				uni.switchTab({
					url:"../../pages/my/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share_page{
		position: relative;
		image{
			width: 100%;
		}
		.box{
			position: absolute;
			top:0;
			left: 0;
			width: 100%;
			// padding: 0 30rpx;
			box-sizing: border-box;
		}
		.head{
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #FFF;
			margin-top: 30rpx;
			padding: 0 30rpx;
			image{
				width: 20rpx;
				float: left;
				margin-top: 37rpx;
			}
		}
		.numbox{
			color: #fff;
			position: relative;
			padding: 0 30rpx;
			padding-top: 40rpx;
			text-align: center;
			h4{
				font-size: 14px;
			}
			h3{
				font-size: 20px;
				line-height: 84rpx;
			}
			image{
				width: 200rpx;
				position: absolute;
				right: 20rpx;
				top: 0;
			}
		}
		.listbox{
			margin-top: 40rpx;
			border-top-right-radius: 20rpx;
			border-top-left-radius: 20rpx;
			background: #fff;
			padding:0 30rpx;
			padding-bottom: 50rpx;
			min-height: 950rpx;
			position: relative;
			.li{
				padding: 30rpx 0;
				border-bottom: 1px solid #ccc;
				view{
					line-height: 60rpx;
					font-size: 16px;
				}
				text{
					color: #666;
					font-size: 12px;
				}
			}
			.msg{
				position: absolute;
				bottom: 30rpx;
				color: red;
				text-align: center;
				width: 100%;
				left: 0;
			}
		}
	}
	.shadow{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		background: rgba(0,0,0,.5);
		z-index: 10;
		.box{
			padding: 30rpx;
			background: #fff;
			border-radius: 30rpx;
			width: 600rpx;
			margin-left: 80rpx;
			margin-top: 150rpx;
			.tits{
				text-align: center;
				line-height: 90rpx;
			}
			.txt{
				color: #666;
				text-indent: 20rpx;
				line-height: 54rpx;
			}
			button{
				border-radius: 50rpx;
				margin-top: 60rpx;
				background: #FF6C00;
			}
		}
	}
</style>
