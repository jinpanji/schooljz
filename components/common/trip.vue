<template>
	<view class="trip_page">
		<view class="cl">
			<h3 class="cl" @click="lookDetails(schoolInfo.isFunction?schoolInfo.isFunction:'',schoolInfo.id?schoolInfo.id:'')">
				<image src="../../static/img/img/sy_003.png" mode="widthFix"></image>
				<text>上学</text>
				<view class="dzmsg">
					{{schoolInfo.boardSiteName?'('+schoolInfo.boardSiteName:''}}
					{{schoolInfo.takeSiteName?'-'+schoolInfo.takeSiteName:''}}
					{{schoolInfo.lineName?'-'+schoolInfo.lineName+')':''}}
				</view>
			</h3>
			<view class="msgs">
				<i></i>
				<text>上车时间：{{schoolInfo.boardTime?schoolInfo.boardTime:''}}</text>
				<view>
					上车地点：{{schoolInfo.boardSiteName?schoolInfo.boardSiteName:''}}
				</view>
			</view>
			<view class="msgs">
				<i></i>
				<text>下车时间：{{schoolInfo.takeTime?schoolInfo.takeTime:''}}</text>
				<text class="red" v-if="schoolInfo.isAbnormal==1">未检测到下车，行程异常，请联系安全员老师！</text>
				<text class="green" v-if="schoolInfo.isAbnormal==2">已请假</text>
				<!-- <view>
					上车地点：现在森林小镇公交站
				</view> -->
			</view>
			<h3 class="cl" @click="lookDetails(homeInfo.isFunction?homeInfo.isFunction:'',homeInfo.id?homeInfo.id:'')">
				<image src="../../static/img/img/sy_004.png" mode="widthFix"></image>
				<text>放学</text>
				<view class="dzmsg">
					{{homeInfo.boardSiteName?'('+homeInfo.boardSiteName:''}}
					{{homeInfo.takeSiteName?'-'+homeInfo.takeSiteName:''}}
					{{homeInfo.lineName?'-'+homeInfo.lineName+')':''}}
				</view>
			</h3>
			<view class="msgs">
				<i></i>
				<text>上车时间：{{homeInfo.boardTime?homeInfo.boardTime:''}}</text>
				<text class="green" v-if="homeInfo.isAbnormal==2">已请假</text>
			</view>
			<view class="msgs">
				<i></i>
				<text>下车时间：{{homeInfo.takeTime?homeInfo.takeTime:''}}</text>
				<text class=""  v-if="homeInfo.isFunction==0">暂未下车</text>
				<text class="red" v-if="homeInfo.isAbnormal==1&&homeInfo.isFunction==1">未检测到下车，行程异常，请联系安全员老师！</text>
				<!-- <view>
					上车地点：现在森林小镇公交站
				</view> -->
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:['homeInfo','schoolInfo'],
		methods:{
			lookDetails(status,id){
				if(status){
					this.$emit("goReport",id)
				}else{
					uni.showToast({
						icon:"none",
						title:"行程还未结束，请结束后再查看报告！"
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.trip_page{
		padding:40rpx;
		>view{
			border-left: 1px solid #ccc;
			h3{
				margin-left: -20rpx;
				position: relative;
				overflow: hidden;
				min-height: 40rpx;
				image{
					position: absolute;
					top: 0rpx;
					width: 40rpx;
				}
				text{
					font-weight: bold;
					margin-left: 60rpx;
					position: absolute;
					top: -5rpx;
				}
				view{
					color: #666;
					padding: 0 50rpx;
					font-size: 12px;
					line-height: 70rpx;
					margin-bottom: 10rpx;
					margin-top: 35rpx;
				}
			}
			.msgs{
				padding:0 30rpx;
				position: relative;
				font-size: 14px;
				line-height: 50rpx;
				padding-bottom: 20rpx;
				i{
					position: absolute;
					left: -10rpx;
					top: 20rpx;
					width: 20rpx;
					height: 20rpx;
					background: #ccc;
					border-radius: 50%;
				}
				.red{
					color: red;
				}
				.green{
					color: green;
				}
			}
		}
	}
</style>
