<template>
	<view class="selectbox" @click.stop="checkShow($event)">
		<!-- <view class="cl"  > -->
			<text>{{list[val1]}}</text>
			<image src="../../static/img/sj.png" mode="widthFix"></image>
			<view class="opts" v-show="isShow">
				<h3 v-for="(item,index) in list" @click="changeVal(index)">{{item}}</h3>
				<!-- <h3 @click="changeVal(0)">不合格</h3> -->
			</view>
		<!-- </view> -->
		
	</view>
</template>

<script>
	export default{
		props:["list","checknum","indexNum"],
		data(){
			return{
				val1:null,
				isShow:false
			}
		},
		created(){
			this.val1=this.$props.checknum
		},
		methods:{
			checkShow(){
				this.isShow=!this.isShow
			},
			changeVal(val){
				this.val1=val
				let data={}
				data.val=val
				data.index=this.$props.indexNum
				this.$emit("changNum",data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.selectbox{
		// width: ;
		position: relative;
		padding:0rpx 40rpx;
		background: #eee;
		color: #666;
		border-radius: 50rpx;
		height:50rpx;
		line-height: 50rpx;
		font-size: 12px;
		// overflow: hidden; 
		image{
			width: 20rpx;
			float: right;
			margin-top: 20rpx;
		}
		.opts{
			position: absolute;
			// bottom: -150rpx;
			top: 60rpx;
			background: #eee;
			line-height: 80rpx;
			width: 100%;
			z-index: 100;
			left: 0;
			text-align: center;
			border-bottom-right-radius: 40rpx;
			border-bottom-left-radius: 40rpx;
			h3{
				border-top: 1px solid #999;
			}
		}
	}
</style>
