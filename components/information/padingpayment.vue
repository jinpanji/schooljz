<template>
	<view class="page">
		<view class="pading cl">
			<view class="tit">
				待付款
			</view>
		<!-- 	<view class="countdown">
				<image src="../../static/img/zhong.png" mode="widthFix"></image>
				<text>剩余05:30自动取消</text>
			</view> -->
		</view>
		
		<view class="list_box">			
			<view class="option" v-if="payInfo.type==1">
				<image src="../../static/img/img/wd_029.png" mode="widthFix"></image>
				<view class="msgbox">
					<view class="tits cl">
						<image src="../../static/img/img/wd_021.png" mode="widthFix"></image>
						<text>早接</text>
					</view>
					<view class="money">
						{{payInfo.money}}元
					</view>
					<view class="times greenbj">
						默认8:00发车
					</view>
					<view class="servicebox green cl">
						<view class="">
							<image src="../../static/img/img/wd_034.png" mode="widthFix"></image>
							<text>专业校车</text>
						</view>
						<view class="">
							<image src="../../static/img/img/wd_033.png" mode="widthFix"></image>
							<text>跟车老师</text>
						</view>
						<view class="">
							<image src="../../static/img/img/wd_032.png" mode="widthFix"></image>
							<text>全程报告</text>
						</view>
					</view>
				</view>				
			</view>
			<!-- null_check -->
			<view class="option" v-if="payInfo.type==2">
				<image src="../../static/img/img/wd_030.png" mode="widthFix"></image>
				<view class="msgbox">
					<view class="tits cl">
						<image src="../../static/img/img/wd_022.png" mode="widthFix"></image>
						<text>晚送</text>
					</view>
					<view class="money">
						{{payInfo.money}}元
					</view>
					<view class="times bluebj">
						默认17:00发车
					</view>
					<view class="servicebox blue cl">
						<view class="">
							<image src="../../static/img/img/wd_037.png" mode="widthFix"></image>
							<text>专业校车</text>
						</view>
						<view class="">
							<image src="../../static/img/img/wd_036.png" mode="widthFix"></image>
							<text>跟车老师</text>
						</view>
						<view class="">
							<image src="../../static/img/img/wd_035.png" mode="widthFix"></image>
							<text>全程报告</text>
						</view>
					</view>
				</view>				
			</view>
			<!-- null_check -->
			<view class="option" v-if="payInfo.type==3">
				<image src="../../static/img/img/wd_031.png" mode="widthFix"></image>
				<view class="msgbox">
					<view class="tits cl">
						<image src="../../static/img/img/wd_023.png" mode="widthFix"></image>
						<text>全包</text>
					</view>
					<view class="money">
						{{payInfo.money}}元
					</view>
					<view class="times orangebj">
						默认早8:00发车，晚17:00发车
					</view>
					<view class="servicebox orange cl">
						<view class="">
							<image src="../../static/img/img/wd_040.png" mode="widthFix"></image>
							<text>专业校车</text>
						</view>
						<view class="">
							<image src="../../static/img/img/wd_039.png" mode="widthFix"></image>
							<text>跟车老师</text>
						</view>
						<view class="">
							<image src="../../static/img/img/wd_038.png" mode="widthFix"></image>
							<text>全程报告</text>
						</view>
					</view>
				</view>				
			</view>
		</view>
		<view class="footer">
			<view class="order">
				应付金额<text>￥{{money.toFixed(2)}}</text>
			</view>
			<button type="primary" @click="goPay()">去支付</button>
		</view>
		<!-- 取消支付提示框 -->
		<view class="shadow" v-show="isShow">
			<view class="box">
				<h3>温馨提示</h3>
				<view class="msg">
					支付已取消！
				</view>
				<button type="primary">我知道了</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				checkNum:1,
				money:998,
				isShow:false,
				payInfo:{},
				payRes:{}
			}
		},
		onLoad(){
			let data=uni.getStorageSync("payInfo")
			data=JSON.stringify(data)
			this.payInfo=data.payInfo
			this.payRes=data.payres
			uni.removeStorageSync("payInfo")
		},
		methods:{
			changeNum(index){
				this.checkNum=index
				if(index==1||index==2){
					this.money=998
				}else{
					this.money=1888
				}
			},
			goPay(){
				//支付功能
				//取消支付跳转到待支付界面
				// this.isShow=true
				let that=this
				uni.requestPayment({
				    provider: 'wxpay',
				    timeStamp: data.timeStamp,//时间戳
				    nonceStr: data.nonceStr,//随机字符串
				    package: data.package,//统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx
				    signType: 'MD5',//签名算法
				    paySign: data.paySign,//签名
				    success: function (res) {
				        console.log('success:' + JSON.stringify(res));
						// 支付成功
						// uni
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
						uni.showToast({
							icon:"none",
							title:"支付失败"
						})
						that.isShow=true
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		padding: 30rpx;
	}
	.list_box{
		border-radius: 20rpx;
		padding-bottom: 100rpx;
		.option{
			height: 320rpx;
			color: #fff;
			padding: 0 30rpx;
			position: relative;
			margin-bottom: 40rpx;
			>image{
				width: 100%;				
			}
			.msgbox{
				position: absolute;
				top: 0;
				padding: 0 30rpx;
				box-sizing: border-box;
				width: 100%;
				.servicebox{
					width: 100%;
					margin-top: 32rpx;
					>view{
						float: left;
						width: 33%;
						font-size: 14px;
						image{
							width: 30rpx;
							margin-right: 10rpx;
						}					
					}
				}
			}
			.tits{
				margin-top: 30rpx;
				image{
					width: 50rpx;
					margin-right: 20rpx;
				}
				text{
					line-height: 30rpx;
					margin-top: -20rpx;
				}
			}
			.money{
				font-size: 16px;
				line-height: 78rpx;
			}
			.times{
				width: 300rpx;
				line-height: 50rpx;
				border-radius: 40rpx;
				color: #fff;
				text-align: center;
				font-size: 14px;
			}
			.greenbj{
				background: green;
			}			
			.green{
				color: green;
			}
			.bluebj{
				background: #33a4ce;
			}
			.blue{
				color: #33a4ce;
			}
			.orangebj{
				background: #f66522;
				width: 520rpx;
			}
			.orange{
				color: #f66522;
			}
		}
		// .null_check{
		// 	image{
		// 		 filter: grayscale(100%);
		// 		 -webkit-filter: grayscale(100%);   
		// 		 -moz-filter: grayscale(100%);  
		// 		 -ms-filter: grayscale(100%);   
		// 		 -o-filter: grayscale(100%);   
		// 	}
		// 	.times{
		// 		background: #808080;
		// 	}
		// 	.servicebox{
		// 		color: #808080;
		// 	}
		// }
	}
	.footer{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: 16px;
		background: #fff;
		view{
			width: 520rpx;
			float: left;
			text-align: right;
			border-top: 1px solid #eee;
			text{
				margin: 0 20rpx;
				color: red;
				font-weight: bold;
			}
		}
		button{
			width: 230rpx;
			background: #FF6C00;
			float: left;
			line-height: 100rpx;
			padding: 0;
			border-radius: 0;
		}
	}
	.shadow{
		position: fixed;
		top: 0;	
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		background: rgba(0,0,0,.5);
		.box{
			width: 600rpx;
			height: 300rpx;
			padding: 30rpx;
			background: #FFFFFF;
			border-radius: 30rpx;
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			margin: auto;
			text-align: center;
			h3{
				line-height: 100rpx;
				font-size: 16px;
			}
			.msg{
				color: #666;
				line-height: 60rpx;
				margin-bottom: 30rpx;
			}
			button{
				width: 100%;
				background: #FF6C00;
				border-radius: 50rpx;
			}
		}
	}
	.page{
		// background: #fff;
		// height: 1034rpx;
	}
	.pading{
		border-bottom: #ccc 1px solid;
		padding-bottom: 20rpx;
		margin-bottom: 45rpx;
		.tit{
			padding:0 20rpx;
			float: left;
		}
		.countdown{
			float:right;
			image{
				width: 40rpx;
				margin-right: 20rpx;
			}
			text{
				color: red;
			}
		}
	}
</style>
