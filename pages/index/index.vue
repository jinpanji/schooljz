<template>
	<view class="index_page">
		<!-- 头部 -->
		<view class="cl headers">
			<image src="../../static/img/sy_001bj.png" mode="widthFix"></image>
			<view class="msgbox">
				<view >
					<!--  @click="goRouter()" -->
					<view v-if="isLogin" class="txboxs cl">
						<view v-for="(item,index) in childrenList" :class="childCheck==item.id?'imgbox check':'imgbox'" @click="changeChild(item)">
							<image :src="item.photo?imgUrl+'eaOss/download/'+item.photo:'../../static/img/mrtx.jpg'" mode="widthFix"></image>
						</view>
						<!-- <view class="imgbox">
							<image src="../../static/img/sy_002.png" mode="widthFix"></image>
						</view> -->
					</view>
					<view class="teacher" v-else>
						<image class="teachericon" src="../../static/img/sy_007.png" mode="widthFix"></image>
						<text >请登录</text>
					</view>
					
				</view>
				<view class="weather">
					<!-- <view class="tit">
						<text class="num">10℃</text>
						<text class="msg">多云转晴</text>
					</view> -->
					<view class="times tit">
						<view class="num">
							{{date}} 
						</view>
						<view class="msg">
							{{day}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 行程 -->
		<view class="bus_list">
			<image src="../../static/img/img/sy_002.png" mode="widthFix"></image>
			<Trip :schoolInfo="siteInfoData"  :homeInfo="homeInfo"/>
		</view>
		<!-- 车辆位置 -->
		<view class="translate">
			<view class="tit">
				车辆位置
				<image @click="goF5()" src="../../static/img/f5.png" mode="widthFix"></image>
			</view>
			<view class="times">
				<text>发车时间：{{childLines.startTime?childLines.startTime:''}}</text>
				<text>预计到达：{{childLines.arriveTime?childLines.arriveTime:''}}</text>
			</view>
			<Buslist v-if="list.length>0" :list="list" :nowSite="childLines.site.id" />
			<view v-else class="nonebox">
				暂无车辆位置信息
			</view>
		</view>
		
		<view class="footerbox">
			<!-- 投诉上传 -->
			<image src="../../static/img/img/sy_009.png" mode="widthFix" @click="goInfo(2)"></image>
			<!-- 请假申请 -->
			<image src="../../static/img/img/sy_010.png" mode="widthFix" @click="goInfo(1)"></image>
			<!-- 昨日行程 -->
			<image src="../../static/img/img/sy_011.png" mode="widthFix"  @click="goInfo(3)"></image>
		</view>
	</view>
</template>

<script>
	import Trip from '../../components/common/trip.vue'
	import Buslist from '../../components/common/buslist.vue'
	var QQMapWX = require("../../components/unitls/qqmap-wx-jssdk.js")
	var qqmapsdk
	export default {	
		components:{
			Trip,
			Buslist
		},
		data() {
			return {
				title: 'Hello',
				form:{
				},
				isLogin:true,
				widths:[10,0],
				width1:0,
				flag:false,
				list:['光谷大道五里湾','光谷大道金融港','光谷大三李陈','光谷大道关南村','光谷大道当代国际花园','光谷大道现代世贸中心'],
				childrenList:[],
				imgUrl:"",
				childCheck:null,//当前选中的是哪个学生
				parentInfo:{},
				childLines:{},//当前线路信息
				siteInfo:{},//车辆实时位置信息
				sxFlag:true,
				siteInfoData:{},
				homeInfo:{},
				date:'',
				dayList:['周日','周一','周二','周三','周四','周五','周六'],
				day:null,
				city:''
			}
		},
		watch:{
			widths:function (oldval,newval){
				console.log(oldval)
			},
			deep:true
		},
		onLoad() {
			qqmapsdk = new QQMapWX({
			  key: 'SX7BZ-DJI6G-G5OQK-IDBI4-RZ6TO-33FBA' //这里自己的key秘钥进行填充
			});		
			this.imgUrl=this.$imgurl
			uni.authorize({
				scope:'userInfo'
			})
			let date=new Date()
			let dateStr=""
			dateStr=date.getFullYear()+"年"
			dateStr+=(date.getMonth()+1)+"月"
			dateStr+=date.getDate()+"日"
			this.date=dateStr
			let day=null
			day=date.getDay()
			this.day=this.dayList[day]
			// this.getWeather()
			// this.getcitycode()
		},
		onShow(){
			let parentInfo=uni.getStorageSync("userInfo")
			if(parentInfo){
				parentInfo=JSON.parse(parentInfo)
				this.parentInfo=parentInfo
			}else{
				//未登录
				uni.showToast({
					icon:"none",
					title:"您还未登录，请先登录!"
				})
				setTimeout(()=>{
					uni.navigateTo({
						url:"../my/login"
					})
				},1000)
			}
			let id=uni.getStorageSync("childId")
			if(id){
				this.childCheck=id
			}
			// this.childCheck=1
			this.getuserinfo()
		},
		methods: {
			getuserinfo(){
				this.$http.post("puchildren/listByParentId",{
					parentId:this.parentInfo.id
				}).then(res=>{
					if(res.code==100){
						if(res.info.length>0){
							this.childrenList=res.info
							if(!this.childCheck){
								this.childCheck=res.info[0].id
								uni.setStorageSync("childId",res.info[0].id)
							}
							this.getmainList()
						}else{
							uni.removeStorageSync("childId")
							this.childCheck=''
						}
						this.getLineInfo()
					}
				})
			},
			getLineInfo(){
				console.log('获取当前线路')
				this.$http.post("puline/currentLine",{
					childrenId:this.childCheck
					// childrenId:1
				}).then(res=>{
					if(res.code==100){
						this.childLines=res.info
						if(res.info){
							this.list=res.info.sites
						}else{
							this.list=[]
						}
					}
				})				
			},
			getmainList(){
				// 车辆实时位置
				this.homeInfo={}
				this.siteInfoData={}
				this.$http.post("puridingrecord/mainList",{
					childrenId:this.childCheck
				}).then(res=>{
					if(res.code==100){
						this.siteInfo=res.info
						let list=res.info
						let  data={}
						list.forEach((item,index)=>{
							if(item.type==1){
								// 上学
								if(!this.siteInfoData.takeTime){
									this.siteInfoData=item
								}
							}else{
								this.homeInfo=item
							}
						})
						// this.siteInfoData=data
					}
				})
			},
			changeChild(item){
				// 切换孩子
				// console.log(item)
				this.childCheck=item.id
				uni.setStorageSync("childId",item.id)
				this.getLineInfo()
				this.getmainList()
			},
			goRouter(){
				if(this.isLogin){
					//查看个人资料
					// this.goInfo(2)
					uni.navigateTo({
						url:"../../components/msg/userinfo"
					})
				}else{
					//登陆
					uni.navigateTo({
						url:"../my/login"
					})
				}
				
			},
			touchEnd(){
				if(this.flag){
					console.log("查看线路安全报告")
					uni.navigateTo({
						url:"../../components/msg/security"
					})
				}
				
			},
			goInfo(index){
				switch(index){
					case 1:
						// 行程记录
						uni.navigateTo({
							url:"../../components/msg/Itineraryrecord"
						})
						break
					case 2:
						// this.goRouter()
						//投诉上传
						uni.navigateTo({
							url:"../../components/complaint/index?id="+this.childCheck
						})
						break
					case 3:
						uni.navigateTo({
							url:"../../components/info/trip"
						})
						break
				}
				
			},
			goF5(){
				// 刷新
				this.getLineInfo()
				this.getmainList()
			},
			getcitycode(){
				let that=this
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
								console.log(res)
								that.city=data.city
								let city=(that.city).substring(2,-1)
								let province=data.province
								province=province.replace('省','')
								uni.request({
									url:"https://api.yytianqi.com/citylist/id/1",
									success:(res2)=>{
										// console.log(res)
										let citylist=res2.data.list
										citylist.forEach((item,index)=>{
											if(item.name==province){
												let list2=item.list
												list2.forEach((item2,index2)=>{
													// console.log((item2.name).substring(2,-1))
													// console.log(city)
													// console.log(item2.name.substring(2,-1)==city)
													if(item2.name.substring(2,-1)==city){
														that.getWeather(item2.list[0].city_id)
													}
												})
											}
										})
									},
								})
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
			getcode(list){
				
			},
			getWeather(code){
				console.log("获取天启")
				uni.request({
					url:"https://api.yytianqi.com/observe?city="+code+"&key=cwhq5h588cdmctfc",
					success:(res)=>{
						console.log(res)
					}
				})
			}
		}
		
	}
</script>
 
<style lang="scss" scoped>
	.index_page{
		width: 100%;
		height: 516rpx;
		background: #fff;
		// background:url(../../static/img/sy_001bj.png);
		>image{
			width: 100%;
		}
		.headers{
			position: relative;
			image{
				width: 100%;
			}
		}
		.msgbox{
			position: absolute;
			top: 40rpx;
			padding: 0 30rpx;
			.teachericon{
				width: 30rpx;
				margin-right: 10rpx;
				margin-top: 5rpx;
			}
			.teacher{
				padding: 0 30rpx;
				margin: 34rpx 0;
				border-radius: 20rpx;
				background: #fa5617;
				color: #fff;
				line-height:50rpx ;
			}
			.txboxs{
				view{
					float: left;
					width: 80rpx;
					height: 80rpx;
					overflow: hidden;
					border-radius: 50%;
					margin-right: 40rpx;
					margin-top: 30rpx;
					box-sizing: border-box;
					image{
						width: 100%;						
					}
				}
				.check{
					border:2px solid #fff
				}
			}
		}		
	}
	.bus_list{
		background: #fff;
		margin-bottom: 20rpx;
		>image{
			width: 100%;
		}
	}
	.translate{
		background: #fff;
		padding: 20rpx 0;
		margin-bottom: 20rpx;
		.tit{
			position: relative;
			image{
				width: 40rpx;
				position: absolute;
				right: 30rpx;
			}
			
		}
		
		>view{
			padding-left: 20rpx;
			margin-left: 20rpx;
		}
		.times{
			background: #eee;
			border-radius: 40rpx;
			width: 710rpx;
			font-size: 14px;
			line-height: 60rpx;
			margin-bottom: 20rpx;
			text{
				display: inline-block;
				width: 50%;
				text-align: center;
			}
		}
		.nonebox{
			padding: 40rpx 0;
			text-align: center;
			color: #999;
		}
	}
	.footerbox{
		background: #fff;
		padding: 40rpx 0;
		padding-bottom: 140rpx;
		image{
			width: 210rpx;
			margin-left: 30rpx;
		}
	}
	.headers .weather{
		.num{
			font-size: 16px !important;
			line-height: 40rpx;
		}
	}
</style>
