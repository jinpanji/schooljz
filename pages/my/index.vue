<template>
	<view class="my_page">
		<view class="usermsg">
			<image src="../../static/img/img/wd_048.png" mode="widthFix"></image>
			<view class="msgbox">
				<h5>
					<image src="../../static/img/img/wd_003.png" mode="widthFix" @click="showDrawer(1)"></image>
					<view class="shadow" v-show="isShow" @click="showDrawer(2)">						
						<view class="morebox" :style="isShow?'width:400rpx':'width:0;'">
							<view class="box cl" @click="addChild(1)">
								<text>添加孩子信息</text>
								<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
							</view>
							<button class="box cl" id="share1" open-type="share">
								<text>分享添加子账号</text>
								<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
							</button>
							<button class="box cl" id="share2" open-type="share">
								<text>奖励分享</text>
								<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
							</button>
							<view class="box cl" @click="addChild(2)">
								<text>绑定微信</text>
								<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
							</view>
						</view>					
					</view>
				</h5>
				<view class="txbox" @click="lookInfo()">
					<image :src="userInfo.photo?userInfo.photo:'../../static/img/img/sy_001.png'" mode="widthFix"></image>
				</view>
				<view v-if="isLogin" class="username">
					{{userInfo.name}}
				</view>
				<!-- <button v-else class="getuserbtn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" >登录</button> -->
				<button  v-else class="getuserbtn" @click="loginRouter">登录</button>
				<view class="js">
					<image src="../../static/img/img/wd_001.png" mode="widthFix"></image>
					<text>家长</text>
				</view>
			</view>
		</view>
		<!-- 孩子信息 -->
		<view class="childmsg msgbox">
			<view class="tit">
				孩子信息
			</view>
			 <view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" indicator-active-color="#fe6b01" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item v-for="(item,index) in childrenList">
								<view class="swiper-item" @click="goEdit(1,item.id)">
									<h3 class="cl">
										<text>{{item.schoolName}}</text>
										<view class="nj">
											<text>{{item.grade}}年级</text>
											<image src="../../static/img/img/wd_008.png" mode="widthFix"></image>
										</view>
										<view class="xb">
											<!--1:男  0：女生 -->
											<text>{{item.sex==1?'男':'女'}}</text>
											<image v-if="ite.sex==0" src="../../static/img/img/wd_006.png" mode="widthFix"></image>
											<!-- 男生 -->
											<image v-else src="../../static/img/img/wd_007.png" mode="widthFix"></image>
										</view>										
									</h3>
									<view class="cl">
										<text>姓名：</text>
										<tex>{{item.name}}</tex>
										<i @click="gopay(item.id)">{{item.isInput?'已录入':'未录入'}}</i>
									</view>
									<view class="cl">
										<text>线路:</text>
										<view class="xl">
											<view class="cl" v-for="(lines,index2) in item.lines">
												<text>{{lines.startSite.name}}</text>
												<image src="../../static/img/img/wd_002.png" mode="widthFix"></image>
												<text>{{lines.endSite.name}}</text>
											</view>
											<!-- <view class="cl">
												<text>{{item.lines.endSite.name}}</text>
												<image src="../../static/img/img/wd_00202.png" mode="widthFix"></image>
												<text>{{item.lines.startSite.name}}</text>
											</view> -->
										</view>
									</view>
									<view class="cl">
										<text>到期时间：</text>
										<tex>{{item.endDate}}</tex>
									</view>
								</view>
							</swiper-item>
							
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<!-- 家长组信息 -->
		<view class="jzmsg msgbox" v-if="parentList.length>0">
			<view class="tit">
				家长组信息
			</view>
			 <view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" indicator-active-color="#fe6b01" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item v-for="(item,index) in parentList">
								 <!-- @click="goEdit(2,item.id)" -->
								<view class="swiper-item">
									<h3 class="cl">
										<text>{{item.relation}}</text>
									</h3>
									<view class="msgs">
										<text>姓名：</text>
										<text>{{item.name}}</text>
										<view class="switchbox cl">
											<text class="status" :style="ischeck?'left: 0rpx;color:#fff;':'right: -30rpx;'">{{ischeck?'开':'关'}}</text>
											<switch :checked="item.status==0?true:false" @change="switch1Change" />
										</view>
										
									</view>
									<view class="msgs">
										<text>性别：</text>
										<text>{{item.sex?item.sex:""}}</text>									
									</view>
									<view class="msgs">
										<text>联系方式：</text>
										<text>{{item.phone}}</text>									
									</view>
								</view>
							</swiper-item>
							
						</swiper>
					</view>
				</view>
			</view>			
		</view>
		<view class="footerbox">
			<!-- 安全报告 -->
			<image src="../../static/img/img/wd_011.png" mode="widthFix" @click="goInfo(2)"></image>
			<!-- 快速续费 -->
			<image src="../../static/img/img/wd_012.png" mode="widthFix" @click="goInfo(1)"></image>
			<!-- 邀请奖励 -->
			<image src="../../static/img/img/wd_013.png" mode="widthFix" @click="goInfo(3)"></image>
		</view>
		<!-- 微信授权提示窗口 -->
		<view class="shadow" v-if="wxShow">
			<view class="tsbox">
				<h3>提示</h3>
				<text>您还未绑定微信，请先绑定微信！</text>
				<view class="btns cl">
					<button class="sflogo" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" >确定</button>
					<button @click.stop="wxShow=false" type="default">取消</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userName:"用户名",
				 background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				ischeck:false,
				isLogin:false,
				isShow:false,
				avatarUrl:'',
				userInfo:{},//用户详情
				childrenList:[],//孩子信息组
				parentList:[],//家长信息组
				wxShow:false
			}
		},
		onLoad(){
		},
		onShow(){
			this.getIsLogin()
			// if(this.isLogin){
			// }
		},
		methods:{
			getIsLogin(){
				let userInfo=uni.getStorageSync("userInfo")
				if(userInfo){
					this.isLogin=true
					userInfo=JSON.parse(userInfo)
					this.userInfo=userInfo
					console.log("用户信息")
					console.log(userInfo)
					this.getUserList()
				}else{
					this.isLogin=false
					this.userInfo={}
					this.childrenList=[]
					this.parentList=[]
				}
			},
			loginRouter(){
				uni.navigateTo({
					url:"login"
				})
			},
			getUserList(){
				//获取孩子信息，
				this.$http.post("puchildren/listChildrenLineByParentId",{
					parentId:this.userInfo.id,//家长id
					// parentId:1
				}).then(res=>{
					if(res.code==100){
						this.childrenList=res.info
					}else{
						
					}
				})
			
				// 家长组信息
				this.$http.post("puparent/getSubList",{
					// parentId:1,//家长id
					parentId:this.userInfo.id,//家长id
				}).then(res=>{
					if(res.code==100){
						this.parentList=res.info
					}
				})
			},
			lookInfo(){
				//个人资料
				if(this.isLogin){
					uni.navigateTo({
						url:"../../components/msg/userinfo?id="+this.userInfo.id
					})
				}else{
					uni.showToast({
						icon:"none",
						title:"请登录后操作！"
					})
				}
				
			},
			switch1Change(val){
				// console.log(val.detail.value)
				this.ischeck=val.detail.value
			},
			goEdit(val,id){
				if(val==1){
					//编辑孩子信息
					uni.navigateTo({
						url:"../../components/information/editchild?id="+id
					})
				}else{
					//编辑家长信息
					uni.navigateTo({
						url:"../../components/information/editparent?id="+1
					})
				}
			},
			addChild(index){
					// 判断是否已授权
					this.$http.post("puparent/isWxGrant",{
						parentId:this.userInfo.id
					}).then(res=>{
						if(res.code==100){
							if(index==1){
								uni.navigateTo({
									url:"../../components/information/addchildschool"
								})	
							}else{
								uni.showToast({
									icon:'none',
									title:"您的账号已绑定微信！"
								})
							}
						}else if(res.code==250){
							this.wxShow=true
						}
					})
									
				
			},
			showDrawer(index){
				// console.log("三生三世")
				if(index==1){
					this.isShow=true
				}else{
					this.isShow=false
				}
			},	
			goInfo(index){
				switch(index){
					case 1:
						console.log("快速续费")
						uni.navigateTo({
							url:"../../components/info/renew"
						})
						break
					case 2:
						console.log("安全报告")
						uni.navigateTo({
							url:"../../components/msg/record"
						})
						break
					case 3:
						console.log("邀请奖励")
						uni.navigateTo({
							url:"../../components/share/index"
						})
						break
				}
			},
			gopay(){
				// 前去付款测试 ,正式使用时关闭
				uni.navigateTo({
					url:"../../components/information/payment"
				})
			},
			bindGetUserInfo(){
				// 微信授权，绑定微信，修改头像
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
								that.avatarUrl=res.userInfo.avatarUrl
								that.$http.post("puparent/wxGrant",{
									// type:that.type,//0:自己   1：别人介绍  2：主账号分享的
									code:code,
									encryptedData:res.encryptedData,
									rawData:res.rawData,
									signature:res.signature,
									iv:res.iv,
									parentId:'',
									photo:that.avatarUrl,
									parentId:that.userInfo.id
								}).then(res1=>{
									console.log(res1)
									 if(res1.code==100){
										 let userInfo={}
										 that.userInfo.photo=that.avatarUrl
										 that.userInfo.wechatOpenid=res1.info
										 userInfo=JSON.stringify(that.UserInfo)
										uni.setStorageSync('userInfo',userInfo)
										this.wxShow=false
									}
								})										
							},
						})
					},
				})
			},
			changeUserPhoto(){
				console.log("改头像")
				this
			}
		},
		onShareAppMessage:function(options){
			console.log("分享")
			console.log(options)
			let type=options.target.id=="share1"?2:1
			let parentId=this.userInfo.id
			console.log(type)
			console.log(parentId)
			return{
				title:type==1?"奖励分享":'分享添加子账号',
				path:'pages/my/login?type='+type+'&parentId='+parentId
			}
		}
	}
