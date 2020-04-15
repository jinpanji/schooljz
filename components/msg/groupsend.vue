<template>
	<view class="sendbox">
		<view class="msgbox">
			<view class="tit">编辑信息</view>
			<textarea value="" placeholder="请输入群发内容(最多500字)" />
		</view>
		<view class="groupbox">
			<view class="tit">选择接收群体</view>
			<Buslist :list="list1" />
			<Buslist :list="list1" />
		</view>
	</view>
</template>

<script>
	import Buslist from '../common/buslist.vue'
	export default{
		components:{
			Buslist
		},
		data(){
			return{
				list1:['光谷大道吴家湾','光谷大道金融港','光谷大三李成','光棍大道关南村',"光谷大道国际花园",'光谷大道凌家山','光谷大道现代世贸中心','民族大道光谷广场']
			}
		},
	}
</script>

<style lang="scss" scoped>
	.sendbox{
		.msgbox{
			padding: 20rpx;
			margin-bottom: 20rpx;
		}
		>view{
			background: #FFFFFF;
		}
		textarea{
			height: 300rpx;
			border: 1px solid #CCCCCC;
			background: #eee;
			border-radius: 10rpx;
			padding: 10rpx;
			box-sizing: border-box;
		}
		
	}
	.groupbox{
		padding-top: 20rpx;
		.tit{
			margin-left: 20rpx;
		}
	}
</style>
