<template>
	<view class="report">
		<view class="">
			<view class="tit">
				车况
			</view>
		</view>
		<view class="cl">
			<text class="txt">刹车情况检查</text>
			<Select />
		</view>
		<view class="cl">
			<text class="txt">车灯情况检查</text>
			<Select />
			<h4>（前照、刹车、转向、防雾、示廊，报警）</h4>
		</view>
		<view class="cl">
			<text class="txt">轮胎检查</text>
			<Select />
			<h4>（花纹深度在合理范围内）</h4>
		</view>
		<view class="cl">
			<text class="txt">雨刮检查</text>
			<Select />
			<h4>（能刮干净，不影响视线）</h4>
		</view>
		<view class="cl">
			<text class="txt">后视镜检查</text>
			<Select />
			<h4>（无遮挡、破损、视线好）</h4>
		</view>
		<view class="cl">
			<text class="txt">车上是否有不安全的物品</text>
			<Select />
			<h4>（利器、易爆、易燃等）</h4>
		</view>
		<view class="cl">
			<text class="txt">救生锤</text>
			<Select />
			<h4>（至少3个，标志清除，可徒手启用）</h4>
		</view>
		<view class="cl">
			<text class="txt">灭火器</text>
			<Select />
			<h4>（2个，前后各一个，有效）</h4>
		</view>
		<view class="cl">
			<text class="txt">安全门</text>
			<Select />
			<h4>（可徒手开取）</h4>
		</view>
		<view class="" style="margin-top: 20rpx;">
			<view class="tit">
				司机安全
			</view>
		</view>
		<view class="cl">
			<text class="txt">饮酒检查</text>
			<Select />
		</view>
		<view class="cl">
			<text class="txt">鞋子检查</text>
			<Select />
			<h4>（是否违规脱靴或高跟鞋等）</h4>
		</view>
		<view class="cl">
			<text class="txt">疲劳情况检查</text>
			<Select />
		</view>
		<view class="cl">
			<text class="txt">情绪情况检查</text>
			<Select />
		</view>
		<view class="cl">
			<text class="txt">驾驶经验</text>
			<Select />
		</view>
		<view class="cl">
			<text class="txt">驾照是否过期</text>
			<Select />
		</view>
		<view class="cl">
			<text class="txt">健康情况检查</text>
			<Select />
		</view>
		<button type="primary">开启</button>
		
		<!-- 通知 -->
		<view class="shadow" v-show="false">
			<view class="box">
				<h3>通知</h3>
				<view>发车时间：8：00</view>
				<view>到达时间：8:30</view>
				<view>上车28人</view>
				<view>下车：28人</view>
				<view>滞留：0人</view>
				<button type="primary">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Select from "../common/select.vue"
	export default{
		components:{
			Select
		},
		data(){
			return{
				val1:1,
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.report{
		padding: 0 20rpx;
		background: #fff;
		>view{
			// position: relative;
			padding:20rpx 0;
			border-bottom: 1px solid #ccc;
			Select{
				float: right;
			}
			h4{
				color:#ccc;
				font-size: 30rpx;
			}
		}
		>button{
			width: 100%;
			// position: fixed;
			// bottom: 0;
			// left:0 ;
			margin-top: 40rpx;
		}
	}
	button{
		background: #FF6C00;
	}
	.shadow{
		position:fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background: rgba(0,0,0,.5);
		z-index: 1000000;
		.box{
			border-radius: 20rpx;
			background: #fff;
			width: 560rpx;
			margin: auto;
			margin-top: 200rpx;
			padding: 40rpx;
			line-height: 74rpx;
			h3{
				text-align: center;
				font-weight: bold;
				line-height: 60rpx;
			}
			button{
				margin-top: 30rpx;
				border-radius: 50rpx;
			}
		}
	}
</style>
