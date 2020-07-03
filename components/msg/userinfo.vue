<template>
	<view class="userinfopage">
		<view class="cl">
			<text class="txt">头像</text>
			<view class="touxiang">
				<image :src="photo" mode="widthFix"></image>
			</view>
		</view>
		<view class="cl">
			<text>姓名</text>
			<input type="text" v-model="userInfo.name" value="" placeholder="请输入姓名" />
		</view>
		<view class="inputbox cl">
			<text>手机号码</text>
			<input type="text"v-model="userInfo.phone" placeholder="请输入手机号" />
		</view>
		<view class="inputbox cl">
			<text>验证码</text>
			<input type="text" class="codeinput" v-model="regCode" placeholder="请输入验证码" />
			<button type="primary" @click="getCodenum()">{{btnStr}}</button>
		</view>
		<!-- <view class="uni-list cl">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					性别
				</view>
				<view class="uni-list-cell-db">
					<picker mode="selector" :value="xbcheck" :range="xblist" @change="xbchange">
						<view class="uni-input">{{xblist[xbcheck]}}</view>
					</picker>
				</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
		</view> -->
		<!-- <view class="uni-list cl">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					出生日期
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
		</view> -->
		<view class="uni-list cl">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					关系
				</view>
				<view class="uni-list-cell-db">
					<picker mode="selector" :value="gxcheck" :range="gxlist" @change="gxchange">
						<view class="uni-input">{{gxlist[gxcheck]}}</view>
					</picker>
				</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="content">
			<text>地址</text>
			<view class="btns" type="default" @tap="openAddres2">{{addressList[0]?(addressList[0]+"-"+addressList[1]+"-"+addressList[2]):"请选择省市区"}}</view>
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
		<view class="cl">
			<text>详细地址</text>
			<input type="text" v-model="userInfo.detailAddreee" value="" placeholder="请输入地址" />
		</view>
		<view class="logout">
			退出登录
		</view>
		<button type="primary" @click="update()">修改</button>
	</view>
</template>

<script>
	import simpleAddress from '@/components/common/simple-address/simple-address.vue';
	// import simpleAddress from"../common/simple-address/simple-address.vue"
	import xflSelect from '@/components/common/xfl-select/xfl-select.vue';
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default{
		components: {
			simpleAddress,xflSelect
		},
		data(){
			return{
				xblist:['男','女'],
				xbcheck:0,
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				userId:null,
				userInfo:{},
				imgUrl:'',
				photo:"",
				cityPickerValueDefault: [0, 0, 1],
				// addressList:["湖北省","武汉市","江夏区"],
				addressList:[],
				codeList:[],
				pickerText:"",
				gxlist:["父亲","母亲","爷爷","奶奶","叔叔","阿姨"],
				gxcheck:0,
				btnStr:'获取验证码',
				codeFlag:true,
				regCode:'',
				streetNmae:"",
				streetId:null,//小区列表
				communityList:[],//小区列表
				communiStr:[]
			}
		},
		onLoad(e){
			console.log(e.id)
			this.imgUrl=this.$imgurl
			this.userId=e.id
			let userInfo=uni.getStorageSync("userInfo")
			userInfo=JSON.parse(userInfo)
			this.photo=userInfo.photo
			this.getUserInfo()
		},	
		created(){
		},
		onShow(){
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
				this.getCommunity()
				console.log(this.codeList)
			},
			xbchange(val){
				console.log(val)
			},
			gxchange(val){
				// 关系改变
				console.log(val)
				this.userInfo.relation=this.gxlist[val.detail.value]
				this.gxcheck=val.detail.value
				console.log(this.userInfo.relation)
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			bindTimeChange: function(e) {
				this.time = e.detail.value
			},
			getUserInfo(){
				this.$http.post("puparent/detail",{
					parentId:this.userId
				}).then(res=>{
					if(res.code==100){
						this.userInfo=res.info
						let data=res.info
						// this.addressList=[]
						this.addressList[0]=data.province.name
						this.addressList[1]=data.city.name
						this.addressList[2]=data.area.name
						this.getDwCode()
						// this.gxcheck
						let index=0
						if(data.relation){
							index=this.gxlist.indexOf(data.relation)
						}
						this.gxcheck=index==-1?0:index
						this.streetId=data.streetId
						this.streetNmae=data.streetNmae
					}
				})
			},
			getCodenum(){
				//获取验证码
				console.log("获取验证码")
				if(this.codeFlag){
					console.log('验证')
					console.log(/^1[3456789]\d{9}$/.test(this.userInfo.phone))
					 if(!(/^1[3456789]\d{9}$/.test(this.userInfo.phone))){ 
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
						phone:this.userInfo.phone
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
			update(){
				// 修改  验证验证码是否正确
				if(this.regCode){
					this.$http.post("puparent/verification",{
						phone:this.userInfo.phone,
						code:this.regCode,						
					}).then(res=>{
						if(res.code==100){
							this.submitInfo()
						}else{
							uni.showToast({
								icon:"none",
								title:res.msg
							})
						}
					})
				}else{
					uni.showToast({
						icon:"none",
						title:"请输入验证码"
					})
				}
			},
			submitInfo(){
				console.log("提交")
				this.$http.post("puparent/update",{
					id:this.userInfo.id,
					phone:this.userInfo.phone,
					name:this.userInfo.name,
					relation:this.gxlist[this.gxcheck],
					detailAddreee:this.userInfo.detailAddreee,
					streetId:this.streetId,
					streetNmae:this.streetNmae,
					province:{
						code:this.codeList[0],
						name:this.addressList[0]
					},
					city:{
						code:this.codeList[1],
						name:this.addressList[1],
					},
					area:{
						code:this.codeList[2],
						name:this.addressList[2],
					}
				},'application/json').then(res=>{
					if(res.code==100){
						uni.showToast({
							icon:"success",
							title:"修改成功"
						})
						setTimeout(()=>{
							uni.navigateBack({
								
							})
						},2000)
					}
				})
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
						// con
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
	.userinfopage{
		padding: 0 20rpx;
		background: #fff;
		padding-bottom: 120rpx;
		>view{
			padding: 40rpx 0;
			border-bottom: 1px solid #ccc;
			text,.uni-list-cell-left{
				float: left;
				color: #ccc;
				width: 220rpx;
			}
			input,.uni-list-cell-db{
				float: left;
				width: 420rpx;
			}
			.uni-list-cell image{
				width: 25rpx;
				float: right;
			}
			.txt{
				line-height: 125rpx;
			}
			.touxiang{
				float: left;
				width: 125rpx;
				height: 125rpx;
				border-radius: 50%;
				overflow: hidden;
				border: 2px solid #fff;
				box-shadow: 0px 0px 10px 3px #ccc;
				image{
					width: 100%;
				}
			}
		}
		.logout{
			text-align: center;
			padding: 20rpx 0;
			color: #FF6C00;
			font-size: 14px;
		}
	}
	.userinfopage >button{
		background: #FF6C00;
		position: fixed;
		bottom: 0;
		width: 100%;
		left:0;
		z-index: 1000;
	}
	.inputbox{
		padding: 40rpx 0rpx;
		margin: auto;
		// width: 95%;
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
			// float: right;
			color: #FF6C00 !important;
			border: 1px solid #FF6C00;
			border-radius: 40rpx;
			font-size: 14px;
			background: #fff;
			z-index: 1;
			width: 230rpx;
		}
		.codeinput{
			width: 28%;
		}
	}
	

</style>
