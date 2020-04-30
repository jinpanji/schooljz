<template>
	<view class="login_page cl">
		<h3>注册</h3>
		<view class="inputbox">
			<input type="text" placeholder="请输入姓名" />
		</view>
		<view class="inputbox">
			<input type="text" placeholder="请输入手机号" />
		</view>
		<view class="inputbox">
			<input type="text" placeholder="请输入验证码" />
			<button type="primary" @click.stop="getCodenum()">{{btnStr}}</button>
		</view>
		<view class="tit" >
			<text>省、市、区</text>
		</view>
		<view class="content">
			<button class="btns" type="default" @tap="openAddres2">{{addressList[0]+"-"+addressList[1]+"-"+addressList[2]}}</button>
			<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
		</view>
		<view class="inputbox">
			<input type="text" placeholder="请输入详细地址" />
		</view>
		
		
		<button type="primary" class="login" @click="login()">注册</button>
		<!-- <view class="footer cl">
			<h4><text>第三方登录</text></h4>
			<view class="sflogo">
				<image src="../../static/img/img/dl_003.png" mode="widthFix"></image>
			</view>
		</view> -->
	</view>
</template>

<script>
	import simpleAddress from '@/components/common/simple-address/simple-address.vue';
	export default {
		data(){
			return{
				btnStr:'获取验证码',
				codeFlag:true,
				// addressData:{
				// 	key:"366BZ-AIK6F-DBZJL-NY2AB-GMY2J-CDBRB",
				// 	id:"",
				// },
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				addressList:['湖北省','武汉市','江夏区'],
				codeList:[]
			}
		},
	   components: {
			simpleAddress
		},
		onShow(){
			// this.getAddress()
		},
		methods: {		
			openAddres2() {
				// 根据 label 获取
				var index = this.$refs.simpleAddress.queryIndex(this.addressList, 'label');
				console.log(index);
				this.cityPickerValueDefault = index.index;
				this.$refs.simpleAddress.open();
			},
		
			onConfirm(e) {
				this.pickerText = JSON.stringify(e);
				console.log("这呃呃呃呃呃呃")
				console.log(e)
				this.addressList=e.labelArr
				this.codeList[0]=e.provinceCode
				this.codeList[1]=e.cityCode
				this.codeList[2]=e.areaCode
				console.log(this.codeList)
			},
			// 从腾讯api获取省市区数据
			// getAddress(){				
			// 	uni.request({
			// 		url:"https://apis.map.qq.com/ws/district/v1/getchildren",
			// 		method:"GET",
			// 		data:this.addressData,
			// 		success(res) {
			// 			console.log('获取行政区划')
			// 			console.log(res)
						
			// 		}
			// 	})
			// },
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
			z-index: 1;
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
</style>
