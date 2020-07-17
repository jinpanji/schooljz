<template>
	<view class="login_page cl">
		<h3>注册</h3>
		<view class="inputbox">
			<input type="text" v-model="userName" placeholder="请输入姓名" />
		</view>
		<view class="inputbox">
			<input type="text" :disabled="isPhoneReg" v-model="phone" placeholder="请输入手机号" />
		</view>
		<view class="inputbox" v-if="!isPhoneReg">
			<input type="text" class="codeinput" v-model="regCode" placeholder="请输入验证码" />
			<button type="primary" @click="getCodenum()">{{btnStr}}</button>
		</view>
		<view class="tit" >
			<text>省、市、区</text>
		</view>
		<view class="content">
			<button class="btns" type="default" @tap="openAddres2">{{addressList[0]?(addressList[0]+"-"+addressList[1]+"-"+addressList[2]):"请选择省市区"}}</button>
			<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
		</view>
		<view class="commbox">
			<xfl-select
				:list="communiStr"
				:clearable="false"
				:showItemNum="5" 
				:listShow="false"
				:isCanInput="true"  
				:style_Container="'height: 50px; font-size: 16px;'"
				:placeholder = "'请选择小区'"
				:initValue="streetNmae"
				:selectHideType="'hideAll'"
				@change="selectChange"
			>
			</xfl-select>
		</view>
		<view class="inputbox">
			<input type="text" v-model="address" placeholder="请输入详细地址" />
		</view>
		
		
		<button type="primary" class="login" @click="login()">注册</button>		
	</view>
</template>

<script>
	import simpleAddress from '@/components/common/simple-address/simple-address.vue';
	import xflSelect from '../../components/common/xfl-select/xfl-select.vue';
	var QQMapWX = require("../../components/unitls/qqmap-wx-jssdk.js")
	var qqmapsdk
	export default {
		data(){
			return{
				btnStr:'获取验证码',
				codeFlag:true,
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				addressList:[],
				codeList:[],
				userName:"",//姓名
				phone:"",//电话
				regCode:"",//验证码
				address:"",//详细地址
				avatar:"",//头像
				openId:"",//微信用户openId
				streetNmae:"",
				streetId:null,//小区列表
				communityList:[],//小区列表
				communiStr:[],
				isPhoneReg:false
			}
		},
	   components: {
			simpleAddress,xflSelect
		},
		onLoad(opt){
			qqmapsdk = new QQMapWX({
			  key: 'SX7BZ-DJI6G-G5OQK-IDBI4-RZ6TO-33FBA' //这里自己的key秘钥进行填充
			});			
			if(opt.phone){
				this.phone=opt.phone
				this.isPhoneReg=true
			}else{
				this.avatar=opt.avatar
				this.openId=opt.openid
				this.isPhoneReg=false
			}
		},
		onShow(){
			let that=this
			// this.getAddress()
			uni.getLocation({
				success:(res1)=>{
					console.log(res1)
					let latitude=res1.latitude
					let longitude=res1.longitude
					qqmapsdk.reverseGeocoder({
					  location: {
					    latitude: latitude,
					    longitude: longitude
					  },
					  success: function (res) {
							let data=res.result.address_component
							that.addressList[0]=data.province
							that.addressList[1]=data.city
							that.addressList[2]=data.district
							that.getDwCode()
					  },
					  fail: function (res) {
						 // that.debug="获取中文位置失败"+JSON.stringify(res)
					    console.log(res);
					  },
					  complete: function (res) {
					    // console.log(res);
					  }
					});
				}
			})
			
		},
		methods:{			
			getDwCode(){
				var index = this.$refs.simpleAddress.queryIndex(this.addressList, 'label');
				console.log(index);
				var data=index.data
				this.codeList[0]=data.province.value
				this.codeList[1]=data.city.value
				this.codeList[2]=data.area.value
				this.getCommunity()
				console.log(this.codeList)
			},
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
				this.getCommunity()
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
				console.log("注册")
				if(this.phone&&this.address&&this.userName){
					if(this.isPhoneReg){
						//手机号码注册
						this.submitInfo()
					}else{
						//请求验证，验证码是否正确,验证码正确再提交注册   微信授权注册
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
					}					
				}else{					
					uni.showToast({
						icon:"none",
						title:"请填写完整的信息！"
					})
				}
			},
			submitInfo(){
				// 提交注册信息
				// console.log("注册")
				this.$http.post("puparent/register",{
					wechatOpenid:this.openId,//微信openid
					photo:this.avatar,//头像
					detailAddreee:this.address,//详细地址
					name:this.userName,//用户名称
					//phone:this.regCode,//验证码？？？？
					phone:this.phone,//电话？？？？
					relation:"",//关系？？？？
					provinceCode:this.codeList[0],//省
					provinceName:this.addressList[0],
					cityCode:this.codeList[1],//市
					cityName:this.addressList[1],
					areaCode:this.codeList[2],//区
					areaName:this.addressList[2],
					streetNmae:this.streetNmae,//小区名称
					streetId:this.streetId,
				}).then(res=>{
					if(res.code==100){
						let usertInfo=res.info
						usertInfo=JSON.stringify(usertInfo)
						uni.setStorageSync('userinfo',usertInfo)
						uni.showToast({
							icon:"none",
							title:"注册成功，请前去登录！"
						})
						setTimeout(()=>{
							uni.navigateBack({})
						},2000)
					}else{
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
			getCommunity(){
				// 获取小区列表
				this.$http.post("mgStreet/simpleList",{
					provinceName:this.addressList[0],
					provinceCode:this.codeList[0],
					cityName:this.addressList[1],
					cityCode:this.codeList[1],
					areaName:this.addressList[2],
					areaCode:this.codeList[2],
					name:""
				}).then(res=>{
					if(res.code==100){
						// this.communityList=re.info
						let list=res.info
						this.communiStr=[]
						this.communityList=[]
						list.forEach((item,index)=>{
							this.communityList.push(item)
							this.communiStr.push(item.name)
						})
					}
				})
			},
			selectChange(val){
				// 选择小区
				console.log(val)
				this.streetNmae=val.newVal
				this.streetId=this.communityList[val.index].id
			},
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

.commbox{
	width: 95%;
	margin: auto;
	margin-top: 20rpx;
}
</style>
