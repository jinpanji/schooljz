<template>
	<view class="info_page">
		<view class="title">
			投诉信息
		</view>
		<text>2020年1月13日 19:46</text>
		<view class="msg">
			您管理的线路xxx(起点)--yy(终点)，有xxx(孩子名)请假，共提交请假z天，请假y车次！该车次未来上车人数为gg（实际减1）,此信息不作为最终确定人数。
		</view>
		<view class="box">
			<view class="tit">
				投诉人信息
			</view>
			<view class="">
				光谷第二小学，李小彭，线路1
			</view>
		</view>
		<view class="box">
			<view class="tit">
				投诉回复
			</view>
			<textarea value="" placeholder="请输入投诉回复内容" />
		</view>
		<button>回复</button>
	</view>
</template>

<script>
	export default{
		
	}
</script>

<style lang="scss" scoped>
	.info_page{
		>view{
			background: #fff;
			padding:20rpx 30rpx;
			font-size: 28rpx;
		}
		
		.title{
			text-align: center;
			line-height:85rpx ;
			font-size: 36rpx;
			font-weight: bold;
		}
		>text{
			color: #ccc;
			line-height: 54rpx;
			width: 100%;
			background: #fff;
			display: block;
			box-sizing: border-box;
			padding: 0 20rpx;
		}
		.msg{
			line-height: 58rpx;
		}
	}
	button:after{
		border: 0;
	}
	button{
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius:0;
		background: #ff6d00;
		color: #fff;
	}
	.box{
		margin-top: 30rpx;
		// padding: 20rpx;
		textarea{
			padding: 20rpx;
			border: 1px solid #ccc;
			background: #eee;
			border-radius: 10rpx;
			margin-top: 20rpx;
			height: 300rpx;
			box-sizing: border-box;
		}
	}
</style>
