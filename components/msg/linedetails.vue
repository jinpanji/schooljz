<template>
	<view class="details">
		<view class="carbox">
			<view class="tits cl">
				<text class="time">平二</text>
				<text>预计：28人</text>
			</view>
			<view class="status cl">
				<image class="bjimg" src="../../static/img/left.png" mode="widthFix"></image>
				<image class="car" src="../../static/img/sy_006left.png" mode="widthFix"></image>
			</view>
			<view class="businfo cl">
				<view>
					<image src="../../static/img/sy_004.png" mode="widthFix"></image>
					<text>现代世贸中心</text>
				</view>
				<view>
					<image src="../../static/img/sy_005.png" mode="widthFix"></image>
					<text>现代世贸中心</text>
				</view>
			</view>
			<view class="cl infos">
				<text>发车时间：8:00</text>
				<text>预计到达：8:00</text>
				<view class="">
					<text>车内人数：28</text>
					<switch @change="switch2Change" />
				</view>
			</view>			
		</view>
		<view class="txbox">
			<view class="tit">
				车内人数
			</view>
			<view class="box cl">
				<view class="tx">
					<view v-show="false"></view>
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view class="tx">
					<view></view>
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view class="tx">
					<view></view>
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view class="tx">
					<view></view>
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view class="tx">
					<view></view>
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view class="tx">
					<view></view>
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view class="tx">
					<view></view>
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view class="tx">
					<view></view>
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view class="tx">
					<view></view>
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view class="tx">
					<view></view>
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view class="tx">
					<view></view>
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view class="tx">
					<view></view>
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<button type="primary" @click="goreport()">填写运行报告</button>
		
		<view class="shadow" v-if="show">
			<view class="box">
				<view class="tx">
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view>
					姓名：张三
				</view>
				<view>班级：一年级一班</view>
				<view>上车时间：8:00</view>
				<view>下车时间：8:00</view>
				<view>
					<text>是否听话：</text>
					<switch checked="true" @change="changeSwitch" />
				</view>
				<view>
					 <label class="radio"><radio value="r1" checked="true" />打闹离座</label>
					<label class="radio"><radio value="r2" />危品携带</label>
					<label class="radio"><radio value="r2" />其他</label>
				</view>
				<textarea value="" placeholder="请输入" />
				<button type="primary" @click="show=false">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:false
			}
		},
		methods:{
			switch2Change(val){
				console.log(val)
			},
			goreport(){
				uni.navigateTo({
					url:"report"
				})
			},
			changeSwitch(){
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.carbox{
		width: 700rpx;
		margin:20rpx auto;
		background: #fff;
		border-radius: 20rpx;
		border: 1px solid #ccc;
		.tits{
			padding: 30rpx;
			text:nth-child(1){
				float: left;
				padding: 0 22rpx;
				border-left: 2px solid #ec6400;
				font-size: 30rpx;
				font-weight: bold;
			}
			text:nth-child(2){
				float: right;
				padding: 0 22rpx;
				background: #f0f0f0;
				border-radius: 20rpx;
				font-size: 28rpx;
			}
		}
		.status{
			// overflow: hidden;
			position: relative;
			margin-bottom: 30rpx;
			.bjimg{
				width: 100%;
			}
			
		}
		.car{
			width: 150rpx;
			position: absolute;
			top: -15rpx;
			left: 0;
		}
		.businfo{
			>view{
				float: left;
				width: 50%;
				font-size: 28rpx;
				margin: 10rpx 0;
				padding: 0 29rpx;
				box-sizing: border-box;
				image{
					width: 80rpx;
					margin-right: 20rpx;
				}
			}
		}
		.infos{
			padding:20rpx;
			border-top: 1px solid #ccc;
			line-height: 80rpx;
			text{
				float: left;
			}
			switch{
				float: left;
				margin-left: 40rpx;
			}
			text:nth-child(2){
				float: right;
			}
		}
	}
	.txbox{
		padding: 20rpx 10rpx;
		background: #fff;
		padding-bottom: 100rpx;
		.tit{
			margin-left: 20rpx;
		}
		.tx{
			margin: 20rpx;
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;		
			overflow: hidden;
			float: left;
			position: relative;
			image{
				width: 100%;
			}
			view{
				background: rgba(255,255,255,.8);
				position: absolute;
				top: 0;
				right: 0;
				bottom:0;
				left: 0;
				margin: auto;
			}
		}
	}
	>button{
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
	}
	button{
		background: #FF6C00;
	}
	.shadow{
		position:fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background: rgba(0,0,0,.5);
		z-index: 1000000;
		.box{
			border-radius: 20rpx;
			background: #fff;
			width: 560rpx;
			margin: auto;
			margin-top: 100rpx;
			padding: 40rpx;
			line-height: 60rpx;
			.tx{
				width: 126rpx;
				height: 126rpx;
				margin: auto;
				border-radius: 50%;
				overflow: hidden;
				margin-bottom: 30rpx;
			}
			image{
				width: 100%;
			}
			button{
				margin-top: 30rpx;
				border-radius: 50rpx;
			}
			textarea{
				background: #ccc;
				height: 200rpx;
				width: 100%;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
			}
		}
	}
</style>
