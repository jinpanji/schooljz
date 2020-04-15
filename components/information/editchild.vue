<template>
	<view class="editchild">
		<view class="information">
			<view class="cl">
				<text>学校名</text>
				<view class="">光谷第二小学</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
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
				<text>年级</text>
				<view class="">一年级，一班</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
			<view class="cl">
				<text>出生年月</text>
				<view class="">2016-01-01</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
			<view class="cl">
				<text>有效期</text>
				<view class="red">2020-12-30</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
		</view>		
		<!-- 选择路线 -->
		<view class="selection_route">
			<view class="tit">选择路线</view>
			<Buslist :list="list"/>
		</view>
		<view class="pick cl">
			<view class="tit">接送</view>
			<view class="box zao">
				<!-- 早接 -->
				<view class="tits">
					<image src="../../static/img/img/wd_021.png" mode="widthFix"></image>
					<text>早接</text>
				</view>
				<view class="money">
					998.00元
				</view>
			</view>
			<view class="box wan">
				<!-- 晚送 -->
				<view class="tits">
					<image src="../../static/img/img/wd_022.png" mode="widthFix"></image>
					<text>晚送</text>
				</view>
				<view class="money">
					998.00元
				</view>
			</view>
			<view class="box quan">
				<!-- 全包 -->
				<view class="tits">
					<image src="../../static/img/img/wd_023.png" mode="widthFix"></image>
					<text>全包</text>
				</view>
				<view class="money">
					998.00元
				</view>
			</view>
		</view>
		<button type="primary" class="preservation">保存</button>
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
				list:['光谷大道五里湾','光谷大道金融港','光谷大三李陈','光谷大道关南村','光谷大道当代国际花园','光谷大道现代世贸中心']
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
				width: 162rpx;		
				color: #969696;
			}
			view{
				float: left;
				width: 510rpx;
			}
			.red{
				color: #fe0000;
			}
			image{
				float: right;
				width: 20rpx;
			}
		}
		>view:last-child{
			border: 0;
		}
	}
	.selection_route,.pick{
		background: #fff;
		margin-top: 20rpx;
		padding: 30rpx;
	}
	.pick{
		margin-bottom: 20rpx;
		.box{
			width: 210rpx;
			height: 148rpx;
			float: left;
			margin-left: 20rpx;
			color: #fff;
			border-radius: 20rpx;
			image{
				width: 40rpx;
				margin-left: 20rpx;
				margin-right: 10rpx;
				margin-top: 10rpx;
			}
			.tits{
				padding: 10rpx 0;
				font-size: 12px;
				text-align: left;
			}
			.money{
				text-align: center;
			}
		}
		.zao{
			background: linear-gradient(left top,#4eaa53,#73ca7c);
		}
		.wan{
			background: linear-gradient(left top,#3eabd4,#6fc8ea);
		}
		.quan{
			background: linear-gradient(left top,#f46d2b,#ff8c4f);	
		}
	}
	.preservation{
		width: 100%;
		background: #FF6C00;
		border-radius: 0;
	}
	button:after{
		border: 0;
	}
</style>
