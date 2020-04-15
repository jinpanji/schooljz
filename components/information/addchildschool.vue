<template>
	<view class="pages">
		<view class="head cl">
			<image src="../../static/img/dl_002.png" mode="widthFix" @click="goBack()"></image>
			<input type="text" value="" placeholder="请输入学校名称" />
			<button type="primary">搜索</button>
		</view>
		<!-- 搜索有结果 -->
		<view class="schoolbox cl" v-if="schoolShow">
			<view class="listbox">
				<view class="li" v-for="(item,index) in list">
					<text>光谷第{{item}}小学</text>
				</view>
			</view>
			<button type="primary">下一步</button>
		</view>
		<!-- 搜索结果 -->
		<view class="school_null" v-else>
			<image src="../../static/img/wd_027.png" mode="widthFix"></image>
			<view>暂无此学校收录</view>
			<button type="primary" @click="addschool()">添加学校</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[1,2,3,4,5,6,7,8,9,10,11,12,13],
				schoolShow:false,
			}
		},
		methods:{
			addschool(){
				//搜索无学校数据，前去添加学校
				uni.navigateTo({
					url:"addschool"
				})
			},
			goBack(){
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages{		
		background: #fb832c;
	}
	button{
		background: #fb832c;
	}
	.head{
		padding: 50rpx 30rpx;	
		padding-top: 150rpx;
		image{
			float: left;
			width: 30rpx;
			margin-top: 10rpx;
		}
		input{
			float: left;
			width:530rpx;
			text-align: center;
			padding: 10rpx;
			background: #fff;
			border: 0;
			border-radius: 50rpx;
			margin-left: 30rpx;
		}
		button{
			width: 90rpx;
			float: right;
			color: #fff;
			padding: 0;
			height: 68rpx;
			line-height: 68rpx;
			font-size: 16px;
			text-align: right;
		}
		button:after{
			border: 0;
		}
	}
	.schoolbox,.school_null{
		height: 1060rpx;
		background: #fff;
		border-top-right-radius:30rpx ;
		border-top-left-radius:30rpx ;
	}
	.schoolbox{
		.listbox{
			height: 920rpx;
			overflow-x: hidden;
			overflow-y:scroll;
			padding: 20rpx 30rpx;
			.li{
				padding:30rpx 0;
				border-bottom:1px solid #e6e6e6;
			}
		}
		button{
			color: #fff;
			// background: #FF6C00;
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}
	.school_null{
		overflow: hidden;
		image{
			display: block;
			width: 230rpx;
			margin: auto;
			margin-top: 150rpx;
		}
		view{
			text-align: center;
			margin: 20rpx 0;
		}
		button{
			width: 680rpx;
		}
	}
</style>
