<template>
	<view class="info_page">
		<view class="title">
			早接上车
		</view>
		<text>2020年1月13日 19:46</text>
		<view class="msg">
			您管理的线路xxx(起点)--yy(终点)，有xxx(孩子名)请假，共提交请假z天，请假y车次！该车次未来上车人数为gg（实际减1）,此信息不作为最终确定人数。
		</view>
		<!-- <button>确认</button> -->
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.info_page{
		padding:0 30rpx;
		font-size: 28rpx;
		.title{
			text-align: center;
			line-height:85rpx ;
			font-size: 36rpx;
			font-weight: bold;
		}
		>text{
			color: #ccc;
			line-height: 54rpx;
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
</style>
