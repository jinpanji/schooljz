<template>
	<view class="page">
		<!-- <Rili /> -->
		<view class="cl">
			<wCalendar
				ref="calendar"
				:lunar="true" 
				:disabledBefore="true" 
				:disabledAfter="false" 
				@confirm="getResult">
			</wCalendar>
		</view>
		 
		<view class="jilu">
			<view class="boxlist">
				<h3><text>请选择请假车次</text></h3>
				<view class="list">
					<text class="check_index">早接</text>
					<text>晚送</text>
					<text>整天请假</text>
				</view>	
			</view>
			<view class="msgbox">
				<h3><text>请填写请假备注</text></h3>
				<textarea value="" placeholder="例:生病了" />
				<view class="tis">
					提示：当前请假共10天，请假20车次。
				</view>
			</view>
			<button type="primary">提交</button>
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
		position: relative;
		padding-bottom:100rpx ;
		h3{
			line-height: 100rpx;
			border-bottom: 1px solid #ccc;
			text{
				padding: 0 30rpx;
				border-left: 2px solid #FF6C00;
			}
		}
		.boxlist{
			padding:0 20rpx;
			background: #fff;
			margin: 20rpx 0;
			.list{
				text{
					display: inline-block;
					width: 215rpx;
					text-align: center;
					line-height: 60rpx;
					border-radius: 50rpx;
					border: 1px solid #FF6C00;
					color: #FF6C00;
					margin: 15rpx;
					font-size: 14px;
				}
				text:first-child{
					margin-left: 0;
				}
				text:last-child{
					margin-right: 0;
				}
				.check_index{
					background: #FF6C00;
					color: #fff;
				}
			}
		}
		.msgbox{
			padding:0 20rpx;
			background: #fff;
			h3{
				border: 0;
			}
			textarea{
				background: #eee;
				border-radius: 20rpx;
				border: 1px solid #ccc;
				height: 350rpx;
				padding:30rpx;
				box-sizing: border-box;
				margin-top: 30rpx;
			}
			.tis{
				color: red;
				line-height: 100rpx;
				font-size: 14px;
			}
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

</style>
