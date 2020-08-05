<template>
	<view class="page">
		<image src="../../static/img/img/wd_028.png" mode="widthFix"></image>
		<view>{{str}}</view>
		<!-- <view>请耐心等待管理员开启线路</view> -->
		<button type="primary" @click="isOk()">确认</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				str:""
			}
		},
		onLoad(opt){
			console.log(opt.type)
			let str=""
			let addchildinfo=uni.getStorageSync('addchildinfo')
			addchildinfo=JSON.parse(addchildinfo)
			console.log(addchildinfo)
			if(opt.type==1){
				// 学校未录入
				str="您申请的"+addchildinfo.schoolName+"学校，暂未开通，请耐心等待平台开通。"
			}else{
				str="您申请的"+addchildinfo.schoolName+"学校，未匹配到合适的线路，请耐心等待平台开通。"
			}
			this.str=str
		},
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
