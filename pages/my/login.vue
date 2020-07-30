<template>
	<view class="login_page cl" :style="'height:'+windowHeight+'px;'">
		<h3>登录</h3>
		<view class="inputbox">
			<input type="text"v-model="phone" placeholder="请输入手机号" />
		</view>
		<view class="inputbox">
			<input type="text" class="codeinput" v-model="regCode" placeholder="请输入验证码" />
			<button type="primary" @click="getCodenum()">{{btnStr}}</button>
		</view>		
		<button type="primary" class="login" @click="login()">登录</button>			
			<!-- <view @click="goReg()" class="">
				去注册
			</view> -->			
		<view class="footer">
			<h4><text>第三方登录</text></h4>
			<button class="sflogo" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" >
				<image src="../../static/img/dl_003.png" mode="widthFix"></image>
			</button>
		</view>
	</view>
</template>

<script>
	
	export default {
		data(){
			return{
				btnStr:'获取验证码',
				codeFlag:true,
				regCode:'',
				phone:'',
				type:0,
				parentId:'',
				windowHeight:''
			}
		},
		onLoad(opt){
			console.log("登录登录")
			console.log(opt)
			if(opt.type){
				this.type=opt.type
				this.parentId=opt.parentId
			}
			let windInfo=uni.getSystemInfoSync()
			this.windowHeight=windInfo.windowHeight
		},
		onShow(){
			this.regCode=""
		},
		methods:{	
			goReg(){
				uni.navigateTo({
					url:"reg?phone=18827612391"
				})
			},
			bindGetUserInfo(val){
				console.log("获取微信用户数据")
				console.log(val)
				let that=this
				wx.login({
					success:(e)=>{
						console.log('获取code')
						console.log(e)
						let code=e.code
						console.log(code)
						wx.getUserInfo({
							success:(res)=>{
								console.log("获取用户信息")
								// 获取头像
								// console.log(res)
								// console.log(res.userInfo.avatarUrl)	
								this.avatarUrl=res.userInfo.avatarUrl
								// uni.setStorageSync('userAvatar',res.userInfo.avatarUrl)
								that.$http.post("puparent/wxGrantLogin",{
									type:this.type,//0:自己   1：别人介绍  2：主账号分享的
									code:code,
									encryptedData:res.encryptedData,
									rawData:res.rawData,
									signature:res.signature,
									iv:res.iv,
									parentId:this.parentId
								}).then(res1=>{
									console.log(res1)
									if(res1.code==300){								
										uni.navigateTo({
											url:"reg?avatar="+that.avatarUrl+"&openid="+res1.info
										})
									}else if(res1.code==100){
										let userInfo=""
										userInfo=JSON.stringify(res1.info)
										uni.setStorageSync('userInfo',userInfo)
										uni.showToast({
											icon:"none",
											title:"登录成功！"
										})
										setTimeout(()=>{
											uni.switchTab({
												url:"./index"
											})
										},2000)
									}
								})
							},
							fail:(err)=>{
								console.log("请求出错")
								console.log(err)
							}
						})
						
					},
					fail:(err)=>{
						console.log(err)
					}
				})
			},		
			login(){
				console.log("登录")
					//请求验证，验证码是否正确,验证码正确再提交注册
				this.$http.post("puparent/verification",{
					phone:this.phone,
					code:this.regCode
				}).then(res=>{
					if(res.code==100){
						this.submitInfo()
					}else if(res.code==250){
						uni.showToast({
							icon:"none",
							title:res.msg
						})
					}
				})
			},		
			getCodenum(){
				//获取验证码
				console.log("获取验证码")
				if(this.codeFlag){
					console.log('验证')
					console.log(/^1[3456789]\d{9}$/.test(this.phone))
					 if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
						 this.codeFlag=false
						 uni.showToast({
							 icon:"none",
							 title:"请输入正确的手机号码！"
						 })
					 }
				}
				if(this.codeFlag){
					//可以获取
					this.codeFlag=false
					uni.showLoading({
						icon:"loading",
						title:"正在发送！"
					})
					this.$http.post("puparent/produceCode",{
						phone:this.phone
					}).then(res=>{
							uni.hideLoading();
						if(res.code==100){
							uni.showLoading({
								icon:"success",
								title:"发送成功！",
								success:()=>{
									setTimeout(()=>{
										uni.hideLoading();
									},2000)
								}
							})
							//获取成功倒计时
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
							// 发送失败
							uni.hideLoading()
							uni.showToast({
								icon:"none",
								title:"发送验证码失败！"
							})
							this.codeFlag=true
						}
					})
					
				}else{
					//不可以获取
					 if((/^1[3456789]\d{9}$/.test(this.phone))){ 
						 uni.showToast({
						 	title:'正在获取，请稍后！',
						 	icon:'none'
						 })
					 }else{
						 this.codeFlag=true
					 }				
				}
			},
			submitInfo(){
				this.$http.post('puparent/loginPhone',{
					type:this.type,
					phone:this.phone,
					parentId:this.parentId
				}).then(res=>{
					if(res.code==300){
						uni.navigateTo({
							url:"reg?phone="+this.phone
						})
					}else if(res.code==100){
						let userInfo=""
						userInfo=JSON.stringify(res.info)
						uni.setStorageSync('userInfo',userInfo)
						uni.showToast({
							icon:"none",
							title:"登录成功！"
						})
						setTimeout(()=>{
							uni.switchTab({
								url:"./index"
							})
						},2000)
					}
				})
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
		color: #333;
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
			z-index: 1;
		}
		.codeinput{
			width: 50%;
		}
	}
	.login{
		width: 95%;
		border-radius: 80rpx;
		background: #FF6C00;
		margin-top: 40rpx;
	}
	.wxlogo{
		margin-top: 50rpx;
		// border-top: 1px solid #ccc;
	}
	.sflogo{
		width: 150rpx;
		height: 150rpx;
		margin: auto;
		margin-top: 50rpx;
		background-color: #fff;
		image{
			width: 100%;
		}		
	}
	.sflogo:after{
		border: 0;
	}
	.footer{
		margin-top: 200rpx;
		height: 200rpx;
		padding-bottom: 228rpx;
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
	}
}
.tit{
	margin: 10rpx 20rpx;
	color: #ccc;
	text{
		padding: 0 30rpx;
	}
}
.content{
	margin: 0 20rpx;
	button{
		background-color: #fff;
		font-size: 14px;
		color: #666;
	}
	button:after{
		border-left: 0;
		border-right: 0;	
	}
}

.commbox{
	width: 95%;
	margin: auto;
	margin-top: 20rpx;
}
</style>
