<template>
	<view class="page">
		<image src="../../static/img/img/wd_028.png" mode="widthFix"></image>
		<view>您的申请已提交</view>
		<view>请耐心等待管理员开启线路</view>
		<button type="primary" @click="isOk()">确认</button>
	</view>
</template>

<script>
	export default{
		methods:{
			isOk(){
				uni.switchTab({
					url:"../../pages/my/index"
				})
			}	
		}
	}
</script>

<style lang="scss" scope>
	.page{
		background: #fff;
		text-align: center;
		padding: 215rpx 40rpx;
		padding-bottom: 400rpx;
		image{
			width: 230rpx;
		}
		view{
			line-height: 60rpx;
		}
		button{
			margin-top: 20rpx;
			background: #FF6C00;
			border-radius: 50rpx;
		}
		button:after{
			border:0;
		}
	}
</style>