</script>

<style lang="scss" scoped>
	.usermsg{
		height: 420rpx;
		position: relative;
		>image{
			width: 100%;
		}
		.msgbox{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			z-index: 1000;
			color: #fff;
			h5{
				position: absolute;
				top: 125rpx;
				right: 100rpx;
				image{
					width: 50rpx;
				}
			}
			.txbox{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				border: 2px solid #FFFFFF;
				margin: auto;
				overflow: hidden;
				box-shadow: 0px 0px 5px 0px #999999;
				margin-top: 100rpx;
				image{
					width: 100%;
					// margin-left: -50%;
				}
			}
			.username{
				line-height: 80rpx;
				text-align: center;
				font-size: 16px;
			}
			.js{
				width: 100rpx;
				height: 44rpx;
				background: #f54009;
				padding: 0 33rpx;
				line-height: 44rpx;
				font-size: 12px;
				margin: auto;
				border-radius: 20rpx;
				image{
					width: 35rpx;
					margin-right: 10rpx;
				}
				
			}
		}
	}
	.msgbox{
		padding: 0 30rpx;
		margin-top: 28rpx;
		.tit{
			padding: 0 20rpx;
		}
	}
	.swiper-item{
		background: #fff;
		border: 1px solid #eee;
		border-radius:20rpx;
		box-shadow: 0px 0px 1px 1px #ccc;
		margin-bottom: 20rpx;
		width: 98%;
		margin: auto;
		margin-top: 10rpx;
		padding: 20rpx;
		box-sizing: border-box;
		h3{
			padding-bottom: 20rpx;
			border-bottom: 1px solid #ccc;
		}
	}
	.childmsg{
		.swiper{
			height: 330rpx;
			.swiper-item{
				// height: 370rpx;				
				h3{
					>text{
						float: left;
						font-size: 14px;
					}
					.xb,.nj{
						color: #fff;
						font-size: 12px;
						float: right;
						position: relative;
						image{
							width: 100%;
						}
						text{
							position: absolute;
							width: 100%;
							text-align: center;
							line-height: 30rpx;
						}
					}
					.xb{
						width: 80rpx;
						margin-right: 20rpx;
					}
					.nj{
						width: 100rpx;
					}
				}
				>view{
					font-size: 14px;
					margin: 10rpx 0;
					text{
						float: left;
						margin-right: 20rpx;
					}
					i{
						float: right;
						padding:5rpx 20rpx;
						border-radius: 20rpx;
						background: #ccc;
					}
					.xl{
						width: 520rpx;
						float: left;
						max-height: 80rpx;
						overflow-y: scroll;
						overflow-x: hidden;
						.cl{
							margin: 10rpx 0;
						}
						text{
							margin: 0;	
							width: 232rpx;
						}
						image{
							width:30rpx;
							margin: 0 10rpx;
							float: left;
							margin-top: 10rpx;
						}
						// .cl text:last-child{
						// 	float:right;
						// }
					}
				}
			}
		}
	}
	.jzmsg{
		.msgs{
			margin-top: 10rpx;
			text:first-child{
				margin-right: 10rpx;
			}
			.switchbox{
				float: right;
				width: 100rpx;
				position: relative;
				.status{
					position: absolute;
					// width: 100%;
					z-index: 100;
					top: 10rpx;
					padding: 0 10rpx;
					box-sizing: border-box;
				}
			}
		}
	}
	.footerbox{
		background: #fff;
		padding: 40rpx 0;		
		margin-top: 20rpx;
		image{
			width: 210rpx;
			margin-left: 30rpx;
		}
	}
	.getuserbtn{
		background: rgba(0,0,0,0);
		width: 150rpx;
		border: 0;
		padding: 0;
		font-size: 16px;
		color:#fff;
		height: 68rpx;
		line-height: 68rpx;
	}
	.getuserbtn:after{
		border: 0;
	}
	.shadow{
		position: fixed;
		top: 0;
		right: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		background-color: rgba(0,0,0,.5);
		z-index: 1000;
	}
	.morebox{
		float: right;
		// width: 400rpx;
		width: 0;
		transition: 0.5s;
		height: 100%;
		background: #fff;
		color: #000;
		.box:first-child{
			margin-top: 200rpx;
		}
		.box:last-child{
			border-bottom: 0;
		}
		.box{
			font-size: 14px;
			border-bottom: 1px solid #ccc;
			line-height: 80rpx;
			padding: 0 30rpx;
			background-color: #fff;
		}
		text{
			float: left;
		}
		image{
			float: right;
			width: 20rpx !important;
			margin-top: 23rpx;
		}
	}
	.shadow .tsbox{
		width: 550rpx;
		height: 280rpx;
		background: #fff;
		border-radius: 20rpx;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		padding: 10rpx 30rpx;
		text-align: center;
		h3{
			line-height: 60rpx;
			color: #999;
		}
		text{
			color: #666;
		}
		.btns{
			margin-top: 50rpx;
			button:after{
				border: 0;
			}
			button{
				width: 40%;
				// border-radius: 0;
				margin: 0 5%;
				float: left;
				color: #fff;
				background-color: #F0AD4E;
				font-size: 14px;
			}
			.sflogo{
				background-color: #FF6C00;
			}
		}
	}
</style>
