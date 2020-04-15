<template>
	<view class="editparent">
		<view class="information">			
			<view class="cl">
				<text>姓名</text>
				<view class="">张三啊</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
			<view class="cl">
				<text>性别</text>
				<view class="">男</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
			<view class="cl">
				<text>关系</text>
				<view class="">爸爸</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
			<view class="cl">
				<text>联系人号码</text>
				<view class="">15487584584</view>
			</view>
			<view class="cl codebox">
				<text>验证码</text>
				<input type="text" value="" />
				<button type="primary" class="getcode">获取验证码</button>
			</view>
		</view>		
		<view class="btns">
			<button type="primary">停用</button>
			<button type="primary" class="preservation">保存</button>
		</view>
		<!-- 提示框 -->
		<view class="shadow"  v-if="boxShow">
			<view class="box">
				<image v-if="isSuccess" src="../../static/img/img/tc_001.png" mode="widthFix"></image>
				<image v-else src="../../static/img/img/tc_002.png" mode="widthFix"></image>
				<text>{{shadowStr}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import Buslist from '../../components/common/buslist.vue'
	export default {	
		components:{
			Buslist
		},
		data(){
			return{
				list:['光谷大道五里湾','光谷大道金融港','光谷大三李陈','光谷大道关南村','光谷大道当代国际花园','光谷大道现代世贸中心'],
				isSuccess:true,
				boxShow:false,
				shadowStr:"保存成功！"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tit{
		padding: 0 20rpx;
	}
	.information{
		padding: 0 30rpx;		
		background: #fff;
		>view{
			padding: 38rpx 0;
			border-bottom: 1px solid #e7e6ec;
			text{
				float: left;
				width: 215rpx;		
				color: #969696;
			}
			view{
				float: left;
				width: 460rpx;
			}
			.red{
				color: #fe0000;
			}
			image{
				float: right;
				width: 20rpx;
			}
			input{
				width: 260rpx;
				float: left;
			}
		}
		>view:last-child{
			border: 0;
		}
	}
	.codebox{
		line-height: 70rpx;
	}
	.btns{
		width: 100%;
		position: fixed;
		bottom: 0;
		// height: 100rpx;
		button{
			width: 50%;
			float: left;
			border-radius: 0;
			background: #F0AD4E;
			margin: 0;
		}
		.preservation{
			background: #FF6C00;
		}
	}
	
	button:after{
		border: 0;
	}
	.getcode{
		color: #FF6C00;
		border:1px solid #FF6C00;
		background: #fff;
		float: right;
		font-size: 12px;
		border-radius: 20rpx;
	}
	.shadow{
		position: fixed;
		z-index: 100000;
		background: rgba(0,0,0,.5);
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		.box{
			width: 200rpx;
			padding: 60rpx 120rpx;
			text-align: center;
			background: #fff;
			margin: auto;
			margin-top: 100rpx;
			border-radius: 20rpx;
			image{
				width: 150rpx;
			}
			text{
				font-size: 16px;
				font-weight: bold;
				display: inline-block;
				width: 100%;
				margin-top: 30rpx;
			}
		}
	}
</style>
