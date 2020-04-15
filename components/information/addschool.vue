<template>
	<view class="addpage">
		<view class="li cl">
			<text>学校名称</text>
			<input type="text" value="" placeholder="请输入学校名称" />
			<image src="../../static/img/wd_018.png" mode="widthFix"></image>
		</view>
		<view class="li cl" @click="gomap()">
			<text>学校定位</text>
			<image src="../../static/img/wd_018.png" mode="widthFix"></image>
			<image src="../../static/img/sy_015.png" class="dticon" mode="widthFix"></image>
		</view>
		<button type="primary" @click="goRouter()">下一步</button>
	</view>
</template>

<script>
	export default{
		methods:{
			gomap(){
				//地图定位
				uni.chooseLocation({
					success:(err)=>{
						console.log(err)
					}
				})
			},
			goRouter(){
				uni.navigateTo({
					url:"addchildmsg"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addpage{
		background: #fff;
		padding: 0 30rpx;
		.li{
			padding: 30rpx 0;
			text{
				float:left;
				width: 190rpx;
				color: #ccc;
			}
			input{
				float: left;
				width: 475rpx;
				border: 0;
				
			}
			image{
				width: 30rpx;
				float: right;
			}
			.dticon{
				width: 50rpx;
				margin-right: 30rpx;
			}
		}
		button{
			width: 100%;
			background: #FF6C00;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}
</style>
