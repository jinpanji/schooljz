<template>
	<view class="report">
		<view class="">
			<view class="tit">
				车况
			</view>
		</view>
		<view class="cl">
			<text class="txt">刹车情况检查</text>
			<view class="status">
			{{info.brake==1?'不合格':'合格'}}
			</view>
		</view>
		<view class="cl">
			<text class="txt">车灯情况检查</text>
			<view class="status">
				{{info.lamp==1?'不合格':'合格'}}
			</view>
			<h4>（前照、刹车、转向、防雾、示廊，报警）</h4>
		</view>
		<view class="cl">
			<text class="txt">轮胎检查</text>
			<view class="status">
				{{info.tire==1?'不合格':'合格'}}
			</view>
			<h4>（花纹深度在合理范围内）</h4>
		</view>
		<view class="cl">
			<text class="txt">雨刮检查</text>
			<view class="status">
				{{info.rainBrake==1?'不合格':'合格'}}
			</view>
			<h4>（能刮干净，不影响视线）</h4>
		</view>
		<view class="cl">
			<text class="txt">后视镜检查</text>
			<view class="status">
				{{info.mirror==1?'不合格':'合格'}}
			</view>
			<h4>（无遮挡、破损、视线好）</h4>
		</view>
		<view class="cl">
			<text class="txt">车上是否有不安全的物品</text>
			<view class="status">
				{{info.unsafeIterms==1?'不合格':'合格'}}
			</view>
			<h4>（利器、易爆、易燃等）</h4>
		</view>
		<view class="cl">
			<text class="txt">救生锤</text>
			<view class="status">
				{{info.lifesavingHammer==1?'不合格':'合格'}}
			</view>
			<h4>（至少3个，标志清除，可徒手启用）</h4>
		</view>
		<view class="cl">
			<text class="txt">灭火器</text>
			<view class="status">
				{{info.fireExtinguisher==1?'不合格':'合格'}}
			</view>
			<h4>（2个，前后各一个，有效）</h4>
		</view>
		<view class="cl">
			<text class="txt">安全门</text>
			<view class="status">
				{{info.emergencyDoor==1?'不合格':'合格'}}
			</view>
			<h4>（可徒手开取）</h4>
		</view>
		<view class="" style="margin-top: 20rpx;">
			<view class="tit">
				司机安全
			</view>
		</view>
		<view class="cl">
			<text class="txt">饮酒检查</text>
			<view class="status">
				{{info.isDrinkWine==1?'不合格':'合格'}}
			</view>
		</view>
		<view class="cl">
			<text class="txt">鞋子检查</text>
			<view class="status">
				{{info.shoes==1?'不合格':'合格'}}
			</view>
			<h4>（是否违规脱靴或高跟鞋等）</h4>
		</view>
		<view class="cl">
			<text class="txt">疲劳情况检查</text>
			<view class="status">
				{{info.fatigue==1?'不合格':'合格'}}
			</view>
		</view>
		<view class="cl">
			<text class="txt">情绪情况检查</text>
			<view class="status">
				{{info.emotion==1?'不合格':'合格'}}
			</view>
		</view>
		<view class="cl">
			<text class="txt">驾驶经验</text>
			<view class="status">
				{{info.drivingExperience==1?'不合格':'合格'}}
			</view>
		</view>
		<!-- <view class="cl">
			<text class="txt">驾照是否过期</text>
			<view class="status">
				{{info.==1?'不合格':'合格'}}
			</view>
		</view> -->
		<view class="cl">
			<text class="txt">健康情况检查</text>
			<view class="status">
				{{info.healthy==1?'不合格':'合格'}}
			</view>
		</view>
		<view class="cl">
			<text class="txt">急启情况</text>
			<view class="status">
				{{info.urgentStart==1?'不合格':'合格'}}
			</view>
		</view>
		<view class="cl">
			<text class="txt">急刹车</text>
			<view class="status">
				{{info.brakes==1?'不合格':'合格'}}
			</view>
		</view>
		<view class="cl">
			<text class="txt">急打方向</text>
			<view class="status">
				{{info.rushDirection==1?'不合格':'合格'}}
			</view>
		</view>
		
		<view class="cl">
			<text class="txt">激烈行驶</text>
			<view class="status">
				{{info.drasticDriving==1?'不合格':'合格'}}
			</view>
		</view>
		
		<view class="cl">
			<text class="txt">开车过程中打电话</text>
			<view class="status">
				{{info.drivingCalling==1?'不合格':'合格'}}
			</view>
		</view>
		<view class="cl">
			<text class="txt">开车过程中抽烟</text>
			<view class="status">
				{{info.drivingSmoking==1?'不合格':'合格'}}
			</view>
		</view>
		
		<button type="primary">确定</button>
		
		<!-- 通知 -->
		<!-- <view class="shadow" v-show="false">
			<view class="box">
				<h3>通知</h3>
				<view>发车时间：8：00</view>
				<view>到达时间：8:30</view>
				<view>上车28人</view>
				<view>下车：28人</view>
				<view>滞留：0人</view>
				<button type="primary">确认</button>
			</view>
		</view> -->
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
				info:{},
				id:null
			}			
		},
		onLoad(e){
			this.id=e.id
			this.init()
		},
		methods:{
			init(){
				this.$http.post("puboardreport/mainList",{
					lineRecordId:this.id
				}).then(res=>{
					if(res.code==100){
						this.info=res.info
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.report{
		padding: 0 20rpx;
		background: #fff;
		position: relative;
		.tit{
			padding-left: 20rpx;
		}
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
			.status{
				float: right;
				padding: 5rpx 30rpx;
				background: #eee;
				font-size: 14px;
				border-radius: 20rpx;
			}
		}
		>button{
			width: 100%;
			position: absolute;
			bottom: 0;
			left:0 ;
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
