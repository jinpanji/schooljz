<template>
	<view class="userinfopage">
		<view class="cl">
			<text class="txt">头像</text>
			<view class="touxiang">
				<image src="../../static/logo.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="cl">
			<text>姓名</text>
			<text>是是是</text>
		</view>
		<view class="cl">
			<text>性别</text>
			<text>男</text>
		</view>
		<view class="cl">
			<text>身份证号</text>
			<text>422525415584584565</text>
		</view>
		<view class="cl">
			<text>出生日期</text>
			<text>1990-01-01</text>
		</view>
		<view class="cl">
			<text>文化程度</text>
			<text>本科</text>
		</view>
		<view class="cl">
			<text>负责学校</text>
			<text>武汉光谷第二小学</text>
		</view>
		<view class="cl">
			<text>职位</text>
			<text>安全员</text>
		</view>
		<button type="primary">退出登录</button>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.userinfopage{
		padding: 0 20rpx;
		background: #fff;
		padding-bottom: 120rpx;
		>view{
			padding: 40rpx 0;
			border-bottom: 1px solid #ccc;
			text:first-child{
				float: left;
				color: #ccc;
				width: 220rpx;
			}
			.txt{
				line-height: 125rpx;
			}
			.touxiang{
				float: left;
				width: 125rpx;
				height: 125rpx;
				border-radius: 50%;
				overflow: hidden;
				border: 2px solid #fff;
				box-shadow: 0px 0px 10px 3px #ccc;
				image{
					width: 100%;
				}
			}
		}
	}
	button{
		background: #FF6C00;
		position: fixed;
		bottom: 0;
		width: 100%;
		left:0;
	}
</style>
