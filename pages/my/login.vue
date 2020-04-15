<template>
	<view class="login_page cl">
		<h3>手机验证码登录</h3>
		<view class="inputbox">
			<input type="text" placeholder="请输入手机号" />
		</view>
		<view class="inputbox">
			<input type="text" placeholder="请输入验证码" />
			<button type="primary" @click.stop="getCodenum()">{{btnStr}}</button>
		</view>
		<button type="primary" class="login" @click="login()">登录</button>
		<view class="footer cl">
			<h4><text>第三方登录</text></h4>
			<view class="sflogo">
				<image src="../../static/img/img/dl_003.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				btnStr:'获取验证码',
				codeFlag:true
			}
		},
		methods: {
			login(){
				console.log("登录")
			},
			getCodenum(){
				//获取验证码
			console.log("获取验证码")
				if(this.codeFlag){
					//可以获取
					this.codeFlag=false
					let timer=null
					let count=60
					timer=setInterval(()=>{
							this.btnStr=count+'s后重新获取'
							count--
							if(count==0){
								clearInterval(timer)
								this.codeFlag=true
								this.btnStr="获取验证码"
							}
					},1000)
				}else{
					//不可以获取
					uni.showToast({
						title:'正在获取，请稍后！',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.login_page{
	height: 100%;
	background: #fff;
	// background: #F0AD4E;
	h3{
		padding: 50rpx 20rpx 20rpx 20rpx;
		// background: linear-gradient(#FF6C00, #F0AD4E);
		background: url(../../static/img/img/dl_001.png) no-repeat;
		background-size: 100% 200%;
		font-size: 50rpx;
	}
	.inputbox{
		padding: 40rpx 0rpx;
		margin: auto;
		width: 95%;
		border-bottom: 1px solid #ccc;
		color: #ccc;
		position: relative;
		button{
			position: absolute;
			right: 10rpx;
			top: 0;
			bottom: 0;
			height: 80rpx;
			line-height: 80rpx;
			margin: auto;
			color: #FF6C00;
			border: 1px solid #FF6C00;
			border-radius: 40rpx;
			font-size: 14px;
			background: #fff;
			z-index: 100;
		}
	}
	.login{
		width: 95%;
		border-radius: 80rpx;
		background: #FF6C00;
		margin-top: 40rpx;
	}
	.footer{
		margin-top: 200rpx;
		padding-bottom: 228rpx;
		height: 200rpx;
		h4{
			position: relative;
			border-top: 1px solid #eee;
			width: 100%;
			text{
				position: absolute;
				top: -20rpx;
				left: 0;
				right: 0;
				font-size: 16px;
				color: #999;
				background: #fff;
				height: 40rpx;
				line-height: 40rpx;
				width: 300rpx;
				margin: auto;
				text-align: center;
			}
		}
		.sflogo{
			width: 150rpx;
			height: 150rpx;
			margin: auto;
			margin-top: 80rpx;
			image{
				width: 100%;
			}
		}
	}
}
</style>
