<template>
	<view class="selectbox" @click.stop="checkShow($event)">
		<text>{{val1==1?'合格':'不合格'}}</text>
		<image src="../../static/img/sj.png" mode="widthFix"></image>
		<view class="opts" v-show="isShow">
			<h3 @click="changeVal(1)">合格</h3>
			<h3 @click="changeVal(0)">不合格</h3>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				val1:1,
				isShow:false
			}
		},
		methods:{
			checkShow(){
				this.isShow=!this.isShow
			},
			changeVal(val){
				this.val1=val
			}
		}
	}
</script>

<style lang="scss" scoped>
	.selectbox{
		position: relative;
		padding:5rpx 40rpx;
		background: #eee;
		color: #666;
		border-radius: 50rpx;
		height:50rpx;
		line-height: 50rpx;
		// overflow: hidden;
		image{
			width: 20rpx;
			float: right;
			margin-top: 20rpx;
		}
		.opts{
			position: absolute;
			bottom: -100rpx;
			background: #eee;
			line-height: 80rpx;
			width: 100%;
			z-index: 100;
			left: 0;
			text-align: center;
			border-radius: 40rpx;
		}
	}
</style>
