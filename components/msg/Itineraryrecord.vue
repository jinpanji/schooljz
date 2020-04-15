<template>
	<view class="page">
		<!-- <Rili /> -->
		<view class="cl">
			<wCalendar
				ref="calendar"
				:lunar="true" 
				:disabledBefore="false" 
				:disabledAfter="true" 
				@confirm="getResult">
			</wCalendar>
		</view>
		 
		<view class="jilu">
			<h3>行程记录</h3>
			<view class="boxlist">
				<view class="box">
					<view class="tit">
						早
					</view>
					<view class="times">
						<text>出发：8：00</text>
						<text>到达：8：30</text>
					</view>
					<image src="../../static/img/left.png" mode="widthFix"></image>
					<view class="businfo cl">
						<view>
							<image src="../../static/img/sy_004.png" mode="widthFix"></image>
							<text>现代森林小镇</text>
						</view>
						
						<view>
							<image src="../../static/img/sy_005.png" mode="widthFix"></image>
							<text>现代世贸中心</text>
						</view>
					</view>
				</view>
			</view>
			<button type="primary">返回</button>
		</view>
		
	</view>
</template>

<script>
	// import Rili from "../common/dark-calendar/dark-calendar.vue"
	import wCalendar from "../common/w-calendar/w-calendar.vue";
	export default{
		components:{
			// Rili,
			wCalendar
		},
		data(){
			return{
				result:{}
			}
		},
		mounted(){
			this.$refs.calendar.show();
		},
		methods:{
			getResult(val){
				console.log(val)
				// this.result=val;
				// this.$refs.calendar.show();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		// height: ;
	}
	.jilu{
		padding: 20rpx;
		position: relative;
		padding-bottom:100rpx ;
		h3{
			line-height: 100rpx;
			
		}
		.box{
			background: #fff;
			padding: 20rpx 0;
			border-radius: 10rpx;
			border: 1px solid #ccc;
			margin-bottom: 30rpx;
			position: relative;
			font-size: 30rpx;
			.tit{
				margin-left: 20rpx;
			}
			.times{
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				background: #eee;
				padding: 5rpx 0rpx;
				border-radius: 30rpx;
				text{
					margin: 0 20rpx;
				}
			}
			>image{
				width: 100%;
			}
		}
		button{
			background: #FF6C00;
			border-radius: 0;
			position: fixed;
			bottom: 0;
			width: 100%;
		}
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
</style>
